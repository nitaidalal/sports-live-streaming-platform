function TeamVsTeamDisplay({ match }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {match.homeTeamIMG && (
          <img
            src={match.homeTeamIMG}
            alt={match.homeTeam}
            className="w-6 h-6"
          />
        )}
        <span className="font-medium">{match.homeTeam}</span>
      </div>
      <span className="text-gray-400">vs</span>
      <div className="flex items-center gap-2">
        <span className="font-medium">{match.awayTeam}</span>
        {match.awayTeamIMG && (
          <img
            src={match.awayTeamIMG}
            alt={match.awayTeam}
            className="w-6 h-6"
          />
        )}
      </div>
    </div>
  );
}

export default TeamVsTeamDisplay;
