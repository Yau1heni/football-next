'use client';

import { Dropdown } from '@components/dropdown';
import { InputSearch } from '@components/input-search';
import { Button } from '@components/ui/button';
import { CheckBox } from '@components/ui/check-box';
import { MultiDropdown } from '@components/ui/multi-dropdown';
import { type FilterOption } from '@utils/filter-options';
import { useEffect, useState } from 'react';

import styles from './clubs-filters.module.scss';
import {
  CLUB_COUNTRIES_OPTIONS,
  getClubsSortOptions,
  getCountriesTitle,
} from './clubs-filters-utils';

type ClubsFiltersProps = {
  searchTerm: string;
  sortOption: FilterOption | null;
  countriesOptions: FilterOption[];
  favoritesOnly: boolean;
  onApplySearch: (value: string) => void;
  onSetSortOption: (option: FilterOption | null) => void;
  onSetCountriesOptions: (options: FilterOption[]) => void;
  onSetFavoritesOnly: (value: boolean) => void;
  onResetFilters: () => void;
};

export const ClubsFilters = (props: ClubsFiltersProps) => {
  const {
    searchTerm,
    sortOption,
    countriesOptions,
    favoritesOnly,
    onApplySearch,
    onSetSortOption,
    onSetCountriesOptions,
    onSetFavoritesOnly,
    onResetFilters,
  } = props;

  const [searchDraft, setSearchDraft] = useState(searchTerm);

  useEffect(() => {
    setSearchDraft(searchTerm);
  }, [searchTerm]);

  const onSearch = () => onApplySearch(searchDraft);
  const onReset = () => {
    setSearchDraft('');
    onResetFilters();
  };

  return (
    <div className={styles.clubsFilters}>
      <InputSearch searchTerm={searchDraft} onChangeAction={setSearchDraft} action={onSearch} />
      <div className={styles.filtersRow}>
        <Dropdown
          className={styles.dropdown}
          options={getClubsSortOptions}
          value={sortOption}
          onChangeAction={onSetSortOption}
          placeholder={'Сортировка'}
        />
        <MultiDropdown
          className={styles.dropdown}
          options={CLUB_COUNTRIES_OPTIONS}
          value={countriesOptions}
          onChange={onSetCountriesOptions}
          getTitle={getCountriesTitle}
        />
        <label className={styles.favoritesLabel}>
          <CheckBox checked={favoritesOnly} onChange={onSetFavoritesOnly} />
          <span>Только избранное</span>
        </label>
        <Button className={styles.resetBtn} onClick={onReset}>
          Сбросить
        </Button>
      </div>
    </div>
  );
};
