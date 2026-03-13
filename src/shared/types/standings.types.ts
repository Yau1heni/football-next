import { COMPETITION_CODE } from '@constants/competitions';

export type CompetitionCodeType = (typeof COMPETITION_CODE)[keyof typeof COMPETITION_CODE];

export type Team = {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string; // эмблема
};

export type TableEntry = {
  position: number;
  team: Team;
  playedGames: number;
  form: string;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
};

export type Standing = {
  stage: string;
  type: string;
  group: string | null;
  table: TableEntry[];
};

type Season = {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: string | null;
  stages: string[];
};

export type Competition = {
  id: number;
  name: string;
  code: CompetitionCodeType;
  type: string;
  emblem: string;
};

export type Area = {
  id: number;
  name: string;
  code: string;
  flag: string;
};

type Filters = {
  season: string;
};

export type StandingsData = {
  filters: Filters;
  area: Area;
  competition: Competition;
  season: Season;
  standings: Standing[];
};

export type OptionsCreateUrl = {
  code?: CompetitionCodeType;
  season?: number;
};
