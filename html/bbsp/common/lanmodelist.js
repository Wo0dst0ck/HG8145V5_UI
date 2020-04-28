function stLayer3Enable(domain, lay3enable)
{
this.domain = domain;
this.L3Enable = lay3enable;
}

var LanModeList = new Array(new stLayer3Enable("InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.1","1"),new stLayer3Enable("InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.2","1"),new stLayer3Enable("InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.3","1"),new stLayer3Enable("InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.4","1"),null); 

function GetLanModeList()
{
    return LanModeList;
}

function IsL3Mode(LanId)
{
    if (parseInt(LanId) &gt;= LanModeList.length){
    return "null";
    }
    return LanModeList[parseInt(LanId)-1].L3Enable;
}