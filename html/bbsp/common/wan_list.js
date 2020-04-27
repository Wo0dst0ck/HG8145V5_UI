
<!-- saved from url=(0057)https://192.168.100.1/html/bbsp/common/wan_list.asp?17047 -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>function PolicyRouteItem(_Domain, _Type, _VenderClassId, _WanName, _EtherType,_PhyPortName)
{
    this.Domain = _Domain;
    this.Type = _Type;
    this.VenderClassId = _VenderClassId;
    this.WanName = _WanName;
    this.EtherType = _EtherType;
    this.PhyPortName = _PhyPortName;
}

var PolicyRouteList = new Array(new PolicyRouteItem("InternetGatewayDevice.Layer3Forwarding.X_HW_policy_route.1","SourcePhyPort","","wan1\x2e1\x2eppp1","","LAN1"),null);

function GetPolicyRouteList()
{
    return PolicyRouteList;
}

var IPProtVerMode = 3;
function GetIPProtVerMode()
{
    return IPProtVerMode;
}

var CurCfgModeWord ='SAFARICOM2';
var LanWanBindList = new Array();
var AnyPortAnyServiceList = new Array();
var EthRouteList = new Array();
var PortVlanBindList = new Array();
var i=0,j=0,k=0,m=0,n=0;
for (; i &lt; PolicyRouteList.length-1; i++)
{
    if ( ((PolicyRouteList[i].Type == "SourcePhyPort") || (PolicyRouteList[i].Type == "SourcePhyPortV6") ))
    {
        LanWanBindList[j++] = PolicyRouteList[i];
    }

    if (PolicyRouteList[i].Type == "SoureIP")
    {
        AnyPortAnyServiceList[k++] = PolicyRouteList[i];
    }

    if (PolicyRouteList[i].Type == "EtherType")
    {
        EthRouteList[m++] = PolicyRouteList[i];
    }

    if (PolicyRouteList[i].Type == "PortVlan")
    {
        PortVlanBindList[n++] = PolicyRouteList[i];
    }

}

function GetLanWanBindList()
{
    return LanWanBindList;
}
function GetLanWanBindInfo(WanName)
{
    var BindList = GetLanWanBindList();
    for (var i = 0; i &lt; BindList.length; i++)
    {
        if (WanName == BindList[i].WanName)
        {
            return BindList[i];
        }
    }
}


function GetAnyPortAnyServiceList()
{
    return AnyPortAnyServiceList;
}
function GetEthRouteList()
{
    return EthRouteList;
}
function GetPortVlanRouteList()
{
    return PortVlanBindList;
}


function domainTowanname(domain)
{
if((null != domain) &amp;&amp; (undefined != domain))
{
var domaina = domain.split('.');
var type = (-1 == domain.indexOf("WANIPConnection")) ? '.ppp' : '.ip' ;
return 'wan' + domaina[2]  + '.' + domaina[4] + type + domaina[6] ;
}
}

function waninterface(tr098wanpath, tr181interface)
{
    this.tr098wanpath = tr098wanpath;
    this.tr181interface = tr181interface;
}

function domainTowanname_if(domain)
{
    var i;
    var waninterfaces = new Array(null);

    for (i = 0; i &lt; waninterfaces.length - 1; i++)
    {
        if (domain == waninterfaces[i].tr098wanpath)
        {
            return waninterfaces[i].tr181interface;
        }
    }

    return "";
}

function GetWanConnectioDevicePath(WanFullPath)
{
    var IndexOfConnction = WanFullPath.indexOf("WANIPConnection");
    if (-1 == IndexOfConnction)
    {
        IndexOfConnction = WanFullPath.indexOf("WANPPPConnection");
    }
    return WanFullPath.substr(0, IndexOfConnction-1);
}

function MakeWanNameForPTVDF(wan)
{
var currentWanName = '';

if (true == IsRadioWanSupported(wan))
{
return "Mobile";
}

switch (wan.ServiceList.toUpperCase())
    {
case "INTERNET":
case "TR069_INTERNET":
    currentWanName = "Internet";
    break;
    case "VOIP":
case "TR069_VOIP":
    currentWanName = "VoIP";
    break;
case "IPTV":
case "TR069_IPTV":
    currentWanName = "IPTV";
    break;
case "TR069":
    currentWanName = "TR069";
    break;
case "OTHER":
    currentWanName = "OTHER";
    break;
    case "VOIP_INTERNET":
case "TR069_VOIP_INTERNET":
    currentWanName = "VoIP_Internet";
    break;
case "VOIP_IPTV":
case "TR069_VOIP_IPTV":
currentWanName = "VoIP_IPTV";
break;
case "IPTV_INTERNET":
case "TR069_IPTV_INTERNET":
    currentWanName = "IPTV_Internet";
    break;
case "VOIP_IPTV_INTERNET":
case "TR069_VOIP_IPTV_INTERNET":
currentWanName = "VoIP_IPTV_Internet";
break;
    default:
    break;
    }

return currentWanName;
}

var IsPTVDFMode = '0';
var IsTDE2Mode   = '0';
var CurCfgModeWord ='SAFARICOM2';

function MakeDefaultWanNameForXD(Wan)
{
var wanInst = 0;
    var wanServiceList = '';
    var wanMode = '';
    var vlanId = 0;
    var currentWanName = '';
var linktype = '';
var pvc = '';

    wanInst = Wan.MacId;
    wanServiceList  = Wan.ServiceList.toUpperCase();
    wanMode         = (Wan.Mode == 'IP_Routed' ) ? "R" : "B";
    vlanId          = Wan.VlanId;
pvc             = Wan.DestinationAddress;

if(Wan.WanAccessType == 'DSL')
{
linktype = "ADSL";
}
else if(Wan.WanAccessType == 'VDSL')
{
linktype = "VDSL";
}
else if(Wan.WanAccessType == 'Ethernet')
{
linktype = "GE";
}

if (true == IsRadioWanSupported(Wan))
{
currentWanName = wanInst + "_" + wanServiceList + "_" + wanMode + "_" + RADIOWAN_NAMEPREFIX + "_VID_";
}
    else
    {
    if(linktype == "ADSL")
    {
    if (0 != parseInt(vlanId))
    {
        currentWanName = wanInst + "_" + wanServiceList + "_" + wanMode + "_" + linktype + "_" + pvc + "_VID_" + vlanId;
    }
    else
    {
        currentWanName = wanInst + "_" + wanServiceList + "_" + wanMode + "_" + linktype  + "_" + pvc;
    }
    }
    else
    {
if ("DTURKCELL2WIFI" == CurCfgModeWord.toUpperCase())
{
if (4095 != parseInt(vlanId))
{
currentWanName = wanInst + "_" + wanServiceList + "_" + wanMode + "_" + linktype + "_VID_" + vlanId;
}
else
{
currentWanName = wanInst + "_" + wanServiceList + "_" + wanMode + "_" + linktype + "_VID_";
}
}
else
{
if (0 != parseInt(vlanId))
{
currentWanName = wanInst + "_" + wanServiceList + "_" + wanMode + "_" + linktype + "_VID_" + vlanId;
}
else
{
currentWanName = wanInst + "_" + wanServiceList + "_" + wanMode + "_" + linktype + "_VID_";
}
}
 }
    }

    return currentWanName;
}


function MakeDefaultWanName(wan)
{
var wanInst = 0;
    var wanServiceList = '';
    var wanMode = '';
    var vlanId = 0;
    var currentWanName = '';

    wanInst = wan.MacId;
    wanServiceList  = wan.ServiceList.toUpperCase();
    wanMode         = (wan.Mode == 'IP_Routed' ) ? "R" : "B";
    vlanId          = wan.VlanId;

if (true == IsRadioWanSupported(wan))
{
currentWanName = wanInst + "_" + RADIOWAN_NAMEPREFIX + "_" + wanServiceList + "_" + wanMode + "_VID_";
}
    else
    {
    if (0 != parseInt(vlanId))
    {
        currentWanName = wanInst + "_" + wanServiceList + "_" + wanMode + "_VID_" + vlanId;
    }
    else
    {
        currentWanName = wanInst + "_" + wanServiceList + "_" + wanMode + "_VID_";
    }
    }

    return currentWanName;
}

function MakeWanNameHiddenVlan(wan)
{
var wanInst = 0;
    var wanServiceList = '';
    var wanMode = '';
    var vlanId = 0;
    var currentWanName = '';

    wanInst = wan.MacId;
    wanServiceList  = wan.ServiceList.toUpperCase();
    wanMode         = (wan.Mode == 'IP_Routed' ) ? "R" : "B";
    if (!IsAdminUser())
    {
        currentWanName = wanInst + "_" + wanServiceList + "_" + wanMode;
    }
    else
    {
        currentWanName = MakeDefaultWanName(wan);
    }
    return currentWanName;     
}
function MakeWanNameForQtelMTN(wan)
{
var wanInst = 0;
    var wanServiceList = '';
    var wanMode = '';
    var vlanId = 0;
    var currentWanName = '';
    wanInst = wan.MacId;
    wanServiceList  = wan.ServiceList.toUpperCase();
    wanMode         = (wan.Mode == 'IP_Routed' ) ? "R" : "B";
    vlanId          = wan.VlanId;

if (true == IsRadioWanSupported(wan))
{
currentWanName = "Mobile";
}
    else
    {
    if (0 != parseInt(vlanId))
    {
        currentWanName = wanInst + "_" + wanServiceList + "_" + wanMode + "_VID_" + vlanId;
    }
    else
    {
        currentWanName = wanInst + "_" + wanServiceList + "_" + wanMode + "_VID_";
    }
    }

    return currentWanName;
}

function MakeWanNameForPCCW(wan)
{
var currentWanName = '';
var wanInst = 0;
var wanMode = '';

wanInst = wan.MacId;
wanMode = (wan.Mode == 'IP_Routed' ) ? "R" : "B";
if(true == IsRadioWanSupported(wan))
{
currentWanName = wanInst + "_" + RADIOWAN_NAMEPREFIX + "_" + wanServiceList + "_" + wanMode + "_VID_";
}
else
{
wanMode = (wan.Mode == 'IP_Routed' ) ? "Route" : "Bridge";
currentWanName = wanInst + "_" + wanMode + "_" + "WAN";
}

return currentWanName;
}

function MakeWanNameForVoice(wan)
{
    var wanInst = 0;
    var wanServiceList = '';
    var wanMode = '';
    var vlanId = 0;
    var currentWanName = '';

    wanInst = wan.MacId;
    wanServiceList  = wan.ServiceList.toUpperCase().replace(new RegExp(/(VOIP)/g),"VOICE");
    wanMode         = (wan.Mode == 'IP_Routed' ) ? "R" : "B";
    vlanId          = wan.VlanId;

if (true == IsRadioWanSupported(wan))
{
currentWanName = wanInst + "_" + RADIOWAN_NAMEPREFIX + "_" + wanServiceList + "_" + wanMode + "_VID_";
}
    else
    {
    if (0 != parseInt(vlanId))
    {
        currentWanName = wanInst + "_" + wanServiceList + "_" + wanMode + "_VID_" + vlanId;
    }
    else
    {
        currentWanName = wanInst + "_" + wanServiceList + "_" + wanMode + "_VID_";
    }
    }

    return currentWanName;
}


function MakeWanName_New(wan)
{
var currentWanName = '';
var Layer2Feature = "0";
var IsPTVDFMode = '0';
var CfgModePCCWHK = "0";
var MngtShct = '0';
var CUVoiceFeature = "0";
var CurrentBin = 'COMMON';
var IsCUMode = '0';
var SingtelMode = '0';

    if ("AIS" == CfgModeWord.toUpperCase() &amp;&amp; wan.Name != '')
    {
        return wan.Name;
    }
if ((SingtelMode == '1') &amp;&amp; wan.Name != '')
    {
        return wan.Name;
    }

if(IsCmProduct())
{
return wan.Name;
}

if(wan.Name.indexOf("OLT") &gt;= 0)
{
return MakeDefaultWanName(wan);
}

if (IsTDE2Mode == "1")
{
currentWanName = wan.Name;
if (currentWanName == "")
{
 currentWanName = "untag";
}
return currentWanName
}

if("1" == Layer2Feature)
{
return MakeDefaultWanName(wan);
}

if ('1' == IsPTVDFMode)
{
currentWanName = MakeWanNameForPTVDF(wan);
}
else if("1" == CfgModePCCWHK)
{
currentWanName = MakeWanNameForPCCW(wan);
}
else if('QTEL' == CurCfgModeWord.toUpperCase() || 'MTN2' == CurCfgModeWord.toUpperCase())
{
currentWanName = MakeWanNameForQtelMTN(wan);
}
else if(("0" == CUVoiceFeature) &amp;&amp; ('1' == IsCUMode))
{
    currentWanName = MakeDefaultWanName(wan);
}
else if('E8C' == CurrentBin.toUpperCase() || "1" == CUVoiceFeature)
{
currentWanName = MakeWanNameForVoice(wan);
}
else if(IsXdProduct())
{
currentWanName = MakeDefaultWanNameForXD(wan);
}
else
{
currentWanName = MakeDefaultWanName(wan);
}

    if (CfgModeWord.toUpperCase() == "TELECENTRO")
    {
        currentWanName = MakeWanNameHiddenVlan(wan);
    }
return currentWanName;
}

function MakeWanName(wan)
{
    return MakeWanName_New(wan);
}

function MakeWanName1(wan)
{
    return MakeWanName_New(wan);
}


function WlanISPSSID(domain, SSID, EnableUserId, UserId)
{
    this.domain = domain;
    this.SSID = SSID;
    this.EnableUserId = EnableUserId;
    this.UserId = UserId;
}

try
{
var ISPSSIDList = new Array(null);
}
catch(e)
{
var ISPSSIDList = new Array(null);
}
function stWlanInfo(domain,name,X_HW_ServiceEnable,enable,bindenable)
{
    this.domain = domain;
    this.name = name;
    this.X_HW_ServiceEnable = X_HW_ServiceEnable;
    this.enable = enable;
    this.bindenable = bindenable;
}
var WlanInfo = 'new Array(new stWlanInfo("InternetGatewayDevice\x2eLANDevice\x2e1\x2eWLANConfiguration\x2e1","ath0","1","1"),new stWlanInfo("InternetGatewayDevice\x2eLANDevice\x2e1\x2eWLANConfiguration\x2e5","ath4","1","1"),null)';
if (WlanInfo.length &gt; 0)
{
WlanInfo = eval(WlanInfo);
}
else
{
WlanInfo = new Array(null);
}

function GetSSIDNameIndex(index)
{
for ( i = 0 ; i &lt; WlanInfo.length - 1 ; i++ )
{
var domain = WlanInfo[i].domain.split('.');
if(domain[domain.length-1] == index)
{
  return parseInt(WlanInfo[i].name.charAt(WlanInfo[i].name.length-1));
}
}
}
function GetISPSSIDList()
{
    var ISPPortList = new Array();
    var ssid_i = new Array();

    for(var j = 0; j &lt; ISPSSIDList.length - 1; j++)
    {
        ssid_i = ISPSSIDList[j].SSID;
        ISPPortList.push('SSID' + ssid_i);

    }
    return ISPPortList;
}

function BindWhichWan(BindList, Port)
{
    for (var i in BindList)
    {
        if(BindList[i].PhyPortName.toUpperCase().indexOf(Port.toUpperCase()) &gt;= 0)
            return BindList[i].WanName;
    }

    return '';
}

function GetISPWanList(BindList, PortList)
{
    var WanList = new Array();

    for(var port in PortList)
    {
        var Wan = BindWhichWan(BindList, PortList[port]);
        if(Wan.length != 0)
        {
            if(ArrayIndexOf(WanList, Wan) &lt; 0)
                WanList.push(Wan);
        }
    }

    if(IsVnpt())
{
if(ArrayIndexOf(WanList, "wan1.7.ip1") &lt; 0)
WanList.push("wan1.7.ip1");

if(ArrayIndexOf(WanList, "wan1.7.ppp1") &lt; 0)
WanList.push("wan1.7.ppp1");

if(ArrayIndexOf(WanList, "wan1.8.ip1") &lt; 0)
WanList.push("wan1.8.ip1");

if(ArrayIndexOf(WanList, "wan1.8.ppp1") &lt; 0)
WanList.push("wan1.8.ppp1");
}


    return WanList;
}

function ArrayIndexOf(List, Value){
    for(var i in List)
    {
        if(List[i] == Value)
            return i;
    }
    return -1;
}

try
{
    function GetISPWanOnlyRead()
{
if(typeof(__GetISPWanOnlyRead) == 'function'){

return __GetISPWanOnlyRead();
}
else
{
return false;
}
}



var ISPWanList =  new Array();
if(typeof(GetLanWanBindList) == 'function'){

ISPWanList = GetISPWanList(GetLanWanBindList(), GetISPSSIDList());
}
GetISPPortList = function(){return GetISPSSIDList();};
IsWanHidden = function(interface){if(ArrayIndexOf(ISPWanList, interface) &gt;= 0){return true;}else{return false;}}

IsWanMustHidden = function(interface) { return (!GetISPWanOnlyRead()) &amp;&amp; IsWanHidden(interface);}
}
catch(e)
{
GetISPPortList = function(){return new Array();};
IsWanHidden = function(interface){return false;};
}

var WanList = new Array();

var Tr069WanOnlyRead = 0;
var WanstatistcsRead = '1';

var IPWanList = new Array(null);

var PPPWanList = new Array(new WanPPP("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1","AlwaysOn","E8\x3aAB\x3aF3\x3aA0\x3aD7\x3a61","Connected","ERROR\x5fNONE","","ONT\x2dHSI","1","","","Connected","IP\x5fRouted","41\x2e80\x2e145\x2e240","192\x2e168\x2e134\x2e200","1","0","196\x2e201\x2e216\x2e21\x2c196\x2e201\x2e217\x2e7","11090553\x40gpon","4f8224e09511627bd85daa3dea225ed3fb3be608f8f103df4d061ae7bf508065","AlwaysOn","4294967295","10","4294967295","0","0","INTERNET","","0","180","1","1","0","0","Specified","0","1500","MSAGOV\x2dENT\x2dASR9K10\x2dBNG","DetectBidirectionally","17041","0","","40732","0","","","",""),null);

var IPDSLiteList = new Array(null);
var PPPDSLiteList = new Array(new DsLiteInfo("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.X_HW_IPv6.DSLite","",""),null);

var IP6RDTunnelList =  new Array(null);

var PPP6RDTunnelList = new Array(new GetPppWan6RDTunnelInfo("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.X_HW_6RDTunnel","0","","40","","10"),null);

var RadioWanParaList = new Array(null);

var RadioWanPSList = new Array(null);

var TDEIPWanIPv6AddressList = new Array(null);
var TDEPPPWanIPv6AddressList = new Array(new TDEPPPWanIPv6AddressClass("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1","0","SLAAC","0"),null);

var TDEIPDelegationEnabled = new Array(null);

var TDEPPPDelegationEnabled = new Array(new TDE_PPP_DelegationEnabledClass("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1","0"),null);
var WanEthIPStats = new Array(null);
var WanEthPPStats = new Array(new WaninfoStats("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Stats","817818","57330","8183","889","8182","889","0","0","1","0"),null);

var DSLLinkConfigList =  new Array(null);

var SingtelModeEX = '0';

var ProductType = '1';
function IsXdProduct()
{
return '2'==ProductType;
}

function IsCmProduct()
{
return '3'==ProductType;
}

var DSLWanInstance = "";
var VDSLWanInstance = "";
var ETHWanInstance = "";
var SFPWanInstance = "";
var UMTSWanInstance = "";

var AccessTypeList =  new Array(new AccessType("InternetGatewayDevice.WANDevice.1.WANCommonInterfaceConfig","GPON"),null);

for(var i = 0 ; i &lt; AccessTypeList.length-1 ; i++)
{
    if( "DSL" == AccessTypeList[i].WANAccessType )
    {
        DSLWanInstance = AccessTypeList[i].domain.split(".")[2] ;
    }
    else if( "VDSL" == AccessTypeList[i].WANAccessType )
    {
        VDSLWanInstance = AccessTypeList[i].domain.split(".")[2];
    }
    else if( "Ethernet" == AccessTypeList[i].WANAccessType )
    {
        ETHWanInstance = AccessTypeList[i].domain.split(".")[2];
    }
    else if("SFP" == AccessTypeList[i].WANAccessType)
    {
        SFPWanInstance = AccessTypeList[i].domain.split(".")[2];
    }
    else if( "UMTS" == AccessTypeList[i].WANAccessType )
    {
        UMTSWanInstance = AccessTypeList[i].domain.split(".")[2];
    }
}

function GetWanInstByWanAceesstype(wanAccesstype)
{
    if( "DSL" == wanAccesstype )
    {
        return DSLWanInstance;
    }
    else if( "VDSL" == wanAccesstype )
    {
        return VDSLWanInstance;
    }
    else if( "Ethernet" == wanAccesstype )
    {
        return ETHWanInstance;
    }
    else if( "SFP" == wanAccesstype )
    {
        return SFPWanInstance;
    }
    else if( "UMTS" == wanAccesstype )
    {
        return UMTSWanInstance;
    }
    return 1;
}

function GetWanAceesstypeByWanInst(Inst)
{
    if( DSLWanInstance == Inst )
    {
        return "DSL" ;
    }
    else if( VDSLWanInstance == Inst )
    {
        return "VDSL";
    }
    else if( ETHWanInstance == Inst )
    {
        return "Ethernet";
    }
    else if( SFPWanInstance == Inst )
    {
        return "Ethernet";
    }
    else if( UMTSWanInstance == Inst )
    {
        return "UMTS";
    }
    return null;
}

function GetPVCIsInUsedWANConnectionDeviceInst(Wan)
{
for (var i = 0; i &lt; GetWanList().length; i++)
{
if (GetWanList()[i].DestinationAddress == Wan.DestinationAddress)
{
return GetWanList()[i].domain.split(".")[4];
}
}

return null;
}

function GetVdslIsInUsedWANConnectionDeviceInst(Wan)
{
    for (var i = 0; i &lt; GetWanList().length; i++)
    {
        if (GetWanList()[i].domain.split(".")[2] == "2")
        {
            return GetWanList()[i].domain.split(".")[4];
        }
    }

    return null;
}

function GetEthIsInUsedWANConnectionDeviceInst(Wan)
{
    for (var i = 0; i &lt; GetWanList().length; i++)
    {
        if (GetWanList()[i].domain.split(".")[2] == "3")
        {
            return GetWanList()[i].domain.split(".")[4];
        }
    }

    return null;
}

function IsInvalidRadioWan()
{
if (((1 == RadioWanParaList.length) &amp;&amp; (RadioWanParaList.length &lt; RadioWanPSList.length))
|| ((1 == RadioWanPSList.length)&amp;&amp;(RadioWanParaList.length &gt; RadioWanPSList.length)))
{
    return true;
}
return false;
}
function IsAdminUser()
{
    return (curUserType == 0);
}

function CompensateRadioWanCfg()
{
var requestUrl = "";
var Onttoken = "8290a2f72a151ff196b9879caed3d4fd";

if ((1 == RadioWanParaList.length)&amp;&amp;(RadioWanParaList.length &lt; RadioWanPSList.length))
{
requestUrl = 'InternetGatewayDevice.X_HW_RadioWanPS.1' + '=';
}
else if ((1 == RadioWanPSList.length)&amp;&amp;(RadioWanParaList.length &gt; RadioWanPSList.length))
{
requestUrl = 'InternetGatewayDevice.X_HW_Radio_WAN.1' + '=';
}
else
{
return;
}
requestUrl += '&amp;x.X_HW_Token=' + Onttoken;

$.ajax({
type : "POST",
async : false,
cache : false,
data : requestUrl,
url :  "del.cgi?" + "&amp;RequestFile=html/ipv6/not_find_file.asp",
error:function(XMLHttpRequest, textStatus, errorThrown)
{

}
});
}


for(i=0, j=0;IPWanList.length &gt; 0 &amp;&amp; i &lt; IPWanList.length -1;i++, j++)
{
    if("1" == IPWanList[i].Tr069Flag || IsWanMustHidden(domainTowanname(IPWanList[i].domain)) == true)
    {
    j--;
    continue;
    }

    if(true == IsRDSGatewayUser() &amp;&amp; -1 == IPWanList[i].ServiceList.toString().toUpperCase().indexOf("INTERNET"))
    {
    j--;
    continue;
    }

    if(SingtelModeEX == 1)
    {
    if((IPWanList[i].ServiceList.toString().toUpperCase().indexOf("IPTV") &gt;=0) || (IPWanList[i].ServiceList.toString().toUpperCase().indexOf("VOIP") &gt;=0))
    {
j--;
    continue;
    }
    }
    if(filterWanOnlyTr069(IPWanList[i]) == false )
    {
    j--;
    continue;
    }

    if(filterWanByVlan(IPWanList[i]) == false )
    {
    j--;
    continue;
    }

    if ((true == IsRadioWanSupported(IPWanList[i])) &amp;&amp; (true == IsInvalidRadioWan()))
{
j--;
CompensateRadioWanCfg();
continue;
}
    if ((CfgModeWord.toUpperCase() == "TELECENTRO") &amp;&amp; (!IsAdminUser()))
    {
        if (IPWanList[i].ServiceList.toString().toUpperCase().indexOf("INTERNET") == -1)
        {
            j--;
            continue;
        }
    }
    WanList[j] = new WanInfoInst();
    ConvertIPWan(IPWanList[i], WanList[j]);
    WanList[j].Name = MakeWanName(WanList[j]);

if((WanList[j].ProtocolType.toString() == "IPv6") &amp;&amp; (WanList[j].Mode.toString().toUpperCase() == "IP_ROUTED"))
{
switch(IPDSLiteList[i].WorkMode.toUpperCase())
{
case "OFF":
IPDSLiteList[i].WorkMode = "Off";
break;
case "STATIC":
IPDSLiteList[i].WorkMode = "Static";
break;
case "DYNAMIC":
IPDSLiteList[i].WorkMode = "Dynamic";
break;
default:
break;
}
    WanList[j].IPv6DSLite = IPDSLiteList[i].WorkMode;
if(IPDSLiteList[i].WorkMode == "Off")
{
WanList[j].EnableDSLite = "0";
}
else
{
WanList[j].EnableDSLite = "1";
}

WanList[j].IPv6AFTRName = IPDSLiteList[i].AFTRName;
}

    if ((1 == IsTDE2Mode) &amp;&amp; ("1" == WanList[j].IPv6Enable))
{
    WanList[j].X_HW_UnnumberedModel = TDEIPWanIPv6AddressList[i].X_HW_UnnumberedModel;
        WanList[j].X_HW_TDE_IPv6AddressingType = TDEIPWanIPv6AddressList[i].X_HW_TDE_IPv6AddressingType;
        WanList[j].X_HW_DHCPv6ForAddress  = TDEIPWanIPv6AddressList[i].X_HW_DHCPv6ForAddress;
WanList[j].X_HW_E8C_IPv6PrefixDelegationEnabled  = TDEIPDelegationEnabled[i].X_HW_E8C_IPv6PrefixDelegationEnabled;
}

if (true == Is6RdSupported()){
    if((WanList[j].ProtocolType.toString() == "IPv4") &amp;&amp; (WanList[j].Mode.toString().toUpperCase() == "IP_ROUTED"))
    {
WanList[j].RdMode = (IP6RDTunnelList[i].Enable6Rd == '1') ? IP6RDTunnelList[i].RdMode : "Off";
WanList[j].Enable6Rd = IP6RDTunnelList[i].Enable6Rd;
WanList[j].RdPrefix = IP6RDTunnelList[i].RdPrefix;
WanList[j].RdPrefixLen = IP6RDTunnelList[i].RdPrefixLen;
WanList[j].RdBRIPv4Address = IP6RDTunnelList[i].RdBRIPv4Address;
WanList[j].RdIPv4MaskLen = IP6RDTunnelList[i].RdIPv4MaskLen;
    }
}

if (true == IsRadioWanSupported(IPWanList[i]))
{
if (RadioWanPSList.length &gt; 1)
{
WanList[j].RadioWanPSEnable = RadioWanPSList[0].RadioWanPSEnable;
WanList[j].AccessType = RadioWanPSList[0].AccessType;
WanList[j].SwitchMode = RadioWanPSList[0].SwitchMode;
WanList[j].SwitchDelayTime = RadioWanPSList[0].SwitchDelayTime;
WanList[j].PingIPAddress = RadioWanPSList[0].PingIPAddress;
 }

if (RadioWanParaList.length &gt; 1)
{
WanList[j].RadioWanUsername = RadioWanParaList[0].RadioWanUsername;
WanList[j].RadioWanPassword = RadioWanParaList[0].RadioWanPassword;
WanList[j].APN = RadioWanParaList[0].APN;
WanList[j].DialNumber = RadioWanParaList[0].DialNumber;
WanList[j].TriggerMode = WanList[j].ConnectionTrigger;
}
}
if (WanstatistcsRead ==1)
{
    WanList[j].BytesSent = WanEthIPStats[i].BytesSent;
    WanList[j].BytesReceived = WanEthIPStats[i].BytesReceived;
    WanList[j].PacketsSent = WanEthIPStats[i].PacketsSent;
    WanList[j].PacketsReceived = WanEthIPStats[i].PacketsReceived;
    WanList[j].UnicastSent = WanEthIPStats[i].UnicastSent;
    WanList[j].UnicastReceived = WanEthIPStats[i].UnicastReceived;
    WanList[j].MulticastSent = WanEthIPStats[i].MulticastSent;
    WanList[j].MulticastReceived = WanEthIPStats[i].MulticastReceived;
    WanList[j].BroadcastSent = WanEthIPStats[i].BroadcastSent;
    WanList[j].BroadcastReceived = WanEthIPStats[i].BroadcastReceived;
}
}

for(i=0; PPPWanList.length &gt; 0 &amp;&amp; i &lt; PPPWanList.length - 1; j++,i++)
{
    if("1" == PPPWanList[i].Tr069Flag || IsWanMustHidden(domainTowanname(PPPWanList[i].domain)) == true &amp;&amp; ('JSCMCC' != CfgModeWord.toUpperCase() || PPPWanList[i].VlanId != 4031 || curUserType != 0))
{
j--;
    continue;
}

if(true == IsRDSGatewayUser() &amp;&amp; -1 == PPPWanList[i].ServiceList.toString().toUpperCase().indexOf("INTERNET"))
    {
    j--;
    continue;
    }

if(SingtelModeEX == 1)
    {
    if((PPPWanList[i].ServiceList.toString().toUpperCase().indexOf("IPTV") &gt;=0) || (PPPWanList[i].ServiceList.toString().toUpperCase().indexOf("VOIP") &gt;=0))
    {
j--;
    continue;
    }
    }
if(filterWanOnlyTr069(PPPWanList[i]) == false )
    {
    j--;
    continue;
   }

    if(filterWanByVlan(PPPWanList[i]) == false )
   {
    j--;
    continue;
   }

if ((true == IsRadioWanSupported(PPPWanList[i])) &amp;&amp; (true == IsInvalidRadioWan()))
{
j--;
CompensateRadioWanCfg();
continue;
}
    if ((CfgModeWord.toUpperCase() == "TELECENTRO") &amp;&amp; (!IsAdminUser()))
    {
        if (PPPWanList[i].ServiceList.toString().toUpperCase().indexOf("INTERNET") == -1)
        {
            j--;
            continue;
        }
}

WanList[j] = new WanInfoInst();
    ConvertPPPWan(PPPWanList[i], WanList[j]);
    WanList[j].Name = MakeWanName(WanList[j]);

if((WanList[j].ProtocolType.toString() == "IPv6") &amp;&amp; (WanList[j].Mode.toString().toUpperCase() == "IP_ROUTED"))
{
switch(PPPDSLiteList[i].WorkMode.toUpperCase())
{
case "OFF":
PPPDSLiteList[i].WorkMode = "Off";
break;
case "STATIC":
PPPDSLiteList[i].WorkMode = "Static";
break;
case "DYNAMIC":
PPPDSLiteList[i].WorkMode = "Dynamic";
break;
default:
break;
}
    WanList[j].IPv6DSLite = PPPDSLiteList[i].WorkMode;
if(PPPDSLiteList[i].WorkMode == "Off")
{
WanList[j].EnableDSLite = "0";
}
else
{
WanList[j].EnableDSLite = "1";
}
WanList[j].IPv6AFTRName = PPPDSLiteList[i].AFTRName;
}

if ((1 == IsTDE2Mode) &amp;&amp; ("1" == WanList[j].IPv6Enable))
{
    WanList[j].X_HW_UnnumberedModel = TDEPPPWanIPv6AddressList[i].X_HW_UnnumberedModel;
        WanList[j].X_HW_TDE_IPv6AddressingType = TDEPPPWanIPv6AddressList[i].X_HW_TDE_IPv6AddressingType;
        WanList[j].X_HW_DHCPv6ForAddress  = TDEPPPWanIPv6AddressList[i].X_HW_DHCPv6ForAddress;
WanList[j].X_HW_E8C_IPv6PrefixDelegationEnabled  = TDEPPPDelegationEnabled[i].X_HW_E8C_IPv6PrefixDelegationEnabled;
}

if (true == Is6RdSupported()){
    if((WanList[j].ProtocolType.toString() == "IPv4") &amp;&amp; (WanList[j].Mode.toString().toUpperCase() == "IP_ROUTED"))
    {
WanList[j].RdMode = (PPP6RDTunnelList[i].Enable6Rd == '1') ? "Static" : "Off";
        WanList[j].Enable6Rd = PPP6RDTunnelList[i].Enable6Rd;
        WanList[j].RdPrefix = PPP6RDTunnelList[i].RdPrefix;
        WanList[j].RdPrefixLen = PPP6RDTunnelList[i].RdPrefixLen;
        WanList[j].RdBRIPv4Address = PPP6RDTunnelList[i].RdBRIPv4Address;
        WanList[j].RdIPv4MaskLen = PPP6RDTunnelList[i].RdIPv4MaskLen;
    }
    }

if (true == IsRadioWanSupported(PPPWanList[i]))
{
if (RadioWanPSList.length &gt; 1)
{
WanList[j].RadioWanPSEnable = RadioWanPSList[0].RadioWanPSEnable;
WanList[j].AccessType = RadioWanPSList[0].AccessType;
WanList[j].SwitchMode = RadioWanPSList[0].SwitchMode;
WanList[j].SwitchDelayTime = RadioWanPSList[0].SwitchDelayTime;
WanList[j].PingIPAddress = RadioWanPSList[0].PingIPAddress;
 }

if (RadioWanParaList.length &gt; 1)
{
WanList[j].RadioWanUsername = RadioWanParaList[0].RadioWanUsername;
WanList[j].RadioWanPassword = RadioWanParaList[0].RadioWanPassword;
WanList[j].APN = RadioWanParaList[0].APN;
WanList[j].DialNumber = RadioWanParaList[0].DialNumber;
WanList[j].TriggerMode = WanList[j].ConnectionTrigger;
}
}
if (WanstatistcsRead ==1)
{
    WanList[j].BytesSent = WanEthPPStats[i].BytesSent;
    WanList[j].BytesReceived = WanEthPPStats[i].BytesReceived;
    WanList[j].PacketsSent = WanEthPPStats[i].PacketsSent;
    WanList[j].PacketsReceived = WanEthPPStats[i].PacketsReceived;
    WanList[j].UnicastSent = WanEthPPStats[i].UnicastSent;
    WanList[j].UnicastReceived = WanEthPPStats[i].UnicastReceived;
    WanList[j].MulticastSent = WanEthPPStats[i].MulticastSent;
    WanList[j].MulticastReceived = WanEthPPStats[i].MulticastReceived;
    WanList[j].BroadcastSent = WanEthPPStats[i].BroadcastSent;
    WanList[j].BroadcastReceived = WanEthPPStats[i].BroadcastReceived;
}
}

WanList.sort(
function (wan1, wan2)
{
var cmp = 0;

if(wan1.MacId &gt; wan2.MacId)
cmp = 1;
else if(wan1.MacId &lt; wan2.MacId)
cmp = -1;
else
cmp = 0;

return cmp;
}
);

try
{
    this.IPv6PrefixMode   = "PrefixDelegation";
    this.IPv6AddressStuff = "";
    this.IPv6AddressMode  = "DHCPv6";
    this.IPv6StaticPrefix = "20::01/64";
    this.IPv6IPAddress    = "20::02";
    this.IPv6AddrMaskLenE8c    = "64";
    this.IPv6GatewayE8c    = "";
this.IPv6ReserveAddress = "";
    this.IPv6SubnetMask   = "";
    this.IPv6Gateway      = "";
    this.IPv6PrimaryDNS   = "";
    this.IPv6SecondaryDNS = "";
    this.IPv6WanMVlanId   = "";

    for (var i = 0; i &lt; WanList.length; i++)
    {
        var AddressAcquireItem = GetIPv6AddressAcquireInfo(WanList[i].domain);
        var PrefixAcquireItem = GetIPv6PrefixAcquireInfo(WanList[i].domain);

        WanList[i].IPv6AddressMode = (null != AddressAcquireItem &amp;&amp; AddressAcquireItem.Origin!="") ? AddressAcquireItem.Origin : "None";
        WanList[i].IPv6AddressStuff = (null != AddressAcquireItem) ? AddressAcquireItem.ChildPrefixBits : "";
        WanList[i].IPv6IPAddress = (null != AddressAcquireItem) ? AddressAcquireItem.IPAddress : "";
        WanList[i].IPv6AddrMaskLenE8c = (null != AddressAcquireItem) ? AddressAcquireItem.AddrMaskLen : "";
        WanList[i].IPv6GatewayE8c = (null != AddressAcquireItem) ? AddressAcquireItem.DefaultGateway : "";
if (WanList[i].EncapMode == "IPoE")
{
WanList[i].IPv6ReserveAddress = (null != AddressAcquireItem) ? AddressAcquireItem.IPv6ReserveAddress : "";
}
else if (WanList[i].EncapMode == "PPPoE")
{
WanList[i].IPv6ReserveAddress = "";
}
        WanList[i].IPv6PrefixMode = (null != PrefixAcquireItem &amp;&amp; PrefixAcquireItem.Origin!="") ? PrefixAcquireItem.Origin : "None";

WanList[i].EnablePrefix =(WanList[i].IPv6PrefixMode == "None") ? "0":"1";

        WanList[i].IPv6StaticPrefix = (null != PrefixAcquireItem) ? PrefixAcquireItem.Prefix : "";
    }
}
catch(ex)
{

}

function GetIPv6WanDNS(IPv6WanDomain)
{
  var DnsServer = GetIPv6WanDnsServerInfo(domainTowanname(IPv6WanDomain));

  if(DnsServer == null || DnsServer=="")
  {
    return null;
  }

  return DnsServer.DNSServer;
}


try
{
    for (var i = 0; i &lt; WanList.length; i++)
    {
        var DnsServer = GetIPv6WanDNS(WanList[i].domain);

        if (DnsServer == null)
        {
            continue;
        }

        var DnsServerList = DnsServer.split(",");
        if (DnsServerList == null)
        {
            continue;
        }

        WanList[i].IPv6PrimaryDNS = ((DnsServerList.length &gt;= 1) ? DnsServerList[0] : "");
        WanList[i].IPv6SecondaryDNS = ((DnsServerList.length &gt;= 2) ? DnsServerList[1] : "");
    }
}catch(ex){}

function ModifyWanList(ModifyFunc)
{
if (ModifyFunc == null || ModifyFunc == undefined)
{
return;
}

for (var i = 0; i &lt; WanList.length; i++)
{
try
{
ModifyFunc(WanList[i]);
}
catch(e)
{

}
}
}

function GetWanList()
{
    return WanList;
}

function IsOnlyReadWan(wan)
{
return (GetISPWanOnlyRead() &amp;&amp; IsWanHidden(domainTowanname(wan.domain)));
}


function GetRadioWanParaList()
{
return RadioWanParaList;
}

function GetRadioWanPSList()
{
return RadioWanPSList;
}

function IsTr069WanOnlyRead()
{
    return Tr069WanOnlyRead;
}

function GetWanListByFilter(filterFunction)
{
  var WansResult = new Array();
  var WanList = GetWanList();
  var i=0;
  var j=0;

  for (i = 0; i &lt; WanList.length; i++)
  {
     if (filterFunction != null &amp;&amp; filterFunction != undefined)
     {
        if (filterFunction(WanList[i]) == false)
        {
           continue;
        }
     }

     WansResult[j]=WanList[i];
     j++;
  }

  return WansResult;
}

function FindWanInfoByAppInfo(appItem)
{
var WanList = GetWanList();
var wandomain_len = 0;
var temp_domain = null;

for(var k = 0; k &lt; WanList.length; k++ )
{
wandomain_len = WanList[k].domain.length;
temp_domain = appItem.domain.substr(0, wandomain_len);

if (temp_domain == WanList[k].domain)
{
return WanList[k];
}
}
return null;
}

function GetAppListFormWanAppendInfo(wanAppInfo1, wanAppInfo2, filterFunction)
{
var listAppInfo = new Array();
var Idx = 0;

    for (var i = 0; i &lt; wanAppInfo1.length-1; i++)
{
var tmpWan = FindWanInfoByAppInfo(wanAppInfo1[i]);

if (tmpWan == null)
    {
        continue;
    }

if (filterFunction == null || filterFunction(tmpWan))
{
listAppInfo[Idx] = wanAppInfo1[i];
Idx ++;
}
}

for (var j = 0; j &lt; wanAppInfo2.length-1; j++)
{
    var tmpWan = FindWanInfoByAppInfo(wanAppInfo2[j]);

if (tmpWan == null)
    {
        continue;
    }

    if (filterFunction == null || filterFunction(tmpWan))
{
listAppInfo[Idx] = wanAppInfo2[j];
Idx ++;
}
}

return listAppInfo;
}


function InitWanNameListControl(WanListControlId, IsThisWanOkFunction)
{
    var Control = getElById(WanListControlId);
    var WanList = GetWanListByFilter(IsThisWanOkFunction);
    var i = 0;
    var NullOption = document.createElement("Option");
    NullOption.value = '';
    NullOption.innerText = '';
    NullOption.text = '';
    Control.appendChild(NullOption);

    for (i = 0; i &lt; WanList.length; i++)
    {
        var Option = document.createElement("Option");
        Option.value = domainTowanname(WanList[i].domain);
        Option.innerText = MakeWanName1(WanList[i]);
        Option.text = MakeWanName1(WanList[i]);
        Control.appendChild(Option);
    }
}
function InitWanNameListControl1(WanListControlId, IsThisWanOkFunction)
{
    var Control = getElById(WanListControlId);
    var WanList = GetWanListByFilter(IsThisWanOkFunction);
    var i = 0;
    var NullOption = document.createElement("Option");
    NullOption.value = '';
    NullOption.innerText = '';
    NullOption.text = '';
    Control.appendChild(NullOption);

    for (i = 0; i &lt; WanList.length; i++)
    {
        var Option = document.createElement("Option");
        Option.value = WanList[i].domain;
        Option.innerText = MakeWanName1(WanList[i]);
        Option.text = MakeWanName1(WanList[i]);

        Control.appendChild(Option);
    }
}
function InitWanNameListControl2(WanListControlId, IsThisWanOkFunction)
{
    var Control = getElById(WanListControlId);
    var WanList = GetWanListByFilter(IsThisWanOkFunction);
    var i = 0;

    for (i = 0; i &lt; WanList.length; i++)
    {
        var Option = document.createElement("Option");
        Option.value = WanList[i].domain;
        Option.innerText = MakeWanName1(WanList[i]);
        Option.text = MakeWanName1(WanList[i]);

        Control.appendChild(Option);
    }
}
function InitWanNameListControl_if(WanListControlId, IsThisWanOkFunction)
{
    var Control = getElById(WanListControlId);
    var WanList = GetWanListByFilter(IsThisWanOkFunction);
    var i = 0;
    var NullOption = document.createElement("Option");
    NullOption.value = '';
    NullOption.innerText = '';
    NullOption.text = '';
    Control.appendChild(NullOption);

    for (i = 0; i &lt; WanList.length; i++)
    {
        var Option = document.createElement("Option");
        Option.value = domainTowanname_if(WanList[i].domain);
        Option.innerText = MakeWanName1(WanList[i]);
        Option.text = MakeWanName1(WanList[i]);
        Control.appendChild(Option);
    }
}
function InitWanNameListControlWanname(WanListControlId, IsThisWanOkFunction)
{
    var Control = getElById(WanListControlId);
    var WanList = GetWanListByFilter(IsThisWanOkFunction);
    var i = 0;

    for (i = 0; i &lt; WanList.length; i++)
    {
        var Option = document.createElement("Option");
        Option.value = domainTowanname(WanList[i].domain);
        Option.innerText = MakeWanName1(WanList[i]);
        Option.text = MakeWanName1(WanList[i]);
        Control.appendChild(Option);
    }
}


function GetWanFullName(WanName)
{
    for (var i = 0; i &lt; WanList.length;i++)
    {
    if (WanList[i].NewName == WanName)
{
return MakeWanName(WanList[i]);
}
    }

    return WanName;
}

function getWANByVlan(vlan)
{
var wanSpec = new Array();
var i = 0;
for(i=0; PPPWanList.length &gt; 0 &amp;&amp; i &lt; PPPWanList.length - 1; i++)
{
if (vlan == PPPWanList[i].VlanId)
{
wanSpec.push(PPPWanList[i]);
}
}
for(i=0; IPWanList.length &gt; 0 &amp;&amp; i &lt; IPWanList.length - 1; i++)
{
if (vlan == IPWanList[i].VlanId)
{
wanSpec.push(IPWanList[i]);
}
}
return wanSpec;
}

function GetWanInfoByWanName(WanName)
{
    for (var i = 0; i &lt; WanList.length;i++)
    {
    if (WanList[i].NewName == WanName)
{
return (WanList[i]);
}
    }

    return WanName;
}

function PS_GetCmdFormat(type, dev, protocal, start, end)
{
    var cmd = type
              + "/" + dev
              + "/" + (("TCP/UDP" == protocal.toUpperCase())?"tcpudp":protocal)
              + "/" + start
              + "/" + (((end.length == 0) || (parseInt(end, 10) == 0))? 1:(parseInt(end, 10) - parseInt(start, 10) + 1));

    return cmd.toLowerCase();
}

function PS_CheckReservePort(Operation, NewPort, OldPOrt)
{
    var conflict = false;
    var Onttoken = "208b02b2da6a8f37d5c653ac667704d8";
    $.ajax({
        type  : "POST",
        async : false,
        cache : false,
        data  : "act=" + Operation+ "&amp;new=" + NewPort + "&amp;old=" + OldPOrt +'&amp;x.X_HW_Token=' + Onttoken,
        url   : "pdtportcheck",
        success : function(data) {
            conflict = true;
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            conflict = false;
        },
        complete: function (XHR, TS) {
            XHR = null;
      }
    });

    return conflict;
}

function ParseUsernameForIraq(userName)
{
var viewusrnm = '';
var temp;
var viewUserName = userName;

if( false == IsAdminUser() )
{
var postFix = "@o3-telecom.com";

if(userName.indexOf(postFix) &gt;= 0)
{
if(userName.substring(userName.length - postFix.length) == postFix)
{
viewUserName =  userName.substring(0, userName.length - postFix.length);

}
}
}
return viewUserName;
}

function WanMacId2WanPath(wanMacId)
{
for (var i = 0; i &lt; WanList.length;i++)
{
if(wanMacId == WanList[i].MacId) 
{
return WanList[i].domain;
break;
}
    }
return "";
}

function WanPath2WanMacId(wanPath)
{
for (var i = 0; i &lt; WanList.length;i++) 
{
if(wanPath.toUpperCase() == WanList[i].domain.toUpperCase()) 
{
return WanList[i].MacId;
}
    }
return 0;
}

function RemoveDomainPoint(str)
{
    if (str.charAt(str.length-1) == ".")
    {
        return str.slice(0,str.length-1);
    }
    else
    {
        return str;
    }
}



function WanIsExist()
{
if ((IPWanList.length &gt; 1 &amp;&amp; IPWanList[0] != null) || (PPPWanList.length &gt; 1 &amp;&amp; PPPWanList[0] != null))
{
return true;
}

return false;
}

</body></html>