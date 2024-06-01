import http from "../services/httpService";
import { WasteProps } from "../types/waste.types";

export const getWastes = async () => await http.get(`/wastes`);

export const createWaste = async (waste: WasteProps) =>
  await http.post("/wastes", waste);

export const updateWaste = async (wasteId: string, waste: WasteProps) =>
  await http.put(`/wastes/${wasteId}`, waste);

export const updateWasteAvailability = async (
  wasteId: string,
  waste: WasteProps
) => await http.put(`/wastes/${wasteId}/availability`, waste);

export const deleteWaste = async (wasteId: string) =>
  await http.delete(`/wastes/${wasteId}`);
