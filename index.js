import * as contactService from "./db/contacts.js";
import yargs from "yargs";

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
      case 'list':
          const contactList = await contactService.getAllContacts();
          return console.log(contactList);

      case 'get':
          const contactId = await contactService.contactGetById(id);
          return console.log(contactId);

      case 'add':
          const newContact = await contactService.contactAddNew({ name, email, phone });
            return console.log(newContact);

      case 'remove':
          const removeContact = await contactService.removeContactById(id);
          return console.log(removeContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: '05olLMgyVQdWRwgKfg5J6' });
// invokeAction({ action: 'add', name: 'Mango', email: 'mango@gmail.com', phone: '322-22-22' });
// invokeAction({ action: 'remove', id: '' });

const { argv } = yargs(process.argv.slice(2));
invokeAction(argv);
