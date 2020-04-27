
<!-- saved from url=(0060)https://192.168.100.1/html/bbsp/common/wanaddressacquire.asp -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>function IPAddressAcquireIPItem(_domain, _Alias, _Origin, _IPAddress, _ChildPrefixBits, _UnnumberredWanReserveAddress, _AddrMaskLen, _DefaultGateway)
{
    this.domain = _domain;
    this.Alias = _Alias;

switch(_Origin.toString().toUpperCase())
{
case "AUTOCONFIGURED": 
_Origin = "AutoConfigured"; break;
case "DHCPV6": 
_Origin = "DHCPv6"; break;
case "STATIC": 
_Origin = "Static"; break;
case "NONE": 
_Origin = "None"; break;
default: 
break;
}
    this.Origin = _Origin;
    this.IPAddress = _IPAddress;
    this.ChildPrefixBits = _ChildPrefixBits;
    this.WanInstanceId = _domain.split(".")[4];
    this.InstanceId = _domain.split(".")[9];
this.IPv6ReserveAddress = _UnnumberredWanReserveAddress;
    this.AddrMaskLen = _AddrMaskLen;
    this.DefaultGateway = _DefaultGateway;
}

function IPAddressAcquirePPPItem(_domain, _Alias, _Origin, _IPAddress, _ChildPrefixBits,_AddrMaskLen, _DefaultGateway)
{
    this.domain = _domain;
    this.Alias = _Alias;

switch(_Origin.toString().toUpperCase())
{
case "AUTOCONFIGURED": 
_Origin = "AutoConfigured"; break;
case "DHCPV6": 
_Origin = "DHCPv6"; break;
case "STATIC": 
_Origin = "Static"; break;
case "NONE": 
_Origin = "None"; break;
default: 
break;
}
    this.Origin = _Origin;
    this.IPAddress = _IPAddress;
    this.ChildPrefixBits = _ChildPrefixBits;
    this.WanInstanceId = _domain.split(".")[4];
    this.InstanceId = _domain.split(".")[9];
    this.AddrMaskLen = _AddrMaskLen;
    this.DefaultGateway = _DefaultGateway;
}

var IPAddressAcquireIP  = new Array(null);
var IPAddressAcquirePPP = new Array(new IPAddressAcquirePPPItem("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.X_HW_IPv6.IPv6Address.1","cpe\x2d1","AutoConfigured","","","128",""),null);
var IPAddressAcquireList = new Array();
var Count = 0;
for (var i = 0; i &lt; IPAddressAcquireIP.length; i++)
{
    if (IPAddressAcquireIP[i] != null)
    {
        IPAddressAcquireList[Count++] = IPAddressAcquireIP[i];
    }    
}
for (var i = 0; i &lt; IPAddressAcquirePPP.length; i++)
{
    if (IPAddressAcquirePPP[i] != null)
    {
        IPAddressAcquireList[Count++] = IPAddressAcquirePPP[i];
    }    
}

function GetIPv6AddressAcquireInfo(domain)
{
    for (var i = 0; i &lt; IPAddressAcquireList.length; i++)
    {
        if (IPAddressAcquireList[i].domain.indexOf(domain) &gt;= 0)
        {
            return IPAddressAcquireList[i];
        }
    }    
    return null;
}

function PrefixAcquireItem(_domain, _Alias, _Origin, _Prefix)
{
    this.domain = _domain;
    this.Alias = _Alias;
    
switch(_Origin.toString().toUpperCase())
{
case "AUTOCONFIGURED": 
_Origin = "AutoConfigured"; break;
case "ROUTERADVERTISEMENT": 
_Origin = "RouterAdvertisement"; break;
case "PREFIXDELEGATION": 
_Origin = "PrefixDelegation"; break;
case "DHCPV6-PD": 
_Origin = "DHCPv6-PD"; break;
case "STATIC": 
_Origin = "Static"; break;
case "NONE": 
_Origin = "None"; break;
default: 
break;
}

    if ( ("AutoConfigured" == _Origin) || ("RouterAdvertisement" == _Origin))
    {
        this.Origin = "PrefixDelegation";
    }
    else
    {
        this.Origin = _Origin;
    }
    
    this.Prefix = _Prefix;
    this.WanInstanceId = _domain.split(".")[4];
    this.InstanceId = _domain.split(".")[9]
}

var PrefixAcquireIP  = new Array(null);
var PrefixAcquirePPP = new Array(new PrefixAcquireItem("InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.X_HW_IPv6.IPv6Prefix.1","cpe\x2d1","PrefixDelegation",""),null);
var PrefixAcquireList = new Array();
var Count = 0;
for (var i = 0; i &lt; PrefixAcquireIP.length; i++)
{
    if (PrefixAcquireIP[i] != null)
    {
        PrefixAcquireList[Count++] = PrefixAcquireIP[i];
    }    
}
for (var i = 0; i &lt; PrefixAcquirePPP.length; i++)
{
    if (PrefixAcquirePPP[i] != null)
    {
        PrefixAcquireList[Count++] = PrefixAcquirePPP[i];
    }    
}

function GetIPv6PrefixAcquireInfo(domain)
{
    for (var i = 0; i &lt; PrefixAcquireList.length; i++)
    {
        if (PrefixAcquireList[i].domain.indexOf(domain) &gt;= 0)
        {
            return PrefixAcquireList[i];
        }
    }    
    return null;
}</body></html>