import { NextResponse } from "next/server";

const fakeUser = { username: "admin", password: "password" };
// Думал над db json, потом  вспомнил что у некста такая возможность есть прикольная
export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (username === fakeUser.username && password === fakeUser.password) {
    return NextResponse.json({ success: true, token: "TOKEN" });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
