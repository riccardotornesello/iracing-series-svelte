import { env } from '$env/dynamic/private';
import { MongoClient } from 'mongodb';

export const client = env.MONGO_URL ? new MongoClient(env.MONGO_URL) : null;
