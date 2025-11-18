import { useState } from "react";
import LoginPage from "./components/LoginPage";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";

type UserRole = "patient" | "doctor" | null;

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState("");

  const handleLogin = (role: UserRole, name: string) => {
    setUserRole(role);
    setUserName(name);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserName("");
  };

  if (!userRole) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      {userRole === "patient" && (
        <PatientDashboard userName={userName} onLogout={handleLogout} />
      )}
      {userRole === "doctor" && (
        <DoctorDashboard userName={userName} onLogout={handleLogout} />
      )}
    </>
  );
}
