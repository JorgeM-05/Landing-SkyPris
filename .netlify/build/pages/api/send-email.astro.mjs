import nodemailer from 'nodemailer';
export { renderers } from '../../renderers.mjs';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "contacto.skypris@gmail.com",
    // Configurar en .env
    pass: "gjnb jsby flcr lmrl"
    // Configurar en .env
  }
});
const prerender = false;
const POST = async ({ request }) => {
  console.log("name > ");
  try {
    const { name, email, message } = await request.json();
    console.log("name > ", name);
    console.log("email > ", email);
    console.log("message > ", message);
    const mailOptions = {
      from: email,
      to: "contacto.skypris@gmail.com",
      // Tu correo de destino
      subject: `Nuevo mensaje de ${name}`,
      text: `De: ${name}
Correo: ${email}
Mensaje:
${message}`
    };
    console.log("mailOptions > ", mailOptions);
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
