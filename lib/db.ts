// lib/db.ts
import mysql from "mysql2/promise";

type PoolType = mysql.Pool;

declare global {
  // allow global pooling across hot-reload / serverless invocations
  // eslint-disable-next-line no-var
  var __global_mysql_pool__: PoolType | undefined;
}

function getEnv(...names: string[]) {
  for (const n of names) {
    const v = process.env[n];
    if (v && v.length) return v;
  }
  return undefined;
}

function parseDatabaseUrl(url?: string) {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    return {
      host: u.hostname,
      port: u.port ? Number(u.port) : undefined,
      user: u.username,
      password: u.password,
      database: u.pathname.replace(/^\//, ""),
    };
  } catch {
    return undefined;
  }
}

export function getDB(): PoolType {
  if (global.__global_mysql_pool__) return global.__global_mysql_pool__;

  const parsed = parseDatabaseUrl(getEnv("DATABASE_URL", "MYSQL_URL", "MYSQL_PUBLIC_URL"));

  const host = parsed?.host ?? getEnv("DB_HOST");
  const port = parsed?.port ?? Number(getEnv("DB_PORT") || 3306);
  const user = parsed?.user ?? getEnv("DB_USER");
  const password = parsed?.password ?? getEnv("DB_PASSWORD", "DB_PASS");
  const database = parsed?.database ?? getEnv("DB_NAME");

  if (!host || !user || !password || !database) {
    throw new Error(
      `Missing DB env vars. Required: host,user,password,database. Found host=${!!host}, user=${!!user}, password=${!!password}, database=${!!database}`
    );
  }

  const pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000, // 10s
    ssl: { rejectUnauthorized: false }, // required for some managed DB proxies
  });

  global.__global_mysql_pool__ = pool;
  return pool;
}
