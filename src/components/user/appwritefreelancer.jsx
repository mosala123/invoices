import { Account, Client, Databases, Storage } from "appwrite";

    const clientFreelancer = new Client();

    clientFreelancer
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("6767d2ee0028c26faab3");

    const accountFreelancer = new Account(clientFreelancer);
    const databaseFreelancer = new Databases(clientFreelancer);
    const storageFreelancer = new Storage(clientFreelancer);

    export { accountFreelancer, databaseFreelancer, storageFreelancer };