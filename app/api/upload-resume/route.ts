import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    await prisma.resume.create({
      data: {
        title: file.name,
        fileUrl: `/uploads/${file.name}`,
        score: 0,
        feedback: "",
        userId: "cmr3nufhc0002u63khxwh7l9j",
      },
    });

    return NextResponse.json({
      success: true,
      message: `Resume uploaded: ${file.name}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}