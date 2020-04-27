
<!-- saved from url=(0054)https://192.168.100.1/html/bbsp/common/wan_control.asp -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"></head><body>var CurrentWan = null;
var EditFlag = "";
var ChangeUISource = "";
var AddType     = 1;
var CurrentWan = new WanInfoInst();
var defaultWan  = new WanInfoInst();
var COMPLEX_CGI_PREFIX='Add_';
var MngtShct = '0';
var CfgModeWord ='SAFARICOM2';
var DoubleFreqFlag = 1;
var curUserType='1';
var RadioWanFeature = "0";
var CUVoiceFeature = "0";
var DisliteFeature = "0";
var productName = 'HG8145V5';
var SonetFlag = '0';
var supportTelmex = "0";
var Tdefeature = '0';
var TDE2ModeFlag   = '0';
var DSLTELMEXFlag   = '0';
var Option60FT =  '0';
var IsPTVDFFlag = '0';
var ROSTelecomGlobalFeature="0";
var DisableNameAndPwd = '1';
var DscpFeature = "1";
var MultiWanIpFeature = '0';
var stbport = '0';
var UpportDetectFlag ='0';
var UpUserPortID = '1056';
var RadioFlag = "0";
var DnsOverrideFlag = "0";
var PonUpportConfig ='1';
var IfVisual = "0";
var isSupportVLAN0 = '0';
var isPTVDF = '0';
var isSAFARICOM = '1';
var IsDNSLockEnable = '0'

function stConfigPort(domain,X_HW_MainUpPort)
{
this.domain = domain;
this.X_HW_MainUpPort = X_HW_MainUpPort;
}

var PortConfigInfos = new Array(new stConfigPort("InternetGatewayDevice.DeviceInfo","Optical"),null);
var PortConfigInfo = PortConfigInfos[0];

function IsFreInSsidName()
{
if(1 == IsPTVDFFlag)
{
return true;
}
}
var LanNum = 8;
var SsidNum = 8;
function IsCurrentRadioWan()
{
    var Wan = GetCurrentWan();
    if(IsXdProduct())
    {
        var AccessTtpe = Wan.WanAccessType;

        if (("1" == RadioWanFeature) &amp;&amp; ('UMTS' == AccessTtpe))
        {
            return true;
        }
    }
    else
    {
        var AccessTtpe = Wan.AccessType;

        if (("1" == RadioWanFeature) &amp;&amp; ('0' == AccessTtpe))
        {
            return true;
        }
    }
    return false;
}

function getInstIdByDomain(domain)
{
    if ('' != domain)
    {
        return parseInt(domain.charAt(domain.length - 1));
    }
}

function getWlanPortNumber(name)
{
    if ('' != name)
    {
        return parseInt(name.charAt(name.length - 1));
    }
}

function stWlan(domain, Name, ssid, X_HW_RFBand)
{
    this.domain = domain;
    this.Name = Name;
    this.ssid = ssid;
    this.X_HW_RFBand = X_HW_RFBand;
    this.WlanInst = getInstIdByDomain(domain);
}
if (1 == DoubleFreqFlag )
{
    var WlanListTotal = new Array();
try
{
        WlanListTotal = new Array(new stWlan("InternetGatewayDevice\x2eLANDevice\x2e1\x2eWLANConfiguration\x2e1","ath0","NdikuHF","2\x2e4GHz"),new stWlan("InternetGatewayDevice\x2eLANDevice\x2e1\x2eWLANConfiguration\x2e5","ath4","NdikuHF\x2d5G","5GHz"),null);
}
catch(e)
{
WlanListTotal = new Array(null);
}
    var WlanListNum = WlanListTotal.length - 1;
for (var i = 0; i &lt; WlanListNum; i++)
    {
       for (var j = i; j &lt; WlanListNum; j++)
       {
var index_i = getWlanPortNumber(WlanListTotal[i].Name);
var index_j = getWlanPortNumber(WlanListTotal[j].Name);

if (index_i &gt; index_j)
{
var WlanTemp = WlanListTotal[i];
WlanListTotal[i] = WlanListTotal[j];
WlanListTotal[j] = WlanTemp;
}
}
}
}

function SetCurrentWan(Wan)
{
    CurrentWan = Wan;
}
function GetCurrentWan()
{
    if (CurrentWan != null)
    {
        return CurrentWan;
    }

    return GetPageData();
}
function IsConTrigCanBeSend(Wan)
{
    if (Wan.Mode.toString().toUpperCase() == 'IP_ROUTED' &amp;&amp; Wan.ServiceList.toString().toUpperCase() == 'INTERNET')
    {
        return true;
    }

    return false;
}


function GetOriginalWan(Domain)
{
var WanList = GetWanList();

for (var i = 0; i &lt; WanList.length; i++)
{
if (WanList[i].domain == Domain)
{
return WanList[i];
}
}

return null;
}

function IsConnectionTypeChange()
{
var CurrentWan = GetCurrentWan();
var OriginalWan = GetOriginalWan(CurrentWan.domain);
if (OriginalWan == null)
{
return true;
}

var CurrentType = (CurrentWan.Mode.toUpperCase().indexOf("BRIDGE") &gt;= 0) ? "BRIDGE" : "ROUTE";
var OriginalType = (OriginalWan.Mode.toUpperCase().indexOf("BRIDGE") &gt;= 0) ? "BRIDGE" : "ROUTE";

return (CurrentType == OriginalType) ? false : true;
}

function IsOriginalTr069Type()
{
var CurrentWan = GetCurrentWan();
var OriginalWan = GetOriginalWan(CurrentWan.domain);
if (OriginalWan == null)
{
return false;
}

return (OriginalWan.ServiceList.toUpperCase().indexOf("TR069") &gt;= 0) ? true : false;
}

function ControlAtmLinkConfig(Wan)
{
setDisplay("LinkInfoBarPanel", 0);
setDisplay("WANPVCRow", 0);
setDisplay("LinkModeRow", 0);
setDisplay("ServiceTypeRow", 0);
setDisplay("AccessEncapModeRow", 0);
setDisplay("ATMPeakCellRateRow", 0);
setDisplay("ATMMaximumBurstSizeRow", 0);
setDisplay("ATMSustainableCellRateRow", 0);

if(Wan.WanAccessType != 'DSL')
{
return;
}

setDisplay("LinkInfoBarPanel", 1);
setDisplay("WANPVCRow", 1);
setDisplay("LinkModeRow", 1);
setDisplay("ServiceTypeRow", 1);
setDisplay("AccessEncapModeRow", 1);

if( 'UBR+' == getValue('ServiceType') || 'CBR' == getValue('ServiceType') )
{
setDisplay("ATMPeakCellRateRow", 1);
}
else if( 'VBR-nrt' == getValue('ServiceType') || 'VBR-rt' == getValue('ServiceType'))
{
setDisplay("ATMPeakCellRateRow", 1);
setDisplay("ATMMaximumBurstSizeRow", 1);
setDisplay("ATMSustainableCellRateRow", 1);
}

setDisable("LinkMode", 0);

if (Wan.Mode.toString().toUpperCase().indexOf("BRIDGED") &gt;= 0)
{
   setSelect('LinkMode', 'EoA');
   setDisable("LinkMode", 1);
   return; 
}
}

var WANAccessTypeRowLoaded = false;
function CommonInterfaceConfig(domain, WANAccessType, BitRate)
{
    this.domain        = domain;
    this.WANAccessType = WANAccessType;
this.BitRate = BitRate;
}

function DSLDisplayradio()
{
    if (ProductType == 2)
    {
        if (RadioFlag == 0)
        {
            return false;
        }
    }
    return true;
}

function ControlWANAccessType(Wan)
{
if( !WANAccessTypeRowLoaded)
{
var CommonInterfaceConfigList =  new Array(new CommonInterfaceConfig("InternetGatewayDevice.WANDevice.1.WANCommonInterfaceConfig","GPON","1250000000"),null);
var UpIndex = 0;
for( i = 0 ; i &lt; CommonInterfaceConfigList.length-1 ; i++)
{
if( "DSL" == CommonInterfaceConfigList[i].WANAccessType )
{
document.forms[0].WANAccessType[UpIndex] = new Option(Languages['ATM'], "DSL");
UpIndex++;
}
else if( "VDSL" == CommonInterfaceConfigList[i].WANAccessType )
{
document.forms[0].WANAccessType[UpIndex] = new Option(Languages['PTM'], "VDSL");
UpIndex++;
}
else if( "Ethernet" == CommonInterfaceConfigList[i].WANAccessType )
{
document.forms[0].WANAccessType[UpIndex] = new Option(Languages['ETH'], "Ethernet");
UpIndex++;
}
else if( "UMTS" == CommonInterfaceConfigList[i].WANAccessType &amp;&amp; DSLDisplayradio())
{
document.forms[0].WANAccessType[UpIndex] = new Option(Languages['RADIO'], "UMTS");
UpIndex++;
}
}

WANAccessTypeRowLoaded = true;
}

setDisplay("AccessTypeRow", 0);
setDisplay("SwitchModeRow", 0);

setDisable("WANAccessType", EditFlag.toUpperCase() == "ADD" ? 0 : 1);
setSelect("WANAccessType", Wan.WanAccessType);

}

function ControlSpecXD(Wan)
{
if(!IsXdProduct())
{
return;
}

if( Wan.WanAccessType == "VDSL" || Wan.WanAccessType == "DSL" || Wan.WanAccessType == "Ethernet")
{
if (Wan.Mode.toString().toUpperCase().indexOf("BRIDGED") &gt;= 0)
{
setDisplay("WanIPv4InfoBarPanel", 0);
setDisplay("WanIPv6InfoBarPanel", 0);
}

setDisplay("IPv4WanMVlanIdRow", 0);
setDisplay("IPv6WanMVlanIdRow", 0);
}

ControlAtmLinkConfig(Wan);
ControlWANAccessType(Wan);
}
var IPv6AddressType = GetCurrentWan().IPv6AddressMode.toString().toUpperCase();
function ControlSpec()
{
    setDisplay("WanDomainRow", 0);
    setDisplay("IPv6SubnetMaskRow", 0);
    setDisplay("IPv6DefaultGatewayRow", 0);
setDisplay("IPV6sourcemodeRow", 0);
if(isSAFARICOM != 1)
{
setDisplay("IPV6OverrideAllowedRow", 0);

}
setDisplay("IPV6sourcemodeRow", 0);
if(IsPTVDFFlag == "1")
{
setDisplay("IPV6sourcemodeRow", 1);
}

    var FeatureInfo = GetFeatureInfo();
    if (FeatureInfo.IPv6 == "0")
    {

        setDisplay("WanIPv4InfoBarRow", 0);
        setDisplay("WanIPv6InfoBarRow", 0);
        setDisplay("IPv6PrefixModeRow", 0);
        setDisplay("IPv6StaticPrefixRow", 0);
        setDisplay("IPv6AddressModeRow", 0);
        setDisplay("TDEIPv6UnnumberedModelRow", 0);
        setDisplay("TDEDHCP6cForAddressRow", 0);
        setDisplay("TDEIPv6AddressingTypeRow", 0);
        setDisplay("IPv6AddressStuffRow", 0);
        setDisplay("IPv6IPAddressRow", 0);
        setDisplay("IPv6AddrMaskLenE8cRow", 0);
        setDisplay("IPv6GatewayE8cRow", 0);
setDisplay("IPv6ReserveAddress", 0);
        setDisplay("IPv6SubnetMaskRow", 0);
        setDisplay("IPv6DefaultGatewayRow", 0);
        setDisplay("IPv6PrimaryDNSServerRow", 0);
        setDisplay("IPv6SecondaryDNSServerRow", 0);
        setDisplay("IPv6WanMVlanIdRow", 0);
        setDisable("ProtocolType", 1);
        setSelect("ProtocolType", "IPv4");
setDisplay("PrifixEnabledRow", 0);
    }
    if (FeatureInfo.WanPriPolicy == "0")
    {
        setDisplay("PriorityPolicyRow", 0);
    }
}

function ControlPanel()
{
    var Wan = GetCurrentWan();
    var Type = Wan.ProtocolType.toString();
    var IPv4BarIndex = 0;
    var IPv6BarIndex = 0;


    setDisplay("WanIPv4InfoBarPanel", 0);
    setDisplay("WanIPv6InfoBarPanel", 0);

   if(false == IsRDSGatewayUser())
   {
    if (Type.toUpperCase()=="IPV4")
    {
        setDisplay("WanIPv4InfoBarPanel", 1);
    }

    if (Type.toUpperCase()=="IPV6")
    {
        setDisplay("WanIPv6InfoBarPanel", 1);
    }

        if (Type.toUpperCase()=="IPV4/IPV6")
        {
        setDisplay("WanIPv4InfoBarPanel", 1);
        setDisplay("WanIPv6InfoBarPanel", 1);
    }

        if(IsXdProduct())
        {
            setDisplay("LinkInfoBarPanel", 1);
        }

if (true == IsCurrentRadioWan())
{
setDisplay("WanIPv4InfoBarPanel", 0);
setDisplay("WanIPv6InfoBarPanel", 0);
            if(IsXdProduct())
            {
                setDisplay("LinkInfoBarPanel", 0);
            }
}
    }

}

function ControlDislite()
{
    var Wan = GetCurrentWan();

   if(false == IsRDSGatewayUser())
   {
    if ((Wan.IPv6DSLite=="Dynamic")
    ||(Wan.IPv6DSLite=="Static"))
    {
    setDisplay("WanIPv4InfoBarPanel", 1);
        setDisplay("WanIPv4InfoBarRow", 1);
setDisplay("IPv4WanMVlanIdRow",1);
setDisplay("IPv4AddressModeRow", 0);
    setDisplay("IPv4NatSwitchRow", 0);
    setDisplay("IPv4NatTypeRow", 0);
    setDisplay("IPv4VendorIdRow", 0);
    setDisplay("IPv4ClientIdRow", 0);
setDisplay("IPv4ClientIdRow", 0);
    }
    }

}


function ControlIPv4AddressMode()
{
    setDisplay("IPv4AddressModeRow", 1);
    if (GetCurrentWan().Mode.toString().toUpperCase() != "IP_ROUTED")
    {
        setDisplay("IPv4AddressModeRow", 0);
    }

}

function ControlIPv4DHCPEnable()
{
    var ServiceList = GetCurrentWan().ServiceList.toString().toUpperCase();
var Wan = GetCurrentWan();
    var src = getElementById('ServiceList');

    setDisplay("LanDhcpSwitchRow", 0);
    if ( ServiceList.match('INTERNET') || ServiceList.match('IPTV') || ServiceList.match('OTHER') )
    {
        if(isE8cAndCMCC())
        {
        setDisplay("LanDhcpSwitchRow", 1);
    }
    }

    if(('JSCMCC' == CfgModeWord.toUpperCase()) &amp;&amp; (getElementById('VlanId').value == 4031) &amp;&amp; (curUserType == 0) &amp;&amp; IsWanHidden(domainTowanname(Wan.domain)) == true)
    {
        setDisable("LanDhcpSwitch", 1);
    }
else
{
setDisable("LanDhcpSwitch", 0);
}

    if(EditFlag.toUpperCase() == "ADD" &amp;&amp; ChangeUISource == src)
    {
        if (ServiceList == "OTHER")
    {
            setCheck("LanDhcpSwitch", 0);
        }
    else
    {
        setCheck("LanDhcpSwitch", 1);
    }
    }

if (true == IsCurrentRadioWan())
{
setDisplay("LanDhcpSwitchRow", 0);
}
}

function IsDstIPForwardingListVisibility(Wan,ServiceList)
{
  var CurrentBin = 'COMMON';
if (   (ServiceList == "TR069")
     ||(ServiceList == "VOIP")
     ||(ServiceList == "TR069_VOIP")
     ||("IP_BRIDGED" == Wan.Mode.toString().toUpperCase())
     ||("PPPOE_BRIDGED" == Wan.Mode.toString().toUpperCase()))
{
return false;
}
if ('E8C' != CurrentBin.toUpperCase())
{
return false;
}
return true;
}

function Option60DisplayFlag(Wan)
{
if((1 == Option60FT)
&amp;&amp; (CurrentWan.EncapMode.toString().toUpperCase() == "IPOE")
&amp;&amp; (Wan.ServiceList.toString().toUpperCase().indexOf("VOIP") &lt; 0)
&amp;&amp; Wan.Mode == "IP_Routed"
&amp;&amp; ((Wan.ProtocolType.toString().toUpperCase()=="IPV4/IPV6") || ((Wan.ProtocolType.toString().toUpperCase()=="IPV4"))))
{
return true;
}
else
{
return false;
}
}

function Option60Display(Wan)
{
setDisplay("Option60EnableRow","0");
setDisplay("IPoEUserNameRow", "0");
setDisplay("IPoEPasswordRow", "0");
if(true == Option60DisplayFlag(Wan))
{
setDisplay("Option60EnableRow","1");
if("1" == Wan.EnableOption60)
{
setDisplay("IPoEUserNameRow", 1);
setDisplay("IPoEPasswordRow", 1);
}
if(!IsAdminUser())
{
setDisable("Option60Enable","1");
}
}
return ;
}

function ControlDstIPForwardingListVisibility()
{
var Wan = GetCurrentWan();
var ServiceList = Wan.ServiceList;

setDisplay("DstIPForwardingListRow", 1);
setDisplay("DstIPForwardingList", 1);

if (( false == IsDstIPForwardingListVisibility(Wan,ServiceList) )||(true == IsCurrentRadioWan()))
{
setDisplay("DstIPForwardingListRow", 0);
setDisplay("DstIPForwardingList", 0);
}
}

function setWirelessDisplay(flag)
{
setDisplay("RadioWanPSEnableRow", flag);
setDisplay("SwitchModeRow", flag);
setDisplay("SwitchDelayTimeRow", flag);
setDisplay("PingIPAddressRow", flag);
setDisplay("DialInfoBarRow", flag);
setDisplay("RadioWanUsernameRow", flag);
setDisplay("RadioWanPasswordRow", flag);
setDisplay("APNRow", flag);
setDisplay("DialNumberRow", flag);
setDisplay("TriggerModeRow", flag);
 }

function setPonDisplay(flag)
{
setDisplay("WanSwitchRow", flag);
setDisplay("EncapModeRow", flag);
setDisplay("ProtocolTypeRow", flag);
setDisplay("WanModeRow", flag);
setDisplay("ServiceListRow", flag);
setDisplay("VlanSwitchRow", flag);
}

function CntrolAccessType()
{
    if(IsXdProduct())
    {
        return;
    }
if (("1" == RadioWanFeature))
{
setDisplay("AccessTypeRow", 1);
}
else
{
setDisplay("AccessTypeRow", 0);
}
}

function ControlRadioWan()
{
    if(IsXdProduct())
    {
        if (true == IsCurrentRadioWan())
        {
            setWirelessDisplay(1);
            setPonDisplay(0);
        }
        else
        {
            setWirelessDisplay(0);
            setPonDisplay(1);
        }

        setDisplay("SwitchModeRow", 0);
    }
    else
    {
        var Wan = GetCurrentWan();
        var AccessTtpe = Wan.AccessType;
        if ("1" == RadioWanFeature)
        {
            if ('0' == AccessTtpe)
            {
                setWirelessDisplay(1);
                setPonDisplay(0);
            }
            else
            {
                setWirelessDisplay(0);
                setPonDisplay(1);
            }
        }
        else
        {
            setWirelessDisplay(0);
        }
    }
}


function displayWanMode()
{
var wanMode = getElementById('WanMode');
if(bin5board() == true)
{
RemoveItemFromSelect(wanMode, 'IP_Bridged');
}
}

function displayProtocolType()
{
var protoType = getElementById('ProtocolType');
var IPProtVer = GetIPProtVerMode();
var Feature = GetFeatureInfo();

if ((bin5board() == true)
 || ((EditFlag.toUpperCase() == "ADD") &amp;&amp; (Feature.IPProtChk == 1) &amp;&amp; (IPProtVer == 1)))
{
RemoveItemFromSelect(protoType, Languages['IPv4IPv6']);
RemoveItemFromSelect(protoType, Languages['IPv6']);
}
else if ((EditFlag.toUpperCase() == "ADD") &amp;&amp; (Feature.IPProtChk == 1) &amp;&amp; (IPProtVer == 2))
{
RemoveItemFromSelect(protoType, Languages['IPv4IPv6']);
RemoveItemFromSelect(protoType, Languages['IPv4']);
}
}

function displaysvrlist()
{
if (EditFlag.toUpperCase() == "ADD")
{
Controlsvrlist();
}
}

function getMtuMaxAllowCfg(Wan)
{
var specIPoEMTUMax = '1500';
var maxMtuCfg = 1540;
if (parseInt(specIPoEMTUMax, 10) != 1500)
{
if(Wan.IPv4AddressMode.toUpperCase() == "PPPOE")
{
maxMtuCfg = parseInt(specIPoEMTUMax, 10) - 8;
}
else
{
maxMtuCfg = parseInt(specIPoEMTUMax, 10);
}
}
return maxMtuCfg;
}


function ControlIPv4MXU()
{
    var WanProtocolType = GetCurrentWan().ProtocolType.toString();
    var WanIPv6DSLite = GetCurrentWan().IPv6DSLite.toString();
    var MXURemarkStr = "";

    if (GetCurrentWan().EncapMode.toString().toUpperCase() == "PPPOE")
    {
        setObjNoEncodeInnerHtmlValue(document.getElementById("IPv4MXURow").cells[0], Languages['IPv4MRU']);
    }
    else
    {
        setObjNoEncodeInnerHtmlValue(document.getElementById("IPv4MXURow").cells[0], Languages['IPv4MXU']);
    }

    setDisplay("IPv4MXURow", 1);

if ((GetCurrentWan().Mode.toString().toUpperCase() != "IP_ROUTED")
|| (GetCfgMode().PCCWHK == "1") || (true == IsCurrentRadioWan()))
{
setDisplay("IPv4MXURow", 0);
}

if ( (1 == TDE2ModeFlag)
    &amp;&amp; ((GetCurrentWan().ServiceList == 'IPTV') || (GetCurrentWan().ServiceList == 'VOIP')))
{
setDisplay("IPv4MXURow", 0);
}

    var maxMtuCfg = getMtuMaxAllowCfg(GetCurrentWan());

    if (WanProtocolType.match("IPv6"))
    {

    maxMtuCfg = maxMtuCfg &lt; 1280 ? 1540 : maxMtuCfg;

MXURemarkStr = ("ARABIC" == LoginRequestLanguage.toUpperCase()) ? "("+ maxMtuCfg + "-1280)" : "(1280-" + maxMtuCfg + ")";
setElementInnerHtmlById("IPv4MXURemark", MXURemarkStr);
getElById('IPv4MXU').title = MXURemarkStr;
    }
    else
    {
MXURemarkStr = ("ARABIC" == LoginRequestLanguage.toUpperCase()) ?"("+ maxMtuCfg + "-1)" :  "(1-"+ maxMtuCfg + ")";
        setElementInnerHtmlById("IPv4MXURemark", MXURemarkStr);
getElById('IPv4MXU').title = MXURemarkStr;
    }
}

function CheckWanSet(Wan)
{
if(productName == 'HG8110H')
{
if ((Wan.ServiceList.toString().toUpperCase() != "TR069") &amp;&amp; (Wan.ServiceList.toString().toUpperCase() != "VOIP") &amp;&amp; (Wan.ServiceList.toString().toUpperCase() != "TR069_VOIP"))
{
AlertEx(Languages['CantSetInvalidSrv']);
return false;
}
}

return true;
}

function IsBin5IPONLY()
{
if (('IPONLY' == CfgModeWord.toUpperCase()) &amp;&amp; (productName == 'HG8040P'))
{
return true;
}
return false;
}

function ControlIPv4EnableNAT()
{
    var ServiceList = GetCurrentWan().ServiceList.toString().toUpperCase();

    setDisplay("IPv4NatSwitchRow", 0);
    setDisplay("IPv4NatTypeRow", 0);

    if ( (FeatureInfo.LanSsidWanBind == "0") || (IsBin5IPONLY()) )
    {
        return;
    }

    var src = getElementById('ServiceList');
    if(EditFlag.toUpperCase() == "ADD" &amp;&amp; ChangeUISource == src)
    {
        if ( ServiceList.match('INTERNET') || ServiceList.match('IPTV') || ServiceList.match('OTHER') )
        {
            setCheck("IPv4NatSwitch", 1);
        }
        else
        {
            setCheck("IPv4NatSwitch", 0);
        }
    }

    if (GetCurrentWan().Mode.toString().toUpperCase().indexOf("BRIDGED") &gt;= 0)
    {
       setCheck('IPv4NatSwitch', 1);
       return;
    }

if (IsPTVDFFlag == 1)
{
if ( (ServiceList.indexOf("INTERNET") &gt;=0 ) || (ServiceList.indexOf("IPTV") &gt;=0) || (ServiceList.indexOf("OTHER") &gt;=0) || (ServiceList.indexOf("VOIP") &gt;=0))
{
setDisplay("IPv4NatSwitchRow", 1);
if ("1" == GetRunningMode())
{
setDisplay("IPv4NatTypeRow", 0);
}
else
{
setDisplay("IPv4NatTypeRow", 1);
}

if (getCheckVal("IPv4NatSwitch") == "1")
{
setDisable("IPv4NatType", 0);
}
else
{
setDisable("IPv4NatType", 1);
}
}
}
else
{
if ( (ServiceList.indexOf("INTERNET") &gt;=0 ) || (ServiceList.indexOf("IPTV") &gt;=0) || (ServiceList.indexOf("OTHER") &gt;=0))
{
setDisplay("IPv4NatSwitchRow", 1);

if (("1" == GetCfgMode().TELMEX)
||("1" == GetCfgMode().PCCWHK)
||("1" == GetCfgMode().MOBILY)
||("1" == GetRunningMode()))
{
setDisplay("IPv4NatTypeRow", 0);
}
else
{
setDisplay("IPv4NatTypeRow", 1);
}


if (getCheckVal("IPv4NatSwitch") == "1")
{
setDisable("IPv4NatType", 0);
}
else
{
setDisable("IPv4NatType", 1);
}
}
else
{
if (false ==IsE8cFrame())
{
setDisplay("IPv4NatSwitchRow", 1);
}
}
}


if (true == IsCurrentRadioWan())
{
setDisplay("IPv4NatSwitchRow", 0);
setDisplay("IPv4NatTypeRow", 0);
}
}


function ControlVlanId()
{
var VlanId;
    setDisplay("VlanIdRow", 0);
    if (GetCurrentWan().EnableVlan.toString().toUpperCase() == "1")
    {
        setDisplay("VlanIdRow", 1);
if (true == IsCurrentRadioWan())
{
 setDisplay("VlanIdRow", 0);
}
VlanId = GetCurrentWan().VlanId;
if (0 == VlanId)
{
if (GetCurrentBin().toUpperCase() == "E8C")
{
setText('VlanId',1);
}
else if (1 == isSupportVLAN0)
{
setText('VlanId',0);
}
else
        {
setText('VlanId','');
}
}
    }
}


function ControlIPv4VendorId()
{
    setDisplay("IPv4VendorIdRow", 0);
    if (GetCurrentWan().Mode.toString().toUpperCase() == "IP_ROUTED" &amp;&amp; GetCurrentWan().IPv4AddressMode.toString().toUpperCase() == "DHCP")
    {
        setDisplay("IPv4VendorIdRow", 1);
    }

if (true == IsCurrentRadioWan())
{
setDisplay("IPv4VendorIdRow", 0);
}
}

function ControlDscpToPbit()
{
    if(1== DscpFeature)
    {
        var selwanmode=document.getElementById("WanMode").options[document.getElementById("WanMode").selectedIndex].value;
        var optionlen = document.getElementById("PriorityPolicy").options.length;
        if (selwanmode.toString().toUpperCase()=="IP_BRIDGED")
        {
            $("#PriorityPolicy option[value='DscpToPbit']").remove();
        }
        else
        {
            if(optionlen&lt;3)
            {
                $("#PriorityPolicy").append('<option id="3" value="DscpToPbit">' + Languages['DscpToPbit'] + '</option>');
            }
        }
    }
    else
    {
    $("#PriorityPolicy option[value='DscpToPbit']").remove();
    }
}
function ControlIPv4ClientId()
{
    setDisplay("IPv4ClientIdRow", 0);
    if ( (!isE8cAndCMCC()) &amp;&amp; GetCurrentWan().Mode.toString().toUpperCase() == "IP_ROUTED" &amp;&amp; GetCurrentWan().IPv4AddressMode.toString().toUpperCase() == "DHCP")
    {
        setDisplay("IPv4ClientIdRow", 1);
    }

if (true == IsCurrentRadioWan())
{
setDisplay("IPv4ClientIdRow", 0);
}
}

function ControlMultiWanIP()
{
    setDisplay("IPv4IPAddressSecondRow", 0);
    setDisplay("IPv4SubnetMaskSecondRow", 0);
    setDisplay("IPv4IPAddressThirdRow", 0);
    setDisplay("IPv4SubnetMaskThirdRow", 0);
    if(GetCurrentWan().IPv4AddressMode.toString().toUpperCase() != "PPPOE"
        &amp;&amp; MultiWanIpFeature == "1")
    {
        setDisplay("IPv4IPAddressSecondRow", 1);
        setDisplay("IPv4SubnetMaskSecondRow", 1);
        setDisplay("IPv4IPAddressThirdRow", 1);
        setDisplay("IPv4SubnetMaskThirdRow", 1);
    }
}

function ControlIPv4StaticIPAddress()
{
    var IPv4AddressType = GetCurrentWan().IPv4AddressMode.toString().toUpperCase();
    setDisplay("IPv4IPAddressRow", 0);
    setDisplay("IPv4SubnetMaskRow", 0);
    setDisplay("IPv4DefaultGatewayRow", 0);
    setDisplay("IPv4DNSOverrideSwitchRow", 0);
    setDisplay("IPv4PrimaryDNSServerRow", 0);
    setDisplay("IPv4SecondaryDNSServerRow", 0);
    if (IPv4AddressType == "STATIC" &amp;&amp; GetCurrentWan().Mode.toString().toUpperCase() == "IP_ROUTED")
    {
        setDisplay("IPv4IPAddressRow", 1);
        setDisplay("IPv4SubnetMaskRow", 1);
        setDisplay("IPv4DefaultGatewayRow", 1);
        setDisplay("IPv4PrimaryDNSServerRow", 1);
        setDisplay("IPv4SecondaryDNSServerRow", 1);
    }
if (true == IsCurrentRadioWan())
{
setDisplay("IPv4IPAddressRow", 0);
setDisplay("IPv4SubnetMaskRow", 0);
setDisplay("IPv4DefaultGatewayRow", 0);
setDisplay("IPv4PrimaryDNSServerRow", 0);
setDisplay("IPv4SecondaryDNSServerRow", 0);
}
if (isPTVDF == "1" &amp;&amp; GetCurrentWan().IPv4Enable ==1 &amp;&amp; CurrentWan.ServiceList.toUpperCase().indexOf("INTERNET") &gt;= 0)
{
        setDisplay("IPv4PrimaryDNSServerRow", 0);
        setDisplay("IPv4SecondaryDNSServerRow", 0);
setDisplay("wandnsInfoBarRow",1);
setDisplay("sourcemodeRow",1);
setDisplay("primarydnsRow",1);
setDisplay("secondarydnsRow",1);
}
else
{
setDisplay("wandnsInfoBarRow",0);
setDisplay("sourcemodeRow",0);
setDisplay("primarydnsRow",0);
setDisplay("secondarydnsRow",0);
}

}

function  ControlIPv4IGMPEnable()
{
if(0 == ROSTelecomGlobalFeature)
{
setDisplay("IPv4EnableMulticastRow",0);
return ;
}
var Wan = GetCurrentWan();
if((Wan.Mode.toString().toUpperCase().indexOf("ROUTED") &gt;= 0)
&amp;&amp;((Wan.ServiceList.toString().toUpperCase().indexOf("INTERNET") &gt;= 0)
|| (Wan.ServiceList.toString().toUpperCase().indexOf("IPTV") &gt;= 0)
|| (Wan.ServiceList.toString().toUpperCase().indexOf("OTHER") &gt;= 0)))
{
setDisplay("IPv4EnableMulticastRow",1);
}
else
{
setDisplay("IPv4EnableMulticastRow",0);
}
}


function ControlUserName()
{
    var EncapMode = GetCurrentWan().EncapMode.toString().toUpperCase();
    setDisplay("UserNameRow", 0);
    setDisplay("PasswordRow", 0);
setDisplay("PPPAuthenticationProtocolRow", 0);


setDisable("UserName",0);
setDisable("Password",0);

    if (EncapMode == "PPPOE" &amp;&amp; GetCurrentWan().Mode == "IP_Routed")
    {
        setDisplay("UserNameRow", 1);
        setDisplay("PasswordRow", 1);
if (CfgModeWord.toUpperCase()  == 'BHARTI')
{
setDisplay("PPPAuthenticationProtocolRow", 1);
}
    }    

if(DisableNameAndPwd == '1' &amp;&amp; curUserType != '0')
{
setDisable("UserName",1);
setDisable("Password",1);
}  

if( IsOnlyReadWan( GetCurrentWan() ))
    {
setDisable("UserName",1);
setDisable("Password",1);
}

if (true == IsCurrentRadioWan())
{
setDisplay("UserNameRow", 0);
        setDisplay("PasswordRow", 0);
setDisplay("PPPAuthenticationProtocolRow", 0);
}
    if (DSLTELMEXFlag == 1)
    {
        if (getValue("UserName") == "")
        {
            setText("UserName","pppoe1@dsl_dom201");
        }
    }
    
if ((CfgModeWord.toUpperCase()  == 'TOTALPLAY') || (CfgModeWord.toUpperCase()  == 'TOTALPLAY2'))
{
        if (curUserType != '0')
        {
            setDisable("UserName",1);
            setDisable("Password",1);
        }
}  
  
}

function ControlApplyButton(Wan)
{
var DisableButton = false;
       var EncapMode = GetCurrentWan().EncapMode.toString().toUpperCase();

if (!IsAdminUser())
{
if(EncapMode == "PPPOE" &amp;&amp; GetCurrentWan().Mode == "IP_Routed")
{
if(DisableNameAndPwd == '1')
{
DisableButton = true;
}
}
else
{
if(false == IsSonetUser())
{
DisableButton = true;
}
}

if( GetCurrentWan().ServiceList.toString().toUpperCase() =='INTERNET'
&amp;&amp;(GetCfgMode().BJCU == "1" || IsLanBJUNICOM()) )
{
DisableButton = false;
}

if(CfgModeWord.toUpperCase() == 'QTEL')
{
DisableButton = true;
}

if (true == IsCurrentRadioWan())
{
DisableButton = false;
}

if (true == IsLanUpCanOper()) 
{
DisableButton = false;
}
if (GetCfgMode().TRUE == "1") 
{
DisableButton = false;
}
        if (CfgModeWord.toUpperCase() == 'TELECENTRO') 
        {
            DisableButton = false;
        }
}

if(true == Option60DisplayFlag(Wan)
&amp;&amp; ("1" == Wan.EnableOption60))
{
DisableButton = false;
}

setDisable("ButtonApply", DisableButton?1:0);
setDisable("ButtonCancel", DisableButton?1:0);
}

function ControlLcpCheck()
{
    var EncapMode = GetCurrentWan().EncapMode.toString().toUpperCase();
    setDisplay("LcpEchoReqCheckRow", 0);
    if ((!isE8cAndCMCC()) &amp;&amp; EncapMode == "PPPOE" &amp;&amp; GetCurrentWan().Mode == "IP_Routed")
    {
        setDisplay("LcpEchoReqCheckRow", 1);
    }

if (true == IsCurrentRadioWan())
{
setDisplay("LcpEchoReqCheckRow", 0);
}
}

function IPv4DialModetoManul()
{
var Wan = GetPageData();
if (Wan.domain.length &gt; 10 &amp;&amp; Wan.IPv4DialMode.toUpperCase() == "MANUAL")
{
var i = 0;
for (i = 0; i &lt; GetWanList().length; i++)
{
if (GetWanList()[i].domain == Wan.domain)
{
break;
}
}

if (GetWanList()[i].IPv4DialMode.toUpperCase()== "ONDEMAND" || GetWanList()[i].IPv4DialMode.toUpperCase()== "ALWAYSON")
{
return true;
}
}
return false;
}

function ControlIPv4Dial()
{
    setDisplay("IPv4DialModeRow", 0);
    setDisplay("IPv4DialIdleTimeRow", 0);
    setDisplay("IPv4IdleDisconnectModeRow", 0);
setDisplay("IPv4DialConnectManualRow", 0); 

    if (GetCurrentWan().Mode.toString().toUpperCase() != "IP_ROUTED")
    {
        return;
    }

    if (GetCurrentWan().IPv4AddressMode.toString().toUpperCase() != "PPPOE")
    {
        return;
    }


    var ServiceList = GetCurrentWan().ServiceList.toString().toUpperCase();
    if (GetCfgMode().BJUNICOM == "1")
    {
        if (ServiceList != "INTERNET" &amp;&amp; ServiceList != "OTHER")
        {
            return;
        }
    }
    else
    {
        if (ServiceList != "INTERNET")
        {
            return;
        }
    }

    setDisplay("IPv4DialModeRow", 1);

if(GetCfgMode().BJUNICOM == "1")
{
document.getElementById("IPv4DialModeCol").title = Languages['IPv4DialModeDes'];
}

    if (GetCurrentWan().IPv4DialMode.toString().toUpperCase() == "ONDEMAND")
    {
        setDisplay("IPv4DialIdleTimeRow", 1);
        setDisplay("IPv4IdleDisconnectModeRow",1);

        if(GetCurrentWan().IPv4NATEnable.toString().toUpperCase() != "1")
        {
           setDisplay("IPv4IdleDisconnectModeRow",0);
        }
        if(SetIdleDisconnectMode == "1")
        {
            setDisable("IPv4IdleDisconnectMode", 1);
            setSelect("IPv4IdleDisconnectMode", "DetectUpstream");
        }
if ("1" == supportTelmex)
{
setDisplay("IPv4IdleDisconnectModeRow",0);
}

    }

if (true == IsCurrentRadioWan())
{
setDisplay("IPv4DialModeRow", 0);
setDisplay("IPv4DialIdleTimeRow", 0);
setDisplay("IPv4IdleDisconnectModeRow", 0);
}

if(GetCurrentWan().IPv4DialMode.toString().toUpperCase() == "MANUAL" &amp;&amp; GetCurrentWan().Enable == "1"
&amp;&amp; EditFlag.toUpperCase() == "EDIT" &amp;&amp; IPv4DialModetoManul() != true &amp;&amp; GetCfgMode().BJUNICOM == "1")
{
var connectionFlag = GetCurrentWan().ConnectionControl;
var disconnectionFlag = (connectionFlag == "0")?"1":"0";

setDisable("IPv4DialConnectManual1",connectionFlag);
setDisable("IPv4DialConnectManual2",disconnectionFlag);
setText("IPv4DialConnectManual1",Languages['IPv4ManualConnect']);
setText("IPv4DialConnectManual2",Languages['IPv4ManualDisonnect']);
setDisplay("IPv4DialConnectManualRow", 1);

}
}

function OnConnectionButton(ControlObject)
{
var Wan = GetCurrentWan();
var ctrFlag = (ControlObject.id == "IPv4DialConnectManual1")?"1":"0";
var connectionFlag = Wan.ConnectionControl;

if(ctrFlag == connectionFlag)
{
return;
}
OnConnectionControlButtonCU(ControlObject,Wan.domain,ctrFlag);
}


function ControlMVlan(IPvx)
{
    var Wan = GetCurrentWan();
    setDisplay(IPvx+"WanMVlanIdRow", 1);

    if ( '0' == FeatureInfo.RouteWanMulticastIPoE &amp;&amp; "IP_ROUTED" == Wan.Mode.toString().toUpperCase())
    {
        setDisplay(IPvx+"WanMVlanIdRow", 0);
        return;
    }
    if ('0' == FeatureInfo.BridgeWanMulticast &amp;&amp; ("IP_BRIDGED" == Wan.Mode.toString().toUpperCase() || "PPPOE_BRIDGED" == Wan.Mode.toString().toUpperCase()))
    {
        setDisplay(IPvx+"WanMVlanIdRow", 0);
        return;
    }

if((productName == 'HG8240') &amp;&amp; ("IP_ROUTED" == Wan.Mode.toString().toUpperCase()))
{
setDisplay(IPvx+"WanMVlanIdRow", 0);
return;
}

    if ((Wan.ServiceList =="TR069") || (Wan.ServiceList == "VOIP")
         || (Wan.ServiceList =="TR069_VOIP"))
    {
        setDisplay(IPvx+"WanMVlanIdRow",0);
        return;
    }
    else
    {
        setDisplay(IPvx+"WanMVlanIdRow",1);
    }

var WanProtocolType = GetCurrentWan().ProtocolType.toString();
var WanIPv6DSLite = GetCurrentWan().IPv6DSLite.toString();
if (WanProtocolType == "IPv6")
{
if((WanIPv6DSLite != "Off")
&amp;&amp;('COMMON' != CfgModeWord.toUpperCase())
&amp;&amp;('COMMON2' != CfgModeWord.toUpperCase())
&amp;&amp;(GetCfgMode().OSK != "1"))
{
setDisplay(IPvx+"WanMVlanIdRow", 0);
return;
}
else
{
setDisplay(IPvx+"WanMVlanIdRow",1);
}
}

if (true == IsCurrentRadioWan())
{
setDisplay(IPvx+"WanMVlanIdRow", 0);
}

if (Is3TMode())
{
if (WanProtocolType == "IPv4/IPv6")
{
setDisplay("IPv4v6"+"WanMVlanIdRow",1);
setDisplay("IPv4"+"WanMVlanIdRow",0);
setDisplay("IPv6"+"WanMVlanIdRow",0);
}
else
{
setDisplay("IPv4v6"+"WanMVlanIdRow",0);
}
}
}

function BirdgetoRoute()
{
var Wan = GetPageData();
if (Wan.domain.length &gt; 10 &amp;&amp; Wan.Mode == "IP_Routed")
{
var i = 0;
for (i = 0; i &lt; GetWanList().length; i++)
{
if (GetWanList()[i].domain == Wan.domain)
{
break;
}
}

if (GetWanList()[i].Mode.toUpperCase().indexOf("BRIDGE") &gt;= 0)
{
return true;
}
}
return false;
}

function ControlIPv4AddressType()
{
    var Wan = GetCurrentWan();

    setDisplay("IPv4AddressModeRow", 1);
    if (Wan.Mode.toString().toUpperCase() != "IP_ROUTED")
    {
        setDisplay("IPv4AddressModeRow", 0);
        return;
    }

    setDisable("IPv4AddressMode1", 1);
    setDisable("IPv4AddressMode2", 1);
    setDisable("IPv4AddressMode3", 1);

    if (Wan.EncapMode.toString().toUpperCase() == "IPOE")
    {
        setDisable("IPv4AddressMode1", 0);
        setDisable("IPv4AddressMode2", 0);

        if ((Wan.IPv4AddressMode.toString().toUpperCase() != "STATIC")
        &amp;&amp; (Wan.IPv4AddressMode.toString().toUpperCase() != "DHCP"))
        {
            setCheck("IPv4AddressMode2", 1);
            Wan.IPv4AddressMode = "DHCP";
        }
if((BirdgetoRoute() == true) &amp;&amp; (Wan.IPv4AddressMode.toString().toUpperCase() == "STATIC"))
{
if(getElById("IPv4IPAddress").value == '0.0.0.0')
{
setText('IPv4IPAddress','');
}
if(getElById("IPv4SubnetMask").value == '0.0.0.0')
{
setText('IPv4SubnetMask','');
}
if(getElById("IPv4DefaultGateway").value == '0.0.0.0')
{
setText('IPv4DefaultGateway','');
}
}
    }

    else if (Wan.EncapMode.toString().toUpperCase() == "PPPOE")
    {
        setDisable("IPv4AddressMode3", 0);
        setCheck("IPv4AddressMode3", 1);
        Wan.IPv4AddressMode = "PPPoE";
    }
}

function DisplayUpport()
{
if (UpportDetectFlag == 1)
{
for(var i = 1; i &lt;= TopoInfoList[0].EthNum; i++)
{
if(UpUserPortID == i)
{
setDisplay("DivIPv4BindLanList"+i, 0);
}
else
{
setDisplay("DivIPv4BindLanList"+i, 1);
}
}
}

if (PonUpportConfig == 1)
{
var  MainUpPort = PortConfigInfo.X_HW_MainUpPort;
    for(var i = 1; i &lt;= TopoInfoList[0].EthNum; i++)
{
if(MainUpPort.indexOf("LAN") &gt;= 0 &amp;&amp; parseInt(MainUpPort.substr(3)) == i)
{
setDisable("IPv4BindLanList"+i, 1);
}
}
}
}

function ControlIPv4LanWanBind()
{
    var Wan = GetCurrentWan();
    var ISPPortList = GetISPPortList();

    if (FeatureInfo.LanSsidWanBind == "0")
    {
        setDisplay('IPv4BindLanListRow',0);
        return;
    }

    for (var i = 1; i &lt;= parseInt(TopoInfo.EthNum); i++)
    {
        if (IsL3Mode(i) != "1")
        {
            setDisable("IPv4BindLanList"+i, 1);
        }
    }

    if ('JSCMCC' == CfgModeWord.toUpperCase() &amp;&amp; curUserType == 0)
    {
         for (var i = 1; i &lt;= parseInt(TopoInfo.EthNum); i++)
         {
            if (IsL3Mode(i) == "1")
            {
                setDisable("IPv4BindLanList"+i, 0);
            }
        }
    }

    for (var i = parseInt(TopoInfo.EthNum)+1; i &lt;= 8; i++)
    {
        setDisplay("DivIPv4BindLanList"+i, 0);
    }



if (1 != DoubleFreqFlag)
{
    for (var i = parseInt(TopoInfo.SSIDNum)+9; i &lt;= 16; i++)
    {
        setDisplay("DivIPv4BindLanList"+i, 0);
    }
}
if(true == IsFreInSsidName())
{
for(var k = (LanNum+1); k &lt;= (LanNum+SsidNum+1); k++)
{
setDisplay("DivIPv4BindLanList"+k, 0);
}
var SL = GetSSIDFreList();
for(var i = 0; i &lt; SL.length; i++)
        {
    for(var j = 1; j &lt; (LanNum+1); j++)
{
if(j == getWlanInstFromDomain(SL[i].domain))
    {
if(j &lt;= (SsidNum/2))
{
   setDisplay("DivIPv4BindLanList"+(j+LanNum), 1);
}
else
{
   setDisplay("DivIPv4BindLanList"+(j+LanNum+1), 1);
}
break;
    }
}
        }
}

if(1 == DoubleFreqFlag)
{
for (var i = 0; i &lt; WlanList.length; i++)
{
var tid = parseInt(i+LanNum+1);
if((true == IsFreInSsidName()) &amp;&amp; (i &gt;= (SsidNum/2)))
{
   tid = tid +1;
}
if (WlanList[i].bindenable == "0")
{
setDisable("IPv4BindLanList"+tid, 1);
}
if (WlanList[i].bindenable == "1" &amp;&amp; 'JSCMCC' == CfgModeWord.toUpperCase() &amp;&amp; curUserType == 0)
            {
                setDisable("IPv4BindLanList"+tid, 0);
            }

for (var j = 0; j &lt; WlanListTotal.length -1; j++)
{
    var WlanCapability = WlanListTotal[j].X_HW_RFBand;
    var WlanSsid = WlanListTotal[j].ssid;
    var WlanInst = WlanListTotal[j].WlanInst;
if((true == IsFreInSsidName()) &amp;&amp; (WlanInst &gt; (SsidNum/2)))
    {
       WlanInst = WlanInst +1;
    }
    if((WlanList[i].bindenable == "1")&amp;&amp;(enbl5G != 1))
    {
                    if (-1 != WlanCapability.indexOf("5G"))
    {
    setDisable("IPv4BindLanList"+(WlanInst+8), 1);
    }
    if (-1 == WlanCapability.indexOf("5G") &amp;&amp; 'JSCMCC' == CfgModeWord.toUpperCase() &amp;&amp; curUserType == 0)
                    {
                        setDisable("IPv4BindLanList"+(WlanInst+8), 0);
                    }
    }

    if((WlanList[i].bindenable == "1")&amp;&amp;(enbl2G != 1))
    {
    if (-1 != WlanCapability.indexOf("2.4G"))
    {
    setDisable("IPv4BindLanList"+(WlanInst+8), 1);
    }
    if (-1 == WlanCapability.indexOf("2.4G") &amp;&amp; 'JSCMCC' == CfgModeWord.toUpperCase() &amp;&amp; curUserType == 0)
                    {
                        setDisable("IPv4BindLanList"+(WlanInst+8), 0);
                    }
}
}
}
}
else
{
for (var i = 0; i &lt; WlanList.length; i++)
{
var tid = parseInt(i+1+4+4);
if (WlanList[i].bindenable == "0")
{
setDisable("IPv4BindLanList"+tid, 1);
}
else if (WlanList[i].bindenable == "1" &amp;&amp; 'JSCMCC' == CfgModeWord.toUpperCase() &amp;&amp; curUserType == 0)
{
    setDisable("IPv4BindLanList"+tid, 0);
}
}
}

if(ISPPortList.length &gt; 0)
    {
        for (var i = 1; i &lt;= parseInt(TopoInfo.SSIDNum); i++)
        {
            var pos = ArrayIndexOf(ISPPortList, 'SSID'+i);
            if(pos &gt;= 0)
            {
                var DivID = i + 4 + 4;
if((true == IsFreInSsidName()) &amp;&amp; (i &gt; (SsidNum/2)))
    {
       DivID = DivID +1;
    }
                if (GetISPWanOnlyRead())
                {
                    setDisable("IPv4BindLanList"+DivID, 1);
                }
                else
                {
                    setDisplay("DivIPv4BindLanList"+DivID, 0);
    if ('JSCMCC' == CfgModeWord.toUpperCase() &amp;&amp; curUserType == 0)
                    {
                        setDisplay("DivIPv4BindLanList"+DivID, 1);
                        setDisable("IPv4BindLanList"+DivID, 1);
                    }
                }
            }
        }
    }
for (var i = 1; i &lt;= parseInt(TopoInfo.SSIDNum); i++)
    {
        if (true == IsRDSGatewayUserSsid(i))
        {
            var DivID = i + 4 + 4;
if((true == IsFreInSsidName()) &amp;&amp; (i &gt; (SsidNum/2)))
{
    DivID = DivID +1;
}
            setDisplay("DivIPv4BindLanList"+DivID, 0);
        }
    }

    setDisplay('IPv4BindLanListRow',0);
    if (Wan.ServiceList.match("INTERNET")
     || Wan.ServiceList.match("OTHER")
 || Wan.ServiceList.match("IPTV"))
 {
    setDisplay('IPv4BindLanListRow',1);
 }

if (true == IsCurrentRadioWan())
{
setDisplay('IPv4BindLanListRow',0);
}
DisplayUpport();
}


function ControlIPv6PrefixAcquireMode()
{
    var WanMode = GetCurrentWan().Mode.toString().toUpperCase();

    setDisplay("IPv6PrefixModeRow", 0);
    if (WanMode == "IP_ROUTED")
    {
        setDisplay("IPv6PrefixModeRow", 1);
    }

 if (true == IsCurrentRadioWan())
 {
 setDisplay("IPv6PrefixModeRow", 0);
 }
}


function Control6RDParametersDisplay(Wan)
{
    var servicetypeIsMatch = (-1 != Wan.ServiceList.indexOf("INTERNET")) || (-1 != Wan.ServiceList.indexOf("IPTV")) || (-1 != Wan.ServiceList.indexOf("OTHER"));

    setDisplay("RDModeRow", 0);
    setDisplay("RdPrefixRow", 0);
    setDisplay("RdPrefixLenRow", 0);
    setDisplay("RdBRIPv4AddressRow", 0);
    setDisplay("RdIPv4MaskLenRow", 0);

    if( (1 == Wan.IPv4Enable) &amp;&amp; (0 == Wan.IPv6Enable) &amp;&amp; (Wan.Mode.toString().toUpperCase() == "IP_ROUTED") &amp;&amp;
        (true == servicetypeIsMatch)&amp;&amp;(true == Is6RdSupported()) ){

setDisplay("RDModeRow", 1);

if ("STATIC" == Wan.RdMode.toString().toUpperCase())
{
setDisplay("RdPrefixRow", 1);
setDisplay("RdPrefixLenRow", 1);
setDisplay("RdBRIPv4AddressRow",1);
setDisplay("RdIPv4MaskLenRow", 1);
}

setDisableByName("RDMode", 0);
setDisable("RdPrefix", 0);
setDisable("RdPrefixLen", 0);
setDisable("RdBRIPv4Address", 0);
setDisable("RdIPv4MaskLen", 0);
for(var i = 0; i &lt; GetWanList().length;i++)
{
if( GetWanList()[i].Enable6Rd != "0" &amp;&amp; GetWanList()[i].domain != GetCurrentWan().domain)
{
setDisableByName("RDMode", 1);
setDisable("RdPrefix", 1);
setDisable("RdPrefixLen", 1);
setDisable("RdBRIPv4Address", 1);
setDisable("RdIPv4MaskLen", 1);
}
}

if(Wan.IPv4AddressMode.toString().toUpperCase() != 'DHCP')
{
setDisable("RDMode2", 1);
}
    }

if (true == IsCurrentRadioWan())
{
setDisplay("RDModeRow", 0);
setDisplay("RdPrefixRow", 0);
setDisplay("RdPrefixLenRow", 0);
setDisplay("RdBRIPv4AddressRow", 0);
setDisplay("RdIPv4MaskLenRow", 0);
}
}

function ControlIPv6Prefix()
{
    var IPv6StaticPrefix = GetCurrentWan().IPv6PrefixMode.toString().toUpperCase();
    var WanMode = GetCurrentWan().Mode.toString().toUpperCase();

    setDisplay("IPv6StaticPrefixRow", 0);
    if (IPv6StaticPrefix == "STATIC" &amp;&amp; WanMode == "IP_ROUTED")
    {
        setDisplay("IPv6StaticPrefixRow", 1);
    }
}


function ControlIPv6AddressAcquireMode()
{
    var WanMode = GetCurrentWan().Mode.toString().toUpperCase();

    setDisplay("IPv6AddressModeRow", 0);
    setDisplay("TDEIPv6UnnumberedModelRow", 0);
    setDisplay("TDEDHCP6cForAddressRow", 0);
    setDisplay("TDEIPv6AddressingTypeRow", 0);

    if (WanMode == "IP_ROUTED")
    {
        if (1 == TDE2ModeFlag)
        {
            setDisplay("TDEIPv6UnnumberedModelRow", 1);
            setDisplay("TDEDHCP6cForAddressRow", 1);
            setDisplay("TDEIPv6AddressingTypeRow", 1);
        }
        else
        {
            setDisplay("IPv6AddressModeRow", 1);
        }
    }
}


function ControlIPv6ReservedPrefixAddress()
{
var IPv6AddressType = GetCurrentWan().IPv6AddressMode.toString().toUpperCase();
var WanMode = GetCurrentWan().Mode.toString().toUpperCase();

setDisplay("IPv6ReserveAddressRow", 0);

    if(!isE8cAndCMCC())
{
if ((CurrentWan.EncapMode.toString().toUpperCase() == "IPOE") &amp;&amp; (IPv6AddressType.toUpperCase() == "NONE") &amp;&amp; (WanMode == "IP_ROUTED"))
{
setDisplay("IPv6ReserveAddressRow", 1);
}
}

if (true == IsCurrentRadioWan())
{
setDisplay("IPv6ReserveAddressRow", 0);
}
}

function ControlIPv6StaticIPAddress()
{
    var IPv6AddressType = GetCurrentWan().IPv6AddressMode.toString().toUpperCase();
    var WanMode = GetCurrentWan().Mode.toString().toUpperCase();

    setDisplay("IPv6IPAddressRow", 0);
    setDisplay("IPv6AddrMaskLenE8cRow", 0);
    setDisplay("IPv6GatewayE8cRow", 0);
    setDisplay("IPv6SubnetMaskRow", 0);
    setDisplay("IPv6DefaultGatewayRow", 0);
    setDisplay("IPv6PrimaryDNSServerRow", 0);
    setDisplay("IPv6SecondaryDNSServerRow", 0);

    if (IPv6AddressType == "STATIC" &amp;&amp; WanMode == "IP_ROUTED")
    {
        setDisplay("IPv6IPAddressRow", 1);
        setDisplay("IPv6AddrMaskLenE8cRow", 1);
        setDisplay("IPv6GatewayE8cRow", 1);
        setDisplay("IPv6SubnetMaskRow", 1);
        setDisplay("IPv6DefaultGatewayRow", 1);
        setDisplay("IPv6PrimaryDNSServerRow", 1);
        setDisplay("IPv6SecondaryDNSServerRow", 1);
if(IsPTVDFFlag == "1")
{
setDisplay("IPv6PrimaryDNSServerRow", 1);
setDisplay("IPv6SecondaryDNSServerRow", 1);
setDisable("IPv6PrimaryDNSServer",1);
setDisable("IPv6SecondaryDNSServer",1);

document.getElementById("IPV6sourcemode1").checked =true;
document.getElementById("IPV6sourcemode2").checked =false;

setText("IPv6PrimaryDNSServer","");
setText("IPv6SecondaryDNSServer","");
}
    }
    if(IsPTVDFFlag == "1")
{
if ( IPv6AddressType == "DHCPV6" &amp;&amp; WanMode == "IP_ROUTED" || IPv6AddressType == "AUTOCONFIGURED" &amp;&amp; WanMode == "IP_ROUTED" || IPv6AddressType == "NONE" &amp;&amp; WanMode == "IP_ROUTED")
{
setDisplay("IPv6PrimaryDNSServerRow", 1);
setDisplay("IPv6SecondaryDNSServerRow", 1);
setDisable("IPv6PrimaryDNSServer",1);
setDisable("IPv6SecondaryDNSServer",1);

document.getElementById("IPV6sourcemode1").checked =true;
document.getElementById("IPV6sourcemode2").checked =false;

setText("IPv6PrimaryDNSServer","");
setText("IPv6SecondaryDNSServer","");
}
}


if (true == IsCurrentRadioWan())
{
setDisplay("IPv6IPAddressRow", 0);
setDisplay("IPv6AddrMaskLenE8cRow", 0);
setDisplay("IPv6GatewayE8cRow", 0);
setDisplay("IPv6SubnetMaskRow", 0);
setDisplay("IPv6DefaultGatewayRow", 0);
setDisplay("IPv6PrimaryDNSServerRow", 0);
setDisplay("IPv6SecondaryDNSServerRow", 0);
}

}

function ControlIPv6IPAddressStuff()
{
    setDisplay("IPv6AddressStuffRow", "0");
    var IPv6AddressType = GetCurrentWan().IPv6AddressMode.toString().toUpperCase();
    var ProtocolType = GetCurrentWan().ProtocolType.toString().toUpperCase();
    var WanMode = GetCurrentWan().Mode.toString().toUpperCase();

    if (ProtocolType == "IPV4")
    {
        return;
    }

    if (IPv6AddressType != "AUTOCONFIGURED")
    {
        return;
    }

    if (WanMode != "IP_ROUTED")
    {
        return;
    }
    setDisplay("IPv6AddressStuffRow", "1");

if (true == IsCurrentRadioWan())
{
setDisplay("IPv6AddressStuffRow", "0");
}
}

function setDisableByName(Name, Disable)
{
    var List = document.getElementsByName(Name);
    for (var i = 0; i &lt; List.length; i++)
    {
        setDisable(List[i].id, Disable);
    }
}

function ControlEditMode()
{
    var Disable = 0;
    var Wan = GetPageData();

    setDisableByName("EncapMode", EditFlag.toUpperCase() == "ADD" ? 0 : 1);

    if (!((SonetFlag == '1') &amp;&amp; curUserType == '0'))
{
setDisable("ProtocolType", EditFlag.toUpperCase() == "ADD" ? 0 : 1);
}
if (Tdefeature == 1)
{
    setDisable("ProtocolType", 0);
}

    setDisable("WanMode", 0);
    if((Disable) &amp;&amp; (bin3board() == true))
    {
        setDisable("WanMode", 1);
    }
    setDisable("IPv4MXU", 0);
    setDisable("ServiceList", EditFlag.toUpperCase() == "ADD" ? 0 : 1);

if("TELMEXACCESS" == CfgModeWord.toUpperCase() || "TELMEXRESALE" == CfgModeWord.toUpperCase())
{

if(Wan.Mode.toUpperCase().toUpperCase().indexOf("ROUTED") &gt;= 0)
{
setDisable("ServiceList", 1);
}
else
{
setDisable("ServiceList", 0);
}
setDisable("ProtocolType", 1);
}

    if (("1" == RadioWanFeature) &amp;&amp; (!IsXdProduct()))
{
if ((EditFlag.toUpperCase() == "ADD") &amp;&amp; (AddType == 1))
{
setDisable("AccessType",0);
}
else
{
setDisable("AccessType",1);
}
}
    setDisableByName("IPv4AddressMode", Disable);
    setDisableByName("IPv6PrefixMode", Disable);

    if (1 == TDE2ModeFlag)
    {
        setDisable("TDEIPv6AddressingType", Disable);
        setDisable("TDEIPv6UnnumberedModel", Disable);
        setDisable("TDEDHCP6cForAddress", Disable);
    }
    else
    {
        setDisableByName("IPv6AddressMode", Disable);
    }

    setDisable("IPv6IPAddress", Disable);
    setDisable("IPv6AddrMaskLenE8c", Disable);
    setDisable("IPv6GatewayE8c", Disable);
setDisable("IPv6ReserveAddress", Disable);
    setDisable("IPv6StaticPrefix", Disable);
    setDisable("IPv6AddressStuff", Disable);
    if (GetCurrentWan().IPv4AddressMode.toString().toUpperCase() != "PPPOE")
{
setDisable("IPv4AddressMode3", 1);
}
else
{
setDisable("IPv4AddressMode1", 1);
setDisable("IPv4AddressMode2", 1);
}

if (AddType == 2 &amp;&amp; EditFlag.toUpperCase() == "ADD")
{
        var SessionVlanLimit  = "1";
        if (SessionVlanLimit == 1)
        {
    setDisable('VlanSwitch', 1);
            setDisable('VlanId', 1);
    setDisable('PriorityPolicy', 1);
                setDisable('VlanPriority', 1);
    setDisable('DefaultVlanPriority', 1);
}

}

if (Wan.domain.length &gt; 10 &amp;&amp; Wan.Mode == "IP_Routed")
{
var i = 0;
for (i = 0; i &lt; GetWanList().length; i++)
{
if (GetWanList()[i].domain == Wan.domain)
{
break;
}
}
var IPv6StaticPrefix = GetCurrentWan().IPv6PrefixMode.toString().toUpperCase();
        var IPv6StaticAdress = GetCurrentWan().IPv6AddressMode.toString().toUpperCase();
if (GetWanList()[i].Mode.toUpperCase().indexOf("BRIDGE") &gt;= 0 )
{
setDisableByName("IPv6PrefixMode", 0);

if (IPv6StaticPrefix == "STATIC")
{
setDisable("IPv6StaticPrefix", 0);
}

setDisableByName("IPv6AddressMode",0);
setDisable("TDEIPv6AddressingType",0);
setDisable("TDEIPv6UnnumberedModel",0);
setDisable("TDEDHCP6cForAddress",0);

if (IPv6StaticAdress == "STATIC")
{
setDisable("IPv6IPAddress", 0);
setDisable("IPv6AddrMaskLenE8c", 0);
                setDisable("IPv6GatewayE8c", 0);
}

if (IPv6StaticAdress == "AUTOCONFIGURED")
{
setDisable("IPv6AddressStuff", 0);
}
}
}

}

function DisableUserMode(Disable)
{
    setDisable("WanSwitch", Disable);
    setDisableByName("EncapMode", Disable);
    setDisable("ProtocolType", Disable);
    setDisable("WanMode", Disable);
    setDisable("IPv4MXU", Disable);
    setDisable("ServiceList", Disable);
    setDisable("VlanSwitch", Disable);
    setDisable("VlanId", Disable);
    setDisable("VlanPriority", Disable);
    setDisable("PriorityPolicy", Disable);
    setDisableByName("IPv4AddressMode", Disable);
    setDisable("IPv4MXU", Disable);
    setDisable("IPv4NatSwitch", Disable);
if(false == IsSonetUser())
{
    setDisable("IPv4NatType", Disable);
}
    setDisable("LanDhcpSwitch", Disable);

setDisable("IPv4v6WanMVlanId", Disable);

    setDisable("IPv4VendorId", Disable);
    setDisable("IPv4ClientId", Disable);
    setDisable("IPv4IPAddress", Disable);
    setDisable("IPv4SubnetMask", Disable);
    setDisable("IPv4DefaultGateway", Disable);
    setDisable("IPv4DNSOverrideSwitch", Disable);
    setDisable("IPv4PrimaryDNSServer", Disable);
    setDisable("IPv4SecondaryDNSServer", Disable);
    setDisable("LcpEchoReqCheck", Disable);
    setDisable("IPv4DialMode", Disable);
    setDisable("IPv4DialIdleTime", Disable);
    setDisable("IPv4IdleDisconnectMode", Disable);
    setDisable("IPv4WanMVlanId", Disable);
    setDisableByName("IPv4BindLanList", Disable);
    setDisableByName("IPv6PrefixMode", Disable);
    setDisableByName("IPv6DSLite", Disable);
    setDisable("IPv6AFTRName", Disable);
    setDisable("IPv6StaticPrefix", Disable);
    setDisableByName("IPv6AddressMode", Disable);
    setDisable("TDEIPv6AddressingType", Disable);
    setDisable("TDEIPv6UnnumberedModel", Disable);
    setDisable("TDEDHCP6cForAddress", Disable);
    setDisable("IPv6AddressStuff", Disable);
    setDisable("IPv6IPAddress", Disable);
    setDisable("IPv6AddrMaskLenE8c", Disable);
    setDisable("IPv6GatewayE8c", Disable);
    setDisable("IPv6ReserveAddress", Disable);
    setDisable("IPv6SubnetMask", Disable);
    setDisable("IPv6DefaultGateway", Disable);
    setDisable("IPv6PrimaryDNSServer", Disable);
    setDisable("IPv6SecondaryDNSServer", Disable);
    setDisable("IPv6WanMVlanId", Disable);
    setDisable("PriorityPolicy", Disable);
    setDisable("DefaultVlanPriority", Disable);
setDisableByName("RDMode", Disable);
setDisable("RdPrefix", Disable);
setDisable("RdPrefixLen", Disable);
setDisable("RdBRIPv4Address", Disable);
setDisable("RdIPv4MaskLen", Disable);
setDisable("IPv4EnableMulticast", Disable);
    if (("1" == RadioWanFeature) &amp;&amp; (!IsXdProduct()))
{
setDisable("AccessType", Disable);
}
if (GetCfgMode().TRUE == "1")
{
setDisable("WanMode", 0);
}
}

function ControlUserMode()
{
var Disable = '';
if (IsAdminUser() == true)
{
Disable = 0;
}
else
{
if (IsLanUpCanOper() == true)
{
Disable = 0;
}
else
{
Disable = 1;
}
}

DisableUserMode(Disable);
}


function ControlPageByEditModeAndUser()
{
    var Wan = GetCurrentWan();
    if ('JSCMCC' == CfgModeWord.toUpperCase() &amp;&amp; Wan.VlanId == 4031 &amp;&amp; Wan.ServiceList == 'OTHER' &amp;&amp; Wan.EncapMode == 'PPPoE' &amp;&amp; IsWanHidden(domainTowanname(Wan.domain)) == true)
    {
DisableUserMode(0);
    }
    if (IsAdminUser())
    {
if ('JSCMCC' == CfgModeWord.toUpperCase() &amp;&amp; Wan.VlanId == 4031 &amp;&amp; Wan.ServiceList == 'OTHER' &amp;&amp; Wan.EncapMode == 'PPPoE' &amp;&amp; IsWanHidden(domainTowanname(Wan.domain)) == true)
{
     DisableUserMode(1);
 setDisable("ButtonApply", 1);
     setDisable("ButtonCancel", 1);
}
else if(IsOnlyReadWan(Wan))
{
DisableUserMode(1);
    setDisable("ButtonApply", 1);
    setDisable("ButtonCancel", 1);
}
else
{
            ControlEditMode();
}
    }
    else
    {
if (true == IsLanUpCanOper())
{
ControlEditMode();
}
else
{
ControlUserMode();
}
}

}

function E8CCheckDisable(Wan)
{
setDisable('WanSwitch', 0);
setDisable('VlanSwitch', 0);
setDisable('VlanId', 0);
setDisable('VlanPriority', 0);
setDisable("PriorityPolicy", 0);
setDisable('IPv4VendorId', 0);
setDisable('IPv4ClientId', 0);
setDisable('IPv4NatSwitch',0);
    setDisable('IPv4NatType',0);
setDisable('IPv4WanMVlanId',0);
setDisable('Option60Enable', 0);
setDisable('IPoEUserName', 0);
setDisable('IPoEPassword', 0);

if(!isReadModeForTR069Wan())
{
return;
}

setDisable("IPv4BindLanListCol", 0);
    if ((Wan.ServiceList.indexOf("TR069") &gt;= 0) &amp;&amp; (Wan.ServiceList.indexOf("INTERNET") &lt; 0))
{
setDisable("IPv4BindLanListCol", 1);
}

    if (EditFlag.toUpperCase() == "ADD")
{
return;
}
else
{
if(!IsOriginalTr069Type())
{
return;
}
}

if ((Wan.ServiceList == "TR069") || (Wan.ServiceList == "TR069_VOIP"))
{
setDisable('WanSwitch', 1);
setDisable('VlanSwitch', 1);
setDisable('VlanId', 1);
setDisable('VlanPriority', 1);
setDisable("PriorityPolicy", 1);
setDisable('IPv4VendorId', 1);
setDisable('IPv4ClientId', 1);
setDisable('IPv4NatSwitch',1);
setDisable('IPv4NatType',1);
return;
}

if ((Wan.ServiceList == "TR069_INTERNET") || (Wan.ServiceList == "TR069_VOIP_INTERNET"))
{
setDisable('WanSwitch', 1);
setDisable('VlanSwitch', 1);
setDisable('VlanId', 1);
setDisable('VlanPriority', 1);
setDisable("PriorityPolicy", 1);
setDisable('IPv4VendorId', 1);
setDisable('IPv4ClientId', 1);
setDisable('IPv4NatSwitch',1);
        setDisable('IPv4NatType',1);
setDisable('IPv4WanMVlanId',1);
return;
}
}

function E8Ctr069CheckDisable(Wan)
{
if(!isReadModeForTR069Wan())
{
return;
}

    if (EditFlag.toUpperCase() == "ADD")
{
return;
}
else
{
if(!IsOriginalTr069Type())
{
return;
}
}

if ((Wan.ServiceList == "TR069") || (Wan.ServiceList == "TR069_VOIP") || (Wan.ServiceList == "TR069_INTERNET") || (Wan.ServiceList == "TR069_VOIP_INTERNET"))
{
setDisable("WanMode", 1);
setDisable("IPv4MXU", 1);
        setDisable("ProtocolType", 1);
        setDisable("ServiceList", 1);
        setDisableByName("IPv4AddressMode", 1);
setDisable("UserName", 1);
        setDisable("Password", 1);
return;
}
}

function ControlIPv6DSLite()
{
var WanMode = GetCurrentWan().Mode.toString().toUpperCase();

    setDisplay("IPv6DSLiteRow", 0);

if((GetFeatureInfo().Dslite == "0") || (1 == GetCurrentWan().IPv4Enable))
    {
        return;
    }
if (WanMode != "IP_ROUTED")
    {
        return;
    }
setDisplay("IPv6DSLiteRow", 1);
if (true == IsCurrentRadioWan())
{
 setDisplay("IPv6DSLiteRow", 0);
}

setDisableByName("IPv6DSLite", 0);
for(var i = 0; i &lt; GetWanList().length;i++)
{
    if( GetWanList()[i].IPv6DSLite.toString() != "Off" &amp;&amp; GetWanList()[i].domain != GetCurrentWan().domain)
{
    setDisableByName("IPv6DSLite", 1);
}
}
}

function ControlIPv6AFTRName()
{
var WanMode = GetCurrentWan().Mode.toString().toUpperCase();
var WanIPv6DSLite = GetCurrentWan().IPv6DSLite.toString();

    setDisplay("IPv6AFTRNameRow", 0);
    if((GetFeatureInfo().Dslite == "0") || (1 == GetCurrentWan().IPv4Enable))
    {
        return;
    }
if (WanMode != "IP_ROUTED")
    {
        return;
    }
setDisplay("IPv6AFTRNameRow", 1);

if (true == IsCurrentRadioWan())
{
setDisplay("IPv6AFTRNameRow", 0);
}

setDisable("IPv6AFTRName", 0);
if(WanIPv6DSLite != "Static")
{
    setDisable("IPv6AFTRName", 1);
setText("IPv6AFTRName","");
}

}


function ControlPriority()
{
    var PriorityPolicy = GetCurrentWan().PriorityPolicy.toString();
    setDisplay("DefaultVlanPriorityRow", 0);
    setDisplay("VlanPriorityRow", 0);

    if (GetCurrentWan().EnableVlan.toString().toUpperCase() == "1")
    {
        setDisplay("PriorityPolicyRow", 1);
        setDisplay("PriorityPolicyspan",0);

        if (PriorityPolicy.toUpperCase() == "SPECIFIED" )
        {
            setDisplay("VlanPriorityRow", 1);
        }
        else if (PriorityPolicy.toUpperCase() == "COPYFROMIPPRECEDENCE" )
        {
            setDisplay("DefaultVlanPriorityRow", 1);
        }
        else if (PriorityPolicy.toUpperCase() == "DSCPTOPBIT" )
        {
            setDisplay("DefaultVlanPriorityRow", 1);
            setDisplay("PriorityPolicyspan",1);
        }
    }
    else
    {
        setDisplay("PriorityPolicyRow", 0);
    }

if (true == IsCurrentRadioWan())
{
setDisplay("DefaultVlanPriorityRow", 0);
setDisplay("VlanPriorityRow", 0);
setDisplay("PriorityPolicyRow", 0);
}
}

function ControlErrorWANCfg(Wan)
{
if((Wan.IPv4Enable == 1) || (Wan.IPv6Enable == 1))
{
return ;
}
var Disable = 1;
DisableUserMode(Disable);
setDisable("UserName",Disable);
setDisable("Password",Disable);
setDisable("IPv6AFTRName",Disable);
setDisable("ButtonApply",Disable);
setDisable("ButtonCancel",Disable);
}

function ControlInfoRds()
{
setDisplay("EncapModeRow", 0);
setDisplay("ProtocolTypeRow", 0);
setDisplay("WanModeRow", 0);
setDisplay("ServiceListRow", 0);
setDisplay("VlanSwitchRow", 0);
setDisplay("VlanIdRow", 0);
setDisplay("PriorityPolicyRow", 0);
setDisplay("DefaultVlanPriorityRow", 0);
setDisplay("VlanPriorityRow", 0);
setDisplay("LcpEchoReqCheckRow", 0);
}

function ControlSonet()
{
setDisplay("WanModeRow", 0);
setDisplay("VlanSwitchRow", 0);
setDisplay("VlanIdRow", 0);
setDisplay("PriorityPolicyRow", 0);
setDisplay("DefaultVlanPriorityRow", 0);
setDisplay("VlanPriorityRow", 0);
setDisplay("IPv4BindLanListRow", 0);

setDisplay("IPv4VendorIdRow", 0);
setDisplay("IPv4ClientIdRow", 0);
setDisplay("IPv4WanMVlanIdRow", 0);

setDisplay("IPv6WanMVlanIdRow", 0);
}

function ControlAntel()
{
    if((true == IsAdminUser()) || (true == IsLanUpCanOper()))
    {
        return;
    }

    if ((CfgModeWord.toUpperCase() == 'ANTEL' || "1" == "1")
        &amp;&amp; GetCurrentWan().EncapMode.toString().toUpperCase() == "PPPOE"
        &amp;&amp; GetCurrentWan().Mode == "IP_Routed")
    {
        setDisplay("WanIPv4InfoBarPanel", 0);
        setDisplay("WanIPv6InfoBarPanel", 0);

        $("#BasicInfoBarPanel&gt;tr:gt(0)").hide();
        $("#UserNameRow").show();
        $("#PasswordRow").show();
if (CfgModeWord.toUpperCase() == 'BHARTI')
{
$("#PPPAuthenticationProtocolRow").show();
}
    }
    ControlWanMode();
}

function ControlTrue()
{        
    if((true == IsAdminUser()) || (true == IsLanUpCanOper()))
    {
        return;
    }

    if ((GetCfgMode().TRUE == "1" || "1" == "1")
        &amp;&amp; GetCurrentWan().EncapMode.toString().toUpperCase() == "PPPOE")
    {
        setDisplay("WanIPv4InfoBarPanel", 0);
        setDisplay("WanIPv6InfoBarPanel", 0);
        
        $("#BasicInfoBarPanel&gt;tr:gt(0)").hide();
        $("#WanModeRow").show();
        if (GetCurrentWan().Mode == "IP_Routed")
        {
            $("#UserNameRow").show();
            $("#PasswordRow").show();
        }
    }
}

function ControlWanMode()
{
    if ((CfgModeWord.toUpperCase() == 'TELECENTRO') &amp;&amp; (!IsAdminUser()))
    {
        if (GetCurrentWan().EncapMode.toString().toUpperCase() == "IPOE")
        {
            setDisplay("WanIPv4InfoBarPanel", 0);
            setDisplay("WanIPv6InfoBarPanel", 0);
            $("#BasicInfoBarPanel&gt;tr:gt(0)").hide();
        }
        if ((GetCurrentWan().EncapMode.toString().toUpperCase() == "PPPOE") 
        &amp;&amp; (!(GetCurrentWan().Mode.toUpperCase() == "IP_ROUTED")))
        {
            setDisplay("WanIPv4InfoBarPanel", 0);
            setDisplay("WanIPv6InfoBarPanel", 0);
            $("#BasicInfoBarPanel&gt;tr:gt(0)").hide();
        }
        setDisplay("WanModeRow",1);
        setDisable("WanMode",0);            
    }
}

function ControlTelmex()
{
if("1" == supportTelmex)
{
setDisable("PriorityPolicy", 1);
setDisable("DefaultVlanPriority", 1);
setDisable("VlanPriority", 1);
}

if ((CfgModeWord.toUpperCase() == 'TELMEX' ||  CfgModeWord.toUpperCase() == 'TELMEX5G' || CfgModeWord.toUpperCase() == 'TELMEX5GV')&amp;&amp;(EditFlag.toUpperCase() == "EDIT"))
{
setDisableByName("IPv6PrefixMode", 1);
setDisableByName("IPv6AddressMode", 1);
}
}

function CheckProcDnsOverride()
{
    if (('TDE2' == CfgModeWord.toUpperCase())
        || ('COMMON' == CfgModeWord.toUpperCase())
        || ('COMMON2' == CfgModeWord.toUpperCase())
|| (true == DnsOverrideFlag)
|| (isSAFARICOM == 1))
    {
        return true;
    }

    return false;
}

function ControlIPv4PPPoEDNSOverride()
{
    var Disable = ((true == IsLanUpCanOper()) || IsAdminUser())==true ? 0 : 1;

    if (true != CheckProcDnsOverride())
    {
        setDisplay("IPv4DNSOverrideSwitchRow", 0);
        return;
    }

    if ((GetCurrentWan().IPv4AddressMode.toString().toUpperCase()== "PPPOE"
        || (GetCurrentWan().IPv4AddressMode.toString().toUpperCase() == 'DHCP'))
        &amp;&amp; GetCurrentWan().Mode == "IP_Routed")
    {
        setDisplay("IPv4DNSOverrideSwitchRow", 1);

        if (getCheckVal("IPv4DNSOverrideSwitch") == "1")
        {
            setDisplay("IPv4PrimaryDNSServerRow", 1);
            setDisplay("IPv4SecondaryDNSServerRow", 1);
        }
        else
        {
            setDisplay("IPv4PrimaryDNSServerRow", 0);
            setDisplay("IPv4SecondaryDNSServerRow", 0);
        }

        if(getElById("IPv4PrimaryDNSServer").value == '0.0.0.0')
    {
    setText('IPv4PrimaryDNSServer','');
    }

    if(getElById("IPv4SecondaryDNSServer").value == '0.0.0.0')
    {
    setText('IPv4SecondaryDNSServer','');
    }
    }
    else
    {
        setDisplay("IPv4DNSOverrideSwitchRow", 0);
    }

    setDisable("IPv4DNSOverrideSwitch", Disable);
    setDisable("IPv4PrimaryDNSServer", Disable);
    setDisable("IPv4SecondaryDNSServer", Disable);

    if (true == IsCurrentRadioWan())
{
setDisplay("IPv4DNSOverrideSwitchRow", 0);
setDisplay("IPv4PrimaryDNSServerRow", 0);
setDisplay("IPv4SecondaryDNSServerRow", 0);
}
}

function ControlGlobe(Wan)
{
setDisplay("IPv4WanMVlanIdGlobeUserRow",0);
if(('GLOBE' == CfgModeWord.toUpperCase() || 'GLOBE2' == CfgModeWord.toUpperCase()) &amp;&amp; (!IsAdminUser()))
{
setDisable("VlanId",0);
setDisplay("VlanIdRow",1);
if(0 == Wan.VlanId)
{
setText("VlanId",'');
setDisable("VlanId",1);
}
if((Wan.ProtocolType.toString().toUpperCase()=="IPV4/IPV6") || (Wan.ProtocolType.toString().toUpperCase()=="IPV4"))
{
setDisplay("IPv4WanMVlanIdGlobeUserRow",1);
setText('IPv4WanMVlanIdGlobeUser',Wan.IPv4WanMVlanId);
}
}
}

function ControlClaro()
{
if (CfgModeWord.toUpperCase() != 'CLARO' &amp;&amp; CfgModeWord.toUpperCase() != 'CLARODR')
{
    return ;
}

    if(curUserType != '2')
    {
        return;
    }

setDisable('IPv4NatSwitch',0);
setDisable("ButtonApply",0);
    setDisable("ButtonCancel",0);
}

function ControlPage(Wan)
{
    SetCurrentWan(Wan);

    DisableUserMode(0);
    ControlPageByEditModeAndUser();

    ControlPanel();
    ControlUserName();
    ControlApplyButton(Wan);
    ControlLcpCheck();
    ControlVlanId();
    ControlPriority();
    E8CCheckDisable(Wan);
    ControlIPv4DHCPEnable();
Controlsvrlist();
    ControlDstIPForwardingListVisibility();

ControlMVlan('IPv4v6');

    ControlIPv4AddressType();
    ControlIPv4EnableNAT();
    ControlIPv4IGMPEnable();
ControlIPv4MXU();
    ControlIPv4VendorId();
    ControlIPv4ClientId();
    ControlIPv4StaticIPAddress();
    ControlMultiWanIP();
    ControlIPv4Dial();
    ControlMVlan('IPv4');
    ControlIPv4LanWanBind();
    Control6RDParametersDisplay(Wan);
ControlDscpToPbit();

    ControlIPv6PrefixAcquireMode();
    ControlIPv6Prefix();
    ControlIPv6AddressAcquireMode();
ControlIPv6ReservedPrefixAddress();
    ControlIPv6StaticIPAddress();
    ControlIPv6IPAddressStuff();

ControlIPv6DSLite();
ControlIPv6AFTRName();
ControlMVlan('IPv6');

    ControlSpec();

    ControlPageByEditModeAndUser();
if(((GetCfgMode().BJCU == "1") || (IsLanBJUNICOM())) &amp;&amp; (Wan.ServiceList.match('INTERNET')))
    {
    setDisable("WanMode", 0);
    }

    if (GetCfgMode().BJUNICOM == "1")
    {
        if ((Wan.ServiceList.toString().toUpperCase() =='INTERNET') || (Wan.ServiceList.toString().toUpperCase() =='OTHER'))
        {
            setDisable("IPv4DialMode", 0);
            setDisable("IPv4DialIdleTime", 0);
            setDisable("UserName",0);
        setDisable("Password",0);
    }
    else
    {
            setDisable("UserName",1);
        setDisable("Password",1);
        setDisable("ButtonApply",1);
        setDisable("ButtonCancel",1);
    }

        if ((Wan.ServiceList == 'IPTV') &amp;&amp; (stbport != 0))
        {
            setDisableByName("IPv4BindLanList", 0);
            ControlIPv4LanWanBind();
            setDisable("IPv4BindLanList"+stbport, 1);
        setDisable("ButtonApply", 0);
        setDisable("ButtonCancel", 0);
        }

    }

    if (GetFeatureInfo().IPv6 == "0")
    {
        setDisable("ProtocolType", 1);
        setSelect("ProtocolType", "IPv4");
    }

E8Ctr069CheckDisable(Wan);
ControlErrorWANCfg(Wan);
if(IsSonetUser())
{
ControlSonet();
}

if(true == IsRDSGatewayUser())
{
ControlInfoRds();
}
CntrolAccessType();
ControlRadioWan();
if (GetCfgMode().TRUE == "1")
{
ControlTrue();
}
else
{
ControlAntel();
}
if (DisliteFeature == "1")
{
    ControlDislite();
}
ControlTelmex();

ControlIPv4PPPoEDNSOverride();

if('TDE2' == CfgModeWord.toUpperCase())
{
setDisplay("IPv4WanMVlanIdRow", 0);
setDisplay("IPv6WanMVlanIdRow", 0);

if('IP_Bridged' == Wan.Mode || 'PPPoE_Bridged' == Wan.Mode)
{
    setDisplay("WanIPv4InfoBarRow", 0);
setDisplay("WanIPv6InfoBarRow", 0);
setDisplay("PrifixEnabledRow", 0);
    }
    else
    {
setDisplay("WanIPv4InfoBarRow", 1);
setDisplay("WanIPv6InfoBarRow", 1);
setDisplay("PrifixEnabledRow", 1);
    }
    setDisplay("IPv6PrefixModeRow", 0);
}
else
{
setDisplay("PrifixEnabledRow", 0);
}

ControlClaro();

Option60Display(Wan);

ControlGlobe(Wan);

ControlSpecXD(Wan);

    return;
}

function OnChangeUI(ControlObject)
{
    var wanmodeobj = getElementById('WanMode');
    ChangeUISource = ControlObject;
    if(ControlObject == wanmodeobj)
    {
        Controlsvrlist();
    }
    ControlPage(GetPageData());
if (1 == CfgGuide)
{
window.parent.adjustParentHeight();
}
if(IfVisual==1)
{
    pageDisable();
setDisable(ControlObject.id,0);
setDisable("WanConnectName_select",0);
}
if( 1== isSAFARICOM)
{
if(IsDNSLockEnable == "1")
{
    setDisable("IPv4DNSOverrideSwitch",1);
setDisable("IPv4PrimaryDNSServer",1);
setDisable("IPv4SecondaryDNSServer",1);
}
else
{
    setDisable("IPv4DNSOverrideSwitch",0);
setDisable("IPv4PrimaryDNSServer",0);
setDisable("IPv4SecondaryDNSServer",0);
}
var OverrideAllowed = getCheckVal('IPV6OverrideAllowed');
setDisplay("IPv6PrimaryDNSServerRow", OverrideAllowed);
setDisplay("IPv6SecondaryDNSServerRow", OverrideAllowed);
}


}

function GetAddType()
{
    return AddType;
}

function GetLinkConfigUrl(Wan)
{
var temp  = Wan.domain.split(".");
var LinkTypePath = "";

if( Wan.WanAccessType == "DSL")
{
LinkTypePath = "&amp;e=" + temp[0]+'.'+temp[1]+'.'+temp[2]+'.'+temp[3]+'.'+temp[4] + ".WANDSLLinkConfig";
}
else if( Wan.WanAccessType == "VDSL")
{
LinkTypePath = "&amp;e=" + temp[0]+'.'+temp[1]+'.'+temp[2]+'.'+temp[3]+'.'+temp[4] + ".WANPTMLinkConfig";
}
    else if(Wan.WanAccessType == "UMTS")
    {
        LinkTypePath = "&amp;e=" + temp[0]+'.'+temp[1]+'.'+temp[2]+'.'+temp[3]+'.'+temp[4] + ".WANUMTSLinkConfig";
    }

return LinkTypePath;
}


function GetAddXDWanUrl(Wan)
{
var Url = '';
var Inst1 = GetWanInstByWanAceesstype(Wan.WanAccessType);
var Inst2 = '';
var WanTypeName = '';
var LinkConfig = '';
    var InstTemp = '';

if(Wan.EncapMode.toString().toUpperCase() == 'PPPOE')
{
WanTypeName = 'WANPPPConnection';
}
else
{
WanTypeName = 'WANIPConnection';
}

if( Wan.WanAccessType == "DSL")
{
        InstTemp = GetPVCIsInUsedWANConnectionDeviceInst(Wan);
        LinkConfig = 'WANDSLLinkConfig';
    }
    else if( Wan.WanAccessType == "VDSL")
    {
        InstTemp = GetVdslIsInUsedWANConnectionDeviceInst(Wan);
        LinkConfig = 'WANPTMLinkConfig';
    }
    else if( Wan.WanAccessType == "Ethernet")
    {
        InstTemp = GetEthIsInUsedWANConnectionDeviceInst(Wan);
        LinkConfig = '';
    }

    if( null != InstTemp )
    {
        Inst2 = '.' + InstTemp;
    }

    if ((CfgModeWord.toUpperCase() == 'DTURKCELL2WIFI') || (CfgModeWord.toUpperCase() == 'DGECOMMON2WIFI'))
{
if (true == WanIsExist())
{
Url = 'GROUP_a_y=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.' + WanTypeName;
if('' != LinkConfig)
{
Url = Url + '&amp;e=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.' + LinkConfig;
}
}
else
{
Url = 'GROUP_a_x=InternetGatewayDevice.WANDevice.1.WANConnectionDevice' + '&amp;GROUP_a_y=GROUP_a_x.' + WanTypeName;
if('' != LinkConfig)
{
Url = Url + '&amp;e=GROUP_a_x.' + LinkConfig;
}
}

return Url;
}

    if('' != Inst2)
    {
        Url = 'GROUP_a_y=InternetGatewayDevice.WANDevice.'+ Inst1 + '.WANConnectionDevice' + Inst2 + '.' + WanTypeName;
        if('' != LinkConfig)
        {
            Url = Url + '&amp;e=InternetGatewayDevice.WANDevice.'+ Inst1 + '.WANConnectionDevice' + Inst2 + '.' + LinkConfig;
        }
    }
    else
    {
        Url = 'GROUP_a_x=InternetGatewayDevice.WANDevice.'+ Inst1 + '.WANConnectionDevice' + '&amp;GROUP_a_y=GROUP_a_x.' + WanTypeName;
        if('' != LinkConfig)
        {
            Url = Url + '&amp;e=GROUP_a_x.' + LinkConfig;
        }
    }

return Url;
}

function GetAddWanUrl(Wan)
{
if(IsXdProduct())
{
return GetAddXDWanUrl(Wan);
}

var wanConInst = 0;
if (AddType != 2)
{
if(Wan.EncapMode.toString().toUpperCase() == 'PPPOE')
{
return 'GROUP_a_x=InternetGatewayDevice.WANDevice.1.WANConnectionDevice&amp;GROUP_a_y=GROUP_a_x.WANPPPConnection';
}
else
{
return 'GROUP_a_x=InternetGatewayDevice.WANDevice.1.WANConnectionDevice&amp;GROUP_a_y=GROUP_a_x.WANIPConnection';
}
}
else
{
wanConInst = GetWanInfoSelected().domain.split(".")[4];

if(Wan.EncapMode.toString().toUpperCase() == 'PPPOE')
{
return 'GROUP_a_y=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.' + wanConInst + '.WANPPPConnection';
}
else
{
return 'GROUP_a_y=InternetGatewayDevice.WANDevice.1.WANConnectionDevice.' + wanConInst + '.WANIPConnection';
}
}
}

function GetWanInstanPathByDomain(domain , num)
{
    var temp  = domain.split(".");

    if( num == 1)
    {
        return temp[0]+'.'+temp[1]+'.'+temp[2];
    }
    else if(num == 2)
    {
        return temp[0]+'.'+temp[1]+'.'+temp[2]+'.'+temp[3]+'.'+temp[4];
    }
    else if(num == 3)
    {
        return domain;
    }

}

function GetLinkTypePath(Wan)
{
    var LinkTypePath = "";

    if(IsXdProduct())
    {
        if( Wan.WanAccessType == "DSL" &amp;&amp; IsAdminUser())
        {
            LinkTypePath = "&amp;e=" + GetWanInstanPathByDomain(Wan.domain,2) + ".WANDSLLinkConfig";
        }
        else if( Wan.WanAccessType == "VDSL"  &amp;&amp; IsAdminUser())
        {
            LinkTypePath = "&amp;e=" + GetWanInstanPathByDomain(Wan.domain,2) + ".WANPTMLinkConfig";
        }
    }

    return LinkTypePath;
}

function GetEditWanUrl(Wan)
{
    return Wan.domain;
}

function IsLanBind(Name, IPv4BindLanList)
{
    for (var i = 0; i &lt; IPv4BindLanList.length; i++)
    {
        if (IPv4BindLanList[i] != undefined &amp;&amp; IPv4BindLanList[i] != null)
        if (Name.toString().toUpperCase() == IPv4BindLanList[i].toString().toUpperCase())
        {
            return true;
        }
    }
    return false;
}

function ConvertMac(WanMac)
{
var NewWanMac = WanMac.replace(/\:/g,"-");
return NewWanMac;
}

function IsOldServerListType(type)
{
switch(type)
{
case 'TR069':
case 'INTERNET':
case 'TR069_INTERNET':
case 'VOIP':
case 'TR069_VOIP':
case 'VOIP_INTERNET':
case 'TR069_VOIP_INTERNET':
case 'IPTV':
case 'OTHER':
return true;
}

return false;
}


function GetWanInfoSelected()
{
    var rml = document.getElementsByName("wanInstTablerml");
if (rml == null)
{
    return null;
}
    if (rml.length &gt; 0)
    {
    for (var i = 0; i &lt; rml.length; i++)
    {
        if (rml[i].checked == true)
            {
                break;
            }
        }

for (var tmp = 0;tmp &lt; WanList.length; tmp++)
    {
        if (WanList[tmp].domain == rml[i].value)
    {
        return WanList[tmp];
    }
    }

return null;
    }

else if (rml.checked == true)
    {
        for (var tmp = 0;tmp &lt; WanList.length; tmp++)
    {
        if (WanList[tmp].domain == rml.value)
    {
        return WanList[tmp];
    }
    }

return null;
    }
}

function GetSelectedWanNum()
{
    var rml = getElement('wanInstTablerml');
    var numChoosed = 0;
if (rml == null)
{
    return numChoosed;
}
    if (rml.length &gt; 0)
    {
    for (var i = 0; i &lt; rml.length; i++)
    {
        if (rml[i].checked == true)
            {
                numChoosed = numChoosed + 1;
            }
        }
    }
    else if (rml.checked == true)
    {
        numChoosed = numChoosed + 1;
    }

return numChoosed;
}
function btnAddWanCnt()
{
if (GetSelectedWanNum() &gt; 1)
{
    AlertMsg("selectonewan");
return false;
}


CurrentWan = defaultWan.clone();

var wanInfoTmp = null;
    if (AddType == 2)
{
    wanInfoTmp = GetWanInfoSelected();
if (wanInfoTmp == null)
{
    return null;
}
if (true == IsRadioWanSupported(wanInfoTmp))
{
AlertMsg("RadioWanNoSession");
return false;
}
return true;
}
    return null;
}

function GetBrotherWan(wanTmp)
{
    if(IsXdProduct())
    {
        return null;
    }

    var i = 0;
for (i = 0; i &lt; GetWanList().length; i++)
{
if ((GetWanList()[i].domain.substring(0, 55) ==
       wanTmp.domain.substring(0, 55))
           &amp;&amp; (GetWanList()[i].domain != wanTmp.domain))
        {
return GetWanList()[i];
}
}
return null;
}

function GetBrotherWanindex(wanTmp)
{
    var i = 0;
for (i = 0; i &lt; GetWanList().length; i++)
{
if ((GetWanList()[i].domain.substring(0, 55) ==
       wanTmp.domain.substring(0, 55))
           &amp;&amp; (GetWanList()[i].domain != wanTmp.domain))
        {
return i;
}
}
return null;
}


function IsAnyWanSelected()
{
    var rml = getElement('wanInstTablerml');
    var ChooseFlag = false;
if (rml == null)
{
    return ChooseFlag;
}
    if ( rml.length &gt; 0)
    {
    for (var i = 0; i &lt; rml.length; i++)
    {
        if (rml[i].checked == true)
            {
                ChooseFlag = true;
            }
        }
    }
    else if (rml.checked == true)
    {
        ChooseFlag = true;
    }
return ChooseFlag;
}

function wanInstTableselectRemoveCnt(curCheck)
{
    if (IsAnyWanSelected() == true)
{
    setText('Newbutton', Languages['New_Connection']);
AddType = 2;
}
else
{
    setText('Newbutton', Languages['Connection']);
AddType = 1;
}
}
</body></html>