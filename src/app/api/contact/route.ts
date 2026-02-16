import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'company', 'role', 'message'];
    const missingFields = requiredFields.filter(field => !body[field]?.trim());

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize and prepare data (trim whitespace, limit length)
    const sanitizedData = {
      name: body.name.trim().substring(0, 100),
      email: body.email.trim().substring(0, 100),
      company: body.company.trim().substring(0, 100),
      role: body.role.trim(),
      message: body.message.trim().substring(0, 2000),
    };

    // Get webhook URL from environment
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Send to N8N webhook with 10-second timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedData),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!webhookResponse.ok) {
      console.error('Webhook responded with status:', webhookResponse.status);
      return NextResponse.json(
        { success: false, error: 'Failed to submit form' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch soon.",
    });

  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Webhook request timeout');
      return NextResponse.json(
        { success: false, error: 'Request timeout. Please try again.' },
        { status: 500 }
      );
    }

    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
