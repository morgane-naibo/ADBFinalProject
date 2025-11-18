import { fetchAPI } from "./api";
import type { Patient } from "../types/models";

// GET all patients
export async function getPatients(): Promise<Patient[]> {
  return fetchAPI("/patients");
}

// GET one patient
export async function getPatientById(id: string): Promise<Patient> {
  return fetchAPI(`/patients/${id}`);
}

// UPDATE patient data
export async function updatePatient(id: string, data: Partial<Patient>): Promise<Patient> {
  return fetchAPI(`/patients/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
