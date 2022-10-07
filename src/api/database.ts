import { ID, Permission, Query, Role } from "appwrite";
import { databases } from ".";
import { COLLECTION, DATABASE_ID } from "../config";
import { MessageModel } from "../models";

export interface Contact {
  userId: string;
  contactId: string;
  email: string;
}

export interface Message {
  contents: string;
  user_id: string;
  group_id: string;
  email: string;
}

export async function getContacts(userId: string): Promise<Contact[]> {
  return databases
    .listDocuments(DATABASE_ID, COLLECTION.contacts, [
      Query.equal("user_id", userId),
    ])
    .then((result) => {
      return result.documents.map((doc) => {
        return {
          userId: doc.user_id,
          contactId: doc.contact_id,
          email: doc.email,
        };
      });
    });
}

export async function createMessage(message: Message) {
  return databases.createDocument(
    DATABASE_ID,
    COLLECTION.messages,
    ID.unique(),
    message,
    [
      Permission.read(Role.team(message.group_id)),
      Permission.write(Role.user(message.user_id)),
    ]
  );
}

export async function getMessages(groupId: string): Promise<MessageModel[]> {
  return databases
    .listDocuments(DATABASE_ID, COLLECTION.messages, [
      Query.equal("group_id", groupId),
    ])
    .then((result) => {
      return result.documents.map((document) => {
        return {
          id: document.$id,
          userId: document.user_id,
          groupId: document.group_id,
          contents: document.contents,
          email: document.email,
        };
      });
    });
}
