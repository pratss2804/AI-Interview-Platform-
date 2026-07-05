import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const interviews = await prisma.interview.findMany({
    include: {
      resume: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(interviews);
}