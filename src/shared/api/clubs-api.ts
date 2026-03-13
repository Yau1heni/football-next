import { db } from '@configs/firebase-config';
import { clientTypesense } from '@configs/typesense-config';
import { CLUBS_COLLECTIONS } from '@constants/firebase-collections';
import { PAGINATION_LIMIT, START_PAGE } from '@constants/pagination';
import type { Club, GetClubsResponse, GetClubsTypesenseOptions } from '@shared-types/clubs.types';
import { clubsFirestoreConverter } from '@utils/firebase-converter';
import { doc, getDoc } from 'firebase/firestore';

export const clubsApi = {
  getFromTypesense: async (options: GetClubsTypesenseOptions): Promise<GetClubsResponse> => {
    const { searchTerm = '', page = START_PAGE, sort, countries, favoritesIds } = options;

    if (favoritesIds && favoritesIds.length === 0) {
      return { clubsData: [], found: 0 };
    }

    const filterParts: string[] = [];
    if (countries?.length) {
      filterParts.push(`${CLUBS_COLLECTIONS.FIELD_PATH.COUNTRY}:[${countries.join(',')}]`);
    }
    if (favoritesIds) {
      filterParts.push(`id:[${favoritesIds.join(',')}]`);
    }
    const filter_by = filterParts.length > 0 ? filterParts.join(' && ') : undefined;

    const response = await clientTypesense
      .collections(CLUBS_COLLECTIONS.PATH)
      .documents()
      .search({
        q: searchTerm,
        ...(filter_by != null ? { filter_by } : {}),
        query_by: CLUBS_COLLECTIONS.FIELD_PATH.NAME,
        page,
        per_page: PAGINATION_LIMIT,
        sort_by: sort ? sort.replace('_', ':') : `${CLUBS_COLLECTIONS.FIELD_PATH.NAME}:asc`,
        infix: 'always',
        num_typos: 1,
      });

    const data = (response.hits ?? []).map((hit) => hit.document as Club);

    return { clubsData: data, found: response.found };
  },

  getClub: async (id: string): Promise<Club | null> => {
    const clubRef = doc(db, CLUBS_COLLECTIONS.PATH, id).withConverter(clubsFirestoreConverter);
    const snapshot = await getDoc(clubRef);

    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  },
};
