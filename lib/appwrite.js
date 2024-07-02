import { Account, Client } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aora.aora",
  projectId: "66833a64001ee8ab6f0e",
  databaseId: "66833fd90013e7c17f5a",
  userCollectionId: "6683400d0003a5447372",
  vidoeCollectionId: "66833fd90013e7c17f5a",
  storageId: "668344c8001247110d84",
  key: "your-api-key-here", // Replace with your actual API key
};


//init of the SDK
const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);


//Creating user collection
export const account = new Account(client);

 const createUser = () => {
    account.create(ID.unique(), "me@example.com", "password", "Jane Doe")
    .then(function (response) {
      console.log(response);
    },function (error) {
      console.log(error);
    });
};

