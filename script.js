async function fetchData() {
    // Récupérer les données JSON
    console.log("v4");
    const res = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=kbYKx7JtNWNE1Z8VmgtFgIYanV4xXeeV-SlXrKeoOdPqtjl_Pvnby5K-6JGa2ekhKOJRgOFHrtyrAQPeWSJog_zZ3Ed-8Yhkm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCLmOJ7fQgJOfBHICit4qpEmRHCp4mVnFfJi0LmdnuunsMhM-h10RfQiQGq1TLOo7biArXcshSGuLcP2bvRXVA8hpIpPm45QStz9Jw9Md8uu&lib=Ml1e-lb1qAMfOSe-7BliAWq8tNrNXU7ET");
    const json = await res.json();
    return json.data; // Accéder à la propriété 'data'
  }
  
  
  async function afficherPianos() {
    const pianosData = await fetchData();
    var container = document.getElementById("pianos-container");
  
    pianosData.forEach(function(piano) {
      // Vérifier si la ligne d'information est vide  
      if (!piano.dispo) {
        var pianoElement = document.createElement("div");
        pianoElement.classList.add("piano");
    
        pianoElement.innerHTML = `
          <h4>${piano.numero}</h4>
          <h3>piano ${piano.marque}</h3>
          <p>Couleur: ${piano.couleur}</p>
          <p>Piano à vendre: ${piano.prix}</p>
          <p>Prix de location: ${piano.prixloc}</p>
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
