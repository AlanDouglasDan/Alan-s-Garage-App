import * as Keychain from 'react-native-keychain';

// const ACCESS_TOKEN_KEY = 'YOUR_ACCESS_TOKEN_KEY'; // Replace with a secure key

const encrypt = data => {
  // Implement encryption logic using a strong encryption library
  return Promise.resolve(data); // Replace with actual encrypted data
};

const decrypt = data => {
  // Implement decryption logic using the same library as encryption
  return Promise.resolve(data); // Replace with actual decrypted data
};

// Store access token
const storeAccessToken = async accessToken => {
  try {
    const encryptedToken = await encrypt(accessToken);

    await Keychain.setGenericPassword('accessToken', encryptedToken);

    console.log('store done');
  } catch (error) {
    console.error('Error storing access token:', error);
  }
};

// Retrieve access token
const getAccessToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      return await decrypt(credentials);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

// Delete access token
const deleteAccessToken = async () => {
  try {
    await Keychain.resetGenericPassword();

    console.log('delete done');
  } catch (error) {
    console.error('Error deleting access token:', error);
  }
};

export {storeAccessToken, getAccessToken, deleteAccessToken};
