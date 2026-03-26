import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

// Resolve seed.sql relative to this file
const sqlPath = path.resolve(__dirname, 'seed.sql');
const sql = fs.readFileSync(sqlPath, 'utf-8');

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function seed() {
  let connected = false;

  // Retry until Postgres is ready
  while (!connected) {
    try {
      await client.connect();
      connected = true;
    } catch (err) {
      console.log('Waiting for Postgres...');
      await new Promise((res) => setTimeout(res, 1000));
    }
  }

  const res = await client.query('SELECT COUNT(*) FROM customers');

  if (res.rows[0].count === '0') {
    console.log('Seeding database...');
    await client.query(sql);
    console.log('Seed complete.');
  } else {
    console.log('Database already has data. Skipping seed.');
  }

  await client.end();
}

seed();