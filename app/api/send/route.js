import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Hum email body ke liye ek HTML string banayenge
    const htmlBody = `
      <div>
        <h1>Contact Form Submission from Portfolio</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend free tier requires this
      to: ['shreyap6307@gmail.com'], // Yahaan apna email address daalein
      subject: `New Portfolio Message from ${name}`,
      html: htmlBody, // Hum 'react:' ke bajaye 'html:' ka istemaal kar rahe hain
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully!', data });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}