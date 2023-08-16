import { Client, Account, Databases } from "appwrite";

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64d3bbb732556214a136');

export const account = new Account(client)

// Database
export const database = new Databases(client, "64d45c73133d8e39e84d")