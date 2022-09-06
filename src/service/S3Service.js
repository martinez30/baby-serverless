const enums = {
    bucket_name: '{bucket_name}'
}

class S3Service {
    constructor(){}

    #base_link = `https://${enums.bucket_name}.s3.amazonaws.com/`;

    /**
     * 
     * @param {string} nomeDoBucket 
     * @param {object} arquivo 
     * @return {String} linkDeAcesso
     */
    geracaoLinkAcessoAoArquivo(nomeDoBucket, arquivo){
        const link = this.#base_link.replace(enums.bucket_name, nomeDoBucket)
        return link + arquivo.key;
    }
}

module.exports = new S3Service();