"use strict";
/* Ne pas modifier ce fichier pour changer un lien : voir config.js */
var LANGS = {
 fr:{name:"Français",   t:"Notice d'utilisation",   s:"Filet de camouflage", b:"Ouvrir la notice (PDF)",          o:"Autres langues"},
 en:{name:"English",    t:"User guide",             s:"Camouflage net",      b:"Open the guide (PDF)",            o:"Other languages"},
 es:{name:"Español",    t:"Manual de instrucciones",s:"Red de camuflaje",    b:"Abrir el manual (PDF)",           o:"Otros idiomas"},
 de:{name:"Deutsch",    t:"Bedienungsanleitung",    s:"Tarnnetz",            b:"Anleitung öffnen (PDF)",          o:"Weitere Sprachen"},
 nl:{name:"Nederlands", t:"Gebruiksaanwijzing",     s:"Camouflagenet",       b:"Gebruiksaanwijzing openen (PDF)", o:"Andere talen"},
 it:{name:"Italiano",   t:"Istruzioni per l'uso",   s:"Rete mimetica",       b:"Apri le istruzioni (PDF)",        o:"Altre lingue"},
 pt:{name:"Português",  t:"Manual de instruções",   s:"Rede de camuflagem",  b:"Abrir o manual (PDF)",            o:"Outros idiomas"}
};
/* Liste blanche : seuls ces hôtes peuvent être ouverts depuis la page. */
var ALLOWED_HOSTS = ["drive.google.com","docs.google.com","drive.usercontent.google.com"];
var OWN_PDF_PATH = /^\/[a-z0-9-]+\/pdf\/[a-z0-9._-]+\.pdf$/i;
function safeUrl(u){
  if(!u) return "";
  try{
    var x = new URL(u, location.href);
    if(x.protocol !== "https:") return "";
    if(x.username || x.password) return "";
    if(ALLOWED_HOSTS.indexOf(x.hostname) !== -1) return x.href;
    if(x.hostname === location.hostname && OWN_PDF_PATH.test(x.pathname)) return x.href;
  }catch(e){}
  return "";
}
var NS = "http://www.w3.org/2000/svg";
function arrow(){
  var w=document.createElement("span"); w.className="ar";
  var s=document.createElementNS(NS,"svg"); s.setAttribute("viewBox","0 0 16 16"); s.setAttribute("fill","none");
  s.setAttribute("stroke","#0f2a19"); s.setAttribute("stroke-width","2.2"); s.setAttribute("stroke-linecap","round"); s.setAttribute("stroke-linejoin","round");
  var p=document.createElementNS(NS,"path"); p.setAttribute("d","M3 8h9M8.5 4l4 4-4 4"); s.appendChild(p); w.appendChild(s); return w;
}
function pick(){
  var q=(new URLSearchParams(location.search).get("lang")||"").toLowerCase();
  if(Object.prototype.hasOwnProperty.call(LANGS,q)) return q;
  var list=navigator.languages||[navigator.language||"en"];
  for(var i=0;i<list.length;i++){var c=String(list[i]).slice(0,2).toLowerCase(); if(Object.prototype.hasOwnProperty.call(LANGS,c)) return c;}
  return "en";
}
function btn(lang,main){
  var u=safeUrl((window.NOTICES||{})[lang]);
  var a=document.createElement("a");
  a.className="btn"+(main?" main":"")+(u?"":" off");
  if(u){a.href=u; a.rel="noopener noreferrer"; a.referrerPolicy="no-referrer";}
  a.setAttribute("hreflang",lang);
  var sp=document.createElement("span"); sp.textContent=main?LANGS[lang].b:LANGS[lang].name;
  a.appendChild(sp); a.appendChild(arrow()); return a;
}
function render(lang){
  var x=LANGS[lang]; document.documentElement.lang=lang;
  document.getElementById("t").textContent=x.t;
  document.getElementById("s").textContent=x.s;
  document.getElementById("o").textContent=x.o;
  document.title=x.t+" — "+x.s;
  var m=document.getElementById("main"); m.textContent=""; m.appendChild(btn(lang,true));
  var l=document.getElementById("list"); l.textContent="";
  Object.keys(LANGS).forEach(function(k){ if(k!==lang) l.appendChild(btn(k,false)); });
}
render(pick());
