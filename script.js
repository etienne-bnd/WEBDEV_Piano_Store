async function fetchData() {
    // Récupérer les données JSON
    console.log("v4");
    const res = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=uS3aUWULRcdE7mWJpII_3FxDlg8fEso1xv_9XP0_EuaJZG0hyy6Fa-pCWR5LpSsfnK_Tz1S0ifyaLm86If8rlrUlm_arS_T_m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAlkVzLCpd8V8KSfuj7mmgUO19QPE5e8A05lXM5lJ3bNeWbqBWH_ufLjU5O3PvUpE-yRqKmp8CDP24fNIgUQpE4RC947kkV0xtz9Jw9Md8uu&lib=Ml1e-lb1qAMfOSe-7BliAWq8tNrNXU7ET");
    // le lien est à changer si on change le déployement de l'app script
    const json = await res.json();
    return json.data; // Accéder à la propriété 'data'
  }
  
  
  async function afficherPianos() {
    const pianosData = await fetchData();
    var container = document.getElementById("pianos-container");
    // on récupère l'élément piano-container du code html
  
    pianosData.forEach(function(piano) {
      // Vérifier si la ligne d'information est vide  
      if ((!piano.dispo) && (piano.numero || piano.marque || piano.couleur|| piano.prix || piano.prixloc || piano.photo_site || piano.photos)) {
        var pianoElement = document.createElement("div");
        // on créer une nouvelle division
        pianoElement.classList.add("piano");
        // on lui ajoute la classe piano
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
          <p>Couleur: ${piano.couleur}</p>
          `;

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
          linkElement.textContent = "voir plus de photos";
          linkElement.classList.add("lien_photo"); // Ajout de la classe "lien_photo"
          var paragraphElement = document.createElement("p");
          paragraphElement.appendChild(linkElement);
          pianoElement.appendChild(paragraphElement);
        }

        container.appendChild(pianoElement);
    }
    });
  }

  // Appeler la fonction pour afficher les pianos au chargement de la page
afficherPianos();
