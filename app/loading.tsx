export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0f0518] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/60">Loading your birthday adventure...</p>
      </div>
    </div>
  );
}