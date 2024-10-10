async function fetchData() {
  const pianoContainer = document.getElementById('pianos-container');
  const htmlContent = `
  <img id="chargement" src="main_chargement.gif" alt="Chargement..." />
  `;
  pianoContainer.innerHTML = htmlContent;
  // Afficher le chargement

  try {
    // Récupérer les données JSON
    const response = await fetch("https://script.google.com/macros/s/AKfycbzQn_XxuJsw8Z8m8P2soyRT-18hPKuJ15uurpfohI-i3mtZCQZ6-YYcPJ5sKhWpb-g-4A/exec");
    
    // Vérifier si la requête a réussi (status 200-299)
    if (!response.ok) {
        const errorMessage = `Erreur HTTP ! Status: ${response.status} - ${response.statusText}`;
        console.log(`${response.status}`);
        console.log(response.statusText);
        throw new Error(errorMessage);

    }

    const json = await response.json(); // Récupérer les données JSON
    
    // Traiter les données
    console.log(json.data);
    return json.data;
} catch (error) {
    // Gérer les erreurs réseau ou HTTP
    console.error("Il y a eu un problème avec la requête fetch : ", error.message);

    // Si l'erreur provient d'un problème réseau, vous pouvez également ajouter une condition
    if (error instanceof TypeError) {
        console.error("Cela pourrait être dû à un problème de réseau ou à une URL incorrecte.");
    } else {
        console.error("Détails de l'erreur :", error);
    }
}

  }

var pianofirst = fetchData();


async function afficherPianosConditions(couleurselectionne="TOUT", marqueselectionne="TOUT") {
  let pianosData = await pianofirst;
  var container = document.getElementById("pianos-container");
  if (!container) {
    console.error("L'élément 'pianos-container' n'existe pas !");
    return; // Sortir de la fonction si le conteneur n'existe pas<
  }
  // on récupère l'élément piano-container du code html
  container.innerHTML = ``;// Vider tout le contenu HTML de la division 
  // c'est ici que le gif de chargement est supprimé
  // on créer pour chaque case ce qu'il faut 
  pianosData.forEach(function(piano) {
    // Vérifier si la ligne d'information est vide  
    if ((marqueselectionne === "TOUT" || piano.marque === marqueselectionne) && (couleurselectionne === "TOUT" || piano.couleur === couleurselectionne) && (!piano.dispo) && (piano.numero || piano.marque || piano.couleur|| piano.prix || piano.prixloc || piano.photo_site || piano.photos || piano.descriptif)) {
      // si le piano est dispo et qu'au moins une case est remplie
      var pianoElement = document.createElement("div");
      var corpscase = document.createElement("div");
      pianoElement.classList.add("piano")
      pianoElement.appendChild(corpscase);
      // peut être ne sert à rien parce que supprimé juste après
      // on créer une nouvelle division
      corpscase.classList.add("corpscasepiano");
        // on lui ajoute la classe piano
        corpscase.innerHTML = ``;
        if (piano.numero) {
        pianoElement.innerHTML += `
          <h4 id='piano_num'>${piano.numero}</h4>
                    `;
        }
        pianoElement.appendChild(corpscase);
        if (piano.marque) {
        corpscase.innerHTML += `
          <h3>Piano ${piano.marque}</h3>
                              `;
        }
        if (piano.photo_site) {
          var imageContainer = document.createElement("div"); // Créer un conteneur pour l'image
          imageContainer.classList.add("image-container");


          var imageElement = document.createElement("img");
          imageElement.src = piano.photo_site + "=w200";
          imageElement.alt = "Photo du piano à louer";
          imageElement.classList.add("lazy"); // Ajoutez une classe pour le lazy loading
          

          // Ajouter l'attribut sizes et srcset
          imageElement.sizes = "100vw"; // Définit la taille de l'image à 100% de la largeur de la fenêtre
          // imageElement.srcset = "image-small.jpg 600w, image-medium.jpg 1200w, image-large.jpg 1800w"; // Exemples de srcset

          if (piano.photos){
            var linkElement = document.createElement("a");
            linkElement.href = piano.photos; // Lien vers lequel l'image doit rediriger
            linkElement.appendChild(imageElement);
            imageContainer.appendChild(linkElement);
          } 
          else {
          imageContainer.appendChild(imageElement); // Ajouter l'image dans le conteneur
          }
          corpscase.appendChild(imageContainer); // Ajouter le conteneur dans l'élément piano
        }

        if (piano.prix) {
        corpscase.innerHTML += `
          <p>Piano à vendre: <span class='bold-text'>${piano.prix}</span></p>
          `;
        }
        if (piano.prixloc) {
                corpscase.innerHTML += `
          <p>Prix de location du piano: <span class='bold-text'> ${piano.prixloc}</span></p>
          `;
        }
        
        if (piano.couleur) {
          corpscase.innerHTML += `
          <p>Couleur: <span class='bold-text'>${piano.couleur}</span></p>
          `;
        }
        if (piano.profondeur && piano.largeur)
          {
            if (piano.hauteur) {
              corpscase.innerHTML += `          
              <p>Dimensions: <span class='bold-text'>${piano.hauteur}</span>x<span class='bold-text'>${piano.profondeur}</span>x<span class='bold-text'>${piano.largeur} cm </span></p>
            `;
            }
            else {
              corpscase.innerHTML += ` 
              <p>Dimensions: <span class='bold-text'>${piano.profondeur}</span>x<span class='bold-text'>${piano.largeur} cm </span></p>
            `;
            }
          }
        if (piano.photos) {
          var linkElement = document.createElement("a");
          linkElement.href = piano.photos;
          linkElement.textContent = "plus de photos du piano";
          linkElement.classList.add("lien_photo"); // Ajout de la classe "lien_photo"
          var paragraphElement = document.createElement("p");
          paragraphElement.appendChild(linkElement);
          corpscase.appendChild(paragraphElement);
        }
      
        if (piano.descriptif) {

          corpscase.innerHTML+= `
          <p>${piano.descriptif}</p>
          `;
        }
    container.appendChild(pianoElement);
    }
  });
  document.body.style.background = "linear-gradient(-45deg, #3E2723, #654321)"; 
}



async function creation_bouton_marque() {
  // Attendre la résolution de la promesse pianofirst (si elle n'est pas déjà résolue)
  let pianosData = await pianofirst; 
  var listing = document.getElementById("MarquePicker");
  // Créer une liste pour stocker les marques de pianos
  let marques = [];

  // Parcourir tous les pianos
  pianosData.forEach(function(piano) {
      // Vérifier si la marque du piano existe et n'est pas déjà dans la liste
      if (piano.marque && !marques.includes(piano.marque) && (!piano.dispo)) {
          // Ajouter la marque à la liste si elle n'est pas déjà présente
          marques.push(piano.marque);
          listing.innerHTML+=` <option value="${piano.marque}">${piano.marque}</option>`;
      }
  });
}
async function creation_bouton_couleur() {
  // Attendre la résolution de la promesse pianofirst (si elle n'est pas déjà résolue)
  let pianosData = await pianofirst; 
  var listing = document.getElementById("colorPicker");
  // Créer une liste pour stocker les marques de pianos
  let couleurs = [];

  // Parcourir tous les pianos
  pianosData.forEach(function(piano) {
      // Vérifier si la marque du piano existe et n'est pas déjà dans la liste
      if (piano.couleur && !couleurs.includes(piano.couleur) && !piano.dispo) {
          // Ajouter la marque à la liste si elle n'est pas déjà présente
          couleurs.push(piano.couleur);
          listing.innerHTML+=` <option value="${piano.couleur}">${piano.couleur}</option>`;
      }
  });
}
afficherPianosConditions();
creation_bouton_marque();
creation_bouton_couleur();
console.log("la fonction a fonctionné");


let couleurselectionne = "TOUT";
let marqueselectionne = "TOUT";

document.getElementById('colorPicker').addEventListener('change', function() {
  couleurselectionne = this.value;  // Obtenez la valeur sélectionnée
  afficherPianosConditions(couleurselectionne, marqueselectionne);  // Appeler la fonction avec la couleur sélectionnée
});

document.getElementById('MarquePicker').addEventListener('change', function() {
  marqueselectionne = this.value;  // Obtenez la valeur sélectionnée
  console.log(this.value);
  afficherPianosConditions(couleurselectionne, marqueselectionne);  // Appeler la fonction avec la couleur sélectionnée
});
