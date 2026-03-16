import { Dropdown } from '@components/dropdown';
import type { FilterOption } from '@utils/filter-options';
import type { FC } from 'react';

import styles from './standings-filters.module.scss';
import {
  COMPETITION_OPTIONS,
  MATCH_VENUE_OPTIONS,
  SEASON_OPTIONS,
} from './standings-filters-utils';

type StandingsFiltersProps = {
  competitionOption: FilterOption | null;
  onSetCompetitionOptionAction: (option: FilterOption | null) => void;
  matchVenueOption: FilterOption | null;
  onSetMatchVenueOptionAction: (option: FilterOption | null) => void;
  seasonOption: FilterOption | null;
  onSetSeasonOptionAction: (option: FilterOption | null) => void;
};

export const StandingsFilters: FC<StandingsFiltersProps> = (props) => {
  const {
    competitionOption,
    onSetCompetitionOptionAction,
    matchVenueOption,
    onSetMatchVenueOptionAction,
    seasonOption,
    onSetSeasonOptionAction,
  } = props;

  return (
    <div className={styles.standingsFilters}>
      <div className={styles.filtersRow}>
        <Dropdown
          className={styles.dropdown}
          options={COMPETITION_OPTIONS}
          value={competitionOption}
          onChangeAction={onSetCompetitionOptionAction}
          placeholder={'Чемпионат'}
        />
        <Dropdown
          className={styles.dropdown}
          options={MATCH_VENUE_OPTIONS}
          value={matchVenueOption}
          onChangeAction={onSetMatchVenueOptionAction}
          placeholder={'Тип матчей'}
        />
        <Dropdown
          className={styles.dropdown}
          options={SEASON_OPTIONS}
          value={seasonOption}
          onChangeAction={onSetSeasonOptionAction}
          placeholder={'Сезон'}
        />
      </div>
    </div>
  );
};
