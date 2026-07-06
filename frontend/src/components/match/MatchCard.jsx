import TeamLogo from "./TeamLogo";
import ScoreBoard from "./ScoreBoard";
import StatusBadge from "./StatusBadge";

const MatchCard = ({ match }) => {
  return (
    <div className="rounded-2xl bg-neutral-800 p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{match.league.name}</h3>
          <p className="text-sm text-gray-400">{match.sport}</p>
        </div>

        <StatusBadge status={match.status.short} />
      </div>

      <div className="flex items-center justify-between">
        <TeamLogo team={match.teams.home} />

        <ScoreBoard
          homeScore={match.score.home}
          awayScore={match.score.away}
        />

        <TeamLogo team={match.teams.away} />
      </div>
    </div>
  );
};

export default MatchCard;