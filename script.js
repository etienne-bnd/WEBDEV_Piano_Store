async function fetchData() {
    // Récupérer les données JSON
    console.log("v4");
    const res = await fetch("https://script.google.com/macros/s/AKfycbye1vWjELtjX_bSMe1gseGYPZuEzTBaymvwS26p-7D2D3p2sGiiUM9UioEBopQ6HCGXKA/exec");
    // le lien est à changer si on change le déployement de l'app script
    const json = await res.json();
    return json.data; // Accéder à la propriété 'data'
  }
  
  
async function afficherPianos() {
  const pianosData = await fetchData();
  var container = document.getElementById("pianos-container");
  // on récupère l'élément piano-container du code html

  // on créer pour chaque case ce qu'il faut 
  pianosData.forEach(function(piano) {
    // Vérifier si la ligne d'information est vide  
    if ((!piano.dispo) && (piano.numero || piano.marque || piano.couleur|| piano.prix || piano.prixloc || piano.photo_site || piano.photos)) {
      var pianoElement = document.createElement("div");
      // on créer une nouvelle division
      pianoElement.classList.add("piano");
        // on lui ajoute la classe piano
      if (!piano.descriptif) {
        pianoElement.innerHTML = `
          <h4 id='piano_num'>${piano.numero}</h4>
          <h3>Piano ${piano.marque}</h3>
          `;
        if (piano.photo_site) {
          var imageContainer = document.createElement("div"); // Créer un conteneur pour l'image
          imageContainer.classList.add("image-container");


          var imageElement = document.createElement("img");
          imageElement.src = piano.photo_site;
          imageElement.alt = "Photo du piano à louer";
          imageContainer.appendChild(imageElement); // Ajouter l'image dans le conteneur
          pianoElement.appendChild(imageContainer); // Ajouter le conteneur dans l'élément piano
        }
        pianoElement.innerHTML += `
          <p>Piano à vendre: <span class='bold-text'>${piano.prix}</span></p>
          <p>Prix de location: <span class='bold-text'> ${piano.prixloc}</span></p>
          `;
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
      } 
      else {
        pianoElement.innerHTML = `
        <p>${piano.descriptif}</p>
        `;
      }
    container.appendChild(pianoElement);
    }
  });
}

  // Appeler la fonction pour afficher les pianos au chargement de la page
afficherPianos();
