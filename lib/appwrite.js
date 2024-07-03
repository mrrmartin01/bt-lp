import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aora.aora",
  projectId: "66833a64001ee8ab6f0e",
  databaseId: "66833fd90013e7c17f5a",
  userCollectionId: "6683400d0003a5447372",
  vidoeCollectionId: "66833fd90013e7c17f5a",
  storageId: "668344c8001247110d84",
};

//init of the SDK
const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

//Creating user collection
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      username,
      email,
      password
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
