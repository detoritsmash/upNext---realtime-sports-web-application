import MatchCard from "./MatchCard";
import liveMatches from "../../mock/liveMatches.json";

const LiveMatchesSection = () => {
  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold text-white">
        🔴 Live Matches
      </h2>

      {liveMatches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </section>
  );
};

export default LiveMatchesSection;