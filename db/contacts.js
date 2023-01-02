const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "contacts.json");

async function contactsList() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

function listContacts() {
  const contacts = contactsList();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await contactsList();
  const currentContacts = contacts.find((contact) => contact.id === contactId);
  return currentContacts;
}

async function removeContact(contactId) {
  const contacts = await contactsList();
  const deleteContacts = contacts.filter((todo) => todo.id !== contactId);
  await writeContacts(deleteContacts);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };

  const contacts = await contactsList();
  contacts.push(contact);
  await writeContacts(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
