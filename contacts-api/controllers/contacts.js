
let img1 = 'https://randomuser.me/api/portraits/men/1.jpg';
let img2 = 'https://randomuser.me/api/portraits/men/2.jpg';
let img3 = 'https://randomuser.me/api/portraits/men/3.jpg';

let contactsList = [
    { id: 1, "img": img1, "name": "Dan Smith", "phone": "745-526657", "title":"11111111111"},
    { id: 2, "img": img2, "name": "Alex Alvarez", "phone": "542-5634271", "title":"22222222222"},
    { id: 3, "img": img3, "name": "Norman Dirtic", "phone": "124-88573", "title":"3333333333"},
];

const addcontact = async(object) => {

    var id = Math.max.apply(Math, contactsList.map(function(contact) { return contact.id; }))
    contactsList.push({ "id": id + 1, "img": object.img, "name": object.name, "phone": object.phone, "title": object.title });
    return contactsList;
}
const getAllcontacts = async () => {

    return contactsList;
}

const getContact = async (id) => {

    var contact = contactsList.find(x => x.id === Number(id));
    return contact
}

const deleteContacts = async (id) => {

    var index = contactsList.findIndex(x => x.id === Number(id))
    contactsList.splice(index, 1);
    return contactsList;
}
const putContacts = async (id,object) => {

    var index = contactsList.findIndex(x => x.id === Number(id));

    contactsList[index].img = object.img;
    contactsList[index].name = object.name
    contactsList[index].phone = object.phone;
    if (object.title)contactsList[index].title = object.title;

    return contactsList;
}

export default {addcontact, getAllcontacts, getContact, deleteContacts, putContacts}

