var DisliteFeature = "0";
var selctIndex = -1;
var MngtGdct = '0';
var MultiWanIpFeature = '0';
var TDESME2Modeflg ='0';
var TelmexFlag = '0';

var specPPPOEUsername = '';
var specPPPOEPassword = '';
var Custom_cmcc_rms =  '0';
var isSupportVLAN0 = '0';
var isPTVDF = '0';

function trim(str)
{
   if (str.charAt(0) == " ")
   {
      str = str.substring(1, str.length);
      str = trim(str);
   }
   if (str.charAt(str.length - 1) == " ")
   {
      str = str.substring(0, str.length - 1);
      str = trim(str);
   }
   return str;
}


function IsIPv6AddressUshortValid(Short)
{
    if (Short.length &gt; 4)
    {
        return false;
    }
    
    for (var i = 0; i &lt; Short.length; i++)
    {
        var Char = Short.charAt(i);
        if (!((Char &gt;= '0' &amp;&amp; Char &lt;= '9') || (Char &gt;= 'a' &amp;&amp; Char &lt;= 'f') || (Char &gt;= 'A' &amp;&amp; Char &lt;= 'F')))
        {
            return false;
        }
    }
    
    return true;
}

function IsStandardIPv6AddressValid(Address)
{
    if ((Address.charAt(0) == ':') || (Address.charAt(Address.length-1) == ':'))
    {
        return false;
    }    
    
    List = Address.split(":");
    if (List.length &gt; 8)
    {
        return false;
    }

    for (var i = 0; i &lt; List.length; i++)
    {
        if (false == IsIPv6AddressUshortValid(List[i]))
        {
            return false;
        }
    }    
    
    return true;   
}

function IsIPv6AddressValid(Address)
{
    if (Address == "::")
    {
        return true;
    }

    if (Address.length &lt; 3)
    {
        return false;
    }

    var List = Address.split("::");
    if (List.length &gt; 2)
    {
        return false;
    }
    
    if (List.length == 1)
    if (Address.split(":").length != 8)
    {
        return false;
    }
    
    if (List.length &gt; 1)
    if (Address.split(":").length &gt; 8)
    {
        return false;
    }

    List = Address.split("::");
    for (var i = 0; i &lt; List.length; i++)
    {
        if (false == IsStandardIPv6AddressValid(List[i]))
        {
            return false;
        }
    }
    return true;
}


function IsIPv6ZeroAddress(Address)
{
    for (var i = 0; i &lt; Address.length; i++)
    {
        if (Address.charAt(i) != '0' &amp;&amp; Address.charAt(i) != ':')
        {
            return false;
        }
    }
    
    return true;
}


function IsIPv6LoopBackAddress(Address)
{
    if (Address.substr(Address.length-1,1) == "1")
    {
        if (IsIPv6ZeroAddress(Address.substr(0, Address.length-1)+"0") == true)
        {
            return true;
        }
    }
    return false;
}

function IsIPv6LinkLocalAddress(Address)
{
    var IntAddress = parseInt(Address.toUpperCase().substr(0, 4), 16);
    var StartAddress = parseInt("FE80", 16);
    var EndAddress = parseInt("FEBF", 16);
    return (IntAddress &gt;= StartAddress &amp;&amp; IntAddress &lt;= EndAddress) ? true : false; 
}

function IsIPv6SiteLocalAddress(Address)
{
    var IntAddress = parseInt(Address.toUpperCase().substr(0, 4), 16);
    var StartAddress = parseInt("FEC0", 16);
    var EndAddress = parseInt("FEFF", 16);
    return (IntAddress &gt;= StartAddress &amp;&amp; IntAddress &lt;= EndAddress) ? true : false; 
}

function IsIPv6MulticastAddress(Address)
{
    return (parseInt(Address.split(":")[0], 16) &gt;= parseInt("0xFF00", 16)) ? true : false;
}

function IsIPv6UlaAddress(Address)
{
    var firstAddress = Address.split(":")[0];
    
    if(firstAddress.length != 4)
    {
        return false;
    }

    if ((parseInt(firstAddress.substr(0, 2), 16) == parseInt("0xFD", 16))
        || (parseInt(firstAddress.substr(0, 2), 16) == parseInt("0xFC", 16)))
    {
        return true;
    }
    
    return false;
}

function CheckIpv6Parameter(IPv6Address)
{
    if (IsIPv6AddressValid(IPv6Address) == false)
    {
        return false;
    }

    if (IsIPv6MulticastAddress(IPv6Address) == true)
    {
        return false;  
    } 

    if (IsIPv6ZeroAddress(IPv6Address) == true) 
    {
        return false;
    }

    if (IsIPv6LoopBackAddress(IPv6Address) == true)
    {
        return false;  
    }
    return true; 
}

function isValidVenderClassID(val)
{
    for ( var i = 0 ; i &lt; val.length ; i++ )
    {
        var ch = val.charAt(i);
        if (ch == '&amp;' || ch == '*' || ch == '(' || ch == ')'
            || ch == '`' || ch == ';' || ch == '\"' || ch == '\'' 
            || ch == '&lt;' || ch == '&gt;' || ch == '#' || ch == '|')
        {
            return ch;
        }
    }
    return '';
}

function isTTValidVenderClassID(val)
{
    for ( var i = 0 ; i &lt; val.length ; i++ )
    {
        var ch = val.charAt(i);
        if (ch == '&amp;' || ch == '*' || ch == '(' || ch == ')'
            || ch == '`' || ch == ';' || ch == '\"' || ch == '\'' 
            || ch == '#' || ch == '|')
        {
            return ch;
        }
    }
    return '';
}
function SearchTr069WanInstanceId(curwan)
{
    var CurWanService = '';
    var Wan = GetWanList();
    
    for(var i = 0; i &lt; Wan.length; i++)
    {
        CurWanService = Wan[i].ServiceList;
        if (CurWanService.indexOf("TR069") &gt;=0 )
        {
            if( curwan.domain != Wan[i].domain)
            {
                return Wan[i].domain;
            }
        }
    }
    
    return "";
}

function CheckIPv6AddrMaskLenE8c(wan)
{
    if (isNaN(wan.IPv6AddrMaskLenE8c) == true || parseInt(wan.IPv6AddrMaskLenE8c,10) &lt; 10 
    || parseInt(wan.IPv6AddrMaskLenE8c,10) &gt; 128 || isNaN(wan.IPv6AddrMaskLenE8c.replace(' ', 'a')) == true)
    {
        return false;     
    }
    return true;
}


function CheckDstIPForwardingCfg(Wan)
{
  var DstIPForwardingList = Wan.DstIPForwardingList;
  var ipStart;
  var ipEnd;
  var ipList;

  if(!DstIPForwardingList.length)
  {
      return true;
  }

  DstIPForwardingList = DstIPForwardingList.split(",");
    var checkflag = false;
    for (var i = 0; i &lt; DstIPForwardingList.length; i++)
    {    
        if(DstIPForwardingList[i] == "")
        {
            AlertEx(dst_ip_forwarding_cfg_ctc_language['bbsp_dst_ip_forwarding_invalid_formate']);
            return false;
        }
        checkflag = false;
        for(var j = 0; j &lt; DstIPForwardingList[i].length; j++ )
        {
            var ch = DstIPForwardingList[i].charAt(j);
            if(ch == '-')
            {
                checkflag = true;
                break;
            }
        }
        if(checkflag)
        {
            ipList = DstIPForwardingList[i].split("-");

            if (ipList.length != 2)
            {
                AlertEx(dst_ip_forwarding_cfg_ctc_language['bbsp_dst_ip_forwarding_invalid_formate']);
                return false;
            }
        

            ipStart = ipList[0];
            ipEnd   = ipList[1];
            
            if(("" == ipStart) || ("" == ipEnd))
            {
                AlertEx(dst_ip_forwarding_cfg_ctc_language['bbsp_dst_ip_forwarding_invalid_formate']);
                return false;
            }
            
            if (false == (CheckIpAddressValid(ipStart)))
            {
                AlertEx(dst_ip_forwarding_cfg_ctc_language['bbsp_dst_ip_forwarding_ip_error']+"("+ipStart+")");
                return false;
            }
            if (false == (CheckIpAddressValid(ipEnd)))
            {
                AlertEx(dst_ip_forwarding_cfg_ctc_language['bbsp_dst_ip_forwarding_ip_error']+"("+ipEnd+")");
                return false;
            }
            
            if (ipEnd != "" &amp;&amp; ipStart != "" 
                &amp;&amp; (IpAddress2DecNum(ipStart) &gt; IpAddress2DecNum(ipEnd)))
            {
                AlertEx(ipStart+ dst_ip_forwarding_cfg_ctc_language['bbsp_dst_ip_forwarding_ip_error2'] +ipEnd);
                return false;         
            }
            
            
        }
        else
        {
            ipStart = DstIPForwardingList[i];
            ipEnd = DstIPForwardingList[i];
        }
        
        
        if (false == (CheckIpAddressValid(ipStart)))
        {
            AlertEx(dst_ip_forwarding_cfg_ctc_language['bbsp_dst_ip_forwarding_ip_error']+"("+ipStart+")");
            return false;
        }

        if (false == (CheckIpAddressValid(ipEnd)))
        {
            AlertEx(dst_ip_forwarding_cfg_ctc_language['bbsp_dst_ip_forwarding_ip_error']+"("+ipEnd+")");
            return false;
        }
        
    }

    return true;
}

function isSameIPv6SubNet(Ip1,Ip2,IPv6MaskLen) 
{
    var count = 0;
    var i = 0;
    var j = 0;
    var strMask = "";
    var Ip1_str = ":0:";
    var Ip2_str = ":0:";
    var Ip1_list = Ip1.split('::');
    var Ip2_list = Ip2.split('::');
    
    if(Ip1_list.length == 1)
    {
        Ip1_list = Ip1;
    }
    if(Ip2_list.length == 1)
    {
        Ip2_list = Ip2;
    }
   
    if(Ip1_list.length == 2)
    {
        if(Ip1_list[0] == "")
        {
            Ip1_list[0] = "0";
        }
        if(Ip1_list[1] == "")
        {
            Ip1_list[1] = "0";
        }
        Ip1_list1 = Ip1.split(':');
        for(i = 0; i &lt; 8 - Ip1_list1.length; i++ )
        {
            Ip1_str += "0:";
        }
        Ip1_list = Ip1_list[0] + Ip1_str +  Ip1_list[1];
    }
    
    if(Ip2_list.length == 2)
    {
        if(Ip2_list[0] == "")
        {
            Ip2_list[0] = "0";
        }
        if(Ip2_list[1] == "")
        {
            Ip2_list[1] = "0";
        }
        Ip2_list2 = Ip2.split(':');
        for(j = 0; j &lt; 8 - Ip2_list2.length; j++ )
        {
            Ip2_str += "0:";
        }
        Ip2_list = Ip2_list[0] + Ip2_str +  Ip2_list[1];
    }

    if(IPv6MaskLen == "")
    {
        IPv6MaskLen = 64;
    }
    for(i = 0; i&lt; 128 ;i++)
    {
        if(i &lt; IPv6MaskLen)
        {
            strMask += "1";
        }
        else
        {
            strMask += "0";
        }
        if((i+1)%16 == 0)
        {
            strMask += ":";
        }
    }
    strMask = strMask.substring(0,strMask.lastIndexOf(':'));
   
    lanm = strMask.split(':');
    lan1a = Ip1_list.split(':');
    lan2a = Ip2_list.split(':');
    
    for(i = 0; i &lt; 8; i++)
    {
        l1a_n = parseInt(lan1a[i],16);
        l2a_n = parseInt(lan2a[i],16);
        lm_n = parseInt(lanm[i],2);
        if ((l1a_n &amp; lm_n) == (l2a_n &amp; lm_n))
        count++;
    }
   
    if (count == 8)
        return true;
    else
        return false;
}


function GetRouteWanCount()
{
    var WanList = GetWanList();
    var Count = 0; 
    for (var i = 0; i &lt; WanList.length; i++)
    {
        if (WanList[i].Mode == "IP_Routed")
        {
            Count++;
        }
    }
    
    return Count;
}

function isNum(str)
{
    var valid=/[0-9]/;
    var i;
    for(i=0; i<str.length; i++)="" {="" if(false="=" valid.test(str.charat(i)))="" return="" false;="" }="" true;="" var="" errmsg="" ;="" err_must_input="1;" err_first_char_not_zero="ERR_MUST_INPUT+1;" err_must_num="ERR_First_CHAR_NOT_ZERO+1;" err_not_in_range="ERR_MUST_NUM+1;" err_not_in_range_mvlan="ERR_NOT_IN_RANGE+1;" err_not_in_mvlan_not_equal="ERR_NOT_IN_RANGE_MVLAN+1;" function="" geterrormsg(fieldprompt,errcode)="" error="new" array("","mustbeinput","isnumfirstchar","isnum","vlanidrange","mvlanidrange","mvlanideuqal");="" errorcn="new" array("","vlan必须输入","vlan="" id第一个字符不能为0","vlan="" id不合法，它只能是数字","vlan="" id="" 范围1~4094","vlan="" 范围0~4094","ipv4和ipv6组播vlan必须相等");="" if(fieldprompt!="" )="" getlanguage(fieldprompt)+getlanguage(error[errcode]);="" }else="" errorcn[errcode];="" checkvlanid(vlanid,fieldprompt)="" if(''="=" vlanid)="" geterrormsg(fieldprompt,err_must_input);="" if="" (="" vlanid.length=""> 1 &amp;&amp; VlanID.charAt(0) == '0' )
    {
        return getErrorMsg(fieldPrompt,ERR_First_CHAR_NOT_ZERO);
    }
    if( false == isInteger(VlanID) )
    {
        return getErrorMsg(fieldPrompt,ERR_MUST_NUM);
    }
    if ( false == CheckNumber(VlanID,1, 4094) )
    {
        return getErrorMsg(fieldPrompt,ERR_NOT_IN_RANGE);
    }

    return "";
}

function checkMVlanID(VlanID,fieldPrompt)
{
    if('' == VlanID)
    {
        return getErrorMsg(fieldPrompt,ERR_MUST_INPUT);
    }
    if ( VlanID.length &gt; 1 &amp;&amp; VlanID.charAt(0) == '0' )
    {
        return getErrorMsg(fieldPrompt,ERR_First_CHAR_NOT_ZERO);
    }
    if( false == isInteger(VlanID) )
    {
        return getErrorMsg(fieldPrompt,ERR_MUST_NUM);
    }
    if ( false == CheckNumber(VlanID,0, 4094) )
    {
        return getErrorMsg(fieldPrompt,ERR_NOT_IN_RANGE_MVLAN);
    }

    return "";
}

function CheckRouteBridgeCoexist(newWan, existWan)
{
    if (('PPPoE_Bridged' == newWan.Mode) || ('IP_Bridged' == newWan.Mode))
    {
        if ('IP_Routed' == existWan.Mode)
        {
            return true;
        }
    }
    else if ('IP_Routed' == newWan.Mode)
    {
        if (('PPPoE_Bridged' == existWan.Mode) || ('IP_Bridged' == existWan.Mode))
        {
            return true;
        }
    }
    return false;
}

function CheckForSession(Wan, AddFlag)
{
    if (AddFlag != 2)
    {
        return true;
    }
    
    var SessionVlanLimit  = "1";
    if (SessionVlanLimit == 0)
    {
        return true;
    }
    var wanConInst = GetWanInfoSelected().domain.split(".")[4];
    var domainTmp = 'InternetGatewayDevice.WANDevice.1.WANConnectionDevice.' + wanConInst + '.';
    var wanListTmp = GetWanList();
    var maxCnt = 1;
    var tmpCnt = 0;
    
    for (var  index1=0; index1 &lt; wanListTmp.length; index1++ )
    {
      
        if (wanListTmp[index1].domain.indexOf(domainTmp) &gt;= 0)
        {
            tmpCnt++;
        }
        
        if (tmpCnt &gt; maxCnt)
        {
            AlertMsg("SessionIsFull");
            return false;
        }
    }

    return true;
}

function CheckMtu(Wan)
{
    
    var maxMtuCfg = getMtuMaxAllowCfg(Wan);
    var specIPoEMTUMax = '1500'

    if(Wan.IPv6Enable == 0)
    {
        if ((false == isNum(Wan.IPv4MXU)) || isNaN(Wan.IPv4MXU) || parseInt(Wan.IPv4MXU,10) &gt; maxMtuCfg || parseInt(Wan.IPv4MXU,10) &lt; 1)
        {
           if ('1500' == specIPoEMTUMax)
            {
                   AlertMsg("IPv4MxuAlert");
                return false;
            }
            else
            {
                Wan.EncapMode.toUpperCase() == "PPPOE"? AlertMsg("MRUInvalid"):AlertMsg("MTUInvalid");            
            }
            return false;
        }
        
        if ( Wan.IPv4MXU.length &gt; 1 &amp;&amp; Wan.IPv4MXU.charAt(0) == '0' )
        {
              AlertMsg("IPv4MxuAlert1");
             return false;
        }
    }
    else
    {
        if (false == isNum(Wan.IPv4MXU) || isNaN(Wan.IPv4MXU) || parseInt(Wan.IPv4MXU,10) &gt; maxMtuCfg || parseInt(Wan.IPv4MXU,10) &lt; 1280)
        {
                if ('1500' == specIPoEMTUMax)
                {
                       AlertMsg("IPv6MxuAlert");
                    return false;
                }
                else
                {
                        Wan.EncapMode.toUpperCase() == "PPPOE"? AlertMsg("MRUInvalid"):AlertMsg("MTUInvalid");        
                }
            return false;
        }
        
        if ( Wan.IPv4MXU.length &gt; 1 &amp;&amp; Wan.IPv4MXU.charAt(0) == '0' )
        {
             AlertMsg("IPv4MxuAlert1");
             return false;
        }
    }

    return true;
}

function CheckAtmWanPvc(pvc)
{
    var TempList = pvc.split("/");
    
    if (TempList.length != 2)
    {
        AlertMsg("PVCInvalid");
        return false;
    }
    
    if ((!isNum(TempList[0])) || (!isNum(TempList[1])))
    {
        AlertMsg("PVCInvalid");
        return false;                
    }
    
    if (!(parseInt(TempList[0],10) &gt;= 0 &amp;&amp; parseInt(TempList[0],10) &lt;= 255))
    {
        AlertMsg("VPIInvalid");
        return false;
    }
    
    if (!(parseInt(TempList[1],10) &gt;= 32 &amp;&amp; parseInt(TempList[1],10) &lt;= 65535))
    {
        AlertMsg("VCIInvalid");
        return false;
    }

    return true;
}


function CheckAtmWanLinkConifg(Wan)
{
    var XTM_MAX_PEAK_CELL_RATE = 2600;
    var XTM_MIN_PEAK_CELL_RATE = 50;

    var XTM_MAX_SUSTAINABLE_CELL_RATE = 2600;
    var XTM_MIN_SUSTAINABLE_CELL_RATE = 50;

    var XTM_MAX_MAX_BURST_SIZE = 32767;
    var XTM_MIN_MAX_BURST_SIZE = 1;
            
    if( 'UBR' != Wan.ATMQoS )
    {    
        if( Wan.ATMPeakCellRate &gt; XTM_MAX_PEAK_CELL_RATE || Wan.ATMPeakCellRate &lt; XTM_MIN_PEAK_CELL_RATE)
        {
            AlertMsg("PeakInvalid");
            return false;
        }
    }
    
    if ( 'VBR-nrt' == Wan.ATMQoS || 'VBR-rt' == Wan.ATMQoS)
    {
        if (Wan.ATMSustainableCellRate &gt; XTM_MAX_SUSTAINABLE_CELL_RATE || Wan.ATMSustainableCellRate &lt; XTM_MIN_SUSTAINABLE_CELL_RATE)
        {
            AlertMsg("SustainableInvalid");
            return false;
        }    

        if (Wan.ATMMaximumBurstSize &gt; XTM_MAX_MAX_BURST_SIZE || Wan.ATMMaximumBurstSize &lt; XTM_MIN_MAX_BURST_SIZE)
        {
            AlertMsg("MaxBurstInvalid");
            return false;
        }                       
            
        if (parseInt(Wan.ATMSustainableCellRate) &gt; parseInt(Wan.ATMPeakCellRate) )
        {
            AlertMsg("SustainablePeakInvalid");
            return false;
        }
    }
    
    return true;
}

function CheckATMWanPVCAndLinkType(Wan)
{

    if(EditFlag  == "ADD")
    {
        if(Wan.LinkType.indexOf("PPPoA") &gt;= 0 ||  Wan.LinkType.indexOf("IPoA") &gt;= 0 )
        {
            for( var i = 0 ; i &lt; DSLLinkConfigList.length - 1 ; i++ )
            {
                if( DSLLinkConfigList[i].DestinationAddress.replace("PVC:","") == Wan.DestinationAddress)
                {
                    AlertMsg("PVCUsederror");
                    return false;
                }
            }
        }
        else
        {
            for( var i = 0 ; i &lt; DSLLinkConfigList.length - 1 ; i++ )
            {
                if(DSLLinkConfigList[i].LinkType.indexOf("PPPoA") &gt;= 0 ||  DSLLinkConfigList[i].LinkType.indexOf("IPoA") &gt;= 0)
                {
                    if( DSLLinkConfigList[i].DestinationAddress.replace("PVC:","") == Wan.DestinationAddress)
                    {
                        AlertMsg("PVCUsederror");
                        return false;
                    }
                }
            }
        }
    }
    else
    {
        if(Wan.LinkType.indexOf("PPPoA") &gt;= 0 ||  Wan.LinkType.indexOf("IPoA") &gt;= 0 )
        {
            for( var i = 0 ; i &lt; DSLLinkConfigList.length - 1 ; i++ )
            {
                if(DSLLinkConfigList[i].domain.split('.')[4] == Wan.domain.split('.')[4])
                {
                    continue;
                }
                    
                if( DSLLinkConfigList[i].DestinationAddress.replace("PVC:","") == Wan.DestinationAddress)
                {
                    AlertMsg("PVCUsederror");
                    return false;
                }
                    
            }
                
            for( var i = 0 ; i &lt; GetWanList().length; i++ )
            {
                if( Wan.domain != GetWanList()[i].domain  &amp;&amp; Wan.DestinationAddress ==  GetWanList()[i].DestinationAddress)
                {
                    AlertMsg("PVCUsederror");
                    return false;
                }
            }
                
        }
        else
        {
            for( var i = 0 ; i &lt; DSLLinkConfigList.length - 1 ; i++ )
            {
                if(DSLLinkConfigList[i].domain.split('.')[4] == Wan.domain.split('.')[4])
                {
                    continue;
                }
                if(DSLLinkConfigList[i].LinkType.indexOf("PPPoA") &gt;= 0 ||  DSLLinkConfigList[i].LinkType.indexOf("IPoA") &gt;= 0)
                {
                    if( DSLLinkConfigList[i].DestinationAddress.replace("PVC:","") == Wan.DestinationAddress)
                    {
                        AlertMsg("PVCUsederror");
                        return false;
                    }
                }
            }
        }
    }    

    return true;
    
}

function CheckIPV4DNS()
{
    if (isPTVDF == "0")
    {
        return;
    }
    if ('1' == Wan.IPv4Enable &amp;&amp; Wan.IPv4PrimaryDNS != '' &amp;&amp; (isValidIpAddress(Wan.IPv4PrimaryDNS) == false || isAbcIpAddress(Wan.IPv4PrimaryDNS) == false))
    {
        AlertMsg("FirstDnsInvalid");
        return false;        
    }

    if ('1' == Wan.IPv4Enable &amp;&amp;  Wan.IPv4SecondaryDNS != '' &amp;&amp; (isValidIpAddress(Wan.IPv4SecondaryDNS) == false || isAbcIpAddress(Wan.IPv4SecondaryDNS) == false))
    {
        AlertMsg("SecondDnsInvalid");
        return false;         
    }
}

function CheckAtmWan(Wan)
{
    if( 'DSL' != Wan.WanAccessType )
    {
        return true;
    }
    
    if(false == CheckAtmWanPvc(Wan.DestinationAddress))
    {
        return false;
    }
    
    if(false == CheckAtmWanLinkConifg(Wan))
    {
        return false;
    }
    
    if(false == CheckATMWanPVCAndLinkType(Wan))
    {
        return false;
    }
    
    return true;    
}

var FtBin5Enhanced = "0";
function CheckWan(Wan)
{    
    var RouteWanNum = GetRouteWanMax();

    if ((Wan.domain == null || (Wan.domain != null &amp;&amp; Wan.domain.length &lt; 10)) &amp;&amp; GetRouteWanCount() &gt;= RouteWanNum &amp;&amp; Wan.Mode == "IP_Routed")
    {
        AlertMsg("RouteWanIsFull");
        return false;   
    }

    if ((BirdgetoRoute() == true) &amp;&amp; GetRouteWanCount() &gt;= RouteWanNum)
    {
        AlertMsg("RouteWanIsFull");
        return false;   
    }
     
     if((Wan.Mode.toUpperCase().indexOf("BRIDGE") &gt;= 0) &amp;&amp; (Wan.ServiceList != 'INTERNET') &amp;&amp; (Wan.ServiceList != 'IPTV') &amp;&amp; (Wan.ServiceList != 'OTHER') &amp;&amp; (Wan.ServiceList.toUpperCase().indexOf("SPECIAL_SERVICE") &lt; 0))
     {
        if ("1" == GetCfgMode().TELMEX || 1 == TelmexFlag)
        {
            if(Wan.ServiceList.indexOf("INTERNET") == -1)
            {
                AlertMsg("Wanlisterror");
                return false;
            }
        }
        else if(GetCfgMode().TRUE == "1")
        {
            return true;
        }
        else
        {
            if(!(('TDE2' == CfgModeWord.toUpperCase() || '1' == "0") 
                &amp;&amp; (Wan.ServiceList.toUpperCase().indexOf("INTERNET") &gt;= 0) 
                &amp;&amp; (Wan.EncapMode.toUpperCase() == "PPPOE")))
            {
                AlertMsg("Wanlisterror");
                return false;
            }
        }
     }
     if((Wan.Mode.toUpperCase().indexOf("ROUTE") &gt;= 0) &amp;&amp; (Wan.ServiceList != 'TR069') &amp;&amp; (Wan.ServiceList != 'VOIP') &amp;&amp; (Wan.ServiceList != 'TR069_VOIP') &amp;&amp; (Wan.ServiceList.toUpperCase().indexOf("SPECIAL_SERVICE") &lt; 0)){
             if ("1" == FtBin5Enhanced){
                 AlertMsg("Wanlisterror2");
                return false;
         }
     }
    
    if("TELMEXACCESS" == CfgModeWord.toUpperCase())
    {
        if((Wan.Mode.toUpperCase().indexOf("ROUTE") &gt;= 0) &amp;&amp; (Wan.ServiceList != 'TR069_VOIP_INTERNET'))
        {
            AlertMsg("Wanlisterror2");
            return false;
        }
    }
    if("TELMEXRESALE" == CfgModeWord.toUpperCase())
    {
        if((Wan.Mode.toUpperCase().indexOf("ROUTE") &gt;= 0) &amp;&amp; (Wan.ServiceList != 'TR069_VOIP_INTERNET'))
        {
            AlertMsg("Wanlisterror2");
            return false;
        }
    }

    var VlanID = Wan.VlanId;
    

    if ( "1" == Wan.EnableVlan)
    {
errmsg="";
if (1 != isSupportVLAN0 || 0 != VlanID)
{
errmsg=checkVlanID(VlanID,"VlanId");
if(""!=errmsg)
{
 AlertEx(errmsg);

 return false;
}
}
    
    }
   
    var IPv4MultiVlanID = Wan.IPv4WanMVlanId;
      if("" != IPv4MultiVlanID &amp;&amp; '1' == Wan.IPv4Enable)
    {
        errmsg="";

        errmsg=checkMVlanID(IPv4MultiVlanID,"WanMVlanId");

        if(""!=errmsg)

    
        {
             AlertEx(errmsg);
        
            return false;
        }
    }
    
    if(('GLOBE' == CfgModeWord.toUpperCase() || 'GLOBE2' == CfgModeWord.toUpperCase()) &amp;&amp; (!IsAdminUser()))
    {    
        var IPv4MultiVlanIDForGoble  = getValue("IPv4WanMVlanIdGlobeUser");
        errmsg=checkMVlanID(IPv4MultiVlanIDForGoble,"WanMVlanId");    
        if(""!=errmsg)
        {
            AlertEx(errmsg);
            return false;
        }
    }
    
     if(('0' == Wan.IPv4Enable)
        &amp;&amp;('0' == DisliteFeature))
     {
         Wan.IPv4WanMVlanId =0 ;
     }
     
     if('0' == Wan.IPv6Enable)
     {
         Wan.IPv6WanMVlanId =0;
     }
    
    if (false == CheckDstIPForwardingCfg(Wan))
    {
        return false;
    }
    
    if((Wan.ProtocolType.toString() == "IPv6") 
    &amp;&amp;(Wan.IPv6DSLite.toString() != "Off")
    &amp;&amp;('COMMON' != CfgModeWord.toUpperCase())
    &amp;&amp;('COMMON2' != CfgModeWord.toUpperCase())
    &amp;&amp;(GetCfgMode().OSK != "1"))
    {
        Wan.IPv6WanMVlanId = 0;
    }
     
    if (Wan.IPv6Enable == "1" &amp;&amp; Wan.IPv6WanMVlanId !="" )
    {
        errmsg="";

        errmsg=checkMVlanID(Wan.IPv6WanMVlanId,"WanMVlanId");
          
        if(""!=errmsg)
        {
             AlertEx(errmsg);
        
            return false;
        }
    }

if (Is3TMode())
{
    if (Wan.IPv6Enable == "1" &amp;&amp; Wan.IPv4Enable == "1")
{
if (Wan.IPv4v6WanMVlanId != "")
{
errmsg="";

errmsg=checkMVlanID(Wan.IPv4v6WanMVlanId,"WanMVlanId");
  
if(""!=errmsg)
{
 AlertEx(errmsg);

return false;
}
}
}
}

    var addWanService = Wan.ServiceList;

    if(!IsXdProduct())
    {
        var currInstanceId = SearchTr069WanInstanceId(Wan);
        if(currInstanceId != "" &amp;&amp; currInstanceId != Wan.domain &amp;&amp; addWanService.indexOf("TR069") &gt;= 0)
        {
            AlertMsg("OnlyOneTr069Wan");
            return false;
        }
    }

    if('IP_Bridged' == Wan.Mode || 'PPPoE_Bridged' == Wan.Mode)
    {
        if ((MngtGdct == 1) &amp;&amp; (false == CheckMtu(Wan)))
        {
            return false;
        }
        if( 'DSL' == Wan.WanAccessType )
        {
            if(false == CheckAtmWanPvc(Wan.DestinationAddress))
            {
                return false;
            }
        }
        return true;
    }

    if(('1' == Wan.IPv4Enable)&amp;&amp;('Static' == Wan.IPv4AddressMode)&amp;&amp;(Wan.IPv4SubnetMask == ''))
    {
        AlertMsg("SubMaskInput");
        return false;
    }

    if ('1' == Wan.IPv4Enable &amp;&amp; Wan.IPv4AddressMode == 'Static' &amp;&amp; (isValidIpAddress(Wan.IPv4IPAddress) == false || isAbcIpAddress(Wan.IPv4IPAddress) == false))
    {
         AlertMsg("IPAddressInvalid");
         return false;
    }

    if ('1' == Wan.IPv4Enable &amp;&amp; Wan.IPv4AddressMode == 'Static' &amp;&amp; isValidSubnetMask(Wan.IPv4SubnetMask) == false )
    {
        AlertMsg("SubMaskInvalid");
        return false;
    }

    if ('1' == Wan.IPv4Enable &amp;&amp; Wan.IPv4AddressMode == 'Static' &amp;&amp; Wan.IPv4PrimaryDNS != '' &amp;&amp; (isValidIpAddress(Wan.IPv4PrimaryDNS) == false || isAbcIpAddress(Wan.IPv4PrimaryDNS) == false))
    {
        if (isPTVDF =="0")
        {
            AlertMsg("FirstDnsInvalid");
            return false;        
        }
    }

    if ('1' == Wan.IPv4Enable &amp;&amp; Wan.IPv4AddressMode == 'Static' &amp;&amp; Wan.IPv4SecondaryDNS != '' &amp;&amp; (isValidIpAddress(Wan.IPv4SecondaryDNS) == false || isAbcIpAddress(Wan.IPv4SecondaryDNS) == false))
    {
        if (isPTVDF =="0")
        {
            AlertMsg("SecondDnsInvalid");
            return false;     
        }    
    }
    CheckIPV4DNS();
    if ('1' == Wan.IPv4Enable &amp;&amp; Wan.IPv4AddressMode == 'Static' &amp;&amp; (Wan.IPv4Gateway != '') &amp;&amp; (isValidIpAddress(Wan.IPv4Gateway) == false || isAbcIpAddress(Wan.IPv4Gateway) == false))
    {
         AlertMsg("WanGateWayInvalid");
         return false;
    }
    if('TDE2' != CfgModeWord.toUpperCase())
    {
        if ('1' == Wan.IPv4Enable &amp;&amp; Wan.IPv4AddressMode == 'Static' &amp;&amp; (Wan.IPv4Gateway != '') &amp;&amp; (Wan.IPv4Gateway == Wan.IPv4IPAddress))
         {
             AlertMsg("IPAddressSameAsGateWay");
             return false;
         }
    }

    if('1' == Wan.IPv4Enable &amp;&amp; Wan.IPv4AddressMode == 'Static' &amp;&amp; (Wan.IPv4Gateway != '') &amp;&amp; false==isSameSubNet(Wan.IPv4IPAddress, Wan.IPv4SubnetMask, Wan.IPv4Gateway, Wan.IPv4SubnetMask))
    {
        if( '1' == TDESME2Modeflg )
        {
            AlertMsg("IPAddressNotInGateWay_1");
        }
        else
        {
        AlertMsg("IPAddressNotInGateWay");
        }
        return false;
    }

    if('TDE2' != CfgModeWord.toUpperCase())
    {
        if('1' == Wan.IPv4Enable &amp;&amp; Wan.IPv4AddressMode == 'Static')
        {
            var addr = IpAddress2DecNum(Wan.IPv4IPAddress);
            var mask = SubnetAddress2DecNum(Wan.IPv4SubnetMask);
            
            if ( (addr &amp; (~mask)) == (~mask) )
            {
                AlertMsg("WANIPAddressInvalid");
                return false;
            }
            if ( (addr &amp; (~mask)) == 0 )
            {
                AlertMsg("WANIPAddressInvalid");
                return false;
            }
            if(Wan.IPv4Gateway != '')
            {
                var gwaddr = IpAddress2DecNum(Wan.IPv4Gateway);
                if ( (gwaddr &amp; (~mask)) == (~mask) )
                {
                    AlertMsg("WANGateWayIPAddressInvalid");
                    return false;
                }
                if ( (gwaddr &amp; (~mask)) == 0 )
                {
                     AlertMsg("WANGateWayIPAddressInvalid");
                    return false;
                }
            }
        }
    }
    
    if ('1' == Wan.IPv4Enable &amp;&amp; 'Static' == Wan.IPv4AddressMode)
    {
        for (var iIP=0; iIP &lt; GetWanList().length; iIP++)
        {
            if (GetWanList()[iIP].domain != Wan.domain &amp;&amp; GetWanList()[iIP].IPv4IPAddress == Wan.IPv4IPAddress)
            {
                if(IsXdProduct())
                {
                    var AccessFlag = GetWanList()[iIP].domain.split('.');
                    if((AccessFlag.length &gt;= 3) &amp;&amp; (GetWanAceesstypeByWanInst(AccessFlag[2]) != Wan.WanAccessType))
                    {
                        continue;
                    }
                }
                AlertMsg("IPAddressIsUserd");
                return false;
            }
        } 
    }

    if ('1' == Wan.IPv4Enable &amp;&amp; "1" != Wan.IPv6Enable &amp;&amp; 'PPPoE' == Wan.EncapMode)
    {
        var usr = Wan.UserName;
        var psw = Wan.Password;
        var DiaMode = Wan.IPv4DialMode;
        var Idletime = Wan.IPv4DialIdleTime;
                 
        if (DiaMode == "OnDemand")
        {
            if (false == isNum(Idletime))
            {
                AlertMsg("DiaIdleTime1");
                return false;
            }
            
            if(isNaN(Idletime) || parseInt(Idletime,10) &gt; 86400 || parseInt(Idletime,10) &lt; 0)
            {
                AlertMsg("DiaIdleTime1");
                return false;
            }
            
            if ( -1  !=  Idletime.indexOf("."))
            {
                AlertMsg("DiaIdleTime1");
                return false;
            }
        }
    }
    
    if("TALKTALK2WIFI" ==CfgModeWord.toUpperCase())
    {
        var username_reg = new RegExp(specPPPOEUsername);        
        var passworld_reg = new RegExp(specPPPOEPassword);
        var currentpsd = "";
        for (var iIP=0; iIP &lt; GetWanList().length; iIP++)
        {
            if (GetWanList()[iIP].domain == Wan.domain)
            {
                currentpsd = GetWanList()[iIP].Password;
            }
        }
        if(!Wan.UserName.match(username_reg))
        {
            AlertEx(Languages['wan_user_error']);          
            return false;   
        }
        
        if(!Wan.Password.match(passworld_reg) &amp;&amp; currentpsd != Wan.Password)
        {
            AlertEx(Languages['IPv4Password1'] + Languages['Hasvalidch'] + isValidAscii(Wan.Password) + '".');         
            return false; 
        }
    }
    else
    {
        if ((Wan.UserName != '') &amp;&amp; (isValidAscii(Wan.UserName) != ''))        
        {  
            AlertEx(Languages['IPv4UserName1'] + Languages['Hasvalidch'] + isValidAscii(Wan.UserName) + '".');          
            return false;       
        }
        
        if ((Wan.Password != '') &amp;&amp; (isValidAscii(Wan.Password) != ''))         
        {  
            AlertEx(Languages['IPv4Password1'] + Languages['Hasvalidch'] + isValidAscii(Wan.Password) + '".');         
            return false;       
        }
    }

    if ('1' == Wan.IPv4Enable &amp;&amp; "DHCP" == Wan.IPv4AddressMode)
    {
        if(Wan.IPv4VendorId.length &gt; 64)
        {
            AlertMsg("VendorIdError");
            return false;
        }
        if ("TALKTALK2WIFI" ==CfgModeWord.toUpperCase())
        {
            if ('' != isTTValidVenderClassID(Wan.IPv4VendorId) || '' != isValidAscii(Wan.IPv4VendorId))
            {
                AlertMsg("VendorIdInvalid");
                return false;
            }                
        }
        else
        {
            if ('' != isValidVenderClassID(Wan.IPv4VendorId) || '' != isValidAscii(Wan.IPv4VendorId))
            {
                AlertMsg("VendorIdInvalid");
                return false;
            }        
        }
        
        if(Wan.IPv4ClientId.length &gt; 64)
        {
            AlertMsg("ClientIdError");
            return false;
        }

        if ('' != isValidVenderClassID(Wan.IPv4ClientId) || '' != isValidAscii(Wan.IPv4ClientId))
        {
            AlertMsg("ClientIdInvalid");
            return false;
        }
    }

    if ('1' == Wan.IPv4DNSOverrideSwitch &amp;&amp; '1' == Wan.IPv4Enable &amp;&amp; ('PPPoE' == Wan.EncapMode || 'DHCP' == Wan.IPv4AddressMode))
    {
        if (Wan.IPv4PrimaryDNS != '' &amp;&amp; (isValidIpAddress(Wan.IPv4PrimaryDNS) == false || isAbcIpAddress(Wan.IPv4PrimaryDNS) == false))
        {
            AlertMsg("FirstDnsInvalid");
            return false;
        }
    
        if (Wan.IPv4SecondaryDNS != '' &amp;&amp; (isValidIpAddress(Wan.IPv4SecondaryDNS) == false || isAbcIpAddress(Wan.IPv4SecondaryDNS) == false))
        {   
            AlertMsg("SecondDnsInvalid");
            return false;
        }
    }
    
    if (Wan.IPv6Enable == "1" &amp;&amp; Wan.IPv6PrefixMode == "Static")
    {
        if (Wan.IPv6StaticPrefix.length == 0)
        {
            AlertMsg("IPv6PrefixEmpty");
            return false;
        }

        var List = Wan.IPv6StaticPrefix.split("/");
        if (List.length != 2)
        {
            AlertMsg("IPv6PrefixInvalid");
            return false;
        }
        if ('' == List[1])
        {
            AlertMsg("IPv6PrefixInvalid");
            return false;
        }

        if ( List[1].length &gt; 1 &amp;&amp; List[1].charAt(0) == '0' )
      {
         AlertMsg("IPv6PrefixInvalid");
         return false;  
      }
        if (parseInt(List[1],10) &lt; 1 || isNaN(List[1].replace(' ', 'a')) == true || parseInt(List[1],10) &gt; 64)
        {
                AlertMsg("IPv6PrefixInvalid");
                return false;    
        }

        if (IsIPv6AddressValid(List[0]) == false)
        {
                AlertMsg("IPv6PrefixInvalid");
                return false;  
        }

        if ( IsIPv6ZeroAddress(List[0]) == true)
        {
                AlertMsg("IPv6PrefixInvalid");
                return false;  
        } 

        if (parseInt(List[0].split(":")[0], 16) &gt;= parseInt("0xFF00", 16))
            {
                AlertMsg("IPv6PrefixInvalid");
                return false;   
            } 
    }
    
    if (Wan.IPv6Enable == "1" &amp;&amp; Wan.IPv6AddressMode == "AutoConfigured" &amp;&amp; Wan.IPv6AddressStuff.length &gt; 0)
    {
        var List = Wan.IPv6AddressStuff.split("/");
        if (List.length != 2)
        {
            AlertMsg("IPv6PrefixMaskInvalid");
            return false;   
        }
        if ( List[1].length &gt; 1 &amp;&amp; List[1].charAt(0) == '0' )
     {
         AlertMsg("IPv6PrefixMaskInvalid");
         return false;  
     }
        if (parseInt(List[1],10) &lt; 1  || isNaN(List[1].replace(' ', 'a')) == true || parseInt(List[1],10) != 64)
        {
                AlertMsg("IPv6PrefixMaskInvalid");
                return false;    
        }
        if (IsIPv6AddressValid(List[0]) == false)
        {
                AlertMsg("IPv6PrefixMaskInvalid");
                return false;  
        } 

    }

    if (Wan.IPv6Enable == "1" &amp;&amp; Wan.IPv6AddressMode == "Static")
    {
        if (false == CheckNumber(Wan.IPv6AddrMaskLenE8c, 10, 128) &amp;&amp; (Wan.IPv6AddrMaskLenE8c != ""))
        {
            AlertMsg("IPv6AddrMaskLenE8cError");
            return false;
        }
        
        if (Wan.IPv6IPAddress.length == 0)
        {
            AlertMsg("IPv6AddressEmpty");
            return false;
        }

        if (IsIPv6AddressValid(Wan.IPv6IPAddress) == false)
        {
            AlertMsg("IPv6AddressInvalid");
            return false;  
        }

        if (parseInt(Wan.IPv6IPAddress.split(":")[0], 16) &gt;= parseInt("0xFF00", 16))
        {
            AlertMsg("IPv6AddressInvalid");
            return false;   
        } 

        if (IsIPv6ZeroAddress(Wan.IPv6IPAddress) == true)
        {
           AlertMsg("IPv6AddressInvalid");
           return false;  
        }

        if (IsIPv6LoopBackAddress(Wan.IPv6IPAddress) == true)
        {
            AlertMsg("IPv6AddressInvalid");
            return false;    
        }
        
        if(Wan.IPv6GatewayE8c.length &gt; 0)
        {
            if (IsIPv6AddressValid(Wan.IPv6GatewayE8c) == false)
            {
              AlertMsg("IPv6AddressInvalid2");
              return false;  
            }

            if (parseInt(Wan.IPv6GatewayE8c.split(":")[0], 16) &gt;= parseInt("0xFF00", 16))
            {
              AlertMsg("IPv6AddressInvalid2");
              return false;   
            }
             
            if (IsIPv6ZeroAddress(Wan.IPv6GatewayE8c) == true)
            {
               AlertMsg("IPv6AddressInvalid2");
               return false;  
            }

            if (IsIPv6LoopBackAddress(Wan.IPv6GatewayE8c) == true)
            {
              AlertMsg("IPv6AddressInvalid2");
              return false;    
            }
            
            if(Wan.IPv6GatewayE8c == Wan.IPv6IPAddress)
            {
                AlertMsg("IPAddressSameAsGateWay2");
                return false;
            }
            if(false == IsIPv6LinkLocalAddress(Wan.IPv6GatewayE8c) &amp;&amp; false == isSameIPv6SubNet(Wan.IPv6IPAddress,Wan.IPv6GatewayE8c,Wan.IPv6AddrMaskLenE8c))
            {
                AlertMsg("IPAddressNotInGateWay2");
                return false;
            }
        }
        

        if (Wan.IPv6PrimaryDNS.length)
        {
            if ( IsIPv6AddressValid(Wan.IPv6PrimaryDNS) == false)
            {
                AlertMsg("IPv6FirstDnsInvalid");
                return false;
                        }
            
            if (parseInt(Wan.IPv6PrimaryDNS.split(":")[0], 16) &gt;= parseInt("0xFF00", 16))
            {
                AlertMsg("IPv6FirstDnsInvalid");
                return false;   
            } 

            if (IsIPv6ZeroAddress(Wan.IPv6PrimaryDNS) == true)
            {
               AlertMsg("IPv6FirstDnsInvalid");
               return false;  
            }

            if (IsIPv6LoopBackAddress(Wan.IPv6PrimaryDNS) == true)
            {
                AlertMsg("IPv6FirstDnsInvalid");
                return false;    
            }

            if (IsIPv6LinkLocalAddress(Wan.IPv6PrimaryDNS) == true || IsIPv6SiteLocalAddress(Wan.IPv6PrimaryDNS) == true)
            {
                AlertMsg("IPv6FirstDnsInvalid");
                return false;    
            }             
            
        }

        if (Wan.IPv6SecondaryDNS.length &gt; 0)
        {
            if ( IsIPv6AddressValid(Wan.IPv6SecondaryDNS) == false)
            {
                AlertMsg("IPv6SecondDnsInvalid");
                return false;
                        }
            
            if (parseInt(Wan.IPv6SecondaryDNS.split(":")[0], 16) &gt;= parseInt("0xFF00", 16))
            {
                AlertMsg("IPv6SecondDnsInvalid");
                return false;   
            } 

            if (IsIPv6ZeroAddress(Wan.IPv6SecondaryDNS) == true)
            {
               AlertMsg("IPv6SecondDnsInvalid");
               return false;  
            }

            if (IsIPv6LoopBackAddress(Wan.IPv6SecondaryDNS) == true)
            {
                AlertMsg("IPv6SecondDnsInvalid");
                return false;    
            } 

            if (IsIPv6LinkLocalAddress(Wan.IPv6SecondaryDNS) == true || IsIPv6SiteLocalAddress(Wan.IPv6SecondaryDNS) == true)
            {
                AlertMsg("IPv6SecondDnsInvalid");
                return false;    
            }        
            
        }
    }
    
    if ((Wan.IPv6Enable == "1") &amp;&amp; (Wan.EncapMode.toString().toUpperCase() == "IPOE") &amp;&amp; (Wan.IPv6AddressMode == "None"))
    {
        if (Wan.IPv6ReserveAddress.length &gt; 0)
        {
            if (IsIPv6AddressValid(Wan.IPv6ReserveAddress) == false)
            {
                AlertMsg("IPv6AddressInvalid");
                return false;  
            }
    
        }
    }

    if ('1' == Wan.IPv4Enable &amp;&amp; Wan.IPv4AddressMode != 'PPPOE' &amp;&amp; MultiWanIpFeature == "1")
    {
        if (CheckMultiIP(Wan.IPv4IPAddressSecond) == false)
        {
            AlertMsg("IPAddressInvalid");
            return false;
        }
        if (CheckMultiSubnetMask(Wan.IPv4SubnetMaskSecond) == false)
        {
            AlertMsg("SubMaskInvalid");
            return false;
        }        
        if (CheckMultiIP(Wan.IPv4IPAddressThird) == false)
        {
            AlertMsg("IPAddressInvalid");
            return false;
        }
        if (CheckMultiSubnetMask(Wan.IPv4SubnetMaskThird) == false)
        {
            AlertMsg("SubMaskInvalid");
            return false;
        }                               
    }

    if (false == CheckMtu(Wan))
    {
        return false;
    }
    
    if (false == CheckDSLite(Wan))
    {
        return false;
    }
    
    if (false == Check6rd(Wan))
    {
        return false;
    }
    
    if(false == CheckAtmWan(Wan))
    {
        return false;
    }

    return true;
}

function CheckMultiIP(obj)
{
    if(obj != "")
    {
        if (isValidIpAddress(obj) == false || isAbcIpAddress(obj) == false)
        {
            return false;
        }            
    }                                   
}

function CheckMultiSubnetMask(obj)
{
    if(obj != "")
    {
        if (isValidSubnetMask(obj) == false)
        {
            return false;
        }          
    }
    return true;        
}
function CheckDSLite(Wan)
{
    DomainElement = Wan.domain.split(".");
    wanCurrentInst = DomainElement[4];
    if (Wan.ProtocolType.toString() != "IPv6" )
    {
        return true;
    }
    if (Wan.Mode.toString().toUpperCase() != "IP_ROUTED" )
    {
        return true;
    }

    for (var i = 0;i &lt; GetWanList().length;i++)
    {
        DBDomainElement = GetWanList()[i].domain.split(".");
        wanDBInst = DBDomainElement[4];
        if( GetWanList()[i].IPv6DSLite.toString() != "Off" )
        {
            if((Wan.IPv6DSLite.toString() != "Off") &amp;&amp; (wanDBInst != wanCurrentInst))
            {
                AlertMsg("DSLiteNumError");
                return false;
            }
        }
    }
    if (Wan.IPv6DSLite.toString() == "Static" )
    {
        if (trim(Wan.IPv6AFTRName).length == 0)
        {
            AlertMsg("AFTRNameErr2");
            return false;
        }
        
        if (isValidAscii(Wan.IPv6AFTRName) != '')         
        {  
            AlertEx(Languages['AFTRName1'] + Languages['Hasvalidch'] + isValidAscii(Wan.IPv6AFTRName) + '".');          
            return false;       
        }
        
        if(!((Wan.IPv6AFTRName.length &gt; 0) &amp;&amp; (Wan.IPv6AFTRName.length &lt; 257)))
        {
            AlertMsg("AFTRNameErr");
            return false;
        }
    }

    return true;
}

function Check6rd(Wan)
{
    DomainElement = Wan.domain.split(".");
    wanCurrentInst = DomainElement[4];
    
    if (true != Is6RdSupported())
    {
        return true;
    }
    
    if (Wan.ProtocolType.toString() != "IPv4" )
    {
        return true;
    }
    if (Wan.Mode.toString().toUpperCase() != "IP_ROUTED" )
    {
        return true;
    }

    if ("STATIC" == Wan.RdMode.toString().toUpperCase())
    {
        if ((Wan.RdPrefix.length == 0) || (IsIPv6AddressValid(Wan.RdPrefix) == false)
         ||(parseInt(Wan.RdPrefix.split(":")[0], 16) &gt;= parseInt("0xFF00", 16))
         ||(IsIPv6ZeroAddress(Wan.RdPrefix) == true)
         ||(IsIPv6LoopBackAddress(Wan.RdPrefix) == true))
        {
            AlertMsg("RdPrefixInvalid");
            return false;
        }
        
        if (false == CheckNumber(Wan.RdPrefixLen, 10, 64))
        {
            AlertMsg("RdPrefixLenthInvalid");
            return false;
        }                    
                
        if((isValidIpAddress(Wan.RdBRIPv4Address) == false) || (isAbcIpAddress(Wan.RdBRIPv4Address) == false))
        {
            AlertMsg("RdBrAddrInvalid");
            return false;
        }
        
        if (false == CheckNumber(Wan.RdIPv4MaskLen, 0, 32))
        {
            AlertMsg("RdIPv4MaskLenInvalid");
            return false;
        }
        
        if ((parseInt(Wan.RdPrefixLen,10) - parseInt(Wan.RdIPv4MaskLen,10)) &gt; 32)
        {
            AlertMsg("RdPreLenAndV4MaskLenMismatch");
            return false;
        }        
    }
    
    return true;
}


function isInvalidRadionString(val)
{
    for ( var i = 0 ; i &lt; val.length ; i++ )
    {
        var ch = val.charAt(i);
        if ( ch == "," || ch == ";" || ch == "'" || ch == "\"" )
        {
            return ch;
        }
    }

    return '';
}

function CheckRadioString(str)
{
    var c = isValidAscii(str);
    if(c != '')
    {
        return c;
    }
    
    c = isInvalidRadionString(str);
    if(c != '')
    {
        return c;
    }     
    
    return '';
}

function CheckRadioWan(Wan, EditFlag)
{
    if (false == IsCurrentRadioWan())
    {
        return true;
    }
    
    if (EditFlag == "ADD")
    {
        var wanListTmp = GetWanList();
        var maxCnt = 1;
        var tmpCnt = 0;
        
        for (var i=0; i &lt; wanListTmp.length; i++ )
        {
            if (true == IsRadioWanSupported(wanListTmp[i]))
            {
                tmpCnt++;
            }
            
            if (tmpCnt &gt;= maxCnt)
            {
                AlertMsg("RadioWanIsFull");
                return false;
            }
        }
    }
    
    if (Wan.SwitchDelayTime == "")
    {
        AlertMsg("SwitchDelayTimeisreq");
        return false;
    }  

    var SwitchDelayTime = removeSpaceTrim(Wan.SwitchDelayTime);
    if(SwitchDelayTime!="")
    {
        if ( false == CheckNumber(SwitchDelayTime,30, 3600) )
        {
            AlertMsg("invalidSwitchDelayTime");
            return false;
        }
    }
    
    if ( Wan.PingIPAddress != '' &amp;&amp; (isValidIpAddress(Wan.PingIPAddress) == false || isAbcIpAddress(Wan.PingIPAddress) == false))
    {
         AlertMsg("invalidipaddr");
         return false;
    }

    if ((Wan.RadioWanUsername != '') &amp;&amp; (CheckRadioString(Wan.RadioWanUsername) != ''))        
    {  
        AlertEx(Languages['IPv4UserName1'] + Languages['Hasvalidch'] + CheckRadioString(Wan.RadioWanUsername) + '".');          
        return false;       
    }
    
    if ((Wan.RadioWanPassword != '') &amp;&amp; (Wan.RadioWanPassword != radio_hidepassword) &amp;&amp; (CheckRadioString(Wan.RadioWanPassword) != ''))         
    {  
        AlertEx(Languages['IPv4Password1'] + Languages['Hasvalidch'] + CheckRadioString(Wan.RadioWanPassword) + '".');         
        return false;       
    }
    
    if ((Wan.APN != '') &amp;&amp; (CheckRadioString(Wan.APN) != ''))         
    {  
        AlertEx(Languages['APN1'] + Languages['Hasvalidch'] + CheckRadioString(Wan.APN) + '".');         
        return false;       
    }
    

    return true;
}