import { prisma } from "@/app/lib/prisma";
import InterviewClient from "./InterviewClient";

export default async function InterviewPage() {
  const questions = await prisma.interviewQuestion.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">
        🎤 AI Interview
      </h1>

      <InterviewClient questions={questions} />
    </div>
  );
}