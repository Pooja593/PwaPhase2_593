var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query)
{
  param=query[i].split("=");
  paramValue=parseInt(param[1]);
}
var request;
var idb=window.indexedDB||window.mozIndexedDB||window.msIndexed ||window.webkitIndexedDB;
if(!idb in window){
  alert("Browser is not supporting");
}
var open =idb.open("StoreData",1);
console.log("IndexedDB is created");
open.onupgradeneeded=function(event){
request=event.target.result;
var storeDB=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error){
  console.log("object store is not created",+error)
}
open.onsuccess=function(event){
request=event.target.result;
var transaction=request.transaction("Formdata","readwrite");
var storeDB=transaction.objectStore("Formdata");
var info=storeDB.get(paramValue);
info.onsuccess=function(data){
  console.log(data.target.result);
  display(data.target.result);
}
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data){
  var img=document.createElement("img");
  img.src="images/pro.svg";
  left.append(img);
  var h3=document.createElement("h3");
  h3.textContent=data.name;
  left.append(h3);
  var h4=document.createElement("h4");
  h4.textContent=data.email;
  left.append(h4);
  var h5=document.createElement("h4");
  h5.textContent=data.role;
  left.append(h5);
  var h6=document.createElement("h4");
  h6.textContent=data.mobile;
  left.append(h6);
 var h7=document.createElement("h2");
 h7.textContent="Career Objective";
 right.append(h7);
 var h8=document.createElement("h4");
 h8.textContent=data.career;
 right.append(h8);
var h9=document.createElement("h3");
h9.textContent="Educational_Details";
right.append(h9);
var table=document.createElement("table");
table.border='2';
let row='';
row +="<tr>"+"<th>"+"college"+"</th>"+"<th>"+"degree"+"</th>"+"<th>"+"branch"+
"</th>"+"<th>"+"marks"+"</th>"+"</tr>"
for(i in data.educational_Details)
{

  row +="<tr>"+"<td>"+data.educational_Details[i].college+"</td>"+"<td>"+data.educational_Details[i].degree+"</td>"+"<td>"+data.educational_Details[i].branch+
  "</td>"+"<td>"+data.educational_Details[i].marks+"</td>"+"</tr>"
}
table.innerHTML=row;
right.append(table);

var h11=document.createElement("h3")
h11.textContent="skills";
right.append(h11);
var h12=document.createElement("h4")
h12.textContent=data.skills;
right.append(h12);


}
