export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full min-h-[500px]">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <span className="text-gray-500 font-medium animate-pulse">Memuat data log audit...</span>
      </div>
    </div>
  );
}
