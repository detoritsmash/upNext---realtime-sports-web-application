const StatusBadge = ({ status }) => {
  return (
    <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
      {status}
    </span>
  );
};

export default StatusBadge;