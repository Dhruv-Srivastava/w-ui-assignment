import { useContext } from "react";

import { SearchParamsContext } from "../context/SearchParams";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import InputContainer from "../components/InputContainer";
import EventContainer from "../components/EventContainer";
import Footer from "../components/Footer";

import Button from "../components/primitives/Button";

export default function Home() {
  const [params, setParams] = useContext(SearchParamsContext);
  const page = +params.get("page") || 1;
  const limit = +params.get("limit") || 3;
  const search = params.get("search") || "";
  const location = params.get("location") || "";
  const type = params.get("type") || "";

  function increasePage() {
    setParams((prev) => {
      prev.set("page", page + 1);
      return prev;
    });
  }

  function decreasePage() {
    setParams((prev) => {
      if (page === 1) return prev;
      prev.set("page", page - 1);
      return prev;
    });
  }

  return (
    <main className="bg-white w-full flex flex-col items-center gap-3">
      <Navbar />
      <Hero />
      <div className="hidden lg:block lg:container lg:px-5 lg:mt-5">
        <InputContainer style={{ border: "2px solid gray" }} />
      </div>
      <EventContainer options={{ page, limit, search, location, type }} />
      <div className="flex gap-5 my-5 lg:my-2">
        <Button
          variant="previous"
          style={{ cursor: page === 1 ? "not-allowed" : "pointer" }}
          onClick={decreasePage}
        >
          Previous
        </Button>
        <Button variant="next" onClick={increasePage}>
          Next
        </Button>
      </div>
      <Footer />
    </main>
  );
}
