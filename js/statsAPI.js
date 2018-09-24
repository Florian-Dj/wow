"use strict";


const faction = ["Alliance", "Horde"];
const classe = [0, "Guerrier", "Paladin", "Chasseur", "Voleur", "Prêtre", "Chevalier de la mort", "Chaman", "Mage", "Démoniste", "Moine", "Druide", "Chasseur de démons"];
const race = [0, "Humain", "Orc", "Nain", "Elfe de la nuit", "Mort-vivant", "Tauren", "Gnome", "Troll", "Gobelin", "Elfe de sang", "Draeneï", 12,13,14,15,16,17,18,19,20,21, "Worgen", 23, "Pandaren", "Pandaren", "Pandaren", "Sacrenuit", "Tauren de Haut-Roc", "Elfe du Vide", "Draeneï sancteforge"];

function ajaxGetStatsAPI(){
	let statsAPI = new XMLHttpRequest();
    statsAPI.open("GET", "https://eu.api.battle.net/wow/character/" + serveurListe.value + "/" + pseudoJoueur.value + "?fields=stats&locale=fr_FR&apikey=jk9j7y5zqprfhx3atqfpp4dhx7fpwuwb");
    statsAPI.addEventListener("load",function () {
		const statsAPIInfo = JSON.parse(statsAPI.responseText);
		statsCadre(statsAPIInfo);
    });
    statsAPI.send(null);
}



function statsCadre(info){
	document.querySelector("section").style.display = "block";
	let statsInfosAPI = document.getElementsByClassName("statsAPI")[0];
	statsInfosAPI.style.display = "block";
	statsInfosAPI.innerHTML= "";


	let persoImage = document.createElement("img");
	persoImage.src = "https://render-eu.worldofwarcraft.com/character/" + info.thumbnail;
	persoImage.alt = "Image du personnage";

	let divinfoAPI  = document.createElement("div");
	divinfoAPI.className = "divinfoAPI"


	let imageFaction = document.createElement("img");
	imageFaction.src = "images/" + faction[info.faction] + ".png";
	imageFaction.style.float = "right";

	let persoFaction = document.createElement("p");
	persoFaction.innerHTML = info.name + " " + info.level + "<br/>"
							+ race[info.race] + " " + classe[info.class];

	let persoStats = document.createElement("div");
	persoStats.className = "divstatsAPI";

	let persoFullStats = document.createElement("p");
	persoFullStats.innerHTML =   "Vie : " + info.stats.health + "<br/>"
								+ "Mana : " + info.stats.mana5 + "<br/>"
								+ "Force : " + info.stats.str + "<br/>"
								+ "Agilité : " + info.stats.agi + "<br/>"
								+ "Endurance : " + info.stats.sta + "<br/>"
								+ "Intelligence : " + info.stats.int + "<br/>";



	statsInfosAPI.appendChild(persoImage);
	statsInfosAPI.appendChild(imageFaction);

	statsInfosAPI.appendChild(divinfoAPI);
	statsInfosAPI.appendChild(persoStats);

	divinfoAPI.appendChild(persoFaction);

	persoStats.appendChild(persoFullStats);
}