"use client";

interface Props {
  speaking: boolean;
}

export default function InterviewerAvatar({ speaking }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 flex flex-col items-center shadow-lg">

      <div className="relative">

        <img
          src="https://api.dicebear.com/9.x/bottts/svg?seed=Interviewer"
          alt="AI Interviewer"
          className={`w-40 h-40 rounded-full border-4 bg-white transition-all duration-500 ${
            speaking
              ? "border-blue-500 animate-pulse"
              : "border-green-500"
          }`}
        />

        <span
          className={`absolute bottom-2 right-2 w-5 h-5 rounded-full ${
            speaking
              ? "bg-blue-500 animate-ping"
              : "bg-green-500"
          }`}
        ></span>

      </div>

      <h2 className="text-xl font-bold mt-5">
        🤖 AI Interviewer
      </h2>

      <p className="text-gray-400 text-center mt-2">
        {speaking ? "🗣 Speaking..." : "👂 Listening..."}
      </p>

    </div>
  );
}