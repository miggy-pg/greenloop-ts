const checkEnvRoute = (
  productionRoute: string,
  developmentRoute: string
): string => {
  return import.meta.env.VITE_ENV === "production"
    ? productionRoute
    : developmentRoute;
};

const VITE_PROD_ROUTE = import.meta.env.VITE_PROD_BASE_URL;
const VITE_BASE_ROUTE = import.meta.env.VITE_DEV_BASE_URL;

export const envRoute = checkEnvRoute(VITE_PROD_ROUTE, VITE_BASE_ROUTE);
