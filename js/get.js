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
var finalData=storeDB.getAll();
finalData.onsuccess=function(event){
console.log(event.target.result);
display(event.target.result);
}
}
function display(data){
var parent=document.querySelector(".parent");
for(var i=0;i<data.length;i++){
var child=document.createElement("div");
child.classList.add("child");
var image=document.createElement("img");
image.src="images/pro.svg";
image.alt=data[i].name;
var name=document.createElement("h2");
name.textContent=data[i].name;

var email=document.createElement("p");
email.textContent=data[i].email;

var role=document.createElement("p");
role.textContent=data[i].role;

var mobile=document.createElement("p");
mobile.textContent=data[i].mobile;


var link=document.createElement("a");
link.href="resume.html?id="+data[i].id;
link.textContent="view_profile";
child.append(image);
child.append(name);
child.append(email);
child.append(role);
child.append(mobile);
child.append(link);
parent.append(child);
}


}
