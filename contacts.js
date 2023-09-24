import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactPath = path.resolve("db", "contacts.json");

export const getAllContacts = async () => {
    const data = await fs.readFile(contactPath);
    return JSON.parse(data);
};

export const contactGetById = async (id) => {
    const contacts = await getAllContacts();
    const result = contacts.find(contact => contact.id === id);
    return result || null;
};

export const contactAddNew = async ({ name, email, phone }) => {
    const contacts = await getAllContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return newContact;
};

export const removeContactById = async (id) => {
    const contacts = await getAllContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return result;
};

