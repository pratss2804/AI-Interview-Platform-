import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST() {
  try {
    const resume = await prisma.resume.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!resume) {
      return NextResponse.json(
        { message: "Resume not found" },
        { status: 404 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Generate exactly 10 interview questions for a candidate.

Resume filename:
${resume.title}

Return only the questions, one per line.
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    // Debug Output
    console.log("========== GEMINI RESPONSE ==========");
    console.log(text);

    const questions = text
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    console.log("========== QUESTIONS ARRAY ==========");
    console.log(questions);

    // Delete old questions so they don't duplicate
    await prisma.interviewQuestion.deleteMany({
      where: {
        resumeId: resume.id,
      },
    });

    // Save new questions
    for (const q of questions) {
      await prisma.interviewQuestion.create({
        data: {
          question: q,
          resumeId: resume.id,
        },
      });
    }

    console.log("Questions saved successfully.");

    return NextResponse.json({
      message: "Questions Generated Successfully",
    });
  } catch (error) {
    console.error("Generate Questions Error:", error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}