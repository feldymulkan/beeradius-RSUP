export default function ReportsLoading() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="skeleton h-10 w-48"></div>
        <div className="skeleton h-10 w-32"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card bg-base-100 shadow-xl">
            <div className="card-body p-4 space-y-2">
              <div className="skeleton h-4 w-24"></div>
              <div className="skeleton h-8 w-32"></div>
              <div className="skeleton h-3 w-40"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="skeleton h-6 w-32 mb-4"></div>
              <div className="skeleton h-64 w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
