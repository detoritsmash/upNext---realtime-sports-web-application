import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import MatchDetails from "../pages/MatchDetails/MatchDetails";
import Search from "../pages/Search/Search";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/match/:matchId" element={<MatchDetails />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;