var url = "http://example.com";
var ios = Components.classes["@mozilla.org/network/io-service;1"]
          .getService(Components.interfaces.nsIIOService);
var ssm = Components.classes["@mozilla.org/scriptsecuritymanager;1"]
          .getService(Components.interfaces.nsIScriptSecurityManager);
var dsm = Components.classes["@mozilla.org/dom/storagemanager;1"]
          .getService(Components.interfaces.nsIDOMStorageManager);
var uri = ios.newURI(url, "", null);
var principal = ssm.getCodebasePrincipal(uri);
var storage = dsm.getLocalStorageForPrincipal(principal, "");

function pop() {
	window.openDialog(
		'chrome://fbext/content/menubox.xul',
		'',
		'chrome,dialog,centerScreen,modal', "theater");
}

function onTheaterless() {
  storage.setItem("mode", "theaterless");
  window.close();
	return true;
}

function onTheater() {
  storage.setItem("mode", "theater");
  window.close();
	return true;
}

function onLoad() {
  if (storage.getItem("mode") == "theaterless") {
    document.getElementById("theaterless").style.backgroundColor = '#99CCFF';
  } else {
    document.getElementById("theater").style.backgroundColor = '#99CCFF';
  }
}

function onOverlayLoad() {
  window.addEventListener("load", function(){updateUrl();}, true);
  window.addEventListener("focus", function(){updateUrl();}, true);
  window.addEventListener("finish", function(){updateUrl();}, true);
  window.addEventListener("readystatechange", function(){updateUrl();}, true);
  window.addEventListener("beforeactivate", function(){updateUrl();}, true);
  window.addEventListener("start", function(){updateUrl();}, true);
  window.addEventListener("change", function(){updateUrl();}, true);
  window.addEventListener("DOMActive", function(){updateUrl();}, true);
  window.addEventListener("DOMContentLoaded", function(){updateUrl();}, true);
}

function updateUrl() {
	  var url = content.location.href;
		if(storage.getItem("mode") == "theaterless") {
	  if(url.indexOf("&theater") > -1) {
	   gBrowser.loadURI(url.replace("&theater", ""));
	  }}
}
