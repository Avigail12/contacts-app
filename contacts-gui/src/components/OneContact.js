import React  from "react";
import './contact.css';
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';

function OneContact(props){
    const {contact,setContacts} = props
    const navigate  = useNavigate();

    function deleteContact(){

        axios.delete(`http://localhost:8000/api/contacts/${contact.id}`).then(res => {
            setContacts(res.data)
        }).catch((error) => {
            return Promise.reject(error);
        });
    }

    function editContact(){
        navigate(`/contacts/${contact.id}`)
    }

    return(
        <div className="contacts-container">
            <div className="contact">
                <div className="contact-avatar">
                    <img src={contact.img}/>
                </div>
                <div className="contact-details">
                    <div onClick={editContact} className="contact-name">{contact.name}</div>
                    <div className="contact-phone">{contact.phone}</div>
                </div>
                <div className="contact-buttons">
                    <button><i className="fa fa-phone" aria-hidden="true"></i></button>
                </div>
                <div className="contact-button-close" onClick={deleteContact}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    )
}

export default OneContact