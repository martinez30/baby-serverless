const { createTransport } = require("nodemailer");

class EmailService {
  constructor() {}

  #carregaSMTP() {
    const { EMAIL_HOST_SMTP, SENHA_HOST_SMTP } = process.env;
    return createTransport({
      service: "SendinBlue",
      auth: {
        user: EMAIL_HOST_SMTP,
        pass: SENHA_HOST_SMTP,
      },
    });
  }

  async #enviaEmail(email, subject, body) {
    const sender = this.#carregaSMTP();

    await sender.sendMail({
        to: email,
        subject,
        from: process.env.EMAIL_HOST_SMTP,
        html: body
    })
  }

  async enviaNotificacaoNovosArquivosNoS3(links_arquivos){
    const { NOME_DESTINATARIO, EMAIL_DESTINATARIO } = process.env;

    const subject = "Foi feito uploads de novos relatorios";

    const corpoDoEmail = `
    <p>Olá ${NOME_DESTINATARIO}</p>
    <p>Um novo relatório foi recebido</p>
    <p>Clique no link abaixo para baixar o relatório</p>
    ${
        links_arquivos.map(link => `<a href="${link}">${link}</a>`).join("<br />")
    }
    `

    await this.#enviaEmail(EMAIL_DESTINATARIO, subject, corpoDoEmail)
  }
}

module.exports = new EmailService();