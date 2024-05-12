function write_header() {
     // Sélectionner l'élément <header> avec la classe "clavier-piano"
    const headerElement = document.querySelector('header.clavier-piano');

    // Définir le code HTML à insérer
    const htmlContent = `
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <a href="index.html">
        CATALOGUE<br>
        DES PIANOS</a>
        <div class="touchen milieu"></div>
        <a href="a_propos.html">
        LOCATION
        VENTE
        ACCORD
        DEBARRAS
        </a>
        <div class="touchen milieu"></div>
        <a href="contact.html">CONTACT</a>
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
    `;

    // Insérer le code HTML dans l'élément <header>
    headerElement.innerHTML = htmlContent;

    }


function write_header_tel() {
    // Sélectionner l'élément <header> avec la classe "clavier-piano"
    const headerElement = document.querySelector('header.clavier-piano');

    // Définir le code HTML à insérer
    const htmlContent = `
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <a href="index.html">
        CATALOGUE<br>
        DES PIANOS</a>
        <div class="touchen milieu"></div>
        <a href="a_propos.html">
        LOCATION
        VENTE
        ACCORD
        DEBARRAS
        </a>
        <div class="touchen milieu"></div>
        <a href="contact.html">CONTACT</a>
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
    `;

    // Insérer le code HTML dans l'élément <header>
    headerElement.innerHTML = htmlContent;

    }

function write_chargement() {
    const pianoContainer = document.getElementById('pianos-container');
    const htmlContent = `
    <img id="chargement" src="main_chargement.gif" alt="Chargement..." />
    `;
    pianoContainer.innerHTML += htmlContent;
}

// Fonction pour masquer le GIF une fois que la fonction est terminée
function masquerGIF() {
    var gifElement = document.getElementById('chargement');
    gifElement.classList.add('hidden'); 
    // Ajoute la classe .hidden pour masquer en douceur
    setTimeout(function() {
      gifElement.style.display = 'none'; // Masque l'élément GIF après un délai de 2 secondes
    }, 1000); // 2000 millisecondes = 2 secondes
  }
  
// Vérifier si l'appareil est un téléphone
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    write_header_tel();
    console.log("C'est un téléphone !");
    // Exécuter le script spécifique aux téléphones ici
} else {
    write_header();
    console.log("Ce n'est pas un téléphone !");
    // Exécuter le script pour les autres appareils ici
}


write_chargement();

  // Lorsque la fonction afficherPianos est terminée, masquer le GIF
window.addEventListener('load', function() {
    masquerGIF();
    // setTimeout(masquerGIF, 2000);
});