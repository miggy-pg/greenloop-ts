import http from "../core/services/httpService";
import { WasteCardProps, WasteProps } from "../types/waste.type";

type IsAvailable = {
  available: boolean;
};

export const getWastes = async () => {
  const response = await http.get<WasteCardProps[]>(`/wastes`);
  return response.data;
};

export const createWaste = async (waste: WasteProps) =>
  await http.post("/wastes", waste);

export const updateWaste = async (wasteId: string, waste: WasteProps) =>
  await http.put(`/wastes/${wasteId}`, waste);

export const updateWasteAvailability = async (
  wasteId: string,
  isAvailable: IsAvailable
) => await http.put(`/wastes/${wasteId}/availability`, isAvailable);

export const deleteWaste = async (wasteId: string) =>
  await http.delete(`/wastes/${wasteId}`);
