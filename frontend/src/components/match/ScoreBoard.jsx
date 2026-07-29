const ScoreBoard = ({ homeScore, awayScore }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">
        {homeScore} - {awayScore}
      </h2>
    </div>
  );
};

export default ScoreBoard;