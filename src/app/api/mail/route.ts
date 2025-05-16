import { render } from "@react-email/components";
import WelcomeEmail from "../../../../emails";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request, res: Response) {
    const { email, fullname } = await request.json();

    // Tunggu dulu hasil render-nya (string HTML)
    const htmlContent = await render(WelcomeEmail({ fullname }));

    const { data, error } = await resend.emails.send({
        from: "Acme <fahmibastari549@gmail.com>",
        to: [email],
        subject: "Thank You",
        html: htmlContent, // masukkan hasil render yang sudah di-resolve
    });

    // Kamu bisa return sesuatu jika perlu
    return new Response(JSON.stringify({ data, error }), {
        status: error ? 500 : 200,
        headers: { "Content-Type": "application/json" },
    });

    if (error) {
        return Response.json(error);   
    }

    return Response.json ({message: "Email Berhasil Terkirim."})
}
