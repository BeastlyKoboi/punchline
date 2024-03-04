require('dotenv').config();
const {
  uniqueNamesGenerator, adjectives, colors, animals,
} = require('unique-names-generator');

const admin = require('firebase-admin');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FB_TYPE,
    project_id: process.env.FB_PROJECT_ID,
    private_key_id: process.env.FB_PRIVATE_KEY_ID,
    private_key: process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FB_CLIENT_EMAIL,
    client_id: process.env.FB_CLIENT_ID,
    auth_uri: process.env.FB_AUTH_URI,
    token_uri: process.env.FB_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FB_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FB_UNIVERSE_DOMAIN,
  }),
  // The database URL depends on the location of the database
  databaseURL: 'https://storage-test-90b58-default-rtdb.firebaseio.com/',
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.database();
const ref = db.ref('data');
const usersRef = db.ref('data/users');
const promptRef = db.ref('data/prompts');

const getAll = async () => {
  const allData = (await ref.once('value')).val();

  return allData;
};

const getUsername = async (username) => {
  const snapshot = (await usersRef.once('value'));

  if (snapshot.child(`${username}`).exists()) return snapshot.child(`${username}`).val();

  return null;
};

/**
 * Returns a randomly generated username from the unique-names-generator package
 * Assumes that firebase does not have it, since I encountered issues with linting.
 * Commented out portion gets error 'Unexpected `await` inside a loop'
 * @returns an object containing the random name
 */
const getUnusedUsername = async () => {
  const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
  // do {
  //   randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
  //   console.log('In firebase unused username loop');
  // } while (await getUsername(randomName));

  return { username: randomName };
};

// unimplemented
//
const getPrompts = async () => {
  const snapshot = (await promptRef.orderByChild('timestamp').once('value'));

  return snapshot.val();
};

const getPrompt = async (promptKey) => {
  const snapshot = (await promptRef.once('value'));

  if (snapshot.child(`${promptKey}`).exists()) return snapshot.child(`${promptKey}`).val();

  return null;
};

const addUsername = async (username) => {
  usersRef.child(`${username}`).set({
    liked: '',
    promptsCreated: '',
    promptsAnswered: '',
  });

  return JSON.stringify((await usersRef.once('value')).child(`${username}`).val());
};

const addPrompt = async (text, tags, username) => {
  const newPromptRef = promptRef.push();

  newPromptRef.set({
    text,
    tags: '',
    answers: '',
    createdBy: username,
    likes: 0,
    timestamp: admin.database.ServerValue.TIMESTAMP,
  });
  // needs text, tags, and username

  tags.forEach((tag) => {
    newPromptRef.child('tags').push(tag);
  });

  usersRef.child(`${username}`).child('promptsCreated').push(newPromptRef.key);

  // should return the key for the new prompt
  return newPromptRef.key;
};

const addAnswer = async (promptKey, text, username) => {
  const newAnswerRef = promptRef.child(`${promptKey}`).child('answers').push();

  newAnswerRef.set({
    text,
    likes: 0,
    createdBy: username,
    timestamp: admin.database.ServerValue.TIMESTAMP,
  });

  usersRef.child(`${username}`).child('promptsAnswered').push(newAnswerRef.key);

  return newAnswerRef.key;
};

module.exports = {
  // saveData,
  getAll,
  getUsername,
  getUnusedUsername,
  getPrompts,
  getPrompt,
  addUsername,
  addPrompt,
  addAnswer,
};
