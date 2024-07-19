function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var ds = DatasetBuilder.newDataset();
	
	ds.addColumn("VC_CODCLI");
	ds.addColumn("VC_CODPRO");
	ds.addColumn("VC_VERIFI");
	
	log.info("constraints tamanho"+constraints.length.toString())
    var codcli = '',
    	codpro = ''
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "VC_CODCLI") { 
                codcli = constraints[i].initialValue;
                log.info('constraints: '+codcli)
            }else if (constraints[i].fieldName == "VC_CODPRO") {
                codpro = constraints[i].initialValue; 
                log.info('constraints: '+codpro)
            }
        }
        if (codcli != '' && codpro != ''){
            
            try{
                clientService = fluigAPI.getAuthorizeClientService();
                data = {
                    companyId: getValue("WKCompany") + '',
                    serviceCode: 'Protheus',
                    endpoint: 'WSPROD/VERIFICA?codcliente='+codcli+'&codproduto='+codpro,
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
                    
                    if( vo.getResult() != '{"Cliente":[]}' ){
                        
                        var forn = JSON.parse(vo.getResult());                    
                        log.info('MEULOG INFO 2 =>' + forn.Cliente[0].Veri);
                        log.info('MEULOG INFO 3 =>' + forn.Cliente.length);
                        
                        for(j = 0; j < forn.Cliente.length; j++){
                            ds.addRow([
                                codcli,
                                codpro,
                                forn.Cliente[j].Veri
                            ])
                        }
                    }                    
                }
            }catch(e){
                log.info("MEULOG INFO E => "+e)    
            }
        }
        
    }
	return ds
}function onMobileSync(user) {

}