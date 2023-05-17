namespace NodeJS {
  interface ProcessEnv {
    readonly GOOGLE_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly MONGODB_URL: string;
    readonly NEXTAUTH_URL: string;
    readonly NEXTAUTH_URL_INTERNAL: string;
    readonly NEXTAUTH_SECRET: string;
  }
}
