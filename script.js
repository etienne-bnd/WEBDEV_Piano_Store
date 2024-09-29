async function fetchData() {
    const pianoContainer = document.getElementById('pianos-container');
    const htmlContent = `
    <img id="chargement" src="main_chargement.gif" alt="Chargement..." />
    `;
    pianoContainer.innerHTML = htmlContent;
    //on affiche le chargement


    // Récupérer les données JSON
    const res = await fetch("https://script.google.com/macros/s/AKfycbye1vWjELtjX_bSMe1gseGYPZuEzTBaymvwS26p-7D2D3p2sGiiUM9UioEBopQ6HCGXKA/exec");
    // le lien est à changer si on change le déployement de l'app script
    const json = await res.json();
    return json.data; // Accéder à la propriété 'data'
  }

var pianofirst = fetchData();
// plus forcément utile maintenant qu'il y en a une avec des conditions
async function afficherPianos() {
  const pianosData = await fetchData();
  var container = document.getElementById("pianos-container");
  // on récupère l'élément piano-container du code html
  container.innerHTML = ``;// Vider tout le contenu HTML de la division

  // on créer pour chaque case ce qu'il faut 
  pianosData.forEach(function(piano) {
    // Vérifier si la ligne d'information est vide  
    if ((!piano.dispo) && (piano.numero || piano.marque || piano.couleur|| piano.prix || piano.prixloc || piano.photo_site || piano.photos || piano.descriptif)) {
      // si le piano est dispo et qu'au moins une case est remplie
      var pianoElement = document.createElement("div");
      // on créer une nouvelle division
      pianoElement.classList.add("piano");
        // on lui ajoute la classe piano
        pianoElement.innerHTML = ``;
        if (piano.numero) {
        pianoElement.innerHTML += `
          <h4 id='piano_num'>${piano.numero}</h4>
                    `;
        }
        if (piano.marque) {
        pianoElement.innerHTML += `
          <h3>Piano ${piano.marque}</h3>
                              `;
        }
        if (piano.photo_site) {
          var imageContainer = document.createElement("div"); // Créer un conteneur pour l'image
          imageContainer.classList.add("image-container");


          var imageElement = document.createElement("img");
          imageElement.src = piano.photo_site;
          imageElement.alt = "Photo du piano à louer";
          imageContainer.appendChild(imageElement); // Ajouter l'image dans le conteneur
          pianoElement.appendChild(imageContainer); // Ajouter le conteneur dans l'élément piano
        }

        if (piano.prix) {
        pianoElement.innerHTML += `
          <p>Piano à vendre: <span class='bold-text'>${piano.prix}</span></p>
          `;
        }
        if (piano.prixloc) {
                pianoElement.innerHTML += `
          <p>Prix de location: <span class='bold-text'> ${piano.prixloc}</span></p>
          `;
        }
        
        if (piano.couleur) {
          pianoElement.innerHTML += `
          <p>Couleur: <span class='bold-text'>${piano.couleur}</span></p>
          `;
        }
        if (piano.profondeur && piano.largeur)
          {
            if (piano.hauteur) {
              pianoElement.innerHTML += `          
              <p>Dimensions: <span class='bold-text'>${piano.hauteur}</span>x<span class='bold-text'>${piano.profondeur}</span>x<span class='bold-text'>${piano.largeur} cm </span></p>
            `;
            }
            else {
              pianoElement.innerHTML += ` 
              <p>Dimensions: <span class='bold-text'>${piano.profondeur}</span>x<span class='bold-text'>${piano.largeur} cm </span></p>
            `;
            }
          }
        if (piano.photos) {
          var linkElement = document.createElement("a");
          linkElement.href = piano.photos;
          linkElement.textContent = "plus de photos du piano";
          linkElement.textContent = "plus de photos du piano";
          linkElement.classList.add("lien_photo"); // Ajout de la classe "lien_photo"
          var paragraphElement = document.createElement("p");
          paragraphElement.appendChild(linkElement);
          pianoElement.appendChild(paragraphElement);
        }
      
        if (piano.descriptif) {

          pianoElement.innerHTML+= `
          <p>${piano.descriptif}</p>
          `;
        }
    container.appendChild(pianoElement);
    }
  });
  var gifElement = document.getElementById('chargement');
  gifElement.classList.add('hidden'); 
  // Ajoute la classe .hidden pour masquer en douceur
  gifElement.style.display = 'none'; // Masque l'élément GIF après un délai de 2 secondes
}

async function afficherPianosConditions(couleurselectionne="TOUT", marqueselectionne="TOUT") {
  let pianosData = await pianofirst;
  var container = document.getElementById("pianos-container");
  // on récupère l'élément piano-container du code html
  container.innerHTML = ``;// Vider tout le contenu HTML de la division 
  // on créer pour chaque case ce qu'il faut 
  pianosData.forEach(function(piano) {
    // Vérifier si la ligne d'information est vide  
    if ((marqueselectionne === "TOUT" || piano.marque === marqueselectionne) && (couleurselectionne === "TOUT" || piano.couleur === couleurselectionne) && (!piano.dispo) && (piano.numero || piano.marque || piano.couleur|| piano.prix || piano.prixloc || piano.photo_site || piano.photos || piano.descriptif)) {
      // si le piano est dispo et qu'au moins une case est remplie
      var pianoElement = document.createElement("div");
      // on créer une nouvelle division
      pianoElement.classList.add("piano");
        // on lui ajoute la classe piano
        pianoElement.innerHTML = ``;
        if (piano.numero) {
        pianoElement.innerHTML = `
          <h4 id='piano_num'>${piano.numero}</h4>
                    `;
        }
        if (piano.marque) {
        pianoElement.innerHTML += `
          <h3>Piano ${piano.marque}</h3>
                              `;
        }
        if (piano.photo_site) {
          var imageContainer = document.createElement("div"); // Créer un conteneur pour l'image
          imageContainer.classList.add("image-container");


          var imageElement = document.createElement("img");
          imageElement.src = piano.photo_site;
          imageElement.alt = "Photo du piano à louer";
          imageContainer.appendChild(imageElement); // Ajouter l'image dans le conteneur
          pianoElement.appendChild(imageContainer); // Ajouter le conteneur dans l'élément piano
        }

        if (piano.prix) {
        pianoElement.innerHTML += `
          <p>Piano à vendre: <span class='bold-text'>${piano.prix}</span></p>
          `;
        }
        if (piano.prixloc) {
                pianoElement.innerHTML += `
          <p>Prix de location du piano: <span class='bold-text'> ${piano.prixloc}</span></p>
          `;
        }
        
        if (piano.couleur) {
          pianoElement.innerHTML += `
          <p>Couleur: <span class='bold-text'>${piano.couleur}</span></p>
          `;
        }
        if (piano.profondeur && piano.largeur)
          {
            if (piano.hauteur) {
              pianoElement.innerHTML += `          
              <p>Dimensions: <span class='bold-text'>${piano.hauteur}</span>x<span class='bold-text'>${piano.profondeur}</span>x<span class='bold-text'>${piano.largeur} cm </span></p>
            `;
            }
            else {
              pianoElement.innerHTML += ` 
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
          pianoElement.appendChild(paragraphElement);
        }
      
        if (piano.descriptif) {

          pianoElement.innerHTML+= `
          <p>${piano.descriptif}</p>
          `;
        }
    container.appendChild(pianoElement);
    }
  });
  var gifElement = document.getElementById('chargement');
  gifElement.classList.add('hidden'); 
  // Ajoute la classe .hidden pour masquer en douceur
  gifElement.style.display = 'none'; // Masque l'élément GIF après un délai de 2 secondes
}


  // Appeler la fonction pour afficher les pianos au chargement de la page
// afficherPianos();
afficherPianosConditions();





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
