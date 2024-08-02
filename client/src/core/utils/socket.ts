const VITE_ENV = import.meta.env.VITE_ENV;
const VITE_PROD_BASE_URL = `${import.meta.env.VITE_PROD_BASE_URL}:8000`;

const socketPort =
  VITE_ENV === "production" ? VITE_PROD_BASE_URL : "http://localhost:8080";

export { socketPort };
