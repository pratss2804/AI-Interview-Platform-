"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function UploadResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const router = useRouter();

  async function uploadResume() {
    if (!file) {
      toast.error("Please select a resume.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setMessage(data.message);

        setFile(null);

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch {
      toast.error("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-950 p-10">
      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl border border-gray-700 shadow-xl p-10">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          📄 Upload Resume
        </h1>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);

            if (e.dataTransfer.files.length > 0) {
              setFile(e.dataTransfer.files[0]);
            }
          }}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition ${
            dragActive
              ? "border-green-400 bg-green-900/20"
              : "border-blue-500"
          }`}
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            Drag & Drop Resume Here
          </h2>

          <p className="text-gray-400 mb-5">
            or choose a file
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mb-5"
          />

          {file && (
            <div className="bg-gray-800 rounded-lg p-4 mt-4">
              <p className="text-green-400 font-semibold">
                ✅ {file.name}
              </p>

              <p className="text-gray-400 text-sm mt-2">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}
        </div>

        <button
          onClick={uploadResume}
          disabled={loading}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-bold flex justify-center items-center"
        >
          {loading ? <LoadingSpinner /> : "Upload Resume"}
        </button>

        {message && (
          <div className="mt-6 bg-green-900/20 border border-green-500 rounded-lg p-4 text-center text-green-400">
            {message}
          </div>
        )}

      </div>
    </div>
  );
}