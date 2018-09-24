"use strict";

let langue = document.getElementById("langue");
let serveurListe = document.getElementById("serveur");
let pseudoJoueur = document.getElementById("pseudo");

const serveurGlobal = {en_GB:[],de_DE:[],es_ES:[],fr_FR:[],it_IT:[],pt_PT:[],ru_RU:[]};

ajaxGetRealmsAPI();

function ajaxGetRealmsAPI() {
    let realmsAPI = new XMLHttpRequest();
    realmsAPI.open("GET", "https://eu.api.battle.net/wow/realm/status?locale=fr_FR&apikey=jk9j7y5zqprfhx3atqfpp4dhx7fpwuwb");
    realmsAPI.addEventListener("load",function () {
		let realmsAPIInfo = JSON.parse(realmsAPI.responseText).realms;

		for (let i = 0; i < realmsAPIInfo.length; i++) {
			new serveur(realmsAPIInfo[i]);
		};
    });
    realmsAPI.send(null);
};



class serveur {
	constructor(serv){
		serveurGlobal[serv.locale].push({type:serv.type, population:serv.population, name:serv.name, locale:serv.locale, status:serv.status});
	}
}


langue.addEventListener("change", function(){
	if(langue.value != null){
		document.getElementsByClassName("serveur")[0].style.display = "block";
	}
	if(langue.value === "rien"){
		document.getElementsByClassName("serveur")[0].style.display = "none";
		pseudoJoueur.style.display = "none";
	}
	else{
		serveursAjout(serveurGlobal[langue.value]);
	}
})


function serveursAjout(serv){
	serveurListe.innerHTML = "";

	let rien = document.createElement("option");
	rien.value = "rien";
	rien.innerHTML = "-- Choix du serveur --";
	serveurListe.appendChild(rien);

	for(let i = 0; i < serv.length; i++){
		const options = document.createElement("option");
		options.value = serv[i].name;
		options.innerHTML = serv[i].name;
		serveurListe.appendChild(options);
	}	

	serveurListe.addEventListener("change", function(){
		if(serveurListe.value != "rien"){
			pseudoJoueur.style.display = "block";
		}
		else{
			pseudoJoueur.style.display = "none";
		}
	});
}


document.getElementsByClassName("recherche_button")[0].addEventListener("click", function(){
	if(langue.value === "rien"){
		console.log("Langague non choisir")
	}
	else if(serveurListe.value === "rien"){
		console.log("Serveur non choisis");
	}
	else if(pseudoJoueur.value.length > 1){
		ajaxGetStatsAPI();
		ajaxGetItemsAPI();
	}
})