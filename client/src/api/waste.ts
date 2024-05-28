import http from "../services/httpService";

type Waste = {
  description: string;
  category: string;
  image: string;
  user: string;
};

export const getWastes = async () => http.get(`/wastes`);

export const createWaste = async (waste: Waste) => http.post("/wastes", waste);

export const updateWaste = async (wasteId: string, waste: Waste) =>
  http.put(`/wastes/${wasteId}`, waste);

export const updateWasteAvailability = async (wasteId: string, waste: Waste) =>
  http.put(`/wastes/${wasteId}/availability`, waste);

export const deleteWaste = async (wasteId: string) =>
  http.delete(`/wastes/${wasteId}`);
