const TeamLogo = ({ team }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-gray-700"></div>
      <p className="mt-2 text-sm">{team.name}</p>
    </div>
  );
};

export default TeamLogo;