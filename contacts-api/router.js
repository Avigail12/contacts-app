import { Router as expressRouter } from 'express';
export const router = expressRouter();
import contactsControllers from "./controllers/contacts.js";

var contats = [];

//Get
router.get('/contacts', async (req, res) => {

    let contacts = await contactsControllers.getAllcontacts();
    res.send(contacts);
});

//Get/:id
router.get('/contacts/:id', async (req, res) => {
    const {id} = req.params;
    let contact = await contactsControllers.getContact(id);
    res.send(contact);
});


//Post
router.post('/contacts', async (req, res) => {
    try {
        const {newContact} = req.body;
        contats = await contactsControllers.addcontact(newContact);
        res.status(200).send(contats);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
//Delet  
router.delete('/contacts/:id', async (req, res) => {

    try {
        const {id} = req.params;
        contats = await contactsControllers.deleteContacts(id);
        res.status(200).send(contats);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
//Put  Message
router.put('/contacts/:id', async (req, res) => {

    const {newContact} = req.body;
    const {id} = req.params;
    var contats = await contactsControllers.putContacts(id,newContact);
    res.status(200).send(contats);
});


