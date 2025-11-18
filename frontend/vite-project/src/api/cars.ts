import { fetchAPI } from "./api";
import type { NursingCar, EmergencyRequest } from "../types/models";

export async function getCars(): Promise<NursingCar[]> {
  return fetchAPI("/cars");
}

export async function getEmergencies(): Promise<EmergencyRequest[]> {
  return fetchAPI("/emergencies");
}

export async function updateCarStatus(id: string, status: string) {
  return fetchAPI(`/cars/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
