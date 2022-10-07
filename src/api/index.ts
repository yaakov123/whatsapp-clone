import { Client, Account, Teams, Functions, Databases } from "appwrite";
import { DATABASE_ID, ENDPOINT, PROJECT_ID } from "../config";

const client = new Client();
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const team = new Teams(client);
const account = new Account(client);
const functions = new Functions(client);
const databases = new Databases(client);

export { client, account, team, functions, databases };
