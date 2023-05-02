const fs = require("fs").promises;
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  return data.find((item) => item.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();

  const ind = data.findIndex((item) => item.id === contactId);
  if (ind === -1) return null;
  const [result] = data.splice(ind, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
const data = await listContacts();
const newContact = {
    id: nanoid(),
    name,
    email, 
    phone
};
data.push(newContact);
await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
return newContact;

};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
