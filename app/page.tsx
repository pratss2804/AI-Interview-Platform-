import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white">

      {/* ================= Hero Section ================= */}

      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <div>

            <span className="bg-blue-600 px-5 py-2 rounded-full text-sm font-semibold">
              🚀 AI Powered Recruitment Platform
            </span>

            <h1 className="text-6xl font-extrabold mt-8 leading-tight">
              Ace Your
              <span className="text-blue-500"> AI Interview</span>
            </h1>

            <p className="text-gray-400 text-xl mt-6 leading-9">
              Upload your resume, get AI-generated interview questions,
              answer using voice or text, receive instant AI feedback,
              and download a professional interview report.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                href="/upload-resume"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold transition duration-300 hover:scale-105"
              >
                📄 Upload Resume
              </Link>

              <Link
                href="/dashboard"
                className="border border-gray-600 hover:border-blue-500 hover:bg-blue-900/20 px-8 py-4 rounded-xl font-bold transition duration-300 hover:scale-105"
              >
                📊 Dashboard
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="flex justify-center">

            <img
              src="https://api.dicebear.com/9.x/bottts/svg?seed=AIInterviewer"
              alt="AI Interviewer"
              className="w-96 animate-pulse"
            />

          </div>

        </div>

      </section>

      {/* ================= Features ================= */}

      <section className="max-w-7xl mx-auto px-8 pb-24">

        <h2 className="text-4xl font-bold text-center mb-16">
          Why Choose Our Platform?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <FeatureCard
            emoji="📄"
            title="Resume Analysis"
            desc="AI analyzes your resume and provides smart suggestions to improve your chances."
          />

          <FeatureCard
            emoji="🤖"
            title="AI Interview"
            desc="Practice interviews using AI-generated technical and HR interview questions."
          />

          <FeatureCard
            emoji="🎤"
            title="Voice Recognition"
            desc="Answer naturally using speech-to-text powered by your browser."
          />

          <FeatureCard
            emoji="📊"
            title="Dashboard Analytics"
            desc="Track interview performance, scores and recommendations through interactive charts."
          />

          <FeatureCard
            emoji="⭐"
            title="AI Feedback"
            desc="Receive detailed AI evaluation for every answer you submit."
          />

          <FeatureCard
            emoji="📄"
            title="PDF Report"
            desc="Download a professional interview report with scores and AI feedback."
          />

        </div>

      </section>

      {/* ================= Call To Action ================= */}

      <section className="py-24 bg-black text-center">

        <h2 className="text-5xl font-bold">
          Ready to Crack Your Next Interview?
        </h2>

        <p className="text-gray-400 mt-6 text-xl">
          Practice with AI and improve your interview skills today.
        </p>

        <Link
          href="/upload-resume"
          className="inline-block mt-10 bg-green-600 hover:bg-green-700 px-10 py-4 rounded-xl font-bold text-xl transition duration-300 hover:scale-105"
        >
          🚀 Start Now
        </Link>

      </section>

    </main>
  );
}

/* ================= Feature Card ================= */

function FeatureCard({
  emoji,
  title,
  desc,
}: {
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 hover:border-blue-500 hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300">

      <div className="text-5xl">
        {emoji}
      </div>

      <h3 className="text-2xl font-bold mt-5">
        {title}
      </h3>

      <p className="text-gray-400 mt-4 leading-7">
        {desc}
      </p>

    </div>
  );
}