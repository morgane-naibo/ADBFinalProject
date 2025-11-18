import { fetchAPI } from "./api";
import type { Doctor } from "../types/models";

export async function getDoctors(): Promise<Doctor[]> {
  return fetchAPI("/doctors");
}

export async function getDoctorById(id: string): Promise<Doctor> {
  return fetchAPI(`/doctors/${id}`);
}

export async function updateDoctor(id: string, data: Partial<Doctor>): Promise<Doctor> {
  return fetchAPI(`/doctors/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
