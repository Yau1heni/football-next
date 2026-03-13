import { standingsApi } from '@api/standings-api';
import { QUERY_PARAMS } from '@constants/query-params';
import type { CompetitionCodeType, OptionsCreateUrl } from '@shared-types/standings.types';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const code = searchParams.get(QUERY_PARAMS.STANDINGS_COMPETITION) as CompetitionCodeType | null;
  const seasonRaw = searchParams.get(QUERY_PARAMS.STANDINGS_SEASON);

  const options: OptionsCreateUrl = {};

  if (code) {
    options.code = code;
  }

  if (seasonRaw) {
    const season = Number(seasonRaw);
    if (!Number.isNaN(season)) {
      options.season = season;
    }
  }

  try {
    const data = await standingsApi.getByCompetition(options);
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Не удалось загрузить турнирную таблицу';
    return NextResponse.json({ message }, { status: 500 });
  }
};
