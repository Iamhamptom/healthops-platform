// Demo mode: use in-memory data instead of SQLite (for Vercel serverless)
export const isDemoMode = process.env.DEMO_MODE === "true" || process.env.VERCEL === "1";
