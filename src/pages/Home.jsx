import { useQuery } from "@tanstack/react-query";
import EventCard from "../components/EventCard";

async function getAllRetreats() {
  const res = await fetch(
    "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats/"
  );
  const data = await res.json();
  return data;
}

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["retreats"],
    queryFn: getAllRetreats,
  });

  console.log(data);

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>{error.message}</h1>;

  return (
    <main className="flex flex-col items-center gap-3">
      {data?.map((retreat) => (
        <EventCard key={retreat.id} item={retreat} />
      ))}
    </main>
  );
}
