﻿function WanConfigCallBack(TableName, ColumnNum, Wan)
{
for(var i = 0; i < Wan.length - 1; i++)
{
var Color;
    if (RemoteWanFeature == "1")
    {
if(CuOSGIMode == "1")
{
Color = Wan[i].RemoteWanInfo.indexOf("OLT_C") >= 0 ? "gray" : "#fff";
}
else
{
Color = Wan[i].RemoteWanInfo.indexOf("OLT_C") >= 0 ? "gray" : "black";
}
    }
else
{
if(CuOSGIMode == "1")
{
Color= Wan[i].RealName.indexOf("OLT") >= 0 ? "gray" : "#fff";
}
else
{
     Color= Wan[i].RealName.indexOf("OLT") >= 0 ? "gray" : "black";
}
}


document.getElementById('wanInstTable_record_'+i).style.color=Color;

if(isReadModeForTR069Wan() && (Wan[i].ServiceList.indexOf("TR069") >= 0))
{
setDisable('wanInstTable_rml'+i,1);
}
else if('JSCMCC' == CfgModeWord.toUpperCase() && Wan[i].VlanId == 4031 && Wan[i] && Wan[i].ServiceList == 'OTHER' && Wan[i].EncapMode == 'PPPoE' && IsWanHidden(domainTowanname(Wan[i].domain)) == true)
{
setDisable('wanInstTable_rml'+i,1);
}
else if(IsOnlyReadWan(Wan[i]))
{
    setDisable('wanInstTable_rml'+i,1);
}
else
{
 
}
}
}

var Show6RdTable = (Is6RdSupported()) ? 1 : 0;
var ShowLanDhcpSwitch = (isE8cAndCMCC()) ? 1 : 0;
var ShowDstIPForwarding = ('E8C' == 'COMMON'.toUpperCase()) ? 1 : 0;

var WanReload = 
[
{ReloadId:"RDMode", ReloadValue:[{display:Show6RdTable}]},
{ReloadId:"RdPrefix", ReloadValue:[{display:Show6RdTable}]},
{ReloadId:"RdPrefixLen", ReloadValue:[{display:Show6RdTable}]},
{ReloadId:"RdBRIPv4Address", ReloadValue:[{display:Show6RdTable}]},
{ReloadId:"RdIPv4MaskLen", ReloadValue:[{display:Show6RdTable}]},
]

function CusLoadFrame()
{

}