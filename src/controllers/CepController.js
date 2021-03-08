const axios = require('axios');

module.exports = {

    async getCep(req, res) {
        const { cep } = req.query;

        const response = await axios.get(`http://webservice.kinghost.net/web_cep.php?auth=1c053300874d62e972eb2b15dcfe4ace&formato=json&cep=${cep}`);
        
        if (response.data.resultado === '1'){
            return res.status(200).json({
                logradouro: response.data.logradouro ? response.data.tipo_logradouro+' '+response.data.logradouro : '',
                bairro: response.data.bairro ? response.data.bairro : '',
                cidade: response.data.cidade ? response.data.cidade : '',
                estado: response.data.uf ? response.data.uf : ''
            });
        } else {
            return res.status(404).json({ msg: 'Cep não encontrado' });
        }
    }

};