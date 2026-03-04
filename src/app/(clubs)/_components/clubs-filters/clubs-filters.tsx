'use client';

import { Dropdown } from '@components/dropdown';
import { InputSearch } from '@components/input-search';
import { Button } from '@components/ui/button';
import { CheckBox } from '@components/ui/check-box';
import { MultiDropdown } from '@components/ui/multi-dropdown';
import { useState } from 'react';

import { useClubsFilters } from '../use-clubs-filters';
import styles from './clubs-filters.module.scss';
import {
  CLUB_COUNTRIES_OPTIONS,
  getClubsSortOptions,
  getCountriesTitle,
} from './clubs-filters-utils';

export const ClubsFilters = () => {
  const {
    queryOptions,
    favoritesOnly,
    applySearch,
    setSortOption,
    sortOption,
    countriesOptions,
    setCountriesOptions,
    setFavoritesOnly,
    resetFilters,
  } = useClubsFilters();

  const [searchDraft, setSearchDraft] = useState(queryOptions.searchTerm);

  const onSearch = () => applySearch(searchDraft);
  const onReset = () => {
    setSearchDraft('');
    resetFilters();
  };

  return (
    <div className={styles.clubsFilters}>
      <InputSearch searchTerm={searchDraft} onChange={setSearchDraft} action={onSearch} />
      <div className={styles.filtersRow}>
        <Dropdown
          className={styles.dropdown}
          options={getClubsSortOptions}
          value={sortOption}
          onChange={setSortOption}
          placeholder={'Сортировка'}
        />
        <MultiDropdown
          className={styles.dropdown}
          options={CLUB_COUNTRIES_OPTIONS}
          value={countriesOptions}
          onChange={setCountriesOptions}
          getTitle={getCountriesTitle}
        />
        <label className={styles.favoritesLabel}>
          <CheckBox checked={favoritesOnly} onChange={setFavoritesOnly} />
          <span>Только избранное</span>
        </label>
        <Button className={styles.resetBtn} onClick={onReset}>
          Сбросить
        </Button>
      </div>
    </div>
  );
};
