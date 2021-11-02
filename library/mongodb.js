import { MongoClient } from 'mongodb';

// Instantiate the URI and the DB_NAME
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// Check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error('Define the MONGODB_URI environmental variable');
}

// Check the MONGODB DB
if (!MONGODB_DB) {
  throw new Error('Define the MONGODB_DB environmental variable');
}

// Create a cached for client and Database
let cachedClient = null;
let cachedDb = null;

// Connecting to DATABASE ASYNC function
export async function connectToDatabase() {
  // Check the cached
  if (cachedClient && cachedDb) {
    // Load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }
  // Set the connection options
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI, options);
  await client.connect();
  let db = client.db(MONGODB_DB);

  console.log(db);

  // Set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
