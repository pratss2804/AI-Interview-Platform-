import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {
    console.log("===== submit-answer API called =====");

    const body = await req.json();

    const { questionId, answer } = body;

    if (!questionId || !answer) {
      return NextResponse.json(
        {
          message: "Question ID and Answer are required",
        },
        {
          status: 400,
        }
      );
    }

    const question = await prisma.interviewQuestion.findUnique({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      return NextResponse.json(
        {
          message: "Question not found",
        },
        {
          status: 404,
        }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an interview evaluator.

Question:
${question.question}

Candidate Answer:
${answer}

Evaluate the answer.

Return:
Score out of 10

Short Feedback
`;

    const result = await model.generateContent(prompt);

    const feedback = result.response.text();

    await prisma.interviewAnswer.create({
      data: {
        answer,
        aiFeedback: feedback,
        score: 8,
        questionId: question.id,
      },
    });

    return NextResponse.json({
      message: "Answer Evaluated",
      feedback,
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