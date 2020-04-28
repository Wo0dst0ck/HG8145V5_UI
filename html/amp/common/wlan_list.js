function stTopoSsid(Domain, SsidNum){   
    this.Domain = Domain;
    this.SsidNum = SsidNum;
}

function stReguDomain(CountryCode, RegCode){
    this.CountryCode = CountryCode;
    this.RegCode = RegCode;
}

var TotalRegDomain = new Array(
    new stReguDomain("AL", "CE"),
    new stReguDomain("DZ", "CE"),
    new stReguDomain("AR", "CE"),
    new stReguDomain("AU", "CE"),
    new stReguDomain("AT", "CE"),
    new stReguDomain("AZ", "CE"),
    new stReguDomain("BH", "CE"),
    new stReguDomain("BY", "CE"),
    new stReguDomain("BE", "CE"),
    new stReguDomain("BA", "CE"),
    new stReguDomain("BR", "CE"),
    new stReguDomain("BN", "CE"),
    new stReguDomain("BG", "CE"),
    new stReguDomain("BO", "CE"),
    new stReguDomain("CA", "FCC"),
    new stReguDomain("CB", "CE"),
    new stReguDomain("CL", "CE"),
    new stReguDomain("CN", "CCC"),
    new stReguDomain("CO", "FCC"),
    new stReguDomain("CR", "CE"),
    new stReguDomain("HR", "CE"),
    new stReguDomain("CY", "CE"),
    new stReguDomain("CZ", "CE"),
    new stReguDomain("DK", "CE"),
    new stReguDomain("DO", "FCC"),
    new stReguDomain("EC", "FCC"),
    new stReguDomain("EG", "CE"),
    new stReguDomain("SV", "CE"),
    new stReguDomain("EE", "CE"),
    new stReguDomain("FK", "CE"),
    new stReguDomain("FI", "CE"),
    new stReguDomain("FR", "CE"),
    new stReguDomain("GE", "CE"),
    new stReguDomain("DE", "CE"),
    new stReguDomain("GR", "CE"),
    new stReguDomain("GT", "FCC"),
    new stReguDomain("HN", "CE"),
    new stReguDomain("HK", "FCC"),
    new stReguDomain("HU", "CE"),
    new stReguDomain("IS", "CE"),
    new stReguDomain("IN", "CE"),
    new stReguDomain("ID", "CE"),
    new stReguDomain("IR", "CE"),
    new stReguDomain("IE", "CE"),
    new stReguDomain("IL", "CE"),
    new stReguDomain("IT", "CE"),
    new stReguDomain("JM", "FCC"),
    new stReguDomain("JP", "MKK"),
    new stReguDomain("JO", "CE"),
    new stReguDomain("KZ", "CE"),
    new stReguDomain("KE", "CE"),
    new stReguDomain("KW", "CE"),
    new stReguDomain("LV", "CE"),
    new stReguDomain("LB", "CE"),
    new stReguDomain("LR", "CE"),
    new stReguDomain("LI", "CE"),
    new stReguDomain("LT", "CE"),
    new stReguDomain("LU", "CE"),
    new stReguDomain("MO", "CE"),
    new stReguDomain("MK", "CE"),
    new stReguDomain("MY", "CE"),
    new stReguDomain("MT", "CE"),
    new stReguDomain("MX", "FCC"),
    new stReguDomain("MC", "CE"),
    new stReguDomain("MA", "CE"),
    new stReguDomain("NP", "CE"),
    new stReguDomain("NL", "CE"),
    new stReguDomain("AN", "CE"),
    new stReguDomain("NZ", "CE"),
    new stReguDomain("NI", "CE"),
    new stReguDomain("NO", "CE"),
    new stReguDomain("OM", "CE"),
    new stReguDomain("PK", "CE"),
    new stReguDomain("PA", "FCC"),
    new stReguDomain("PG", "CE"),
    new stReguDomain("PY", "CE"),
    new stReguDomain("PE", "CE"),
    new stReguDomain("PH", "CE"),
    new stReguDomain("PL", "CE"),
    new stReguDomain("PT", "CE"),
    new stReguDomain("PR", "FCC"),
    new stReguDomain("QA", "CE"),
    new stReguDomain("RO", "CE"),
    new stReguDomain("RU", "CE"),
    new stReguDomain("SA", "CE"),
    new stReguDomain("SG", "CE"),
    new stReguDomain("SK", "CE"),
    new stReguDomain("SI", "CE"),
    new stReguDomain("ZA", "CE"),
    new stReguDomain("ES", "CE"),
    new stReguDomain("LK", "CE"),
    new stReguDomain("SE", "CE"),
    new stReguDomain("CH", "CE"),
    new stReguDomain("SY", "CE"),
    new stReguDomain("TW", "FCC"),
    new stReguDomain("TH", "CE"),
    new stReguDomain("TT", "CE"),
    new stReguDomain("TN", "CE"),
    new stReguDomain("TR", "CE"),
    new stReguDomain("UA", "CE"),
    new stReguDomain("AE", "CE"),
    new stReguDomain("GB", "CE"),
    new stReguDomain("US", "FCC"),
    new stReguDomain("UY", "CE"),
    new stReguDomain("VE", "CE"),
    new stReguDomain("VN", "CE"),
    new stReguDomain("ZW", "CE")
);


function isDfsArea(Country){
    var ReguDomain = 0;
    for(i=0; i &lt; TotalRegDomain.length; i++){
        if (TotalRegDomain[i].CountryCode == Country){
            ReguDomain = TotalRegDomain[i].RegCode;
            break;
        }
    }

    if ((ReguDomain != 'CE') &amp;&amp; (ReguDomain != 'FCC')){
        return 0;
    }
    return 1;
}

function checkDfsChannels(Channel, ChannelPlus, ChannelWidth)
{
if (ChannelWidth == 5)
{      
if (((Channel &gt;= 52) &amp;&amp; (112 &gt;= Channel)) || ((Channel &gt;= 132) &amp;&amp; (144 &gt;= Channel))
|| ((ChannelPlus &gt;= 52) &amp;&amp; (112 &gt;= ChannelPlus)) || ((ChannelPlus &gt;= 132) &amp;&amp; (144 &gt;= ChannelPlus))
|| ((Channel &gt;= 116) &amp;&amp; (128 &gt;= Channel)) || ((ChannelPlus &gt;= 116) &amp;&amp; (128 &gt;= ChannelPlus)))
{
return true;
}
}
else if (ChannelWidth == 4)
{
if (((Channel &gt;= 100) &amp;&amp; (128 &gt;= Channel))
|| ((Channel &gt;= 52) &amp;&amp; (64 &gt;= Channel)) 
|| ((Channel &gt;= 132) &amp;&amp; (144 &gt;= Channel)))
{
return true;
}
}
else
{
if ((52 &lt;= Channel) &amp;&amp; (144 &gt;= Channel))
{
return true;
}
}
    return false;
}

function getChannelWithOutDfs(Channels, ChannelWidth)
{
var ChannelArray = Channels.split(',');
var ChannelWithOutDfs = new Array();
var Channel = '';
var ChannelPlus = '';
var curChannelArr;
for (var i = 0; i &lt; ChannelArray.length; i++)
{
Channel = ChannelArray[i];
if (ChannelWidth == 5)
{
curChannelArr = ChannelArray[i].split('+');
            Channel = curChannelArr[0];
            ChannelPlus = curChannelArr[1];
}
if (!checkDfsChannels(Channel, ChannelPlus, ChannelWidth))
{
ChannelWithOutDfs.push(ChannelArray[i]);
}
}
return ChannelWithOutDfs;
}

function getDfsKeepTime(Channel, ChannelPlus, Country, ChannelWidth)
{
var ReguDomain = 0;

for (i = 0; i &lt; TotalRegDomain.length; i++)
{
if (TotalRegDomain[i].CountryCode == Country)
{
ReguDomain = TotalRegDomain[i].RegCode;
break;
}
}

var ChannelGroup = 0;

if ((ReguDomain != 'CE') &amp;&amp; (ReguDomain != 'FCC'))
{
return ChannelGroup = 0;
}  

    <!-- Channel Width: 80+80MHz remaing-->
    if (ChannelWidth == 5)
    {        
        if (((Channel &gt;= 52) &amp;&amp; (112 &gt;= Channel)) || ((Channel &gt;= 132) &amp;&amp; (144 &gt;= Channel)))
        {
            ChannelGroup = 1;
        }
if (((ChannelPlus &gt;= 52) &amp;&amp; (112 &gt;= ChannelPlus)) || ((ChannelPlus &gt;= 132) &amp;&amp; (144 &gt;= ChannelPlus)))
{
ChannelGroup = 1;
}
if (((Channel &gt;= 116) &amp;&amp; (128 &gt;= Channel)) || ((ChannelPlus &gt;= 116) &amp;&amp; (128 &gt;= ChannelPlus)))
        {
            ChannelGroup = 2;
        }
    }
    <!-- Channel Width: 160MHz -->
    else if (ChannelWidth == 4)
    {
if ((Channel &gt;= 100) &amp;&amp; (128 &gt;= Channel))
{
ChannelGroup = 2;
}
else if (((Channel &gt;= 52) &amp;&amp; (64 &gt;= Channel)) || ((Channel &gt;= 132) &amp;&amp; (144 &gt;= Channel)))
{
ChannelGroup = 1;
}
    }
    <!-- Channel Width: 20MHz -->
    else if (ChannelWidth == 1)
    {
        if ((52 &lt;= Channel) &amp;&amp; (144 &gt;= Channel))
        {
            if ((120 &lt;= Channel) &amp;&amp; (128 &gt;= Channel))
            {
                ChannelGroup = 2;
            }
            else
            {
                ChannelGroup = 1;
            }
        }
    }
    <!-- Channel Width: 40MHz or Auto 20|40|MHz or Auto 20|40|80MHz -->
    else
    {
        if ((52 &lt;= Channel) &amp;&amp; (144 &gt;= Channel))
        {
            if ((116 &lt;= Channel) &amp;&amp; (128 &gt;= Channel))
            {
                ChannelGroup = 2;
            }
            else
            {
                ChannelGroup = 1;
            }
        }
    }

if ((ReguDomain == 'FCC') &amp;&amp; (ChannelGroup == 2))
{
ChannelGroup = 1;
}
    return ChannelGroup;
}

var TopoSsidInfoList = new Array(new stTopoSsid("InternetGatewayDevice.X_HW_Topo","8"),null)
var TopoSsidInfo = TopoSsidInfoList[0];
var PccwFlag = '0'; 
var kppUsedFlag = '0';
var isShowHomeNetWork = '1';
var PTVDFFlag = '0';

var SsidPerBand = '4';

var ssidStart2G = 0;
var ssidEnd2G = SsidPerBand - 1;
var ssidStart5G = SsidPerBand;
var ssidEnd5G = 2 * SsidPerBand -1;

if ((1 == isShowHomeNetWork) &amp;&amp; (TopoSsidInfo.SsidNum &lt; 8))
{
TopoSsidInfo.SsidNum = 8;
}

var CfgModeWord ='SAFARICOM2'; 
var curUserType = '1';
function IsSonetSptUser()
{
    if(('0' == 1) &amp;&amp; curUserType != '0')
    {
        return true;
    }
    else
    {
        return false;
    }
}

function IsCaribbeanReg()
{
if('0' == 1)
    {
    return true;
    }
else
    {
    return false;
    }
}

function IsPTVDFSptUser()
{
if(('0' == 1) &amp;&amp; curUserType != '0')
    {
    return true;
    }
else
    {
    return false;
    }
}

function isSpaceInKey(keyString)
{
    var length = keyString.length;
    for (i = 0; i &lt; length; i++)
    {
      if (keyString.charAt(i) == ' ') 
        {
         return true;
        }
    }
       return false;
}

function IsRDSGatewayUserSsid(index)
{
if ('RDSGATEWAY' == CfgModeWord.toUpperCase() &amp;&amp; curUserType != '0' &amp;&amp; index &gt; 1)
    {
    return true;
    }
else
    {
    return false;
    }
}

function stWlanInfo(domain,name,ssid,X_HW_ServiceEnable,enable,X_HW_RFBand,bindenable)
{
    this.domain = domain;
    this.name = name;
    this.ssid = ssid;
    this.X_HW_ServiceEnable = X_HW_ServiceEnable;
    this.enable = enable;
this.X_HW_RFBand = X_HW_RFBand;
    this.bindenable = bindenable;
}

function stWlanEnable(domain,enable)
{
    this.domain = domain;
    this.enable = enable;
}

var WlanEnable = new Array(new stWlanEnable("InternetGatewayDevice\x2eLANDevice\x2e1","1"),null)

var WlanInfo = new Array(new stWlanInfo("InternetGatewayDevice\x2eLANDevice\x2e1\x2eWLANConfiguration\x2e1","ath0","NdikuHF","1","1","2\x2e4GHz"),new stWlanInfo("InternetGatewayDevice\x2eLANDevice\x2e1\x2eWLANConfiguration\x2e5","ath4","NdikuHF\x2d5G","1","1","5GHz"),null)
if (WlanInfo.length &gt; 0) 
{
WlanInfo = eval(WlanInfo);
}
else
{
WlanInfo = new Array(null);
}

var WlanList = new Array();

var totalnum = 16;

for ( i = 0 ; i &lt; totalnum ; i++ )
{
    var tid = parseInt(i+1);
    WlanList[i] = new stWlanInfo('domain','SSID'+tid,'','0','1','','0');
}

for ( i = 0 ; i &lt; WlanInfo.length - 1 ; i++ )
{
    var length = WlanInfo[i].name.length;

    if ('' == WlanInfo[i].name)
    {
        continue;
    }

    var wlanInst = getWlanInstFromDomain(WlanInfo[i].domain);
    wlanInst = wlanInst-1; 
    if(1 == PccwFlag)
    {
        WlanList[wlanInst].bindenable = 1;
    }
    else
    {
        if ( (1 == WlanInfo[i].enable) &amp;&amp; (1 == WlanEnable[0].enable) &amp;&amp;  (1 == WlanInfo[i].X_HW_ServiceEnable) )
        {
            WlanList[wlanInst].bindenable = 1;
        }
        else
        {
            WlanList[wlanInst].bindenable = 0;
        }
    }
}    


function GetWlanList()
{
    return WlanList;
}



var DTHungaryFlag = '0';

var TwoSsidCustomizeGroup = '0' | '0' 
                             | '0' | '0' 
                             | '0' | '0' 
                             | '0' | '0' 
                             | '0' | '0'
                             | '0' | '0'
                             | '0' | '0'
                             | '0' | '0'

if ('0')
{
TwoSsidCustomizeGroup = 1;
}

function FormatSSIDEncode(val)
{
if(null != val)
{
var formatstr = encodeURI(val);
formatstr=formatstr.replace(new RegExp(/(\+)/g),"%2B");
formatstr = formatstr.replace(new RegExp(/(\/)/g), "%2F");
return formatstr
}
return null;
}

function GetSSIDStringContent(str, Length)
{
    if(null != str)
    {
    str = str.toString().replace(/&nbsp;/g," ");
    str = str.toString().replace(/"/g,"\"");
    str = str.toString().replace(/&gt;/g,"&gt;");
    str = str.toString().replace(/&lt;/g,"&lt;");
    str = str.toString().replace(/'/g, "\'");
    str = str.toString().replace(/(/g, "\(");
    str = str.toString().replace(/)/g, "\)");
    str = str.toString().replace(/&amp;/g,"&amp;");
    }

if (str.length &gt; Length)
    {
        str=str.substr(0, Length) + "......";
    }

if(null != str)
    {
str = str.toString().replace(/&amp;/g,"&amp;");
       str = str.toString().replace(/ /g,"&nbsp;");
    str = str.toString().replace(/\"/g,""");
    str = str.toString().replace(/&gt;/g,"&gt;");
    str = str.toString().replace(/ Length)
    {
        str = str.toString().replace(/&nbsp;/g," ");
        str = str.toString().replace(/"/g,"\"");
        str = str.toString().replace(/&gt;/g,"&gt;");
        str = str.toString().replace(/&lt;/g,"&lt;");
        str = str.toString().replace(/'/g, "\'");
        str = str.toString().replace(/(/g, "\(");
        str = str.toString().replace(/)/g, "\)");
        str = str.toString().replace(/&amp;/g,"&amp;");

        var strNewLength = str.length;
        if(strNewLength &gt; Length )
            {
            str=str.substr(0, Length) + "......";
            }
        else
            {
            str=str.substr(0, Length);
            }
        str = str.toString().replace(/&amp;/g,"&amp;");
        str = str.toString().replace(/&gt;/g,"&gt;");
        str = str.toString().replace(/ divv.width())
        {
        divv.css("padding-bottom", "17px");
        }
    }}catch(e){}
}

function getFirstSSIDPccw(radioId, info)
{
var wlanInst = (radioId==1)?1:5;
    
if (1 == isSsidForIsp(wlanInst))
    {
        return null;
    }

    for( var i = 0; i &lt; info.length; i++)
    {
        if (wlanInst != getWlanInstFromDomain(info[i].domain))
        {
            continue;
        }
        
    if(0 == info[i].X_HW_ServiceEnable)
        return null;
            
    info[i].InstId = wlanInst;
        return info[i];
    }

return null;
}

function getFirstSSIDInst(radioId, info)
{
if( (radioId &lt; 1) || (radioId &gt; 2) ||
            ((0 == DoubleFreqFlag) &amp;&amp; (2 == radioId)))
    {
    return null;
    }

try{
    
if(1 == PccwFlag)
    {
    return getFirstSSIDPccw(radioId, info);
    }
    
for( var i = 0; i &lt; info.length; i++)
    {
    var ssid = info[i].name;
    if('' == ssid)
        {
        continue;
        }

    ssid = parseInt(ssid.charAt(ssid.length - 1), 10);
        
    if((ssid&gt;3 &amp;&amp; radioId==1) || (ssid&lt;=3 &amp;&amp; radioId==2))
        {
        continue;
        }
        
    var wlanInst = getWlanInstFromDomain(info[i].domain);
    
        if (1 == isSsidForIsp(wlanInst))
        {
            continue;
        }
        
    info[i].InstId = wlanInst;
        
        return info[i];
        
    }

    }catch(e){ return null; }
    
return null;
}

function convStdAuthMode(wlan)
{
    if(wlan.BeaconType == "None")
    {
        wlan.BeaconType = "Basic";
        wlan.BasicEncryptionModes = "None";
        wlan.BasicAuthenticationMode = "None";
    }
    else if(wlan.BeaconType == "WPA2")
    {
        wlan.BeaconType = "11i";
    }
    else if(wlan.BeaconType == "WPA/WPA2")
    {
        wlan.BeaconType = "WPAand11i";
    }
}

function getPsk(wlanInst, info)
{
try{
for( var i = 0; i &lt; info.length-1; i++)
    {
    if(wlanInst == parseInt(info[i].domain.charAt(52), 10))
        {
        return info[i].value;
        }
        
    }}catch(e){ return ""; }
    
return "";    
}


function getWep(wlanInst, wepKeyInst, info)
{
try{
for( var i = 0; i &lt; info.length-1; i++)
    {
    if((wlanInst == parseInt(info[i].domain.charAt(52), 10)) &amp;&amp;
            (wepKeyInst == parseInt(info[i].domain.charAt(61), 10)))
        {
        return info[i].value;
        }
        
    }}catch(e){ return ""; }
    
return "";    
}

function checkSSIDExist(wlan, info)
{
try{
var radioId = 0;
var cur_ssid = parseInt(wlan.name.charAt(wlan.name.length - 1), 10);
    
radioId = cur_ssid&lt;4?1:2;

for( var i = 0; i &lt; info.length-1; i++)
    {
    var ssid = info[i].name;
    if('' == ssid)
        {
        continue;
        }

    ssid = parseInt(ssid.charAt(ssid.length - 1), 10);

    if((ssid&gt;3 &amp;&amp; radioId==1) || (ssid&lt;=3 &amp;&amp; radioId==2))
        {
        continue;
        }
    
    if((cur_ssid != ssid) &amp;&amp; (info[i].ssid == wlan.ssid))
        {
        AlertEx(cfg_wlancfgother_language['amp_ssid_exist']);
        return true;
        }
        
    }}catch(e){ return false; }
    
return false;    
}

function isValidStr(val)
{
    for ( var i = 0 ; i &lt; val.length ; i++ )
    {
        var ch = val.charAt(i);
        if (ch == '$' || ch == ',' || ch == '\"' || ch == '\\' || ch == '&amp;' || ch == '|' || ch == ';' || ch == '`')
        {
            return ch;
        }
    }
    return '';
}

function CheckSsid(ssid)
{
    if (ssid == '')
    {
        AlertEx(cfg_wlancfgother_language['amp_empty_ssid']);
        return false;
    }

    if (ssid.length &gt; 32)
    {
        AlertEx(cfg_wlancfgother_language['amp_ssid_check1'] + ssid + cfg_wlancfgother_language['amp_ssid_too_loog']);
        return false;
    }

    if (isValidAscii(ssid) != '')
    {
        AlertEx(cfg_wlancfgother_language['amp_ssid_check1'] + ssid + cfg_wlancfgother_language['amp_ssid_invalid'] + isValidAscii(ssid));
        return false;
    }

    if(PTVDFFlag != 1)
    {
        if (isValidStr(ssid) != '')
        {
            AlertEx(cfg_wlancfgother_language['amp_ssid_check1'] + ssid + cfg_wlancfgother_language['amp_ssid_invalid'] + isValidStr(ssid));
            return false;
        }
    }
return true;
}

function CheckPsk(value)
{
if (value == '')
{
alert(cfg_wlancfgother_language['amp_empty_para']);
return false;
}

if (isValidWPAPskKey(value) == false)
{
alert(cfg_wlancfgdetail_language['amp_wpskey_invalid']);
return false;
}

if (isValidStr(value) != '')
{
alert(cfg_wlancfgdetail_language['amp_wpa_psk'] + " "+ value + cfg_wlancfgother_language['amp_wlanstr_invalid'] + " " + isValidStr(value));
return false;
}

return true;
}

function CheckSsidExist(ssid, WlanArr)
{
    for (i = 1; i &lt; WlanArr.length - 1; i++)
    {
        if (WlanArr[i].ssid == ssid)
{
AlertEx(cfg_wlancfgother_language['amp_ssid_exist']);
return false;
}
        else
        {
            continue;
        }
    }

    return true;
}

function stIndexMapping(index,portIndex)
{
    this.index = index;
    this.portIndex = portIndex;
}

function  stAssociatedDevice(domain,AssociatedDeviceMACAddress,X_HW_Uptime,X_HW_RxRate,X_HW_TxRate,X_HW_RSSI,X_HW_Noise,X_HW_SNR,X_HW_SingalQuality,X_HW_WorkingMode,X_HW_WMMStatus,X_HW_PSMode)
{
this.domain = domain;
this.AssociatedDeviceMACAddress = AssociatedDeviceMACAddress;
    this.X_HW_Uptime = X_HW_Uptime;
    this.X_HW_RxRate = X_HW_RxRate;
    this.X_HW_TxRate = X_HW_TxRate;
    this.X_HW_RSSI   = X_HW_RSSI;
    this.X_HW_Noise  = X_HW_Noise;
    this.X_HW_SNR    = X_HW_SNR;
    this.X_HW_SingalQuality  = X_HW_SingalQuality;
    this.X_HW_WorkingMode  = X_HW_WorkingMode;
    this.X_HW_WMMStatus  = X_HW_WMMStatus;
    this.X_HW_PSMode  = X_HW_PSMode;
    this.ssidname = 0;
}

function getInstIdByDomain(domain)
{
    if ('' != domain)
    {
        return parseInt(domain.substr(domain.lastIndexOf('.') + 1));
    }
}

function getWlanPortNumber(name)
{
    if ('' != name)
    {
if(name.length &gt; 4)
{
return parseInt(name.charAt(name.length - 2) + name.charAt(name.length - 1));    
}
else
{
return parseInt(name.charAt(name.length - 1)); 
}
    }
}

function getIndexFromPort(index)
{
    for (var i = 0; i &lt; WlanMap.length; i++)
    {
        if (index == WlanMap[i].portIndex)
        {
            return WlanMap[i].index;
        }
    }
}

function getPortFromIndex(index)
{
    for (var i = 0; i &lt; WlanMap.length; i++)
    {
        if (index == WlanMap[i].index)
        {
            return WlanMap[i].portIndex;
        }
    }
}


function isValidWPAPskKey(val)
{
    var ret = false;
    var len = val.length;
    var maxSize = 64;
    var minSize = 8;
 
    if (isValidAscii(val) != '')
    {
       return false;
    }

    if ( len &gt;= minSize &amp;&amp; len &lt; maxSize )
    {
    ret = true;
    }
    else if ( len == maxSize )
    {
        for ( i = 0; i &lt; maxSize; i++ )
            if ( isHexaDigit(val.charAt(i)) == false )
                break;
        if ( i == maxSize )
            ret = true;
    }
    else
    {
        ret = false;
    }
    
    return ret;
}

var L2WifiFlag = '0';
var isStaWorkingModeShow = '0';
var IsSupportWlanFlag = '1';

function IsWlanAvailable()
{
if(1 == IsSupportWlanFlag)
{
return true;
}
else
{
return false;
}
}

var capInfo = '1110011111110001101011110100011100111111100011010111101000';

var wepCap = 1;
var fragCap = 1;
var radiusCap = 1;
var wps1Cap = 1;
var wapiCap = 1;
var cap11n = 1;
var cap11a = 1;
var capTkip = 1;
var capWPAPSK = 1;
var capWPAEAP = 1;
var capWPAWPA2PSK = 1;
var capWPAWPA2EAP = 1;
var capHT160 = 1;
var capHT80_80 = 1;
var capBandSteering = 1;
var capTXBF = 1;
var capAntiInterferenceMode = 1;
var capStaPinUnreboot = 0;
var capAirtimeFairness = 0;
var capMU_MIMO = 0;


function initWlanCap(freq)
{
    if(null == capInfo || '' == capInfo || capInfo.length &lt; capNum*2)
    {
        return ;
    }

    var capNum = capInfo.length/2;

    var baseIdx = capNum * ((freq=="5G") ? 1 : 0);

    wepCap = parseInt(capInfo.charAt(0 + baseIdx));
    fragCap = parseInt(capInfo.charAt(1 + baseIdx));
    radiusCap = parseInt(capInfo.charAt(2 + baseIdx));
    wps1Cap = parseInt(capInfo.charAt(3 + baseIdx));
    wapiCap = parseInt(capInfo.charAt(4 + baseIdx));
    cap11n = parseInt(capInfo.charAt(5 + baseIdx));
    cap11a = parseInt(capInfo.charAt(6 + baseIdx));
    capTkip = parseInt(capInfo.charAt(7 + baseIdx));
    capWPAPSK = parseInt(capInfo.charAt(8 + baseIdx));
    capWPAEAP = parseInt(capInfo.charAt(9 + baseIdx));
    capWPAWPA2PSK = parseInt(capInfo.charAt(10 + baseIdx));
    capWPAWPA2EAP = parseInt(capInfo.charAt(11 + baseIdx));
capHT160 = parseInt(capInfo.charAt(13 + baseIdx));
capHT80_80 = parseInt(capInfo.charAt(14 + baseIdx));
capBandSteering = parseInt(capInfo.charAt(15 + baseIdx));
capTXBF = parseInt(capInfo.charAt(16 + baseIdx));
capAntiInterferenceMode = parseInt(capInfo.charAt(23 + baseIdx));
capStaPinUnreboot = parseInt(capInfo.charAt(25 + baseIdx));
capAirtimeFairness = parseInt(capInfo.charAt(27 + baseIdx));
capMU_MIMO = parseInt(capInfo.charAt(28 + baseIdx));
}

var stapinlock = '0000';

function getPossibleChannels(freq, country, mode, width)
{
    $.ajax({
            type : "POST",
            async : false,
            cache : false,
            url : "../common/WlanChannel.asp?&amp;1=1",
            data :"freq="+freq+"&amp;country="+country+"&amp;standard="+mode + "&amp;width="+width,
            success : function(data) {
                possibleChannels = data;
            }
        });
}

function isValidKey(val, size)
{
    var ret = false;
    var len = val.length;
    var dbSize = size * 2;
 
    if (isValidAscii(val) != '')
    { 
        return false;
    }

    if ( len == size )
       ret = true;
    else if ( len == dbSize )
    {
       for ( i = 0; i &lt; dbSize; i++ )
          if ( isHexaDigit(val.charAt(i)) == false )
             break;
       if ( i == dbSize )
          ret = true;
    }
    else
      ret = false;

   return ret;
}

function ltrim(str)
{ 
    return str.toString().replace(/(^\s*)/g,""); 
}

function InitDropDownListWithSelected(id, valueTextPair, selected)
{
var obj = $('#' + id);
if(0==obj.length || null==valueTextPair)
{
return ;
}

var isSelectedValid = false;

obj.empty();

for(var key in valueTextPair)
{
if((1 == valueTextPair[key].length) || (1 == valueTextPair[key][1]))
{
obj.append("<option value="&quot; + key + &quot;">" + valueTextPair[key][0] + "</option>");

if(!isSelectedValid &amp;&amp; selected==key)
        {
        isSelectedValid = true;
        setSelect(id, selected);
        }
}
}
}


var tdeSpecailChar = ['Á','á','À','à','É','é','Í','í','Ó','ó',
                      'Ú','ú','Â','â','Ê','ê','Î','î','ö','Û',
  'û','Ü','ü','Ç','ç','Ã','ã','Õ','õ','Ñ',
  'ñ','€','´','·','¸','Ò','ò','Ù','ù','È',
  'è','Ì','ì','Ï','ï','ª','¿','º'];
 

function checkSepcailStrValid(val)
{
    var findVar = 0;

    for ( var i = 0 ; i &lt; val.length ; i++ )
{
var ch = val.charAt(i);
if (ch &gt;= ' ' &amp;&amp; ch &lt;=  '~')
{
    continue;
}
else
{
    findVar = 0;
    for (var j = 0; j &lt; tdeSpecailChar.length; j++)
        {
        if(ch == tdeSpecailChar[j])
        {
        findVar = 1;
        break;
        }
        }

if (1 != findVar)
{
    return false;
}
        
}
}
return true;
}

function getTDEStringActualLen(val)
{
    var actualLen = 0;
for( var i = 0; i &lt; val.length; i++ )
{
    var ch = val.charAt(i);
if (ch &gt;= ' ' &amp;&amp; ch &lt;=  '~')
{
    actualLen = actualLen + 1;
}
        else
        {
     if('€' == ch || '•' == ch)
 {
     actualLen = actualLen + 3;
 }
 else
 {
     actualLen = actualLen + 2;
 }
} 
}

return actualLen;
}

function isValidWPAPskSepcialKey(value)
{
    var len = value.length;
    var maxSize = 63;
    var minSize = 8;
var i = 0;
var actualLen = 0;
var spaceNum = 0;

    if (value == '')
    {
        AlertEx(cfg_wlancfgdetail_language['amp_wifipwd_invalid']);
        return false;
    }

if ( len &lt; minSize ||  len &gt; maxSize )
    {
        AlertEx(cfg_wlancfgdetail_language['amp_wifipwd_invalid']);
    return false;
    }

    if(value.charAt(0)==' ' || value.charAt(len-1)==' ')
    {
        AlertEx(cfg_wlancfgdetail_language['amp_wifipwd_space_invalid']);
    return false;
    }

    for(i=0, spaceNum=0; (i &lt; value.length) &amp;&amp; (spaceNum != 2); i++)
    {
        if(value.charAt(i) == ' ')
        {
            spaceNum++;
        }
        else
        {
            spaceNum = 0;
        }
    }

    if(i != value.length)
    {
        AlertEx(cfg_wlancfgdetail_language['amp_wifipwd_space_invalid']);
    return false;
    }

if (true != checkSepcailStrValid(value))
    {
        AlertEx(cfg_wlancfgdetail_language['amp_wifipwd_invalid']);
        return false;
    }

actualLen = getTDEStringActualLen(value);
if( actualLen &lt; minSize  || actualLen &gt; maxSize )
{
    AlertEx(cfg_wlancfgdetail_language['amp_wifipwd_invalid']);
    return false;
}

    return true;
}

function checkHexNumWithLen(val, len)
{
    if(null == val || len != val.length)
        return false;

    for(var i=0; i<len; i++)="" {="" if="" (ishexadigit(val.charat(i))="=" false)="" return="" false;="" }="" true;="" function="" isvalidraiuskey(val)="" (isvalidascii(val)="" !="" )="" isvaliddecimalnum(inputnum)="" var="" int1="parseInt(inputNum," 10).tostring(10);="" int2="inputNum.toString(10);" if(!(int1="=" int2))="" else="" isvalidradiusport(wlradiusport)="" port="parseInt(wlRadiusPort,10);" (!isinteger(wlradiusport)="" ||="" <="" 0=""> 65535 
|| isValidDecimalNum(wlRadiusPort) == false )
    {
        return false;
    }

    return true;
}

function isValidAssoc(deviceNum)
{
    if(128 == '32')
    {
        if (isPlusInteger(deviceNum) == false 
|| isValidDecimalNum(deviceNum) == false
        || parseInt(deviceNum,10) &lt; 1
        || parseInt(deviceNum,10) &gt; 128)
        {
            AlertEx(cfg_wlancfgother_language['amp_dev_num_128']);
            return false;
        }
    }
    else if('64' == '32')
    {
        if (isPlusInteger(deviceNum) == false
|| isValidDecimalNum(deviceNum) == false
        || parseInt(deviceNum,10) &lt; 1
        || parseInt(deviceNum,10) &gt; 64)
        {
            AlertEx(cfg_wlancfgother_language['amp_dev_num_64']);
            return false;
        }
    }
    else
    {
        if (isPlusInteger(deviceNum) == false
|| isValidDecimalNum(deviceNum) == false
        || parseInt(deviceNum,10) &lt; 1
        || parseInt(deviceNum,10) &gt; 32)
        {
            AlertEx(cfg_wlancfgother_language['amp_dev_num']);
            return false;
        }
    }
}