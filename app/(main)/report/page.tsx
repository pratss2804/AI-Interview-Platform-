import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

export default async function ReportPage() {
  const interview = await prisma.interview.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!interview) {
    return (
      <div className="max-w-5xl mx-auto p-10 text-white">
        <h1 className="text-4xl font-bold mb-8">
          📊 AI Interview Report
        </h1>

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-10 text-center">

          <p className="text-gray-400 text-lg">
            No interview report available.
          </p>

          <Link
            href="/interview"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            Start Interview
          </Link>

        </div>
      </div>
    );
  }

  const score = interview.totalScore ?? 0;

  const status =
    score >= 70
      ? "✅ Recommended"
      : score >= 50
      ? "⚠️ Maybe"
      : "❌ Not Recommended";

  const scoreColor =
    score >= 70
      ? "text-green-400"
      : score >= 50
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="max-w-6xl mx-auto p-10 text-white">

      <h1 className="text-4xl font-bold mb-8">
        📊 AI Interview Report
      </h1>

      <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-8 space-y-8">

        <div>

          <p className="text-gray-400">
            Overall Score
          </p>

          <h2 className={`text-6xl font-bold mt-2 ${scoreColor}`}>
            {score}/100
          </h2>

        </div>

        <div>

          <p className="text-gray-400">
            Hiring Recommendation
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {status}
          </h2>

        </div>

        <div>

          <p className="text-gray-400 mb-3">
            AI Feedback
          </p>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">

            <p className="whitespace-pre-line leading-8 text-gray-200">
              {interview.finalFeedback || "No feedback available."}
            </p>

          </div>

        </div>

        <div className="flex flex-wrap gap-4 pt-4">

          <Link
            href="/interview"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            🎤 New Interview
          </Link>

          <Link
            href="/dashboard"
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/history"
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
          >
            📜 History
          </Link>

        </div>

      </div>

    </div>
  );
}