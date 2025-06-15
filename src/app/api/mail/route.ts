import { render } from "@react-email/components";
import WelcomeEmail from "../../../../emails";
import { Resend } from "resend";
import { NextRequest } from "next/server";

export const runtime = 'nodejs'

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
    const { email, fullname } = await request.json();

    // Render email ke HTML
    const htmlContent = await render(WelcomeEmail({ fullname }));

    const { data, error } = await resend.emails.send({
        from: "Acme <fahmibastari549@gmail.com>",
        to: [email],
        subject: "Thank You",
        html: htmlContent,
    });

    // Return response JSON dengan status yang sesuai
    return new Response(JSON.stringify({ data, error }), {
        status: error ? 500 : 200,
        headers: { "Content-Type": "application/json" },
    });
}
