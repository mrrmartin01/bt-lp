import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.radev.aora",
  projectId: "6685a410002f89c6e0ab",
  databaseId: "6686bbc10028fdcb76bb",
  userCollectionId: "6686bbe3003087638f5c",
  videoCollectionId: "6686bc0e000def83e042",
  storageId: "6686bd7f0031536a1d72",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);



const account = new Account(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
const databases = new Databases(client);

// Register user
export  const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
 
    return session;
  } catch (error) {
    throw new Error(error);
  }
}
