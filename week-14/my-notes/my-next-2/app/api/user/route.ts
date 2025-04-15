import client from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const user = await client.user.findFirst({});
  return NextResponse.json({ email: user?.email });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const user = await client.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    console.log(user.id);
    return NextResponse.json(
      { message: 'Signed up successfully' },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 411 });
  }
}
