import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST() {
  try {

    // Get latest uploaded resume
    const latestResume = await prisma.resume.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!latestResume) {
      return NextResponse.json(
        {
          message: "Resume not found",
        },
        {
          status: 404,
        }
      );
    }

    // Get all interview answers
    const answers = await prisma.interviewAnswer.findMany({
      include: {
        question: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (answers.length === 0) {
      return NextResponse.json(
        {
          message: "No interview answers found",
        },
        {
          status: 404,
        }
      );
    }

    // Calculate total score
    const totalScore = answers.reduce(
      (sum, ans) => sum + (ans.score ?? 0),
      0
    );

    const maxScore = answers.length * 10;

    const finalScore =
      maxScore > 0
        ? Math.round((totalScore / maxScore) * 100)
        : 0;

    const interviewText = answers
      .map(
        (answer) => `
Question:
${answer.question.question}

Candidate Answer:
${answer.answer}

AI Feedback:
${answer.aiFeedback}
`
      )
      .join("\n");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a professional HR interviewer.

Analyze the interview below.

${interviewText}

Overall Interview Score: ${finalScore}/100

Generate a report in this format:

Overall Score

Strengths

Weaknesses

Communication Skills

Technical Skills

Confidence Level

Hiring Recommendation

Final Summary
`;

    const result = await model.generateContent(prompt);

    const report = result.response.text();

    await prisma.interview.create({
      data: {
        resumeId: latestResume.id,
        totalScore: finalScore,
        finalFeedback: report,
      },
    });

    return NextResponse.json({
      report,
      totalScore: finalScore,
    });

  } catch (error) {

    console.error(error);

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