const leagues = [
  "Premier League",
  "NBA",
  "La Liga",
  "EuroLeague"
];

const LeagueCarousel = () => {
  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-2">
      {leagues.map((league) => (
        <button
          key={league}
          className="whitespace-nowrap rounded-full bg-neutral-800 px-4 py-2"
        >
          {league}
        </button>
      ))}
    </div>
  );
};

export default LeagueCarousel;