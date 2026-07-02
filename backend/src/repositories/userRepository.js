import User from '../models/User.js';

export function toSafeUser(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    id: obj._id.toString(),
    fullName: obj.fullName,
    email: obj.email,
    avatar: obj.avatar,
    favoriteTeams: obj.favoriteTeams,
    watchHistory: obj.watchHistory,
    createdAt: obj.createdAt,
  };
}

export const userRepository = {
  async findByEmail(email) {
    return User.findOne({ email: email.toLowerCase() }).select('+password');
  },

  async findById(id) {
    return User.findById(id);
  },

  async findByIdSafe(id) {
    const doc = await User.findById(id);
    return toSafeUser(doc);
  },

  async existsByEmail(email) {
    return User.exists({ email: email.toLowerCase() });
  },

  async create(userData) {
    const doc = await User.create(userData);
    return toSafeUser(doc);
  },

  async addToFavoriteTeams(userId, teamName) {
    const doc = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favoriteTeams: teamName } },
      { new: true }
    );
    return toSafeUser(doc);
  },

  async removeFromFavoriteTeams(userId, teamName) {
    const doc = await User.findByIdAndUpdate(
      userId,
      { $pull: { favoriteTeams: teamName } },
      { new: true }
    );
    return toSafeUser(doc);
  },

  async addToWatchHistory(userId, matchId) {
    const doc = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          watchHistory: {
            $each: [{ matchId }],
            $slice: -50, // keep only last 50 entries, oldest fall off
          },
        },
      },
      { new: true }
    );
    return toSafeUser(doc);
  },
};
