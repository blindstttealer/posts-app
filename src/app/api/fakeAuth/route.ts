import { NextResponse } from 'next/server';

const fakeUser = { username: 'admin', password: 'password' };

export async function POST(req: Request) {
    const { username, password } = await req.json();

    if (username === fakeUser.username && password === fakeUser.password) {
        return NextResponse.json({ success: true, user: fakeUser });
    }

    return NextResponse.json({ success: false }, { status: 401 });
}