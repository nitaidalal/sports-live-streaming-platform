import mongoose from 'mongoose';

import { env } from '../src/config/env.js';
import Match from '../src/models/Match.js';

const sampleMatches = [
  {
    providerId: 'seed-001',
    provider: 'seed',
    sport: 'basketball',
    title: 'Cleveland Cavaliers vs Indiana Pacers',
    event: null,
    homeTeam: 'Cleveland Cavaliers',
    awayTeam: 'Indiana Pacers',
    homeTeamIMG: null,
    awayTeamIMG: null,
    tournament: 'NBA',
    country: 'United States',
    countryIMG: null,
    status: 'live',
    start: new Date(Date.now() - 30 * 60 * 1000), // started 30 min ago
    end: new Date(Date.now() + 90 * 60 * 1000),
  },
  {
    providerId: 'seed-002',
    provider: 'seed',
    sport: 'basketball',
    title: 'Los Angeles Lakers vs Boston Celtics',
    event: null,
    homeTeam: 'Los Angeles Lakers',
    awayTeam: 'Boston Celtics',
    homeTeamIMG: null,
    awayTeamIMG: null,
    tournament: 'NBA',
    country: 'United States',
    countryIMG: null,
    status: 'upcoming',
    start: new Date(Date.now() + 3 * 60 * 60 * 1000), // in 3 hours
    end: new Date(Date.now() + 5 * 60 * 60 * 1000),
  },
  {
    providerId: 'seed-003',
    provider: 'seed',
    sport: 'cricket',
    title: 'India vs Australia',
    event: null,
    homeTeam: 'India',
    awayTeam: 'Australia',
    homeTeamIMG: null,
    awayTeamIMG: null,
    tournament: 'ICC World Cup',
    country: 'India',
    countryIMG: null,
    status: 'live',
    start: new Date(Date.now() - 60 * 60 * 1000),
    end: new Date(Date.now() + 4 * 60 * 60 * 1000),
  },
  {
    providerId: 'seed-004',
    provider: 'seed',
    sport: 'tennis',
    title: 'ATP Indian Wells Final',
    event: 'ATP Indian Wells Final',
    homeTeam: null,
    awayTeam: null,
    homeTeamIMG: null,
    awayTeamIMG: null,
    tournament: 'ATP 1000',
    country: 'United States',
    countryIMG: null,
    status: 'upcoming',
    start: new Date(Date.now() + 24 * 60 * 60 * 1000),
    end: new Date(Date.now() + 27 * 60 * 60 * 1000),
  },
  {
    providerId: 'seed-005',
    provider: 'seed',
    sport: 'football',
    title: 'Manchester United vs Liverpool',
    event: null,
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    homeTeamIMG: null,
    awayTeamIMG: null,
    tournament: 'Premier League',
    country: 'England',
    countryIMG: null,
    status: 'finished',
    start: new Date(Date.now() - 5 * 60 * 60 * 1000),
    end: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
];

async function seed() {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('Connected to MongoDB for seeding');

    await Match.deleteMany({ provider: 'seed' });
    console.log('Cleared previous seed data');

    const inserted = await Match.insertMany(sampleMatches);
    console.log(`Inserted ${inserted.length} matches`);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
