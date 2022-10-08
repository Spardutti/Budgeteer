declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_URL: string;
            DB_PORT: number;
            PORT: number;
        }
    }
}

export {};
