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
        { message: "No resume found" },
        { status: 404 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Analyze this resume filename:

${resume.title}

Give short interview feedback.
`;

    const result = await model.generateContent(prompt);

    const feedback = result.response.text();

    await prisma.resume.update({
      where: {
        id: resume.id,
      },
      data: {
        score: 80,
        feedback,
      },
    });

    return NextResponse.json({
      message: "Resume analyzed successfully",
      feedback,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Analysis failed" },
      { status: 500 }
    );
  }
}