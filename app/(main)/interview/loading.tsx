export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <h2 className="mt-6 text-2xl font-bold text-white">
          Loading Interview...
        </h2>

        <p className="mt-2 text-gray-400">
          Please wait while we prepare your interview.
        </p>
      </div>
    </div>
  );
}