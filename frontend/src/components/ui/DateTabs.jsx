import { useState } from "react";

const tabs = ["Yesterday", "Today", "Upcoming"];

const DateTabs = () => {
  const [selected, setSelected] = useState("Today");

  return (
    <div className="flex justify-around border-b border-neutral-800 py-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setSelected(tab)}
          className={`pb-2 ${
            selected === tab
              ? "border-b-2 border-lime-500 text-lime-400"
              : "text-gray-400"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default DateTabs;