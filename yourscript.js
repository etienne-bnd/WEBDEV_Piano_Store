/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// Déclaration des constantes (client ID, API key, URL de découverte, scopes)
const CLIENT_ID = '483606825914-3al9kbpsttmf0ksl3h0covj8p48pd7cl.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBZnPzgKWvTq3gyRli2APuB3yGJLUAMDbc';
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

// Initialisation des variables
let tokenClient;
let gapiInited = false;
let gisInited = false;
// cela sert pour l'api google apparament ici on initie seulement les variables

// Configuration de la visibilité des boutons
document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';
// on récupère les éléments déjà créer dans le document html avec la fonction getElementById
// on les caches avec la fontion hidden en attendant que les bibliothèques soient chargées
// Fonction appelée lorsque l'API Google est chargée
function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

// Initialisation du client API Google
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC], // on regarde ici quel document regarder
  });
  gapiInited = true; // quand tout est bien initié on appelle la fonction qui initie les boutons
  maybeEnableButtons();
}

// Fonction appelée lorsque les services d'identité Google sont chargés
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID, // l'id de l'api google
    scope: SCOPES,
    callback: '', // défini plus tard
  });
  gisInited = true; // quand tout est bien initié on appelle la fonction qui initie les boutons
  maybeEnableButtons();
}

// Activation des boutons lorsque les bibliothèques sont chargées
function maybeEnableButtons() {
  if (gapiInited && gisInited) { // on vérifie qu'on a bien tout initié
    document.getElementById('authorize_button').style.visibility = 'visible';
  } // on affiche le bouton autoriser
}

// Fonction de gestion du clic sur le bouton d'autorisation
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    document.getElementById('signout_button').style.visibility = 'visible';
    document.getElementById('authorize_button').innerText = 'Rafraichir';
    await listMajors();
  };

  if (gapi.client.getToken() === null) {
    // Demander à l'utilisateur de sélectionner un compte Google et de donner son consentement
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    // Ignorer l'affichage du sélecteur de compte et de la boîte de dialogue de consentement pour une session existante
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

// Fonction de gestion du clic sur le bouton de déconnexion
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    document.getElementById('content').innerText = '';
    document.getElementById('authorize_button').innerText = 'Authorize';
    document.getElementById('signout_button').style.visibility = 'hidden';
  }
}

// Fonction pour afficher les noms et spécialités des étudiants dans une feuille de calcul
async function listMajors() {
  let response;
  try {
    // Récupérer les 10 premiers fichiers
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1eDUf9k-Z2IrGzs2zzg-Hdb3MiLdZKmp4oCAcoB7RHjA',
        // test avec un autre ID  pour sauvegarder l'ancien : 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
      range: 'Column!A1:C', // ici de base Class Data A2:E
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message; // on met dans l'élément content de l'html l'erreur s'il y en a une 
    return;
  }

  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    document.getElementById('content').innerText = 'il ny a pas de valeurs';
    return;
  }

  // Aplatir en chaîne pour l'affichage
  const output = range.values.reduce(
    (str, row) => `${str}${row[0]}, ${row[1]}\n`, // ici de base 0 et 4 
    'Name, Major:\n'
  );
  document.getElementById('content').innerText = output;
}

// Nouvelle fonction pour vérifier l'accès à une feuille de calcul
async function checkAccessToSheet() {
  try {
    const response = await gapi.client.sheets.spreadsheets.get({
      spreadsheetId: "1PMO8izJgB_U0yJXa13m7l_9yUWQtkV7LMajZdZ0tuyU",
    });

    // Mettre à jour le contenu de l'élément HTML avec le résultat
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = 'Accès réussi à la feuille de calcul: ' + JSON.stringify(response);
  } catch (error) {
    // Mettre à jour le contenu de l'élément HTML avec le message d'erreur
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = 'Erreur lors de la vérification de l\'accès à la feuille de calcul: ' + error.message;
  }
}

// Appeler la fonction checkAccessToSheet au chargement de la page
document.addEventListener('DOMContentLoaded', checkAccessToSheet);
