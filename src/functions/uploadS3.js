const EmailService = require("../service/EmailService");
const S3Service = require("../service/S3Service");

module.exports.onUpload = async (event) => {
  try {
    const links = event.Records.map((registro) => {
      return S3Service.geracaoLinkAcessoAoArquivo(
        registro.s3.bucket.name,
        registro.s3.object
      );
    });

    await EmailService.enviaNotificacaoNovosArquivosNoS3(links);

    return {
      statusCode: 200,
      body: JSON.stringify({
        mensagem: "Email enviado com sucesso",
        linksEnviados: links,
      }),
    };
  } catch (err) {
    console.log("err", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.stack }),
    };
  }
};
