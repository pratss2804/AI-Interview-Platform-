"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "@/app/components/LoadingSpinner";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function AnswerBox({
  questionId,
}: {
  questionId: string;
}) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef<any>(null);

  function startListening() {
    if (listening) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech Recognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event: any) => {
      let transcript = "";

      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }

      setAnswer(transcript.trim());
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  }

  function stopListening() {
    recognitionRef.current?.stop();
  }

  async function submitAnswer() {
    if (!answer.trim()) {
      toast.error("Please enter your answer.");
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      const res = await fetch("/api/submit-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId,
          answer,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to submit answer.");
      } else {
        setFeedback(data.feedback || "");
        toast.success("Answer submitted successfully!");
      }
    } catch {
      toast.error("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div className="mt-4">

      <textarea
        rows={6}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write or speak your answer..."
        className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
      />

      <div className="flex flex-wrap gap-3 mt-4">

        <button
          onClick={startListening}
          disabled={listening}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded text-white"
        >
          🎤 {listening ? "Listening..." : "Start Recording"}
        </button>

        <button
          onClick={stopListening}
          disabled={!listening}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-4 py-2 rounded text-white"
        >
          ⏹ Stop
        </button>

        <button
          onClick={submitAnswer}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-5 py-2 rounded text-white min-w-[170px] flex justify-center items-center"
        >
          {loading ? <LoadingSpinner /> : "Submit Answer"}
        </button>

      </div>

      {feedback && (
        <div className="mt-6 rounded-lg border border-green-500 bg-gray-900 p-5">

          <h3 className="text-xl font-bold text-green-400 mb-3">
            🤖 AI Feedback
          </h3>

          <p className="whitespace-pre-line text-white">
            {feedback}
          </p>

        </div>
      )}

    </div>
  );
}