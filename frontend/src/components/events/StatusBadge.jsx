const STATUS_STYLES = {
  live: "bg-red-100 text-red-700",
  upcoming: "bg-blue-100 text-blue-700",
  finished: "bg-gray-100 text-gray-600",
  postponed: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-gray-100 text-gray-400 line-through",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status] || ""}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
