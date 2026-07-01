import { useParams } from "react-router-dom";
import { useMatch, useRelatedMatches } from "../hooks/useMatches.js";
import EventCard from "../components/events/EventCard.jsx";
import TeamVsTeamDisplay from "../components/events/TeamVsTeamDisplay.jsx";
import SingleEventDisplay from "../components/events/SingleEventDisplay.jsx";
import StatusBadge from "../components/events/StatusBadge.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";

function EventDetailPage() {
  const { id } = useParams();
  const { data: match, isLoading, isError } = useMatch(id);
  const { data: related } = useRelatedMatches(id, { limit: 4 });

  if (isLoading) {
    return (
      <main className="px-4 py-6">
        <Skeleton className="h-40 rounded-lg" />
      </main>
    );
  }

  if (isError || !match) {
    return (
      <main className="px-4 py-6">
        <p className="text-red-500">Match not found.</p>
      </main>
    );
  }

  const isTeamMatch = Boolean(match.homeTeam && match.awayTeam);

  return (
    <main className="px-4 py-6 space-y-8">
      <section className="border rounded-lg p-6 dark:border-gray-700">
        {isTeamMatch ? (
          <TeamVsTeamDisplay match={match} />
        ) : (
          <SingleEventDisplay match={match} />
        )}

        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <div className="space-y-1">
            <p>{match.tournament}</p>
            {match.country && <p>{match.country}</p>}
            <p>{new Date(match.start).toLocaleString()}</p>
          </div>
          <StatusBadge status={match.status} />
        </div>
      </section>

      {related && related.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Related Matches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((m) => (
              <EventCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default EventDetailPage;
