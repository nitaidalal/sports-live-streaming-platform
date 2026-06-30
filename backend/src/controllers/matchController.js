import { matchService } from '../services/matchService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const matchController = {
  getMatches: asyncHandler(async (req, res) => {
    const { sport, status, tournament, sort, order, page, limit } = req.query;
    const { matches, pagination } = await matchService.getMatches({
      sport,
      status,
      tournament,
      sort,
      order,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      data: matches,
      meta: { pagination },
    });
  }),

  getById: asyncHandler(async (req, res) => {
    const match = await matchService.getMatchById(req.params.id);
    res.status(200).json({ success: true, data: match });
  }),

  getRelated: asyncHandler(async (req, res) => {
    const { limit } = req.query;
    const related = await matchService.getRelatedMatches(req.params.id, {
      limit,
    });
    res.status(200).json({ success: true, data: related });
  }),

  search: asyncHandler(async (req, res) => {
    const { q, limit } = req.query;
    const results = await matchService.searchMatches(q, { limit });
    res.status(200).json({ success: true, data: results });
  }),
};
