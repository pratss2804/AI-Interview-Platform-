import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

export default async function HistoryPage() {
  const interviews = await prisma.interview.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-10 text-white">
      <h1 className="text-4xl font-bold mb-8">
        📜 Interview History
      </h1>

      {interviews.length === 0 ? (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 text-center">
          <p className="text-gray-400">
            No interview history found.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {interviews.map((interview) => {
            const score = interview.totalScore ?? 0;

            const status =
              score >= 70
                ? "✅ Hire"
                : score >= 50
                ? "⚠ Hold"
                : "❌ Reject";

            return (
              <div
                key={interview.id}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">
                      Score: {score}/100
                    </h2>

                    <p className="text-gray-400 mt-2">
                      {interview.createdAt.toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold">
                      {status}
                    </p>

                    <Link
                      href="/report"
                      className="text-blue-400 hover:underline mt-2 inline-block"
                    >
                      View Report →
                    </Link>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-gray-300">
                    {interview.finalFeedback || "No feedback available."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}