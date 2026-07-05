"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500">
          Something went wrong!
        </h1>

        <p className="mt-4 text-gray-400">
          {error.message}
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}