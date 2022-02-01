import React ,{useState, useEffect} from "react";
import { Link,useNavigate } from 'react-router-dom';
import './contact.css';
import axios from 'axios'

function Footer(props){
    const navigate  = useNavigate();

    const {setContacts} = props

    function newContact(){
        navigate('/contacts/new')
    }
    function newRandomContact(){
        axios.get('https://randomuser.me/api/').then(res => {
            var data = res.data.results[0]
            var newContact = {
                "img": data.picture.large,
                "name": data.name.first + " " + data.name.last,
                "phone": data.cell,
                "title": data.name.title,
            }
            addRandomContact(newContact)
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
    function addRandomContact(newContact){
        axios.post('http://localhost:8000/api/contacts',{newContact}).then(res => {
            setContacts(res.data)
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
    return(
        <div className="contact-new">
            <button onClick={newContact}>
                <i className="fa fa-user-plus" aria-hidden="true"></i>
            </button>
            <button onClick={newRandomContact}>
                <i className="fa fa-random" aria-hidden="true" style={{ marginLeft: "15px" }}></i>
            </button>
        </div>
    )
}

export default Footer
