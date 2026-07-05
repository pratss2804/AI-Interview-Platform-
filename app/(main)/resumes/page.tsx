import { prisma } from "@/app/lib/prisma";

export default async function ResumesPage() {
  const resumes = await prisma.resume.findMany();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Uploaded Resumes
      </h1>

      {resumes.map((resume) => (
        <div
          key={resume.id}
          className="border p-4 rounded mb-4"
        >
          <h2 className="font-bold">
            {resume.title}
          </h2>

          <p>Score: {resume.score}</p>

          <p>
            Feedback: {resume.feedback || "Not analyzed"}
          </p>
        </div>
      ))}
    </div>
  );
}