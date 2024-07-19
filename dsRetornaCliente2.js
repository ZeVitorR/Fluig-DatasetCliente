

function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var ds = DatasetBuilder.newDataset();
	
	ds.addColumn("RC_CODCLI");
	ds.addColumn("RC_NOME");
	ds.addColumn("RC_PROFISSAO");
	ds.addColumn("RC_RG");
	ds.addColumn("RC_ORGEXP");
	ds.addColumn("RC_CPF");
	ds.addColumn("RC_EMAIL");
	ds.addColumn("RC_TELEFONE");
	ds.addColumn("RC_CELULAR");
	ds.addColumn("RC_CEP");
	ds.addColumn("RC_CIDADE");
	ds.addColumn("RC_ESTADO");
	ds.addColumn("RC_ENDERECO");
	ds.addColumn("RC_BAIRRO");
    ds.addColumn("RC_CEPCOM");
	ds.addColumn("RC_CIDADECOM");
	ds.addColumn("RC_ESTADOCOM");
	ds.addColumn("RC_ENDERECOCOM");
	ds.addColumn("RC_BAIRROCOM");
    ds.addColumn("RC_CEPCOB");
	ds.addColumn("RC_CIDADECOB");
	ds.addColumn("RC_ESTADOCOB");
	ds.addColumn("RC_ENDERECOCOB");
	ds.addColumn("RC_BAIRROCOB");
	ds.addColumn("RC_CODFIL");
	ds.addColumn("RC_RAZAOFIL");
	ds.addColumn("RC_CNPJFIL");
	ds.addColumn("RC_PRODUTO");
	ds.addColumn("RC_CODPROD");
	ds.addColumn("RC_EMPREENDIMENTO");
	ds.addColumn("RC_LOTE");
	ds.addColumn("RC_QUADRA");
	ds.addColumn("RC_CADMUN");
	
	log.info("constraints tamanho: "+constraints.length.toString())
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "RC_CODCLI") { 
                var codcli = constraints[i].initialValue; 
                log.info('constraints: '+codcli)
                try{
                    clientService = fluigAPI.getAuthorizeClientService();
                    data = {
                        companyId: getValue("WKCompany") + '',
                        serviceCode: 'Protheus',
                        endpoint: '/WSPROD/PROD?codcliente='+codcli,
                        method: 'get',// 'delete', 'patch', 'put', 'get'     
                        timeoutService: '100', // segundos
                        options: {
                            encoding: 'UTF-8',
                            mediaType: 'application/json',
                            useSSL: true
                        },
                        headers: {
                            ContentType: 'application/json;charset=UTF-8'
                        }
                    }
                    vo = clientService.invoke(JSON.stringify(data));
                    log.info('MEULOG INFO consulta =>' + vo.getResult());
                    if (vo.getResult() == null || vo.getResult().isEmpty()) {
                        log.info("Retorno está vazio");         
                    }else{
                        if( vo.getResult() != '{"Produto":[]}' ){
                            var prod = JSON.parse(vo.getResult());                    
    	                    log.info('MEULOG INFO 2 =>' + prod.Produto[0].NomeCliente);
                            log.info('MEULOG INFO 3 =>' + prod.Produto.length);
    	                    for(var j = 0; j < prod.Produto.length; j++){
                                log.info('MEULOG INFO 2 =>' + prod.Produto[j].NomeCliente);
    	                        ds.addRow([
                                    constraints[i].initialValue,
                                    prod.Produto[j].NomeCliente,
                                    prod.Produto[j].Profissao,
                                    prod.Produto[j].RgCliente,
                                    prod.Produto[j].OrgaoExpd,
                                    prod.Produto[j].CpfCliente,
                                    prod.Produto[j].email,
                                    prod.Produto[j].TelCliente,
                                    prod.Produto[j].CelCliente,
                                    prod.Produto[j].Cep,
                                    prod.Produto[j].Cidade,
                                    prod.Produto[j].Estado,
                                    prod.Produto[j].Endereco,
                                    prod.Produto[j].Bairro,
                                    prod.Produto[j].CepCOM,
                                    prod.Produto[j].CidadeCOM,
                                    prod.Produto[j].EstadoCOM,
                                    prod.Produto[j].EnderecoCOM,
                                    prod.Produto[j].BairroCOM,
                                    prod.Produto[j].CepCOB,
                                    prod.Produto[j].CidadeCOB,
                                    prod.Produto[j].EstadoCOB,
                                    prod.Produto[j].EnderecoCOB,
                                    prod.Produto[j].BairroCOB,
                                    prod.Produto[j].CodFilial,
                                    prod.Produto[j].RazaoFilial,
                                    prod.Produto[j].CnpjFilial,
                                    prod.Produto[j].Produto,
                                    prod.Produto[j].CodProd,
                                    prod.Produto[j].Empreendimento,
                                    prod.Produto[j].Lote,
                                    prod.Produto[j].Quadra,
                                    prod.Produto[j].CadMun
                                ])
    	                    }
                        }                    
                    }
                }catch(e){
                    log.info("MEULOG INFO E => "+e)    
                }
            }
        }  
    }
	return ds
}function onMobileSync(user) {

}