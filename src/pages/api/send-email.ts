import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

// Configurar transporte de Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: import.meta.env.EMAIL_USER, // Configurar en .env
        pass: import.meta.env.EMAIL_PASS, // Configurar en .env
    },
});
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
    console.log("name > ");

    try {
        const { name, email, message } = await request.json();
        console.log("name > ",name);
        console.log("email > ",email);
        console.log("message > ",message);
        // Configurar correo
        const mailOptions = {
            from: email,
            to: import.meta.env.EMAIL_USER, // Tu correo de destino
            subject: `Nuevo mensaje de ${name}`,
            text: `De: ${name}\nCorreo: ${email}\nMensaje:\n${message}`,
        };
        console.log("mailOptions > ",mailOptions);

        await transporter.sendMail(mailOptions);

        return new Response(
            JSON.stringify({ success: true, message: "Correo enviado correctamente, un asesor se comunicara contigo" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, message: "Error enviando el correo.", error }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
