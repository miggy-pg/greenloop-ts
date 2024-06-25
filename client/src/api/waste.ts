import http from "../services/httpService";
import { WasteProps } from "../types/waste.type";

type IsAvailable = {
  available: boolean;
};

export const getWastes = async () => await http.get<WasteProps>(`/wastes`);

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
