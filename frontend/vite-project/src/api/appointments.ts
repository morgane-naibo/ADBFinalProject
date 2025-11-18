import { fetchAPI } from "./api";
import type { Appointment } from "../types/models";

export async function getAppointments(): Promise<Appointment[]> {
  return fetchAPI("/appointments");
}

export async function createAppointment(data: Appointment): Promise<Appointment> {
  return fetchAPI("/appointments", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteAppointment(id: string): Promise<void> {
  return fetchAPI(`/appointments/${id}`, { method: "DELETE" });
}
