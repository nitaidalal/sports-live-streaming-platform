import { Link } from "react-router-dom";
import TeamVsTeamDisplay from "./TeamVsTeamDisplay.jsx";
import SingleEventDisplay from "./SingleEventDisplay.jsx";
import StatusBadge from "./StatusBadge.jsx";

function EventCard({ match }) {
  const isTeamMatch = Boolean(match.homeTeam && match.awayTeam);

  return (
    <Link
      to={`/matches/${match.id}`}
      className="block rounded-lg bg-white  border border-gray-200  p-4 hover:shadow-md transition-shadow"
    >
      {isTeamMatch ? (
        <TeamVsTeamDisplay match={match} />
      ) : (
        <SingleEventDisplay match={match} />
      )}
      <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
        <span>{match.tournament}</span>
        <StatusBadge status={match.status} />
      </div>
    </Link>
  );
}

export default EventCard;
