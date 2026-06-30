import mongoose from 'mongoose';

const { Schema } = mongoose;

const MatchSchema = new Schema(
  {
    providerId: {
      type: String, 
      required: true,
    },
    provider: {
      type: String,
      required: true,
      index: true,
    },
    sport: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    event: {
      type: String,
      default: null,
    },
    homeTeam: {
      type: String,
      default: null,
    },
    awayTeam: {
      type: String,
      default: null,
    },
    homeTeamIMG: {
      type: String,
      default: null,
    },
    awayTeamIMG: {
      type: String,
      default: null,
    },
    tournament: {
      type: String,
      default: '',
      trim: true,
      index: true,
    },
    country: {
      type: String,
      default: null,
    },
    countryIMG: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['upcoming', 'live', 'finished', 'postponed', 'cancelled'],
      required: true,
      index: true,
    },
    start: {
      type: Date,
      required: true,
      index: true,
    },
    end: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt / updatedAt automatically
  }
);

// Prevents duplicate matches from the same provider being inserted twice.
// This is also the upsert key the sync service will use later.
MatchSchema.index({ provider: 1, providerId: 1 }, { unique: true });

// Supports the most common query: "all live/upcoming matches for a sport, soonest first"
MatchSchema.index({ sport: 1, status: 1, start: 1 });

// Supports text search across title/tournament for the search feature
MatchSchema.index({ title: 'text', tournament: 'text' });

const Match = mongoose.model('Match', MatchSchema);

export default Match;
