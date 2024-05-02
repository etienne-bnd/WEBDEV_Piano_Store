async function fetchData() {
    // Récupérer les données JSON
    console.log("v1");
    const res = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=SQa2rPdkYS217sCty3uz6eNVaZA0l295bQblnJe_8zKA-rtNdem-DE0-GDtnYIisM_cvrE6gLhAgJiVXEDJdcRcvGp4blP_mm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMj7zaZZCyyJg1PUAZFZnkYmk0dlf1ec8LoU-eNiELlVfoQMsthPU4b9rStfxXJ-An3Jiw3FCEOBl7HuJQ3hIpZLQEB_JWtpatz9Jw9Md8uu&lib=ML1OtzSUDqqBv5Rhp8Ibevq8tNrNXU7ET");
    const json = await res.json();
    return json.data; // Accéder à la propriété 'data'
  }
  
  
  async function afficherPianos() {
    const pianosData = await fetchData();
    var container = document.getElementById("pianos-container");
  
    pianosData.forEach(function(piano) {
      var pianoElement = document.createElement("div");
      pianoElement.classList.add("piano");
            
  
      pianoElement.innerHTML = `
        <h2>${piano.numero}</h2>
        <p>Couleur: ${piano.couleur}</p>
        <p>Prix: ${piano.prix}</p>
        <p>Prix de location: ${piano.prixloc}</p>
        <p>Photos: <a href="${piano.photos}">${piano.photos}</a></p>
        <img src="${piano.photo_site}" alt="Photo du piano"  style="width: 300px; height: 200px;"/>
      `;
  
      container.appendChild(pianoElement);
    });
  }
  
  // Appeler la fonction pour afficher les pianos au chargement de la page
  afficherPianos();

  // Fonction pour extraire les liens des photos à partir du DOM de l'iframe
function extractPhotoLinksFromGooglePhotos(iframeUrl) {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = iframeUrl;
    document.body.appendChild(iframe);
  
    iframe.onload = function() {
      var photos = iframe.contentWindow.document.querySelectorAll('img[jsname="HiaYvf"]');
      var photoLinks = [];
      photos.forEach(function(photo) {
        photoLinks.push(photo.src);
      });
  
      // Utilisez photoLinks comme vous le souhaitez
      console.log('Liens des photos :', photoLinks);
  
      // Une fois que vous avez récupéré les liens, vous pouvez supprimer l'iframe si nécessaire
      document.body.removeChild(iframe);
    };
  }
  
  // Utilisez la fonction avec le lien du dossier Google Photos
  extractPhotoLinksFromGooglePhotos('https://photos.google.com/share/AF1QipO_ia5fQUCVeti3fnUDVLwOgpcX5SmkZVyZdT7fdgxM3yG5pSxd4DhM_QCFAoFNww/photo/AF1QipOTeBxUfge701r_07rGVFLlNDmFZGMNYTy6Qi29?key=X2w4dFdCcTRtTDhiWi11ZTlVQ1g0YlBLZ1Q4YlJ3');
  
  