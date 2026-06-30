import { ApiError } from '../utils/ApiError.js';

const ALLOWED_SORT_FIELDS = ['start', 'createdAt', 'tournament'];
const ALLOWED_ORDER = ['asc', 'desc'];
const ALLOWED_STATUS = [
  'upcoming',
  'live',
  'finished',
  'postponed',
  'cancelled',
];

export function validateMatchQuery(req, res, next) {
  const { sort, order, status, page, limit } = req.query;

  if (sort && !ALLOWED_SORT_FIELDS.includes(sort)) {
    return next(
      new ApiError(
        400,
        `Invalid sort field. Allowed: ${ALLOWED_SORT_FIELDS.join(', ')}`
      )
    );
  }

  if (order && !ALLOWED_ORDER.includes(order)) {
    return next(
      new ApiError(400, `Invalid order. Allowed: ${ALLOWED_ORDER.join(', ')}`)
    );
  }

  if (status && !ALLOWED_STATUS.includes(status)) {
    return next(
      new ApiError(400, `Invalid status. Allowed: ${ALLOWED_STATUS.join(', ')}`)
    );
  }

  if (page && (isNaN(page) || Number(page) < 1)) {
    return next(new ApiError(400, 'page must be a positive integer'));
  }

  if (limit && (isNaN(limit) || Number(limit) < 1)) {
    return next(new ApiError(400, 'limit must be a positive integer'));
  }

  next();
}

export function validateSearchQuery(req, res, next) {
  const { q } = req.query;
  if (!q || q.trim().length < 2) {
    return next(
      new ApiError(400, 'Search query "q" must be at least 2 characters')
    );
  }
  next();
}
