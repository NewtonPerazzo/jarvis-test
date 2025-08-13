import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeDetail } from "../organisms/HomeDetail";
import { HistoryDetail } from "../organisms/HistoryDetail";
import { RoomDetail } from "../organisms/RoomsDetail";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../utils/auth";
import { Login } from "../organisms/Login";

export function AppRoutes() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeDetail />} />
        <Route path="/history" element={<HistoryDetail />} />
        <Route path="/rooms" element={<RoomDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
