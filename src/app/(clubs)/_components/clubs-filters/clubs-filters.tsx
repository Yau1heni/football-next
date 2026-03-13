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
  onApplySearchAction: (value: string) => void;
  onSetSortOptionAction: (option: FilterOption | null) => void;
  onSetCountriesOptionsAction: (options: FilterOption[]) => void;
  onSetFavoritesOnlyAction: (value: boolean) => void;
  onResetFiltersAction: () => void;
};

export const ClubsFilters = (props: ClubsFiltersProps) => {
  const {
    searchTerm,
    sortOption,
    countriesOptions,
    favoritesOnly,
    onApplySearchAction,
    onSetSortOptionAction,
    onSetCountriesOptionsAction,
    onSetFavoritesOnlyAction,
    onResetFiltersAction,
  } = props;

  const [searchDraft, setSearchDraft] = useState(searchTerm);

  useEffect(() => {
    setSearchDraft(searchTerm);
  }, [searchTerm]);

  const onSearch = () => onApplySearchAction(searchDraft);
  const onReset = () => {
    setSearchDraft('');
    onResetFiltersAction();
  };

  return (
    <div className={styles.clubsFilters}>
      <InputSearch searchTerm={searchDraft} onChangeAction={setSearchDraft} action={onSearch} />
      <div className={styles.filtersRow}>
        <Dropdown
          className={styles.dropdown}
          options={getClubsSortOptions}
          value={sortOption}
          onChangeAction={onSetSortOptionAction}
          placeholder={'Сортировка'}
        />
        <MultiDropdown
          className={styles.dropdown}
          options={CLUB_COUNTRIES_OPTIONS}
          value={countriesOptions}
          onChange={onSetCountriesOptionsAction}
          getTitle={getCountriesTitle}
        />
        <label className={styles.favoritesLabel}>
          <CheckBox checked={favoritesOnly} onChange={onSetFavoritesOnlyAction} />
          <span>Только избранное</span>
        </label>
        <Button className={styles.resetBtn} onClick={onReset}>
          Сбросить
        </Button>
      </div>
    </div>
  );
};
