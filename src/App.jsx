import { Route, Routes, useSearchParams } from "react-router-dom";

import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import { SearchParamsContext } from "./context/SearchParams";
import PageNotFound from "./pages/404";

export default function App() {
  const [params, setParams] = useSearchParams({ page: 1, limit: 3 });
  return (
    <SearchParamsContext.Provider value={[params, setParams]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<EventDetail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </SearchParamsContext.Provider>
  );
}
