declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DB_MONGO_QUERY: string,
        DB_PG_HOST: string,
        DB_PG_PORT: string,
        DB_PG_USER: string,
        DB_PG_PASS: string,
        DB_NAME: string,
        DB_PROJECT: string,
      }
    }
}
export {}