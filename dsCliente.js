function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	var ds = DatasetBuilder.newDataset();
	
	ds.addColumn("CC_CODCLI");
	ds.addColumn("CC_NOME");
	ds.addColumn("CC_PRINOME");
	ds.addColumn("CC_SOBNOME");
	
	log.info("constraints tamanho"+constraints.length.toString())
    var prinome = '',
        sobnome = ''
	if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "CC_PRINOME") { 
                prinome = constraints[i].initialValue;
                log.info('constraints: '+prinome)
            }else if (constraints[i].fieldName == "CC_SOBNOME") {
                sobnome = constraints[i].initialValue; 
                log.info('constraints: '+sobnome)
            }
        }
        if (prinome != ''){
            
            try{
                clientService = fluigAPI.getAuthorizeClientService();
                data = {
                    companyId: getValue("WKCompany") + '',
                    serviceCode: 'Protheus',
                    endpoint: 'WSPROD/NOME?prinome='+prinome+'&sobrenome='+sobnome,
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
                        log.info('MEULOG INFO 2 =>' + forn.Cliente[0].CodCliente);
                        log.info('MEULOG INFO 3 =>' + forn.Cliente.length);
                        
                        for(j = 0; j < forn.Cliente.length; j++){
                            ds.addRow([
                                forn.Cliente[j].CodCliente,
                                forn.Cliente[j].NomeCliente,
                                prinome,
                                sobnome
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