const couleurItems = ["#9d9d9d", "#fff", "#1eff00", "#0081ff", "#c600ff", "#ff8000", "#e5cc80", "#0cf"]
const itemsNomEn = [0, 1, "head", "neck", "shoulder", "back", "chest", "shirt", "tabard", "wrist", "hands",
					"waist", "legs", "feet", "finger1", "finger2", "trinket1", "trinket2", "mainHand", "offHand"]

function ajaxGetItemsAPI(){
	let statsAPI = new XMLHttpRequest();
    statsAPI.open("GET", "https://eu.api.battle.net/wow/character/" + serveurListe.value + "/" + pseudoJoueur.value + "?fields=items&locale=fr_FR&apikey=jk9j7y5zqprfhx3atqfpp4dhx7fpwuwb");
    statsAPI.addEventListener("load",function () {
		let statsAPIInfo = JSON.parse(statsAPI.responseText).items;
		itemsPerso(Object.entries(statsAPIInfo));
    });
    statsAPI.send(null);
};


function itemsPerso(infos){
	document.getElementsByClassName("itemsCadreAll")[0].innerHTML = "";

	for (i = 2; i < infos.length ; i++){
		
		if(infos[i][0] != itemsNomEn[i]){
			infos.splice(i, 0, itemsNomEn[i]);
		}

		let divItems = document.createElement("div");
		divItems.className = ("itemsCadre");
		document.getElementsByClassName("itemsCadreAll")[0].appendChild(divItems);

		imageItems = document.createElement("img");
		imageItems.src = "https://render-eu.worldofwarcraft.com/icons/56/" + infos[i][1].icon + ".jpg";
		imageItems.style.border = "solid 2px " + couleurItems[infos[i][1].quality];
		divItems.appendChild(imageItems);
	}
}
