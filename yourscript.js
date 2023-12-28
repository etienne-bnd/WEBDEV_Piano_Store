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

// Configuration de la visibilité des boutons
document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

// Fonction appelée lorsque l'API Google est chargée
function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

// Initialisation du client API Google
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

// Fonction appelée lorsque les services d'identité Google sont chargés
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // défini plus tard
  });
  gisInited = true;
  maybeEnableButtons();
}

// Activation des boutons lorsque les bibliothèques sont chargées
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize_button').style.visibility = 'visible';
  }
}

// Fonction de gestion du clic sur le bouton d'autorisation
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    document.getElementById('signout_button').style.visibility = 'visible';
    document.getElementById('authorize_button').innerText = 'Refresh';
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
      spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      range: 'Class Data!A2:E',
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }

  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    document.getElementById('content').innerText = 'No values found.';
    return;
  }

  // Aplatir en chaîne pour l'affichage
  const output = range.values.reduce(
    (str, row) => `${str}${row[0]}, ${row[4]}\n`,
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
