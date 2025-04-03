import { Account, Client, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("675e8d5d002ebff73bb4");

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { account, database, storage };
