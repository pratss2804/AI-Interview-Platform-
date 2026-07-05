import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

import AnalyzeButton from "@/app/components/AnalyzeButton";
import GenerateQuestionsButton from "@/app/components/GenerateQuestionsButton";
import ScoreChart from "@/app/components/ScoreChart";
import AnimatedCounter from "@/app/components/AnimatedCounter";
import CircularProgress from "@/app/components/CircularProgress";

export default async function DashboardPage() {
  const resumes = await prisma.resume.findMany();

  const interviews = await prisma.interview.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalResumes = resumes.length;
  const totalInterviews = interviews.length;

  const latestInterview = interviews[0];

  const latestScore = latestInterview?.totalScore ?? 0;

  const highestScore =
    interviews.length > 0
      ? Math.max(...interviews.map((i) => i.totalScore ?? 0))
      : 0;

  const averageScore =
    interviews.length > 0
      ? Math.round(
          interviews.reduce(
            (sum, i) => sum + (i.totalScore ?? 0),
            0
          ) / interviews.length
        )
      : 0;

  const recommendation =
    latestScore >= 70
      ? "✅ Recommended"
      : latestScore >= 50
      ? "⚠️ Maybe"
      : "❌ Not Recommended";

  const status =
    latestScore >= 70
      ? "HIRE"
      : latestScore >= 50
      ? "HOLD"
      : "REJECT";

  const chartData = interviews
    .slice()
    .reverse()
    .map((interview, index) => ({
      name: `Interview ${index + 1}`,
      score: interview.totalScore ?? 0,
    }));

  return (
    <div className="min-h-screen bg-black text-white p-10">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center mb-10">

        <div>
          <h1 className="text-5xl font-bold">
            AI Interview Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Monitor candidate performance and interview analytics.
          </p>
        </div>

        <div className="mt-5 md:mt-0">
          <Link
            href="/upload"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
          >
            Upload Resume
          </Link>
        </div>

      </div>

      {/* Candidate Profile */}

      <div className="bg-gradient-to-r from-blue-900 via-gray-900 to-purple-900 rounded-2xl border border-gray-700 p-8 shadow-xl mb-10">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

          <div className="flex items-center gap-6 flex-1">

            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-5xl shadow-lg">
              👨‍💻
            </div>

            <div>

              <h2 className="text-3xl font-bold">
                Candidate Profile
              </h2>

              <p className="text-gray-400 mt-2">
                AI Resume Screening & Interview System
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">

                <div>

                  <p className="text-gray-400 text-sm">
                    Resume
                  </p>

                  <p className="text-xl font-bold text-green-400">
                    {totalResumes > 0 ? "Uploaded" : "Not Uploaded"}
                  </p>

                </div>

                <div>

                  <p className="text-gray-400 text-sm">
                    Interviews
                  </p>

                  <p className="text-xl font-bold">
                    <AnimatedCounter end={totalInterviews} />
                  </p>

                </div>

                <div>

                  <p className="text-gray-400 text-sm">
                    Latest Score
                  </p>

                  <p className="text-xl font-bold text-blue-400">
                    <AnimatedCounter end={latestScore} />%
                  </p>

                </div>

                <div>

                  <p className="text-gray-400 text-sm">
                    Status
                  </p>

                  <p
                    className={`text-xl font-bold ${
                      status === "HIRE"
                        ? "text-green-400"
                        : status === "HOLD"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {status}
                  </p>

                </div>

              </div>

            </div>

          </div>

          <CircularProgress score={latestScore} />

        </div>

      </div>

      {/* Candidate Skills */}

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-10">

        <h2 className="text-2xl font-bold mb-5">
          💻 Candidate Skills
        </h2>

        <div className="flex flex-wrap gap-3">

          {[
            "Java",
            "Spring Boot",
            "React",
            "Next.js",
            "Node.js",
            "Express",
            "REST API",
            "Prisma",
            "MongoDB",
            "MySQL",
            "Docker",
            "Git",
            "Tailwind CSS",
            "TypeScript",
          ].map((skill) => (
            <span
              key={skill}
              className="bg-blue-600/20 border border-blue-500 text-blue-300 px-5 py-2 rounded-full font-semibold"
            >
              {skill}
            </span>
          ))}

        </div>

      </div>
            {/* ================= Dashboard Statistics ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        <Card
          title="Total Resumes"
          value={totalResumes}
        />

        <Card
          title="Total Interviews"
          value={totalInterviews}
        />

        <Card
          title="Average Score"
          value={averageScore}
        />

        <Card
          title="Highest Score"
          value={highestScore}
        />

        <Card
          title="Latest Score"
          value={latestScore}
        />

        <div className="bg-gradient-to-br from-green-900 to-emerald-700 border border-green-500 rounded-xl p-6 shadow-lg hover:scale-105 transition">

          <h2 className="text-gray-300 text-sm">
            Recommendation
          </h2>

          <p className="text-2xl font-bold mt-3">
            {recommendation}
          </p>

          <p className="text-sm text-gray-200 mt-4">
            Generated using the latest interview analysis.
          </p>

        </div>

      </div>

      {/* ================= Performance Summary ================= */}

      <div className="grid lg:grid-cols-2 gap-8 mb-10">

        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Performance Summary
          </h2>

          <div className="space-y-6">

            <div>

              <div className="flex justify-between mb-2">

                <span>Latest Interview</span>

                <span>{latestScore}%</span>

              </div>

              <div className="w-full bg-gray-700 rounded-full h-3">

                <div
                  className="bg-blue-500 h-3 rounded-full"
                  style={{
                    width: `${latestScore}%`,
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">

                <span>Average Score</span>

                <span>{averageScore}%</span>

              </div>

              <div className="w-full bg-gray-700 rounded-full h-3">

                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${averageScore}%`,
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">

                <span>Highest Score</span>

                <span>{highestScore}%</span>

              </div>

              <div className="w-full bg-gray-700 rounded-full h-3">

                <div
                  className="bg-purple-500 h-3 rounded-full"
                  style={{
                    width: `${highestScore}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Interview Score Trend
          </h2>

          {chartData.length > 0 ? (

            <ScoreChart data={chartData} />

          ) : (

            <div className="flex items-center justify-center h-72 text-gray-400">

              No interview data available.

            </div>

          )}

        </div>

      </div>

      {/* ================= Overall Analytics ================= */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">

          <h3 className="text-lg font-semibold mb-3">
            Resume Analysis
          </h3>

          <p className="text-gray-400">
            {totalResumes > 0
              ? "Resume uploaded successfully."
              : "Resume has not been uploaded yet."}
          </p>

        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">

          <h3 className="text-lg font-semibold mb-3">
            Interview Status
          </h3>

          <p className="text-gray-400">
            {status === "HIRE"
              ? "Excellent interview performance."
              : status === "HOLD"
              ? "Needs improvement before final decision."
              : "Significant improvement required."}
          </p>

        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">

          <h3 className="text-lg font-semibold mb-3">
            AI Recommendation
          </h3>

          <p className="text-gray-400">
            {recommendation}
          </p>

        </div>

      </div>
            {/* ================= Recent Interview Activity ================= */}

      <h2 className="text-3xl font-bold mb-6">
        Recent Interview Activity
      </h2>

      <div className="space-y-5 mb-12">

        {interviews.length === 0 ? (

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center text-gray-400">
            No interviews found.
          </div>

        ) : (

          interviews.map((interview, index) => {

            const score = interview.totalScore ?? 0;

            const result =
              score >= 70
                ? "Recommended"
                : score >= 50
                ? "Average"
                : "Needs Improvement";

            const color =
              score >= 70
                ? "text-green-400"
                : score >= 50
                ? "text-yellow-400"
                : "text-red-400";

            return (

              <div
                key={interview.id}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition"
              >

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                  <div>

                    <h3 className="text-xl font-bold">
                      Interview #{totalInterviews - index}
                    </h3>

                    <p className="text-gray-400 mt-2">
                      {interview.createdAt.toLocaleString()}
                    </p>

                  </div>

                  <div className="text-left md:text-right">

                    <p className="text-3xl font-bold text-blue-400">
                      <AnimatedCounter end={score} />%
                    </p>

                    <p className={`font-semibold ${color}`}>
                      {result}
                    </p>

                  </div>

                </div>

              </div>

            );

          })

        )}

      </div>

      {/* ================= Uploaded Resumes ================= */}

      <h2 className="text-3xl font-bold mb-6">
        Uploaded Resumes
      </h2>

      {resumes.length === 0 ? (

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center text-gray-400 mb-12">
          No resumes uploaded yet.
        </div>

      ) : (

        <div className="space-y-6 mb-12">

          {resumes.map((resume) => (

            <div
              key={resume.id}
              className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition"
            >

              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                <div className="flex-1">

                  <h3 className="text-2xl font-bold">
                    {resume.title}
                  </h3>

                  <p className="text-gray-400 mt-3 break-all">
                    {resume.fileUrl}
                  </p>

                  <p className="mt-4 text-gray-300">
                    {resume.feedback || "Resume analysis pending."}
                  </p>

                </div>

                <div className="min-w-[180px]">

                  <div className="bg-gray-800 rounded-xl p-5 text-center">

                    <p className="text-gray-400">
                      Resume Score
                    </p>

                    <p className="text-4xl font-bold text-blue-400 mt-2">
                      <AnimatedCounter end={resume.score ?? 0} />
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                      out of 100
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* ================= AI Insights ================= */}

      <div className="bg-gradient-to-r from-indigo-900 to-blue-900 border border-blue-600 rounded-2xl p-8 mb-12">

        <h2 className="text-2xl font-bold mb-6">
          AI Insights
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div>

            <h3 className="font-semibold text-blue-300">
              Communication
            </h3>

            <p className="text-gray-300 mt-2">
              Candidate communicates ideas clearly with good confidence.
            </p>

          </div>

          <div>

            <h3 className="font-semibold text-blue-300">
              Technical Skills
            </h3>

            <p className="text-gray-300 mt-2">
              Strong understanding of full-stack development and problem solving.
            </p>

          </div>

          <div>

            <h3 className="font-semibold text-blue-300">
              Overall Verdict
            </h3>

            <p className="text-gray-300 mt-2">
              {recommendation}
            </p>

          </div>

        </div>

      </div>
            {/* ================= Quick Actions ================= */}

      <h2 className="text-3xl font-bold mb-6">
        ⚡ Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">

        <Link
          href="/upload"
          className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-center shadow-lg hover:scale-105 transition"
        >
          <div className="text-4xl">📄</div>

          <h3 className="font-bold mt-3">
            Upload Resume
          </h3>
        </Link>

        <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 text-center shadow-lg">

          <div className="text-4xl">
            🤖
          </div>

          <div className="mt-4">
            <AnalyzeButton />
          </div>

        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 text-center shadow-lg">

          <div className="text-4xl">
            ❓
          </div>

          <div className="mt-4">
            <GenerateQuestionsButton />
          </div>

        </div>

        <Link
          href="/interview"
          className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl p-6 text-center shadow-lg hover:scale-105 transition"
        >
          <div className="text-4xl">🎤</div>

          <h3 className="font-bold mt-3">
            Start Interview
          </h3>
        </Link>

        <Link
          href="/report"
          className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-xl p-6 text-center shadow-lg hover:scale-105 transition"
        >
          <div className="text-4xl">📊</div>

          <h3 className="font-bold mt-3">
            View Report
          </h3>
        </Link>

        <Link
          href="/history"
          className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl p-6 text-center shadow-lg hover:scale-105 transition"
        >
          <div className="text-4xl">📜</div>

          <h3 className="font-bold mt-3">
            History
          </h3>
        </Link>

      </div>

      {/* ================= Dashboard Summary ================= */}

      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">

          <h3 className="text-xl font-bold mb-4">
            📈 Performance
          </h3>

          <p className="text-gray-400">
            Average Interview Score
          </p>

          <p className="text-4xl font-bold text-green-400 mt-3">
            <AnimatedCounter end={averageScore} />%
          </p>

        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">

          <h3 className="text-xl font-bold mb-4">
            🏆 Best Score
          </h3>

          <p className="text-gray-400">
            Highest Interview Score
          </p>

          <p className="text-4xl font-bold text-blue-400 mt-3">
            <AnimatedCounter end={highestScore} />%
          </p>

        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">

          <h3 className="text-xl font-bold mb-4">
            💼 Hiring Status
          </h3>

          <p
            className={`text-3xl font-bold mt-3 ${
              status === "HIRE"
                ? "text-green-400"
                : status === "HOLD"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {status}
          </p>

        </div>

      </div>

      {/* ================= Footer ================= */}

      <div className="border-t border-gray-700 pt-8 pb-4 text-center text-gray-500">

        <p className="text-lg">
          AI Resume Screening & Interview System
        </p>

        <p className="mt-2 text-sm">
          Built with Next.js, Prisma, Tailwind CSS & AI
        </p>

      </div>
          </div>
  );
}

type CardProps = {
  title: string;
  value: number;
};

function Card({ title, value }: CardProps) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-blue-500/20">
      <h2 className="text-gray-400 text-sm font-medium">
        {title}
      </h2>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-4xl font-bold text-white">
          <AnimatedCounter end={value} />
        </p>

        <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500">
          📊
        </div>
      </div>
    </div>
  );
}