import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json?.();
    const { name, email, phone, company, message } = body ?? {};

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex?.test?.(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to database
    const contact = await prisma?.contactForm?.create?.({
      data: {
        name: String(name ?? ''),
        email: String(email ?? ''),
        phone: phone ? String(phone) : null,
        company: company ? String(company) : null,
        message: String(message ?? ''),
        status: 'new',
        formType: 'contact',
      },
    });

    return NextResponse.json(
      { success: true, id: contact?.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API is working' },
    { status: 200 }
  );
}
