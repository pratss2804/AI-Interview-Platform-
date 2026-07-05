"use client";

import { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import AnswerBox from "./AnswerBox";
import InterviewTimer from "@/app/components/InterviewTimer";
import InterviewerAvatar from "@/app/components/InterviewerAvatar";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface Question {
  id: string;
  question: string;
}

export default function InterviewClient({
  questions,
}: {
  questions: Question[];
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const router = useRouter();

  if (questions.length === 0) {
    return (
      <p className="text-gray-500">
        No interview questions found.
      </p>
    );
  }

  const question = questions[currentQuestion];

  useEffect(() => {
    if (!question) return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(question.question);

      speech.rate = 1;
      speech.pitch = 1;

      setSpeaking(true);

      speech.onend = () => {
        setSpeaking(false);
      };

      window.speechSynthesis.speak(speech);

      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, [currentQuestion, question]);

  async function finishInterview() {
    setLoading(true);

    try {
      const res = await fetch("/api/generate-report", {
        method: "POST",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Interview Completed Successfully 🎉");

        setTimeout(() => {
          router.push("/report");
        }, 1000);
      } else {
        toast.error(data.message || "Failed to generate report");
      }
    } catch {
      toast.error("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="text-white">

      <div className="mb-8">
        <InterviewTimer />
      </div>

      <div className="text-lg font-semibold mb-4">
        Question {currentQuestion + 1} of {questions.length}
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="md:col-span-2 border border-gray-700 bg-gray-900 rounded-lg p-5">

          <h2 className="text-xl font-bold mb-4">
            {question.question}
          </h2>

          <AnswerBox questionId={question.id} />

        </div>

        <div className="space-y-6">

          <InterviewerAvatar speaking={speaking} />

          <div className="border border-gray-700 bg-gray-900 rounded-lg p-5">

            <h3 className="text-lg font-bold text-center mb-4">
              🎥 Your Camera
            </h3>

            <Webcam
              audio={false}
              mirrored
              className="rounded-lg w-full"
              videoConstraints={{
                width: 640,
                height: 480,
                facingMode: "user",
              }}
            />

            <p className="text-center text-gray-400 mt-3 text-sm">
              Camera Preview
            </p>

          </div>

        </div>

      </div>

      <div className="flex justify-between mt-8">

        <button
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="bg-gray-700 hover:bg-gray-600 transition px-5 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={finishInterview}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 transition disabled:bg-gray-600 px-6 py-2 rounded min-w-[220px] flex justify-center items-center"
          >
            {loading ? <LoadingSpinner /> : "Finish Interview"}
          </button>
        )}

      </div>

    </div>
  );
}