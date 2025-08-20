import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { question } = await request.json();

  // Mocked response logic
  let answer = "I'm Melih Coskun, a software engineer and AI enthusiast.";
  if (question.toLowerCase().includes("skills")) {
    answer = "My main skills are React, Next.js, AWS, and AI systems.";
  } else if (question.toLowerCase().includes("hobby")) {
    answer = "I enjoy sailing, photography, and building AI projects.";
  } else if (question.toLowerCase().includes("work")) {
    answer = "I work as a senior developer at a tech company.";
  }

  return NextResponse.json({ answer });
}
