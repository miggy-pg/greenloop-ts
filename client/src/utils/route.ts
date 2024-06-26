interface ViteEnvironment {
  VITE_ENV: string;
  VITE_PROD_BASE_URL: string;
  VITE_DEV_BASE_URL: string;
}

enum EnvType {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
}

const viteEnvironment: ViteEnvironment = {
  VITE_ENV: import.meta.env.VITE_ENV,
  VITE_PROD_BASE_URL: import.meta.env.VITE_PROD_BASE_URL,
  VITE_DEV_BASE_URL: import.meta.env.VITE_DEV_BASE_URL,
};

const getEnvRoute = (prodRoute: string | any, devRoute: string | any): string =>
  viteEnvironment.VITE_ENV === EnvType.PRODUCTION ? prodRoute : devRoute;

const envRoute = getEnvRoute(
  viteEnvironment.VITE_PROD_BASE_URL,
  viteEnvironment.VITE_DEV_BASE_URL
);

export { EnvType, viteEnvironment, envRoute };
