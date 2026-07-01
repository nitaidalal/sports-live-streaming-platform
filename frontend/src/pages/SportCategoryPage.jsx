import { useParams, useSearchParams } from "react-router-dom";
import { useMatches } from "../hooks/useMatches.js";
import EventCard from "../components/events/EventCard.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";

const STATUS_OPTIONS = ["all", "live", "upcoming", "finished"];

function SportCategoryPage() {
  const { sport } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status") || "all";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isError, error } = useMatches({
    sport,
    status: status === "all" ? undefined : status,
    sort: "start",
    order: "asc",
    page,
    limit: 12,
  });

  function handleStatusChange(newStatus) {
    setSearchParams({ status: newStatus, page: "1" });
  }

  function handlePageChange(newPage) {
    setSearchParams({ status, page: String(newPage) });
  }

  return (
    <main className="px-4 py-6">
      <h1 className="text-2xl font-bold capitalize mb-4">{sport}</h1>

      <div className="flex gap-2 mb-6">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => handleStatusChange(opt)}
            className={`px-3 py-1 rounded-full text-sm capitalize border ${
              status === opt
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {isLoading && <SkeletonGrid />}

      {isError && (
        <p className="text-red-500">
          Couldn't load matches: {error?.message || "Unknown error"}
        </p>
      )}

      {data && data.data.length === 0 && (
        <p className="text-gray-500">No matches found for this filter.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.map((match) => (
          <EventCard key={match.id} match={match} />
        ))}
      </div>

      {data?.meta?.pagination && (
        <Pagination
          pagination={data.meta.pagination}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-32 rounded-lg" />
      ))}
    </div>
  );
}

function Pagination({ pagination, onPageChange }) {
  const { page, pages, hasNext, hasPrev } = pagination;

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        disabled={!hasPrev}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 rounded border disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-sm text-gray-600">
        Page {page} of {pages}
      </span>
      <button
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 rounded border disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

export default SportCategoryPage;
