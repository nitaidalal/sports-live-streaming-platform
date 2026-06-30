import Match from '../models/Match.js';

function toDomain(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc; 
  return {
    id: obj._id.toString(),
    providerId: obj.providerId,
    provider: obj.provider,
    sport: obj.sport,
    title: obj.title,
    event: obj.event,
    homeTeam: obj.homeTeam,
    awayTeam: obj.awayTeam,
    homeTeamIMG: obj.homeTeamIMG,
    awayTeamIMG: obj.awayTeamIMG,
    tournament: obj.tournament,
    country: obj.country, 
    countryIMG: obj.countryIMG,
    status: obj.status,
    start: obj.start,
    end: obj.end,
  };
}

function buildFilterQuery({ sport, status, tournament }) {
    const query = {};
    if (sport) query.sport = sport.toLowerCase();
    if (status) query.status = status;
    if (tournament) query.tournament = tournament;
    return query;
  }
  
function buildSortQuery(sort = 'start', order = 'asc') {
    return { [sort]: order === 'desc' ? -1 : 1 };
  }

export const matchRepository = {
  async upsert(matchData) {
    const doc = await Match.findOneAndUpdate(
      { provider: matchData.provider, providerId: matchData.providerId },
      matchData,
      { upsert: true, new: true, runValidators: true }
    );
    return toDomain(doc);
  },

  async findById(id) {
    const doc = await Match.findById(id);
    return toDomain(doc);
  },

  //   async findBySport(sport, { status, limit = 50, skip = 0 } = {}) {
  //     const query = { sport: sport.toLowerCase() };
  //     if (status) query.status = status;

  //     const docs = await Match.find(query)
  //       .sort({ start: 1 })
  //       .skip(skip)
  //       .limit(limit);

  //     return docs.map(toDomain);
  //   },

  //   async findAll({ status, limit = 50, skip = 0 } = {}) {
  //     const query = {};
  //     if (status) query.status = status;

  //     const docs = await Match.find(query)
  //       .sort({ start: 1 })
  //       .skip(skip)
  //       .limit(limit);

  //     return docs.map(toDomain);
  //   },

  async search(text, { limit = 20 } = {}) {
    const docs = await Match.find(
      { $text: { $search: text } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(limit);

    return docs.map(toDomain);
  },

  async deleteOlderThan(date) {
    return Match.deleteMany({ end: { $lt: date } });
  },

  async findMany({
    sport,
    status,
    tournament,
    sort,
    order,
    limit = 20,
    skip = 0,
  } = {}) {
    const query = buildFilterQuery({ sport, status, tournament });
    const sortQuery = buildSortQuery(sort, order);

    const docs = await Match.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    return docs.map(toDomain);
  },

  async countMany({ sport, status, tournament } = {}) {
    const query = buildFilterQuery({ sport, status, tournament });
    return Match.countDocuments(query);
  },
};
