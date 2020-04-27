
<!-- saved from url=(0075)https://192.168.100.1/resource/common/InitForm.asp?201906201656557553184798 -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>var CuOSGIMode = '0';

if(typeof(HTMLElement)!="undefined" &amp;&amp; !window.opera &amp;&amp; !( navigator.appName == 'Microsoft Internet Explorer'))
{
HTMLElement.prototype.__defineGetter__("outerHTML",function() {
var a=this.attributes, str="&lt;"+this.tagName, i=0;for(;i<a.length;i++) if(a[i].specified)="" str+=" " +a[i].name+'="&#39;+a[i].value+&#39;" ';="" if(!this.canhavechildren)="" return="" str+"="">";
return str+"&gt;"+this.innerHTML+"<!--"+this.tagName+"-->";
});
HTMLElement.prototype.__defineSetter__("outerHTML",function(s) {
var r = this.ownerDocument.createRange();
r.setStartBefore(this);
var df = r.createContextualFragment(s);
this.parentNode.replaceChild(df, this);
return s;
});
HTMLElement.prototype.__defineGetter__("canHaveChildren",function(){
return !/^(area|base|basefont|col|frame|hr|img|br|input|isindex|link|meta|param)$/.test(this.tagName.toLowerCase());
});
}

var g_curLanguage = 'english';
var CfgModeflag ='SAFARICOM2';
var NewCurValue;
var DelCurValue;
function LanguageInfo(Language, New, Delete)
{
this.Language = Language;
this.New = New;
this.Delete = Delete;
}

var LanguageArrayInfos = new Array( new LanguageInfo("english","New","Delete"),
new LanguageInfo("chinese","新建","删除"),
new LanguageInfo("arabic","جديد","حذف"),
new LanguageInfo("japanese","新規作成","削除"),
new LanguageInfo("portuguese","Novo","Apagar"),
new LanguageInfo("brasil","Novo","Excluir"),
new LanguageInfo("spanish","Nueva","Eliminar"),
new LanguageInfo("russian","Создать","Удалить"),
new LanguageInfo("italian","Nuovo","Elimina"),
new LanguageInfo("turkish","Yeni","Sil"),
null );

function GetLanguageInfo(LanguageArrayInfos,curLanguage)
{
var length = LanguageArrayInfos.length;
for( var i = 0; i &lt; length - 1; i++)
{
if(curLanguage == LanguageArrayInfos[i].Language)
{
NewCurValue = LanguageArrayInfos[i].New;
DelCurValue = LanguageArrayInfos[i].Delete;
}
}
}


if(!window.console){
window.console = {};
var funcs = ['clear', 'debug', 'error','info', 'log', 'trace', 'warn'];
for(var i = 0; i &lt; funcs.length; i++) {
window.console[funcs[i]] = function(){};
}
}

function writeFile(str)
{
var fso, ctf;
try
{
if(window.ActiveXObject) {
fso = new ActiveXObject("Scripting.FileSystemObject");
ctf = fso.CreateTextFile("c:\\test.txt", true);
ctf.Write (str);
ctf.Close();
}
}
catch (e) {
}
}

function selectLine(id)
{
this.id = id;
var TableId = this.id.split('_')[0];
var objTR = getElement(id);
if (objTR != null)
{
var IdStr = objTR.id;
var SplitObj = IdStr.match(/\_/g);
if(SplitObj.length &gt;= 2)
{
var temp = objTR.id.split('_')[2];
}
else
{
var temp = objTR.id.split('_')[1];
}

if (temp == 'null')
{
setControl(-1, this.id);
if(CuOSGIMode == "1")
{
CusetLineHighLight(objTR);
}
else
{
setLineHighLight(objTR);
}
setDisable('btnApply',0);
setDisable('btnCancel',0);
}
else if (temp == 'no')
{
setControl(-2, this.id);
setDisable('btnApply',0);
setDisable('btnCancel',0);
}
else
{
var index = parseInt(temp);
setControl(index, this.id);
if(CuOSGIMode == "1")
{
CusetLineHighLight(objTR);
}
else
{
setLineHighLight(objTR);
}
setDisable('btnApply',1);
setDisable('btnCancel',1);
}
}
}

function clickAdd(tabTitle)
{
var tab = document.getElementById(tabTitle).getElementsByTagName('table');
var row,col;
var rowLen = tab[0].rows.length;
var PrevTabID = "";
var insertlength = 0;

if(-1 != tabTitle.indexOf("_head"))
{
PrevTabID = tabTitle.split("_")[0];
var Record_null = PrevTabID+"_record_null";
var Record_no = PrevTabID+"_record_no";
}
else
{
PrevTabID = '';
var Record_null = "record_null";
var Record_no = "record_no";
}

var firstRow = tab[0].rows[0];
var lastRow = tab[0].rows[rowLen - 1];

if (lastRow.id == Record_null)
{
selectLine(Record_null);
return;
}
else if (lastRow.id == Record_no)
{
tab[0].deleteRow(rowLen-1);
rowLen = tab[0].rows.length;
}

row = tab[0].insertRow(rowLen);

var appName = navigator.appName;
if(appName == 'Microsoft Internet Explorer')
{
g_browserVersion = 1; /* IE */
row.className = 'trTabContent';
row.id = Record_null;
row.attachEvent("onclick", function(){  selectLine(Record_null);  });
}
else
{
g_browserVersion = 2; /* firefox */
row.setAttribute('class','trTabContent');
row.setAttribute('id',Record_null);
row.setAttribute('onclick','selectLine(this.id);');
}

/* get first or second cells length*/
insertlength = firstRow.cells.length;
if(1 == firstRow.cells.length)
{
SecondRow = tab[0].rows[1];
insertlength = SecondRow.cells.length
}
for (var i = 0; i &lt; insertlength; i++)
{
col = row.insertCell(i);
col.innerHTML = '----';
col.style.textAlign = 'center';
}

selectLine(Record_null);
}


function addNullInst(tabTitle)
{
var tab = document.getElementById(tabTitle).getElementsByTagName('table');
var row,col;
var rowLen = tab[0].rows.length;
var firstRow = tab[0].rows[0];
var lastRow = tab[0].rows[rowLen - 1];

tab[0].deleteRow(rowLen-1);
rowLen = tab[0].rows.length;
row = tab[0].insertRow(rowLen);

var appName = navigator.appName;
if (appName == 'Microsoft Internet Explorer')
{
g_browserVersion = 1; /* IE */
row.className = 'trTabContent';
row.id = 'record_no';
row.attachEvent("onclick", function(){selectLine("record_no");});
}
else
{
g_browserVersion = 2; /* firefox */
row.setAttribute('class','trTabContent');
row.setAttribute('id','record_no');
row.setAttribute('onclick','selectLine(this.id);');
}

for (var i = 0; i &lt; firstRow.cells.length; i++)
{
col = row.insertCell(i);
col.innerHTML = '----';
col.style.textAlign = 'center';
}
selectLine("record_no");
}

function removeInst(url)
{
var rml = getElement('rml');
if (rml == null)
return;

var SubmitForm = new webSubmitForm();
var cnt = 0;
with (document.forms[0])
{
if (rml.length &gt; 0)
{
for (var i = 0; i &lt; rml.length; i++)
{
if (rml[i].checked == true)
{
SubmitForm.addParameter(rml[i].value,'');
cnt++;
}
}
}
else if (rml.checked == true)
{
SubmitForm.addParameter(rml.value,'');
cnt++;
}
}

SubmitForm.setAction('del.cgi?RequestFile=' + url);
SubmitForm.addParameter('x.X_HW_Token', getValue('onttoken'));
SubmitForm.submit();
}

function writeTabInfoHeader(tabTitle, tabWidth, btnWidth, tabId)
{
writeTabHeader(tabTitle, tabWidth, btnWidth, 'info', tabId);
}

function writeTabCfgHeader(tabTitle, tabWidth, btnWidth, tabId)
{
writeTabHeader(tabTitle, tabWidth, btnWidth, 'cfg', tabId);
}

function writeTabTail()
{
document.write("&lt;\/td&gt;&lt;\/tr&gt;&lt;\/table&gt;");
}


var PreSelectTr = null;
var PreSelectTrcClassName = '';
var PreSelectTrcClassName1 = '';
var previousTR = null;
function setLineHighLight(objTR)
{
if (previousTR != null)
{
previousTR.style.backgroundColor = PreSelectTrcClassName;
for (var i = 0; i &lt; previousTR.cells.length; i++)
{
if ( 'ZAIN' == CfgModeflag.toUpperCase())
{
previousTR.cells[i].style.color = '#ffffff';
}
else
{
previousTR.cells[i].style.color = '#000000';
}
}
}

try{
var id = objTR.id;
PreSelectTrcClassName = $("#"+id).css("background-color");
}catch(e)
{
PreSelectTrcClassName='';
}
objTR.style.backgroundColor = '#c7e7fe';
for (var i = 0; i &lt; objTR.cells.length; i++)
{
if ( 'ZAIN' == CfgModeflag.toUpperCase())
{
objTR.cells[i].style.color = '#ffffff';
}
else
{
objTR.cells[i].style.color = '#000000';
}
}
previousTR = objTR;
}
function CusetLineHighLight(objTR)
{
if (previousTR != null)
{
previousTR.style.backgroundColor = PreSelectTrcClassName;
for (var i = 0; i &lt; previousTR.cells.length; i++)
{
previousTR.cells[i].style.color = PreSelectTrcClassName1;
}
}
try{
var id = objTR.id;
PreSelectTrcClassName = $("#"+id).css("background-color");
PreSelectTrcClassName1 = $("#"+id).css("color");
}catch(e)
{
PreSelectTrcClassName='';
PreSelectTrcClassName1='';
}
objTR.style.backgroundColor = '#888888';
for (var i = 0; i &lt; objTR.cells.length; i++)
{
objTR.cells[i].style.color = '#fff';
}
previousTR = objTR;
}

function GetXmlHttp_diff()
{
var diff_xmlHttp;
if(window.ActiveXObject){
try {
diff_xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
}catch (e) {
}
if (diff_xmlHttp == null)
try{
diff_xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
} catch (e) {
}
} else {
diff_xmlHttp = new XMLHttpRequest();
}
return diff_xmlHttp;
}
function RedirectCurrentPage_diff()
{
var curLoc = window.location.href;

if ( curLoc.lastIndexOf("RequestFile=") &gt; 0 ){
curLoc = "/" + curLoc.split("RequestFile=")[1];
}
try {
var diff_xmlHttp = GetXmlHttp_diff();
diff_xmlHttp.open("GET",curLoc,false);
diff_xmlHttp.send();
if(4 == diff_xmlHttp.readyState){
if(200 == diff_xmlHttp.status) {
window.location = curLoc;
}else{
console.info(curLoc, diff_xmlHttp.status);
}
}
} catch (e){
}
}

function OnDeleteButtonClick(tabTitle)
{
var Selected = false;
var RmlList = document.getElementsByName("rml");
for (var i = 0; i &lt; RmlList.length; i++)
{
if (RmlList[i].checked == true)
{
Selected = true;
}
}
if (Selected == true)
{
document.getElementById("DeleteButton").disabled = true;
}

clickRemove(tabTitle, "DeleteButton");
}
var Delbutton;
if(CfgModeflag.toUpperCase() =="TALKTALK2WIFI")
{
Delbutton = "Delbuttoncss";
}
else
{
Delbutton = "NewDelbuttoncss";
}
function writeTabHeader(tabTitle, tabwidth, btnWidth, type, tabId)
{
if (tabwidth == null)
tabwidth = "100%";

var html = "<table"; if="" (tabid="" !="null)" {="" html="" +=" id=\" "="" tabid="" "\"";="" }="" tabwidth="" "\"="" border="\&quot;0\&quot;" cellpadding="\&quot;0\&quot;" cellspacing="\&quot;0\&quot;">"
+ ""
+ "";

if ('cfg' == type)
{
GetLanguageInfo(LanguageArrayInfos, g_curLanguage);

html +=  '<input style="width:&#39; + btnWidth + &#39;" '="" +'class="NewDelbuttoncss" id="Newbutton" type="button" value="&#39; + NewCurValue + &#39;" +="" 'onclick="clickAdd(\&#39;&#39;
 + tabTitle + &#39;\&#39;);">'
 + '<input style="margin-left:9px;width:&#39; + btnWidth + &#39;" '="" +'id="DeleteButton" class="&#39;+ Delbutton + &#39;" type="button" value="&#39; + DelCurValue + &#39;" +="" 'onclick="OnDeleteButtonClick(\&#39;&#39;
 + tabTitle + &#39;\&#39;);">'
 + ''
 + ''
 + "&lt;\/td&gt;"
 + "&lt;\/tr&gt;";
}

html += "&lt;\/td&gt;"
+ "&lt;\/tr&gt;"
+ ""
+ "";

writeFile(html);
document.write(html);
}

function HWCreatePageHeadInfo(TitleId, Titlestring, SummaryInfo, IsneedImg)
{
var HeadInfoHtml = HWAppendTitle(TitleId, Titlestring, SummaryInfo, IsneedImg);
document.write(HeadInfoHtml);
return true;
}

function HWGetIdByBindField(FormLiIdList, BindField)
{
var ElementLength = FormLiIdList.length;
for (var i = 0; i &lt; ElementLength; i++)
{
var ElementId = FormLiIdList[i];
var ElementInfo = document.getElementById(ElementId);
if(null == ElementInfo)
{
ElementInfo = document.getElementById(ElementId+"1");
if(null == ElementInfo)
{
continue;
}
}
var ParaName = ElementInfo.getAttribute("BindField");
var SplitStr = "";
try{SplitStr = ParaName.split(".")[1];}catch(e){}
if(ParaName == BindField || SplitStr == BindField)
{
return ElementId;
}
}
return null;
}

function GetCheckboxFuncString(TableId)
{
var FuncStr = TableId + "selectRemoveCnt";
if("undefined" != typeof(FuncStr))
{
return ' onclick="' + FuncStr + '(this);"';
}
return "";
}

function FillTableDataWithByForm(TableName, ColumnTitleDesArray, TableDataInfo)
{
var LIneDate;
for( var Data_j = 0; Data_j &lt; TableDataInfo.length - 1; Data_j++)
{
var LIneDate = TableDataInfo[Data_j];
if( Data_j%2 == 0 )
{
var LineHtml = '';
}
else
{
var LineHtml = '';
}

for(var Title_j = 0; Title_j &lt; ColumnTitleDesArray.length - 1; Title_j++)
{
var TitleAttrName = ColumnTitleDesArray[Title_j].ShowAttrName;
var ShowFlag = ColumnTitleDesArray[Title_j].IsNotShowFlag;
var TdMaxNum = ColumnTitleDesArray[Title_j].MaxNum;
var Td_i_Class = (null == ColumnTitleDesArray[Title_j].TableClass ? "" : ColumnTitleDesArray[Title_j].TableClass);
var Ischangecode = (undefined != ColumnTitleDesArray[Title_j].Ischangecode &amp;&amp; 0 == ColumnTitleDesArray[Title_j].Ischangecode ? 0 : 1);
if(true == ShowFlag || "summary" == ShowFlag)
{
continue;
}

if("DomainBox" == TitleAttrName)
{
var onclickstr = GetCheckboxFuncString(TableName);
LineHtml += '<input id="&#39; + TableName + &#39;_rml&#39;+ Data_j + &#39;" type="checkbox" name="&#39; + TableName + &#39;rml" '="" +="" onclickstr="" value="&#39; + TableDataInfo[Data_j].domain + &#39;">';
continue;
}

var TdId = ' id="' + TableName + "_" + Data_j + "_" + Title_j + '" ';
if("NumIndexBox" == TitleAttrName)
{
LineHtml += '' + (Data_j+1) + '';
continue;
}

if("Button" == TitleAttrName.split('_')[1])
{
var valueHtml = (LIneDate[TitleAttrName] == 'del')?status_wlaninfo_language["amp_booststa_del"]:status_wlaninfo_language["amp_booststa_add"]; 
LineHtml += '<input id="&#39; + TableName + &#39;_&#39; + Data_j + &#39;" type="button" class="NewDelbuttoncss" '="" +="" 'value="&#39;+ valueHtml +&#39;" 'onclick="&#39;+ TableName + &#39;_&#39;+ LIneDate[TitleAttrName] + &#39;_BtnClick(this); ">';
continue;
}

if(0 == Ischangecode)
{
var ShowAttrValue = LIneDate[TitleAttrName];
}
else
{
var ShowAttrValue = htmlencode(LIneDate[TitleAttrName]);
}


if (ShowAttrValue != null)
{
var InnerHtml = (TdMaxNum == "undefined" || TdMaxNum == "") ? ShowAttrValue : GetStringContent(ShowAttrValue, TdMaxNum);
if (ShowAttrValue === InnerHtml)
{
LineHtml += '' + InnerHtml + '';
}
else
{
LineHtml += '' + InnerHtml + '';
}
}
}
LineHtml+='';
document.write(LineHtml);
}
}

function stTableTileInfo(DesRef, TableClass, ShowAttrName, IsNotShowFlag, MaxNum, Ischangecode)
{
this.DesRef = DesRef;
this.TableClass = TableClass;
this.ShowAttrName = ShowAttrName;
this.IsNotShowFlag = IsNotShowFlag;
this.MaxNum = MaxNum;
this.Ischangecode = Ischangecode;
}

function HWShowTableListByType(ShowDefault, TableName, TableType, ColumnNum, TableDataInfo, ColumnTitleDesArray,LaguageList, Callbackfunc)
{
if(0 == ShowDefault)
{
return;
}

var WriteHeaderFunc = TableType == true ? writeTabCfgHeader : writeTabInfoHeader;
WriteHeaderFunc(TableName + "_head", '100%', null, TableName + "_tbl");
var LineRowDataNum = TableDataInfo.length - 1;
var tablehtml = '';
for(var Column_i = 0; Column_i &lt; ColumnNum;  Column_i++)
{
if(0 == Column_i)
{
if('summary' == ColumnTitleDesArray[Column_i].IsNotShowFlag)
{
var summaryid = TableName + "summary";
var DataColumNum = ColumnNum - 1;
var summaryinfo_Des_Id = ColumnTitleDesArray[Column_i].DesRef;
var summaryinfo = (null == LaguageList[summaryinfo_Des_Id] || undefined == LaguageList[summaryinfo_Des_Id]) ? "" : LaguageList[summaryinfo_Des_Id];
tablehtml += '';
tablehtml += '';
continue;
}
else
{
var DataColumNum = ColumnNum;
tablehtml += '';
}
}

if(true == ColumnTitleDesArray[Column_i].IsNotShowFlag)
{
continue;
}

var headid = ' id="head' + TableName +  "_0_" + Column_i + '" ';
var Column_i_Des = ColumnTitleDesArray[Column_i].DesRef;
var Column_i_Class = (null == ColumnTitleDesArray[Column_i].TableClass ? "" : ColumnTitleDesArray[Column_i].TableClass);
var Des = (null == LaguageList[Column_i_Des] || undefined == LaguageList[Column_i_Des]) ? "" : LaguageList[Column_i_Des];
tablehtml += '';
document.write(tablehtml);

if (LineRowDataNum == 0)
{
var firstroe = '';
for(var Column_i = 0; Column_i &lt; DataColumNum;  Column_i++)
{
if(true == ColumnTitleDesArray[Column_i].IsNotShowFlag)
{
continue;
}

var TdClass = (null == ColumnTitleDesArray[Column_i].TableClass ? "" : ColumnTitleDesArray[Column_i].TableClass);
var headid = ' id="' + TableName +  "_0_" + Column_i + '" ';
firstroe += '';
}
firstroe += '';
document.write(firstroe);
}
else
{
FillTableDataWithByForm(TableName, ColumnTitleDesArray, TableDataInfo);
if(Callbackfunc != null)
{
Callbackfunc(TableName, ColumnNum, TableDataInfo);
}
}

document.write('<table width="100%" class="tabal_bg" id="&#39; + TableName + &#39;" cellspacing="1"><tbody><tr class="head_summary"><td colspan=" + DataColumNum + " id="&#39; + summaryid + &#39;">' + summaryinfo + '</td></tr><tr class="head_title"></tr><tr class="head_title"><td class="&#39; + Column_i_Class + &#39;" '="" +="" headid="">' + Des + '&lt;\/td&gt;';
}

tablehtml += '</td></tr><tr id="&#39; + TableName + &#39;_record_no" '="" +="" 'class="tabal_01"><td align="center" class="&#39; + TdClass + &#39;" '="" +="" headid="">--</td></tr></tbody></table>');
writeTabTail();
}

function TextValueItem(_Text, _Value, _Title, _ClickStr)
{
this.Text = _Text;
this.Value = _Value;
this.Title = _Title;
this.ClickStr = _ClickStr;
}

function UserControlPaserDecorate(_UserControl, _LanguageList)
{
this.ControlInfo = _UserControl;
this.LanguageList = _LanguageList;

this.Decorate = function()
{
this.ControlInfo.Description = this.LanguageList[this.ControlInfo.DescRef];
this.ControlInfo.Remark = this.LanguageList[this.ControlInfo.RemarkRef];
this.ControlInfo.ErrorMsg = this.LanguageList[this.ControlInfo.ErrorMsgRef];
if (this.ControlInfo.TitleRef != "" &amp;&amp; this.ControlInfo.TitleRef != null)
{
this.ControlInfo.Title = this.LanguageList[this.ControlInfo.TitleRef];
}

if (this.ControlInfo.InitValue == "Empty" || this.ControlInfo.InitValue == "")
{
this.ControlInfo.InitValueList = null;
}
else
{
if(this.ControlInfo.RealType == "TextOtherBox")
{
return;
}

this.ControlInfo.InitValueList = new Array();
var InitValueDescList = eval(this.ControlInfo.InitValue);
for (var i = 0; null != InitValueDescList &amp;&amp; i &lt; InitValueDescList.length; i++)
{
this.ControlInfo.InitValueList[i] = new TextValueItem(this.LanguageList[InitValueDescList[i].TextRef], 
  InitValueDescList[i].Value, 
  ((this.LanguageList[InitValueDescList[i].TitleRef] == undefined) ? this.LanguageList[InitValueDescList[i].TextRef]:this.LanguageList[InitValueDescList[i].TitleRef]), 
  ((undefined != InitValueDescList[i].ClickStr) ? InitValueDescList[i].ClickStr:null));
}
}
}
}

function GetClickFuncStr(ClickEventInfo)
{
var FuncStrArray = "";
var FuncArrayLen = 0;
try{
FuncStrArray = ClickEventInfo.split(";");
}
catch(e)
{
var onchangeStr = "";
}

try{
var onchangeStr = "";
FuncArrayLen = FuncStrArray.length;
for(var index = 0; index &lt; FuncArrayLen; index++)
{
var SigStr = FuncStrArray[index];
if(undefined == SigStr || "" == SigStr)
{
continue;
}

var EventStr = SigStr.split("=")[0];
var FuncStr = SigStr.split("=")[1];
onchangeStr += EventStr + ' = "' + FuncStr + '(this);" '
}
}
catch(e)
{
var onchangeStr = "";
}

return onchangeStr;
}

function GetDisabledStr(flag)
{
if(false == flag || null == flag || undefined == flag)
{
return "";
}

return ' disabled="disabled" ';
}

function GetDirClassStr(DirStr)
{
if(null == DirStr || undefined == DirStr)
{
return "";
}

return ' dir="' + DirStr + '" ';
}

function GetTitleStr(title, Remark)
{
this.Title = title;
this.Remark = Remark;

var RemarkInfo = (this.Remark == null || this.Remark == undefined) ? "" : this.Remark;

if(null == title || undefined == title)
{
return "";
}

var titlestr= ((this.Title.length &gt; 0) ? this.Title:RemarkInfo.replace("(","").replace(")",""));

if("/" == titlestr || "-" == titlestr || "--" == titlestr)
{
return "";
}

return ' title="' + titlestr + '" ';
}

function GetElementClassStr(classstr, ElementType)
{
if(undefined != classstr &amp;&amp; null != classstr)
{
var ResultStr = ' class="' + classstr + '" ';
return ResultStr;
}

if("TextArea" == ElementType)
{
var ResultStr = ' class="TextArea" ';
}
else if("TextBox" == ElementType)
{
var ResultStr = ' class="TextBox" ';
}
else if("CheckBox" == ElementType)
{
var ResultStr = ' class="CheckBox" ';
}
else if("select" == ElementType)
{
var ResultStr = ' class="selectdefcss" ';
}
else if("InputButtonList" == ElementType)
{
var ResultStr = ' class="configbuttonlist" ';
}

return ResultStr;
}

function HWGetContrlStartEndString(ContrlType, StartEndFlag)
{
if(ContrlType == "select")
{
if("Start" == StartEndFlag)
{
return '<select ';="" }="" else="" {="" return="" '=""></select>';
}
}
else if(ContrlType == "div")
{
if("Start" == StartEndFlag)
{
return '<div ';="" }="" else="" {="" return="" '<="" div="">';
}
}
else if(ContrlType == "span")
{
if("Start" == StartEndFlag)
{
return '<span ';="" }="" else="" {="" return="" '<="" span="">';
}
}
else if(ContrlType == "textarea")
{
if("Start" == StartEndFlag)
{
return '<textarea ';="" }="" else="" {="" return="" '=""></textarea>';
}
}
else
{
if("Start" == StartEndFlag)
{
return '<input ';="" }="" else="" {="" return="" '="">';
}
}
}

function stTableClass(left,right,dir,select)
{
this.left = left;
this.right = right;
this.dir = dir;
this.select = select;
}

function UserControlPaser(_Id, _RealType, _DescRef, _RemarkRef, _ErrorMsgRef, _Require, _BindField, _InitValue, _TitleRef, _ElementClass, _MaxLength, _Textwidth, _ClickFuncApp, _disabled, _Class, _LanguageList)
{
this.Id           = _Id;
this.RealType     = _RealType;
this.DescRef      = _DescRef;
this.RemarkRef    = _RemarkRef;
this.ErrorMsgRef  = _ErrorMsgRef;
this.TitleRef     = _TitleRef;
this.Require      = _Require;
this.BindField    = _BindField;
this.InitValue    = _InitValue;
this.MaxLength    = _MaxLength;
this.ClickFuncApp = _ClickFuncApp;
this.LanguageList = _LanguageList;
this.Description  = "";
this.ErrorMsg     = "";
this.Remark       = "";
this.Title        = "";
this.InitValueList= null;
this.disabled     = _disabled;
this.ElementClass = _ElementClass;
this.Textwidth = _Textwidth;

if(null != _Class)
{
this.Leftwidth   = _Class["left"];
this.rightwidth   = _Class["right"];
this.dir = _Class["dir"];
this.select = _Class["select"];
}
else
{
this.Leftwidth   = "";
this.rightwidth   = "";
this.dir = "";
this.select = "";
}

var DisabledStr = GetDisabledStr(this.disabled);
this.OuterHTML = function()
{
var style =  (this.Id.toUpperCase().indexOf("DEFHIDE") &gt;= 0) ? "display:none;" : " ";
var StyleStr = style == " " ? ' ' : 'style="' + style + '"';
if (this.RealType == "HorizonBar")
{
return this["Build"+this.RealType]();
}
else if(this.RealType == "HtmlText")
{
var classstr = (undefined == this.ElementClass || null == this.ElementClass)?"":(" " + this.ElementClass);
var onclickStr = GetClickFuncStr(this.ClickFuncApp);
var html = '';
html += '' + this.Description + '';
html += '';
html += this["Build"+this.RealType]();
html += '';
return html;
}
else if(this.RealType == "None")
{
return "";
}
else if(this.RealType == "ButtonArea")
{
var html = '';
html += '';
html += this["Build"+this.RealType]();
html += '';
return html;

}
else
{
var html = '';
html += '' + this.Description + '';
html += '';
html += this["Build"+this.RealType]();
html += '';
return html;
}
}

this.BuildTextArea = function()
{
var RequireContent = this.Require.toUpperCase() == "TRUE" ? "*":"";
var type = (this.Id.toUpperCase().indexOf("PASSWORD") &gt;= 0) ? "password" : "text";
var classstr = GetElementClassStr(this.ElementClass, "TextArea");
var RemarkInfo = (this.Remark == null || this.Remark == undefined) ? "" : this.Remark;
var RequireContentId = ' id="' + this.Id + 'Require"';

return '<textarea id="&#39; + this.Id + &#39;" type="&#39; + type + &#39;" maxlength="&#39; + this.MaxLength + &#39;" title="&#39; + ((this.Title.length &gt; 0) ? this.Title:RemarkInfo.replace(" (","").replace(")",""))="" +="" '"'="" classstr="" 'maxlength="&#39; + this.MaxLength + &#39;" realtype="&#39; + this.RealType + &#39;" bindfield="&#39; + this.BindField + &#39;" '="" disabledstr=""></textarea><font color="red" '="" +="" requirecontentid="">' + RequireContent + '</font><span class="gray" id="&#39; + this.Id +&#39;Remark">'+RemarkInfo+'</span>';
}


this.BuildButtonArea = function()
{
var classstr = (undefined == this.ElementClass || null == this.ElementClass)?"":(" " + this.ElementClass);
var onclickStr = GetClickFuncStr(this.ClickFuncApp);
return '<input type="button" id="&#39; + this.Id + &#39;" value="&#39; + this.Description + &#39;" '="" +="" onclickstr="">';
}

this.BuildTextBox = function()
{
var RequireContent = this.Require.toUpperCase() == "TRUE" ? "*":"";
var RequireContentId = ' id="' + this.Id + 'Require"';
var type = (this.Id.toUpperCase().indexOf("PASSWORD") &gt;= 0) ? "password" : "text";
var autocmpStr = ("password" == type)?'autocomplete=\"off\" ':'';
var onclickStr = GetClickFuncStr(this.ClickFuncApp);
var RemarkInfo = (this.Remark == null || this.Remark == undefined) ? "" : this.Remark;
var classstr = GetElementClassStr(this.ElementClass, "TextBox");

return '<input '+autocmpstr+'="" id="&#39;+this.Id+&#39;" type="&#39;+type+&#39;" title="&#39;+((this.Title.length &gt; 0) ? this.Title:RemarkInfo.replace(" (","").replace(")",""))+'"'="" +="" classstr="" '="" maxlength="&#39;+this.MaxLength+&#39;" realtype="&#39;+this.RealType+&#39;" bindfield="&#39;+this.BindField+&#39;" disabledstr="" onclickstr=""><font color="red" '="" +="" requirecontentid="">'+RequireContent+'</font><span class="gray" id="&#39;+this.Id+&#39;Remark">'+RemarkInfo+'</span>';
}

this.BuildCheckBox = function()
{
var RequireContent = this.Require.toUpperCase() == "TRUE" ? "*":"";
var RequireContentId = ' id="' + this.Id + 'Require"';
var onclickStr = GetClickFuncStr(this.ClickFuncApp);
var RemarkInfo = (this.Remark == null || this.Remark == undefined) ? "" : this.Remark;
var classstr = GetElementClassStr(this.ElementClass, "CheckBox");
var spanid = ' id="' + this.Id + 'span" ';

return '<input id="&#39; + this.Id +&#39;" type="\&quot;checkbox\&quot;" realtype="\&quot;&#39;" +="" this.realtype="" '"'="" classstr="" '="" bindfield="\&quot;&#39;" this.bindfield="" disabledstr="" onclickstr=""><font color="\&quot;red\&quot;" '="" +="" requirecontentid="">' + RequireContent + '</font><span class="gray" '="" +="" spanid="">' + RemarkInfo+'</span>';
}

this.BuildCheckDivBox = function()
{
var otherInfo = eval(this.InitValue);
HWConsoleLog(otherInfo);
var RequireContent = this.Require.toUpperCase() == "TRUE" ? "*":"";
var RequireContentId = ' id="' + this.Id + 'Require"';
var onclickStr = GetClickFuncStr(this.ClickFuncApp);
var RemarkInfo = (this.Remark == null || this.Remark == undefined) ? "" : this.Remark;
var classstr = GetElementClassStr(this.ElementClass, "CheckDivBox");

var html = '<input id="&#39; + this.Id +&#39;" type="\&quot;checkbox\&quot;" realtype="\&quot;&#39;" +="" this.realtype="" '"'="" classstr="" '="" bindfield="\&quot;&#39;" this.bindfield="" onclickstr=""><font color="\&quot;red\&quot;&#39;" +="" disabledstr="" requirecontentid="" '="">' +RequireContent+'</font><span class="\&quot;gray\&quot;">'+RemarkInfo+'</span>';

var otherhtml = "";
for(var otherindex = 0; null != otherInfo &amp;&amp; otherindex &lt; otherInfo.length; otherindex++)
{
var ItemInfo = otherInfo[otherindex].Item;
otherhtml += '<div ';="" for(var="" i="0;" null="" !="ItemInfo" &&="" <="" iteminfo.length;="" i++)="" {="" var="" valueid="ItemInfo[i].AttrValue;" value="(this.LanguageList[ValueId]" =="null" ||="" this.languagelist[valueid]="=" undefined)="" ?="" :="" this.languagelist[valueid];="" otherhtml="" +="ItemInfo[i].AttrName" '="&#39; +  value + &#39;" }="" ;="" return="" html="" otherhtml;="" this.builddropdownlist="function()" requirecontent="this.Require.toUpperCase()" "*":"";="" requirecontentid=" id=&quot;" this.id="" 'require"';="" onchangestr="GetClickFuncStr(this.ClickFuncApp);" classselect="(this.select" this.select="=" "undefined")="" this.elementclass="" this.select;="" classstr="GetElementClassStr(classselect," "select");="" this.remark="(this.Remark" ""="" this.remark;="" spanid=" id=&quot;" 'span"="" selectspanremark="&lt;span class=&quot;gray&quot;">' + this.Remark+'';

var html = '<select id="&#39; +this.Id + &#39;" '="" +="" classstr="" realtype="DropDownList" bindfield="&#39;  +this.BindField + &#39;" onchangestr="" disabledstr="" +'="">';

for (var i = 0; (this.InitValueList != null &amp;&amp; i &lt; this.InitValueList.length); i++)
{
var tid = parseInt(i+1).toString();
html += "<option id="\&quot;&quot;+tid+&quot;\&quot;" value="\&quot;&quot;+this.InitValueList[i].Value+&quot;\&quot;">"+this.InitValueList[i].Text+"&lt;\/option&gt;";
}

html += "</option></select>" + '<font color="\&quot;red\&quot;" '="" +="" requirecontentid="">'+RequireContent+'</font>' + selectspanremark;
return html;
}

this.BuildRadioButtonList = function()
{
var RequireContent = this.Require.toUpperCase() == "TRUE" ? "*":"";
var html = "";

for (var i = 0; (this.InitValueList != null &amp;&amp; i &lt; this.InitValueList.length); i++)
{
var tid = parseInt(i+1).toString();
var DirStr = GetDirClassStr(this.dir);
var onclickStr = GetClickFuncStr(this.ClickFuncApp);
this.Remark = (this.Remark == null || this.Remark == undefined) ? "" : this.Remark;
var RequireContentId = ' id="' + this.Id + tid + 'Require"';

html += '<span '="" +="" dirstr="" id="\&quot;Div&#39;+this.Id+tid+&#39;\&quot;" title="\&quot;&#39;+this.InitValueList[i].Title+&#39;\&quot;" style="\&quot;width:10px\&quot;"><input name="\&quot;&#39;+this.Id+&#39;\&quot;" id="\&quot;&#39;+this.Id+tid+&#39;\&quot;" type="\&quot;radio\&quot;" title="\&quot;&#39;+this.InitValueList[i].Title+&#39;\&quot;" value="\&quot;&#39;+this.InitValueList[i].Value+&#39;\&quot;" realtype="\&quot;&#39;+this.RealType+&#39;\&quot;" bindfield="\&quot;&#39;+this.BindField+&#39;\&quot;&#39;" +="" onclickstr="" '="">'+this.InitValueList[i].Text+'<font color="\&quot;red\&quot;" '="" +="" requirecontentid="">'+RequireContent+'</font><span class="\&quot;gray\&quot;">'+this.Remark+'&lt;\/span&gt;&lt;\/span&gt;  ';
}

return html;
}

this.BuildCheckBoxList = function()
{
var RequireContent = this.Require.toUpperCase() == "TRUE" ? "*":"";
var RequireContentId = ' id="' + this.Id + 'Require"';
var html = "";
var classstr = GetElementClassStr(this.ElementClass, "CheckBox");

if(this.InitValueList != null)
{
var InitValueListLength = this.InitValueList.length;
}
var DirStr = GetDirClassStr(this.dir);
for (var i = 0; i &lt; InitValueListLength; i++)
{
this.Remark = (this.Remark == null || this.Remark == undefined) ? "" : this.Remark;
var tid = parseInt(i+1).toString();

if("<br>" == this.InitValueList[i].Text || "<br>" == this.InitValueList[i].Value)
{
html +=  "<br>";
continue;
}

var StrClick = (null == this.InitValueList[i].ClickStr) ? "":this.InitValueList[i].ClickStr;
var AddEventStr = GetClickFuncStr(StrClick);
html += "<span "="" +="" dirstr="" "id="\&quot;Div&quot;+this.Id+tid+&quot;\&quot;" style="\&quot;width:10pt\&quot;"><input "="" +="" classstr="" +"="" name="\&quot;&quot;+this.Id+&quot;\&quot;" id="\&quot;&quot;+this.Id+tid+&quot;\&quot;" type="\&quot;checkbox\&quot;" value="\&quot;&quot;+this.InitValueList[i].Value+&quot;\&quot;" realtype="\&quot;&quot;+this.RealType+&quot;\&quot;" bindfield="\&quot;&quot;+this.BindField" "\""="" addeventstr="">" + "<span class="\&quot;&quot;" +="" "\"="" id="\&quot;&quot;+this.Id+tid+&quot;_text\&quot;">" +this.InitValueList[i].Text+"&lt;\/span&gt;"+"<font color="\&quot;red\&quot;" "="" +requirecontentid="" +"="">"+RequireContent+"</font><span class="\&quot;gray\&quot;">"+this.Remark+"</span>&lt;\/span&gt;  ";

if(InitValueListLength &gt; 9 &amp;&amp; i == 7)
{
 html +=  "<br>";
}
}
return html;
}

this.BuildInputButtonList = function()
{
var RequireContent = this.Require.toUpperCase() == "TRUE" ? "*":"";
var RequireContentId = ' id="' + this.Id + 'Require"';
var html = "";
var classstr = GetElementClassStr(this.ElementClass, "InputButtonList");
for (var i = 0; (this.InitValueList != null &amp;&amp; i &lt; this.InitValueList.length); i++)
{
this.Remark = (this.Remark == null || this.Remark == undefined) ? "" : this.Remark;
var tid = parseInt(i+1).toString();

html += "<span id="\&quot;Div&quot;+this.Id+tid+&quot;\&quot;" style="\&quot;width:10pt\&quot;"><input name="\&quot;&quot;+this.Id+&quot;\&quot;" id="\&quot;&quot;+this.Id+tid+&quot;\&quot;" type="\&quot;button\&quot;" value="\&quot;&quot;+this.InitValueList[i].Value+&quot;\&quot;&quot;+" classstr="" +="" "="" realtype="\&quot;&quot;+this.RealType+&quot;\&quot;" bindfield="\&quot;&quot;+this.BindField+&quot;\&quot;" onclick="\&quot;OnConnectionButton(this);\&quot;/">"+this.InitValueList[i].Text+"<font color="\&quot;red\&quot;" "="" +requirecontentid+"="">"+RequireContent+"</font><span class="\&quot;gray\&quot;">"+this.Remark+"</span>&lt;\/span&gt; ";
}
return html;
}

this.BuildHorizonBar = function()
{
var html = "";
html += "";
html += ""+this.Description+"&lt;\/td&gt;";
html += "&lt;\/tr&gt;";

return html;
}

this.BuildHtmlText = function()
{
return "";
}

this.BuildNone = function()
{
return "";
}

this.BuildTextOtherBox = function()
{
var RequireContent = this.Require.toUpperCase() == "TRUE" ? "*":"";
var RequireContentId = ' id="' + this.Id + 'Require"';
var type = (this.Id.toUpperCase().indexOf("PASSWORD") &gt;= 0) ? "password" : "text";
var autocmpStr = ("password" == type)?'autocomplete=\"off\" ':'';
var RemarkInfo = (this.Remark == null || this.Remark == undefined) ? "" : this.Remark;
var onclickStr = GetClickFuncStr(this.ClickFuncApp);
var Titlestr = GetTitleStr(this.Title, this.Remark);
var classstr = GetElementClassStr(this.ElementClass, "TextBox");
var html =  "<input "="" +="" autocmpstr="" +"="" id="\&quot;&quot;+this.Id+&quot;\&quot;" type="\&quot;&quot;+type+&quot;\&quot;&quot;" titlestr="" classstr="" maxlength="\&quot;&quot;+this.MaxLength+&quot;\&quot;" realtype="\&quot;&quot;+this.RealType+&quot;\&quot;" bindfield="\&quot;&quot;+this.BindField+&quot;\&quot;&quot;" onclickstr="" disabledstr=""><font color="\&quot;red\&quot;" "="" +="" requirecontentid="">" +RequireContent+"</font><span class="\&quot;gray\&quot;" id="\&quot;&quot;+this.Id+&quot;Remark\&quot;">"+RemarkInfo+"</span>";

var otherhtml = "";
if(this.InitValue != null &amp;&amp; this.InitValue != "Empty")
{
var otherInfo = eval(this.InitValue);
var EndStr="";
for(var otherindex = 0; null != otherInfo &amp;&amp; otherindex &lt; otherInfo.length; otherindex++)
{
var ItemType = otherInfo[otherindex].Type;
var ItemInfo = otherInfo[otherindex].Item;

otherhtml += HWGetContrlStartEndString(ItemType, "Start");
EndStr = HWGetContrlStartEndString(ItemType, "End");

var innerhtml = "";
for(var i = 0;  null != ItemInfo &amp;&amp; i &lt; ItemInfo.length; i++)
{
var ValueId = ItemInfo[i].AttrValue;
var value = (this.LanguageList[ValueId] == null ||  this.LanguageList[ValueId] == undefined) ? ValueId : this.LanguageList[ValueId];
otherhtml += ItemInfo[i].AttrName + '="' +  value + '" ';
if("innerhtml" == ItemInfo[i].AttrName)
{
innerhtml = (this.LanguageList[ValueId] == null ||  this.LanguageList[ValueId] == undefined) ? ValueId : this.LanguageList[ValueId];
}

}
if(ItemType == "div" || ItemType == "span")
{
otherhtml += '&gt;' + innerhtml + EndStr;
}
else
{
otherhtml += EndStr;
}
}
}
return html + otherhtml;
}

this.BuildSmartBoxList = function()
{
var RequireContent = this.Require.toUpperCase() == "TRUE" ? "*":"";
var RequireContentId = ' id="' + this.Id + 'Require"';
var type = (this.Id.toUpperCase().indexOf("PASSWORD") &gt;= 0) ? "password" : "text";
var autocmpStr = ("password" == type)?'autocomplete=\"off\" ':'';
var RemarkInfo = (this.Remark == null || this.Remark == undefined) ? "" : this.Remark;
var onclickStr = GetClickFuncStr(this.ClickFuncApp);
var Titlestr = GetTitleStr(this.Title, this.Remark);
var classstr = GetElementClassStr(this.ElementClass, "TextBox");
var textwidth = (this.Textwidth == null || this.Textwidth == undefined) ? "" : this.Textwidth;

var baseType = this.Id.split('_')[1];
var baseTypeId = this.Id.split('_')[0];

try{
if(undefined == this.Id.split('_')[2] || null == this.Id.split('_')[2])
{
var baseremarkcssStr = ' class = "gray" ';
}
else
{
var baseremarkcssStr = 'class ="' + this.Id.split('_')[2] + '"';
}
}catch(e){
var baseremarkcssStr = ' class = "gray" ';
}

var BaseStart = HWGetContrlStartEndString(baseType, "Start");
var BaseEndStr = HWGetContrlStartEndString(baseType, "End");

var html =  BaseStart + autocmpStr + " id=\""+baseTypeId+"\" type=\""+type+"\"" + Titlestr + classstr + " maxlength=\""+this.MaxLength+"\"  textwidth=\""+textwidth+"\" RealType=\""+this.RealType+"\" BindField=\""+this.BindField+"\"" + onclickStr + DisabledStr + BaseEndStr + "<font color="\&quot;red\&quot;" "="" +="" requirecontentid="">" +RequireContent+"</font><span "="" +="" baseremarkcssstr="" id="\&quot;&quot;+this.Id+&quot;Remark\&quot;">"+RemarkInfo+"</span>";

var otherhtml = "";
if(this.InitValue != null &amp;&amp; this.InitValue != "Empty")
{
var otherInfo = eval(this.InitValue);
var EndStr="";
for(var otherindex = 0; null != otherInfo &amp;&amp; otherindex &lt; otherInfo.length; otherindex++)
{
var ItemType = otherInfo[otherindex].Type;
var ItemInfo = otherInfo[otherindex].Item;

otherhtml += HWGetContrlStartEndString(ItemType, "Start");
EndStr = HWGetContrlStartEndString(ItemType, "End");

var innerhtml = "";
for(var i = 0;  null != ItemInfo &amp;&amp; i &lt; ItemInfo.length; i++)
{
var ValueId = ItemInfo[i].AttrValue;
var value = (this.LanguageList[ValueId] == null ||  this.LanguageList[ValueId] == undefined) ? ValueId : this.LanguageList[ValueId];
otherhtml += ItemInfo[i].AttrName + '="' +  value + '" ';
if("innerhtml" == ItemInfo[i].AttrName)
{
innerhtml = (this.LanguageList[ValueId] == null ||  this.LanguageList[ValueId] == undefined) ? ValueId : this.LanguageList[ValueId];
}

}
if(ItemType == "div" || ItemType == "span")
{
otherhtml += '&gt;' + innerhtml + EndStr;
}
else
{
otherhtml += EndStr;
}
}
}
return html + otherhtml;
}


this.BuildTextDivbox = function()
{
var otherInfo = eval(this.InitValue);
HWConsoleLog(otherInfo);
var RequireContent = this.Require.toUpperCase() == "TRUE" ? "*":"";
var RequireContentId = ' id="' + this.Id + 'Require"';
var type = (this.Id.toUpperCase().indexOf("PASSWORD") &gt;= 0) ? "password" : "text";
var autocmpStr = ("password" == type)?'autocomplete=\"off\" ':'';
var RemarkInfo = (this.Remark == null || this.Remark == undefined) ? "" : this.Remark;
var html =  "<input "="" +="" autocmpstr="" id="\&quot;&quot;" this.id="" "\"="" type="\&quot;&quot;+type+&quot;\&quot;" title="\&quot;&quot;+((this.Title.length"> 0) ? this.Title:RemarkInfo.replace("(","").replace(")",""))+"\" class=\"TextBox\" maxlength=\""+this.MaxLength+"\" RealType=\""+this.RealType+"\" BindField=\""+this.BindField+"\"" + DisabledStr + "/&gt;<font color="\&quot;red\&quot;" "="" +="" requirecontentid="">"+RequireContent+"</font><span class="\&quot;gray\&quot;" id="\&quot;&quot;+this.Id+&quot;Remark\&quot;">"+RemarkInfo+"</span>";

var otherhtml = "";
for(var otherindex = 0; null != otherInfo &amp;&amp; otherindex &lt; otherInfo.length; otherindex++)
{
var ItemInfo = otherInfo[otherindex].Item;
otherhtml += '<div ';="" for(var="" i="0;" null="" !="ItemInfo" &&="" <="" iteminfo.length;="" i++)="" {="" var="" valueid="ItemInfo[i].AttrValue;" value="(this.LanguageList[ValueId]" =="null" ||="" this.languagelist[valueid]="=" undefined)="" ?="" :="" this.languagelist[valueid];="" otherhtml="" +="ItemInfo[i].AttrName" '="&#39; +  value + &#39;" }="" ;="" return="" html="" otherhtml;="" function="" hwgetliidlistbyform(formid,="" reloadarray)="" elementidlist="new" array();="" formobj="getElement(FormId);" elementlist="FormObj.getElementsByTagName(&quot;li&quot;);" elementlength="ElementList.length;" j="0;" for="" (var="" elementlength;="" tmpid="ElementList[i].id;" reloadelement="HWGetReloadElementById(TmpId," reloadarray);="" if(null="" 0="=" reloadelement.display)="" continue;="" elementidlist[j]="TmpId;" j++;="" elementidlist;="" hwgetreloadelementbyid(id,reloadinfo)="" this.id="id;" reloadinfo)="" null;="" length="ReloadInfo.length;" index="0;" (index="" index++)="" if(this.id="=" reloadelement.reloadid)="" reloadelement.reloadvalue[0];="" hwgetattribute(obj,attname)="" obj="" undefined="=" obj)="" try{="" obj.getattribute(attname);="" }catch(e){return="" null;}="" hwparsepagecontrolbyid(formid,="" tableclass,="" languagelist,reloadinfo)="" elementidlist[i]="ElementList[i].id;" table="Table" formid;="" tablestart="CreateTableStartString(table);" document.write(tablestart);="" hasstarthorizonbar="false;" element="document.getElementById(ElementIdList[i]);" realtype="HWGetAttribute(Element," "realtype");="" disabled="HWGetAttribute(Element," "disabled");="" descref="HWGetAttribute(Element," "descref");="" remarkref="HWGetAttribute(Element," "remarkref");="" errormsgref="HWGetAttribute(Element," "errormsgref");="" require="HWGetAttribute(Element," "require");="" bindfield="HWGetAttribute(Element," "bindfield");="" initvalue="HWGetAttribute(Element," "initvalue");="" titleref="HWGetAttribute(Element," "titleref");="" elementclass="HWGetAttribute(Element," "elementclass");="" maxlength="HWGetAttribute(Element," "maxlength");="" textwidth="HWGetAttribute(Element," "textwidth");="" clickfuncapp="HWGetAttribute(Element," "clickfuncapp");="" reloadinfo);="" if(="" reloadelement.display="" )="" reloadelement.disabled)="" reloadelement.disabled="" reloadelement.descref)="" reloadelement.descref="" descref;="" reloadelement.remarkref)="" reloadelement.remarkref="" remarkref;="" reloadelement.errormsgref)="" reloadelement.errormsgref="" errormsgref;="" reloadelement.require)="" reloadelement.require="" require;="" reloadelement.bindfield)="" reloadelement.bindfield="" bindfield;="" reloadelement.initvalue)="" reloadelement.initvalue="" initvalue;="" reloadelement.titleref)="" reloadelement.titleref="" titleref;="" reloadelement.elementclass)="" reloadelement.elementclass="" elementclass;="" reloadelement.maxlength)="" reloadelement.maxlength="" maxlength;="" reloadelement.textwidth)="" reloadelement.textwidth="" textwidth;="" reloadelement.clickfuncapp)="" reloadelement.clickfuncapp="" clickfuncapp;="" controlinfo="new" usercontrolpaser(="" element.id,="" realtype,="" descref,="" remarkref,="" errormsgref,="" require,="" bindfield,="" initvalue,="" titleref,="" elementclass,="" maxlength,="" textwidth,="" clickfuncapp,="" disabled,="" languagelist);="" hwconsolelog(controlinfo);="" decorate="new" usercontrolpaserdecorate(controlinfo,="" decorate.decorate();="" t="ControlInfo.OuterHTML();" if="" (controlinfo.realtype="=" "horizonbar")="" (hasstarthorizonbar="=" true)="" document.write("<\="" tbody="">");
}
HasStartHorizonBar = true;
document.write("");
}

Element.outerHTML = "";
document.write(t);
if (i == ElementLength-1)
{
document.write("&lt;\/tbody&gt;");
}
}
document.write("</div>")
}

function HWcloneObject( SrcObj, CloneFlag )
{
if ( SrcObj === null || SrcObj === undefined || typeof ( SrcObj ) !== 'object' )
{
return SrcObj;
}

var deep = !!CloneFlag;

var cloned;

if ( SrcObj.constructor === Array )
{
if ( deep === false )
{
return SrcObj;
}

cloned = [];

for ( var i in SrcObj )
{
cloned.push( HWcloneObject( SrcObj[i], deep ) );
}

return cloned;
}

cloned = {};

for ( var i in SrcObj )
{
cloned[i] = deep ? HWcloneObject( SrcObj[i], true ) : SrcObj[i];
}

return cloned;
}

function stFormParaNameValueArray(Name, Value)
{
this.Name = Name;
this.Value = Value;
}

function stSpecParaArray(Name, Value, ForceAddFlag)
{
this.Name = Name;
this.Value = Value;
this.ForceAddFlag = ForceAddFlag;
}

function UserControlValueSetterByLiId(_ControlId,_DataSource,suffixStr)
{
this.Id = _ControlId;
this.DataSource = _DataSource;
this.Control = document.getElementById(this.Id);
if (null == this.Control)
{
this.Control = document.getElementById(this.Id+"1");
if(null == this.Control)
{
return;
}
}
this.RealType = this.Control.getAttribute("RealType");
this.BindField = this.Control.getAttribute("BindField");
if(null == suffixStr || "null" == suffixStr)
{
var DataId = this.RealType == "HtmlText" ? this.BindField : this.BindField.split('.')[1];
}
else
{
var NosuffixStrFiled = this.BindField.split(suffixStr)[0];
var DataId = this.RealType == "HtmlText" ? NosuffixStrFiled : NosuffixStrFiled.split('.')[1];
}

try{
this.Value = this.DataSource[DataId];
}catch(e){
this.Value = "";
}

if(null == this.Value || "undefined" == this.Value)
{
this.Value = "";
}


this.SetValue = function()
{
this["set"+this.RealType]();
}

this.setTextArea = function()
{
setText(this.Id, this.Value);
}
this.setTextBox = function()
{
setText(this.Id, this.Value);
}
this.setCheckBox = function()
{
setCheck(this.Id, this.Value);
}
this.setDropDownList = function()
{
setSelect(this.Id, this.Value);
}
this.setRadioButtonList = function()
{
setRadio(this.Id, this.Value);
}

this.setCheckBoxList = function()
{
var li = document.getElementsByName(this.Id);
for (var i = 0; i &lt; li.length; i++)
{
li[i].checked = false;
for (var j = 0; j &lt; this.Value.length; j++)
{
if (li[i].value == this.Value[j])
{
li[i].checked = true;
break;
}
}
}
}

this.setHorizonBar = function()
{

}
this.setInputButtonList = function()
{

}

this.setSmartBoxList = function()
{

}

this.setHtmlText = function()
{
document.getElementById(this.Id).innerHTML = htmlencode(this.Value);
}

this.setTextOtherBox = function()
{
var TextType = this.Id.split("_")[0];
if(TextType == "select")
{
setSelect(this.Id, this.Value);
}
else if(TextType == "div" || TextType == "span")
{
document.getElementById(this.Id).innerHTML = htmlencode(this.Value);
}
else if(TextType == "checkbox")
{
 setCheck(this.Id, this.Value);
}
else if(TextType == "radio")
{
setRadio(this.Id, this.Value);
}
else
{
setText(this.Id, this.Value);
}
}

this.setTextDivbox = function()
{
setText(this.Id, this.Value);
}
}

function HWSetTableByLiIdList(LiIdList,DataArray, SpecFunction,suffixStr)
{
this.LiIdList = LiIdList;
this.DataArray = DataArray;
this.suffixStr = (suffixStr == null || undefined == suffixStr)?"null":suffixStr;

for (var i = 0; i &lt; LiIdList.length; i++)
{
var Id = LiIdList[i];
try{
this.Control = document.getElementById(Id);
if(null == this.Control)
{
this.Control = document.getElementById(Id+"1");
}
this.BindField = this.Control.getAttribute("BindField");
if(this.BindField == "" || this.BindField == "Empty")
{
continue;
}

HWConsoleLog(this.DataArray);
var Setter = new UserControlValueSetterByLiId(Id, this.DataArray,this.suffixStr);

Setter.SetValue();
}
catch(e)
{ continue;}
}

if(null != SpecFunction)
{
SpecFunction(this.DataArray);
}
}

function UserControlValueGetParaByBindField(FormLiIdList, BindField)
{
var ElementLength = FormLiIdList.length;
this.Id = 'Empty';
for (var i = 0; i &lt; ElementLength; i++)
{
var ElementId = FormLiIdList[i];
var ElementInfo = document.getElementById(ElementId);
if(null == ElementInfo)
{
ElementInfo = document.getElementById(ElementId+"1");
if(null == ElementInfo)
{
continue;
}
}

var ParaName = ElementInfo.getAttribute("BindField");

if(ParaName == BindField)
{
this.Id = ElementId;
break;
}
}

if("Empty" == this.Id)
{
return null;
}

this.GetBindFieldValue = function()
{
var CurrentControl = document.getElementById(this.Id);
if (CurrentControl == null)
{
CurrentControl = document.getElementsByName(this.Id)[0];
}
var RealType = CurrentControl.getAttribute("RealType");

if (RealType == "HorizonBar" || RealType == "ButtonArea" || RealType == undefined)
{
return "";
}

return this["get"+RealType]();
}

this.getTextBox = function()
{
return getValue(this.Id);
}
this.getSmartBoxList = function()
{
return "";
}
this.getTextOtherBox = function()
{
var TextType = this.Id.split("_")[0];
if(TextType == "select")
{
return getSelectVal(this.Id);
}
else if(TextType == "div" || TextType == "span")
{
;
}
else if(TextType == "checkbox")
{
 return getCheckVal(this.Id);
}
else if(TextType == "radio")
{
return getRadioVal(this.Id);
}
else
{
return getValue(this.Id);
}
}
this.getTextDivbox = function()
{
return getValue(this.Id);
}
this.getTextArea = function()
{
return getValue(this.Id);
}
this.getCheckBox = function()
{
return getCheckVal(this.Id);
}
this.getDropDownList = function()
{
return getSelectVal(this.Id);
}
this.getRadioButtonList = function()
{
return getRadioVal(this.Id);
}
this.getCheckBoxList = function()
{
var li = document.getElementsByName(this.Id);
var rev = new Array();
for (var i = 0; i &lt; li.length; i++)
{
if (li[i].checked)
{
rev[i] = li[i].value;
}
}
return rev;
}
}


function GetParaValueArrayByFormId(FormLiIdList)
{
var ElementLength = FormLiIdList.length;
var ParaListArray = [];
for (var i = 0; i &lt; ElementLength; i++)
{
var ElementId = FormLiIdList[i];
var ElementInfo = document.getElementById(ElementId);
if(null == ElementInfo)
{
ElementInfo = document.getElementById(ElementId+"1");
if(null == ElementInfo)
{
continue;
}
}
var ParaName = ElementInfo.getAttribute("BindField");
var RealType = ElementInfo.getAttribute("RealType");
if(-1 == ParaName.indexOf(".") || RealType == "HtmlText")
{
continue;
}

var Picker = new UserControlValueGetParaByBindField(FormLiIdList, ParaName);
if(null == Picker)
{
continue;
}

var BaseIndex = ParaName.split(".")[1];
var ParaValue = Picker.GetBindFieldValue();
ParaListArray[BaseIndex] = ParaValue;
}

return ParaListArray;
}

function GetTrDisplayInfo(TdId)
{
var TrId = TdId + "Row";
try{
var Obj = document.getElementById(TrId);
var ParentObj = document.getElementById(TrId).parentNode;
if("none" == Obj.style.display || "none" == ParentObj.style.display)
{
return "none";
}
}catch(e){return null}
return null;
}

function GetParaNameValueArrayByFormId(FormLiIdList, BaseData)
{
var ElementLength = FormLiIdList.length;
var ParaListArray = new Array();
for (var i = 0; i &lt; ElementLength; i++)
{
var ElementId = FormLiIdList[i];
var ElementInfo = document.getElementById(ElementId);
if(null == ElementInfo)
{
ElementInfo = document.getElementById(ElementId+"1");
if(null == ElementInfo)
{
continue;
}
}

var ParaName = ElementInfo.getAttribute("BindField");
var RealType = ElementInfo.getAttribute("RealType");
var DisplayInfo = GetTrDisplayInfo(ElementId);

if(ParaName == "" || ParaName == "Empty" || ParaName == "DomainBox" || DisplayInfo == "none")
{
continue;
}

if(RealType == "HtmlText")
{
continue;
}

var Picker = new UserControlValueGetParaByBindField(FormLiIdList, ParaName);
if(null == Picker)
{
continue;
}

var ParaValue = Picker.GetBindFieldValue();
if(null != BaseData)
{
try{
var BaseIndex = ParaName.split(".")[1];
var BaseValue = BaseData[BaseIndex];
if(undefined != BaseValue &amp;&amp; BaseValue == ParaValue)
{
continue;
}
}catch(e){}
}

var ParaPair = new stFormParaNameValueArray(ParaName, ParaValue);
ParaListArray.push(ParaPair);

}

return ParaListArray;
}

function DeleteUnchangeData(NewArray, BaseArray)
{
var ResultArray = {};
if(null == BaseArray)
{
return  NewArray;
}

return  NewArray;
}

function FormatUrlEncode(val)
{
if(null != val)
{
var formatstr = escape(val);
formatstr=formatstr.replace(new RegExp(/(\+)/g),"%2B");
formatstr = formatstr.replace(new RegExp(/(\/)/g), "%2F");
return formatstr
}
return null;
}

/*
SpecList.ForceAddFlag,
0:取spec.value 覆盖lilist，添加到body;（不改变属性名，更新属性值）
1.取spec.Name，添加到参数列表，若spec.value为空则取lilist中与spec.name后缀相同的属性填充,但是删除原有list中同名的属性；（强制添加参数对，并删除原有同名参数对）
2:强制从lilist中删除属性名称为spec.Name的参数，使其不添加到body;（强制删除同名参数对）
3:覆盖变更存在的参数对，不存在则忽略;
4:取spec.Name，添加到参数列表，若spec.value为空则取lilist中与spec.name后缀相同的属性填充；（强制添加）
*/
function HWAddParameterByFormId(SubmitForm, FormLiIdList, ParaList, OldValueList,UnUseForm)
{
var SubmitType = SubmitForm == null ? 0 : 1 ;
var SpecParaList = ParaList;

if(true != UnUseForm)
{
var ParaListArray = GetParaNameValueArrayByFormId(FormLiIdList, OldValueList);
var ArrayLengthTmp = ParaListArray.length;
if(0 == ArrayLengthTmp)
{
ParaListArray = ParaList;
SpecParaList = null;
}
}
else
{
ParaListArray = ParaList;
SpecParaList = null;
}

var ArrayLengthTmp = ParaListArray.length;
if(0 == ArrayLengthTmp)
{
return null;
}

for(var index = 0; index &lt; ArrayLengthTmp; index++)
{
var testtmp = ParaListArray[index];
if(undefined == testtmp.ForceAddFlag)
{
continue;
}

var ForceFlag = parseInt(testtmp.ForceAddFlag,10);
if(2 == ForceFlag || 3 == ForceFlag)
{
testtmp.Name="";
testtmp.Value="";
}
}

var ParaType = SpecParaList == null ? 1 : 0 ;

if(0 == ParaType)
{
var ParaListLength = SpecParaList.length;
for(var i = 0; i &lt; ParaListLength; i++)
{
var SpecList = SpecParaList[i];
if(SpecList.Name == "" || SpecList.Name == "null")
{
continue;
}

var SpecName = SpecList.Name.split(".")[1];
var ForceFlag = parseInt(SpecList.ForceAddFlag,10);
if(1 == ForceFlag)
{
var Flag = 0;
var Addvalue = "";
for(var j = 0; j &lt; ArrayLengthTmp; j++)
{
var ParaArray = ParaListArray[j];
if(ParaArray.Name == "" || ParaArray.Name == undefined || ParaArray.Name == null)
{
continue;
}

var BaseName = ParaArray.Name.split(".")[1];
if(SpecName == BaseName)
{
Addvalue = SpecList.Value == null ? ParaArray.Value : SpecList.Value;
Flag = 1;
ParaArray.Name="";
ParaArray.Value="";
break;
}
}

if(0 == Flag)
{
Addvalue = SpecList.Value;
}

var ParaPair = new stFormParaNameValueArray(SpecList.Name, Addvalue);
ParaListArray.push(ParaPair);
}
else if(2 == ForceFlag)
{
for(var j = 0; j &lt; ArrayLengthTmp; j++)
{
var ParaArray = ParaListArray[j];
if(ParaArray.Name == "" || ParaArray.Name == undefined || ParaArray.Name == null)
{
continue;
}

/* 删除时全匹配 */
if(SpecList.Name == ParaArray.Name)
{
/* set null to delete */
ParaArray.Name="";
break;
}
}
}
else if(3 == ForceFlag)
{
for(var j = 0; j &lt; ArrayLengthTmp; j++)
{
var ParaArray = ParaListArray[j];
if(ParaArray.Name == "")
{
continue;
}

var BaseName = ParaArray.Name.split(".")[1];
if(SpecName == BaseName)
{
ParaArray.Name="";
ParaArray.Value="";
var Addvalue = SpecList.Value == null ? ParaArray.Value : SpecList.Value;
var ParaPair = new stFormParaNameValueArray(SpecList.Name, Addvalue);
ParaListArray.push(ParaPair);
break;
}
}
}
else if(4 == ForceFlag)
{
var Flag = 0;
for(var j = 0; j &lt; ArrayLengthTmp; j++)
{
var ParaArray = ParaListArray[j];
if(ParaArray.Name == "")
{
continue;
}

var BaseName = ParaArray.Name.split(".")[1];
if(SpecName == BaseName)
{
var Addvalue = SpecList.Value == null ? ParaArray.Value : SpecList.Value;
Flag = 1;
break;
}
}

if(0 == Flag)
{
var Addvalue = SpecList.Value;
}

var ParaPair = new stFormParaNameValueArray(SpecList.Name, Addvalue);
ParaListArray.push(ParaPair);
}
else
{
for(var j = 0; j &lt; ArrayLengthTmp; j++)
{
var ParaArray = ParaListArray[j];
if(ParaArray.Name == "" || ParaArray.Name == undefined || ParaArray.Name == null)
{
continue;
}

if(ParaArray.Name == SpecList.Name)
{
ParaArray.Value = SpecList.Value;
break;
}
}
}
}
}

if(SubmitType == 0)
{
var ArrayLength = ParaListArray.length;
var AjaxData = "";
for(var Para_j = 0; Para_j &lt; ArrayLength; Para_j++)
{
var ParameterName = ParaListArray[Para_j].Name;
var ParameterValue = FormatUrlEncode(ParaListArray[Para_j].Value);
if(ParameterName != "" &amp;&amp;  ParameterName != undefined &amp;&amp; ParameterName != null)
{
if(Para_j != ArrayLength - 1)
{
AjaxData += ParameterName + "=" + ParameterValue + "&amp;";
}
else
{
AjaxData += ParameterName + "=" + ParameterValue;
break;
}
}
}

return AjaxData;
}

var ArrayLength = ParaListArray.length;
for(var Para_j = 0; Para_j &lt; ArrayLength; Para_j++)
{
var ParameterName = ParaListArray[Para_j].Name;
var ParameterValue = ParaListArray[Para_j].Value;
if(ParameterName == "" || ParameterName == undefined || ParameterName == null)
{
continue;
}

SubmitForm.addParameter(ParameterName,ParameterValue);
}

return "success";
}

function stSetParaInfo(asynflag, FormLiList, SpecParaPair,OldValueList,UnUseForm)
{
this.asynflag = asynflag;
this.FormLiList = FormLiList;
this.SpecParaPair = SpecParaPair;
this.OldValueList = OldValueList;
this.UnUseForm = UnUseForm;
}

function HWSetAction(type,url,Parameter,tokenvalue)
{
var UnUseForm = (Parameter.UnUseForm == true) ? true : false;
var ajaxResult;
if("ajax" == type)
{
var AjaxBody = HWAddParameterByFormId(null, Parameter.FormLiList, Parameter.SpecParaPair, Parameter.OldValueList, UnUseForm);
if(null == AjaxBody)
{
return;
}

$.ajax({
type : "POST",
async : Parameter.asynflag,
cache : false,
url: url,
data :AjaxBody + "&amp;x.X_HW_Token=" + tokenvalue,
success : function(data) {
ajaxResult=data;
}
});

try{
var ReturnJson = $.parseJSON(ajaxResult);
}catch(e){
var ReturnJson = null;
}
return ReturnJson;
}
else
{
var Form = new webSubmitForm();
var FormBody = HWAddParameterByFormId(Form, Parameter.FormLiList, Parameter.SpecParaPair, Parameter.OldValueList, UnUseForm);
HWConsoleLog(FormBody);
if(null == FormBody)
{
return false;
}
Form.addParameter('x.X_HW_Token', tokenvalue);
Form.setAction(url);
Form.submit();
return true;
}
}

function HWGetAction(Url, ParameterList, tokenvalue)
{
var tokenstring = (null == tokenvalue) ? "" : ("x.X_HW_Token=" + tokenvalue);
var ResultTmp = null;
  $.ajax({
type : "POST",
async : false,
cache : false,
url : Url,
data: ParameterList + tokenstring,
success : function(data) {
 var TmpResultTmp  = "\"" + data + "\"";
 ResultTmp = eval(TmpResultTmp);
}
});

try{
var ReturnJson = $.parseJSON(ResultTmp);
}catch(e){
var ReturnJson = null;
}

return ReturnJson;
}

function HWGetDesByIndexId(DesArray,Id)
{
try{
return DesArray[Id];
}catch(e){

return "undefined";
}
}

function HWParseResult(ReturnStr, ConfigIdList)
{
if(null == ReturnStr)
{
return;
}

var result = ReturnStr.result;
var ErrCode = "s" + ReturnStr.error;
var ErrorId = HWGetIdByBindField(ConfigIdList, ReturnStr.pro);
if(1 == result)
{
var ErrorDes = HWGetDesByIndexId(errLanguage, ErrCode);
ErrorDes = "undefined" == ErrorDes ? errLanguage["s0xf7205001"]: ErrorDes;
document.getElementById(ErrorId).style.backgroundColor="#FF0000";
}
else
{
var ErrorDes = HWGetDesByIndexId(errLanguage, "success");
}
}

function HWConsoleLog(msg)
{
try {
//console.log(msg);
}catch(e){};
}
</span></span></span></span></span></div></span></div></table";></a.length;i++)></body></html>