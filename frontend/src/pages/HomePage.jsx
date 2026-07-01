import { useMatches } from "../hooks/useMatches.js";
import EventCard from "../components/events/EventCard.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";

function HomePage() {
  const {
    data: liveData,
    isLoading: liveLoading,
    isError: liveError,
  } = useMatches({
    status: "live",
    sort: "start",
    order: "asc",
    limit: 6,
  });

  const { data: upcomingData, isLoading: upcomingLoading } = useMatches({
    status: "upcoming",
    sort: "start",
    order: "asc",
    limit: 6,
  });

  return (
    <main className="px-4 py-6 space-y-10 ">
      <section>
        <h2 className="text-xl font-semibold mb-4">🔴 Live Now</h2>
        {liveLoading && <SkeletonRow />}
        {liveError && (
          <p className="text-red-500">Couldn't load live matches.</p>
        )}
        {liveData && liveData.data.length === 0 && (
          <p className="text-gray-500">No live matches right now.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveData?.data.map((match) => (
            <EventCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">⏰ Upcoming</h2>
        {upcomingLoading && <SkeletonRow />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingData?.data.map((match) => (
            <EventCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </main>
  );
}

function SkeletonRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-32 rounded-lg" />
      ))}
    </div>
  );
}

export default HomePage;
