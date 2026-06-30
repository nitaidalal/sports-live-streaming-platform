import { matchRepository } from '../repositories/matchRepository.js';
import { ApiError } from '../utils/ApiError.js';

const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 20;

function normalizePagination({ page, limit } = {}) {
  const parsedLimit = Math.min(Number(limit, 10) || DEFAULT_LIMIT, MAX_LIMIT);
  const parsedPage = Math.max(Number(page, 10) || 1, 1);
  const skip = (parsedPage - 1) * parsedLimit;

  return { limit: parsedLimit, skip, page: parsedPage };
}

function buildPaginationMeta({ total, page, limit }) {
  const pages = Math.max(Math.ceil(total / limit), 1);
  return {
    page,
    limit,
    total,
    pages,
    hasNext: page < pages,
    hasPrev: page > 1,
  };
}

export const matchService = {
  async getMatches({
    sport,
    status,
    tournament,
    sort,
    order,
    page,
    limit,
  } = {}) {
    const {
      limit: safeLimit,
      skip,
      page: safePage,
    } = normalizePagination({
      page,
      limit,
    });

    const [matches, total] = await Promise.all([
      matchRepository.findMany({
        sport,
        status,
        tournament,
        sort,
        order,
        limit: safeLimit,
        skip,
      }),
      matchRepository.countMany({ sport, status, tournament }),
    ]);

    return {
      matches,
      pagination: buildPaginationMeta({
        total,
        page: safePage,
        limit: safeLimit,
      }),
    };
  },

  async getMatchById(id) {
    const match = await matchRepository.findById(id);
    if (!match) throw new ApiError(404, `Match with id ${id} not found`);
    return match;
  },

  async getRelatedMatches(matchId, { limit = 6 } = {}) {
    const match = await matchRepository.findById(matchId);
    if (!match) throw new ApiError(404, `Match with id ${matchId} not found`);

    const { matches } = await matchService.getMatches({
      sport: match.sport,
      limit,
    });

    return matches.filter((m) => m.id !== match.id);
  },

  async searchMatches(query, { limit = 20 } = {}) {
    return matchRepository.search(query.trim(), { limit });
  },

  async upsertMatch(normalizedMatch) {
    return matchRepository.upsert(normalizedMatch);
  },
};
