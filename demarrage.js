function write_header() {
     // Sélectionner l'élément <header> avec la classe "clavier-piano"
    const headerElement = document.querySelector('header.clavier-piano');

    // Définir le code HTML à insérer
    const htmlContent = `
        <div class="touchen"></div>
        <div class="toucheb"></div>
        <div class="touchen"></div>
        <a href="accord.html" data-note="261.63">
        ACCORD DE PIANO
        </a>
        <div class="touchen"></div>
        <a href="debarras.html" data-note="293.66">
        DEBARRAS DE PIANO
        </a>
        <div class="touchen"></div>
        <a href="index.html" data-note="329.63">
        CATALOGUE<br>
        DES PIANOS</a>
        <div class="touchen milieu"></div>
        <a href="achatlocation.html" data-note="349.23">
        ACHAT
        VENTE
        LOCATION
        DE PIANO
        </a>
        <div class="touchen milieu"></div>
        <a href="contact.html" data-note="392.00">CONTACT</a>
        <div class="touchen"></div>
        <a href="a_propos.html" data-note="440.00">
        A PROPOS
        </a>
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
function playPianoNote(frequency) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine'; // Type d'onde sinusoïdale
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // Définir la fréquence
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(0.015, audioContext.currentTime); // Volume initial
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5); // Réduction progressive

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1.5); // Arrêter après 1.5 secondes
}

// Sélectionner tous les liens ou titres dans le header
const headerLinks = document.querySelectorAll('header a');

// Ajouter un événement mouseover pour jouer la note lorsque la souris passe au-dessus de chaque lien
headerLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        // Récupérer la fréquence de la note à partir de l'attribut data-note
        // Jouer la note correspondante
        const frequency = parseFloat(link.getAttribute('data-note'));

        noteTimeout = setTimeout(() => {
            playPianoNote(frequency);
        }, 300); // 1000 ms = 1 seconde
    });
        link.addEventListener('mouseout', () => {
        // Annuler le timeout si la souris sort du lien
        clearTimeout(noteTimeout);
    });
});
