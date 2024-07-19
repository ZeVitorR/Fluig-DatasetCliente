function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var ds = DatasetBuilder.newDataset();
	
	ds.addColumn("RC_CODCLI");
	ds.addColumn("RC_NOME");
	ds.addColumn("RC_RG");
	ds.addColumn("RC_ORGEXP");
	ds.addColumn("RC_CPF");
	ds.addColumn("RC_TELEFONE");
	ds.addColumn("RC_CELULAR");
	ds.addColumn("RC_CEP");
	ds.addColumn("RC_CIDADE");
	ds.addColumn("RC_ESTADO");
	ds.addColumn("RC_ENDERECO");
	ds.addColumn("RC_BAIRRO");
	ds.addColumn("RC_CODFIL");
	ds.addColumn("RC_RAZAOFIL");
	ds.addColumn("RC_CNPJFIL");
	ds.addColumn("RC_CODPROD");
	ds.addColumn("RC_PRODUTO");
	ds.addColumn("RC_EMPREENDIMENTO");
	ds.addColumn("RC_LOTE");
	ds.addColumn("RC_QUADRA");
	ds.addColumn("RC_CADMUN");
	
	log.info("constraints tamanho"+constraints.length.toString())
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
                        endpoint: '/WSPROD/PRODUTO?codcliente='+codcli,
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
                        
                        if( vo.getResult() != '{"ProdutoCliente":[]}' ){
                            
                            var prod = JSON.parse(vo.getResult());                    
    	                    log.info('MEULOG INFO 2 =>' + prod.ProdutoCliente[0].CodCliente);
                            log.info('MEULOG INFO 3 =>' + prod.ProdutoCliente.length);
                            
    	                    for(j = 0; j < prod.ProdutoCliente.length; j++){
    	                        ds.addRow([
                                    prod.ProdutoCliente[j].CodCliente,
                                    prod.ProdutoCliente[j].NomeCliente,
                                    prod.ProdutoCliente[j].RgCliente,
                                    prod.ProdutoCliente[j].OrgaoExpd,
                                    prod.ProdutoCliente[j].CpfCliente,
                                    prod.ProdutoCliente[j].TelCliente,
                                    prod.ProdutoCliente[j].CelCliente,
                                    prod.ProdutoCliente[j].Cep,
                                    prod.ProdutoCliente[j].Cidade,
                                    prod.ProdutoCliente[j].Estado,
                                    prod.ProdutoCliente[j].Endereco,
                                    prod.ProdutoCliente[j].Bairro,
                                    prod.ProdutoCliente[j].CodFilial,
                                    prod.ProdutoCliente[j].RazaoFilial,
                                    prod.ProdutoCliente[j].CnpjFilial,
                                    prod.ProdutoCliente[j].CodProd,
                                    prod.ProdutoCliente[j].Produto,
                                    prod.ProdutoCliente[j].Empreendimento,
                                    prod.ProdutoCliente[j].Lote,
                                    prod.ProdutoCliente[j].Quadra,
                                    prod.ProdutoCliente[j].CadMun
                                ])
    	                    }
                        }                    
                    }
                }catch(e){
                    info.log("MEULOG INFO E => "+e)    
                }
            }
        }
        
    }
	return ds
}function onMobileSync(user) {

}