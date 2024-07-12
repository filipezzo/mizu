import {} from "lucide-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Hero } from "../../view/pages/hero/hero";
import { Trip } from "../../view/pages/trip/trip";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/trip/:tripId" element={<Trip />} />
      </Routes>
    </BrowserRouter>
  );
}
