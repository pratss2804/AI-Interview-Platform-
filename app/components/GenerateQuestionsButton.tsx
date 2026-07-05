"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function GenerateQuestionsButton() {
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={generateQuestions}
      disabled={loading}
      className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold min-w-[240px] flex justify-center items-center transition-all duration-300"
    >
      {loading ? <LoadingSpinner /> : "Generate Questions"}
    </button>
  );
}