import { useParams } from "react-router-dom";

const MatchDetails = () => {
  const { matchId } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">⚽ Match Details</h1>
      <p className="mt-2 text-gray-500">Match ID: {matchId}</p>
    </div>
  );
};

export default MatchDetails;