import { useState } from "react";

const sports = ["Football", "Basketball"];

const SportsTabs = () => {
  const [selectedSport, setSelectedSport] = useState("Football");

  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-3">
      {sports.map((sport) => (
        <button
          key={sport}
          onClick={() => setSelectedSport(sport)}
          className={`rounded-full px-4 py-2 transition ${
            selectedSport === sport
              ? "bg-lime-500 text-black"
              : "bg-neutral-800 text-white"
          }`}
        >
          {sport}
        </button>
      ))}
    </div>
  );
};

export default SportsTabs;