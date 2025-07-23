import nodemailer from 'nodemailer';

export async function sendProductAccessEmail({ to, items }) {
    if (!to || !items) return;

    const productList = items
        .map(item =>
            item.digitalUrl
                ? `<li><strong>${item.title}:</strong> <a href="${item.digitalUrl}">${item.digitalUrl}</a></li>`
                : `<li><strong>${item.title}</strong> (Tidak ada link)</li>`
        )
        .join('');

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    return await transporter.sendMail({
        from: `"Global Classroom" <${process.env.SMTP_USER}>`,
        to,
        subject: 'Akses Digital Product Kamu',
        html: `
      <h2>Terima kasih sudah membeli produk digital kami!</h2>
      <p>Berikut daftar link akses digital product kamu:</p>
      <ul>${productList}</ul>
      <br>
      <p>Salam,<br/>Global Classroom Team</p>
    `,
    });
}
