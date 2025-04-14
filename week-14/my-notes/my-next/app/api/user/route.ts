import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // All your db logics
  const body = await req.json();
  console.log(body);

  return NextResponse.json({
    message: 'You are logged in',
  });
}
