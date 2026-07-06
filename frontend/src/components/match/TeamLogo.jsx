const TeamLogo = ({ team }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={team.logo}
        alt={team.name}
        className="h-12 w-12 rounded-full object-contain"
      />
      <p className="text-center text-sm font-medium">{team.name}</p>
    </div>
  );
};

export default TeamLogo;