import api from "@/lib/axios";
import { GenerateDMInput } from "./schema";

export const generateDM = async (data: GenerateDMInput) => {
  const response = await api.post("/api/dm/generate", data);
  return response.data;
};

export const getDMHistory = async () => {
  const response = await api.get("/api/dm/history");
  return response.data;
};
