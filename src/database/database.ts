import { drizzle } from "drizzle-orm/neon-http";

import env from "../config/env.js";

const database_url = env.DATABASE_URL;
const db = drizzle(database_url);

export default db;
