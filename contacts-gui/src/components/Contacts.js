import React ,{useState, useEffect} from "react";
import { useNavigate, useLocation  } from 'react-router-dom';
import './contact.css';
import Search from './Search'
import OneContact from './OneContact'
import Footer from './Footer'
import axios from 'axios'


function Contacts(){

    const [contacts, setContacts]= useState([])
    const [serchValue, setSerchValue]= useState()
    const navigate  = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        // if(location.pathname === '/'){
            navigate('/contacts')
        // }
        getContacts()
    },[])

    function getContacts(){
        axios.get('http://localhost:8000/api/contacts').then(res => {
            setContacts(res.data)
        }).catch((error) => {
            return Promise.reject(error);
        });
    }

    return(
        <html>
            <body>
                <div className="contact-container">
                    <Search setSerchValue={setSerchValue}/>
                    <div className="contacts-container">
                        {contacts.map((contact)=>
                                serchValue?
                                !isNaN(serchValue)?
                                contact.phone.replaceAll(" ", "").toLowerCase().includes(serchValue.replaceAll(" ", "").toLowerCase())?
                                <OneContact contact={contact} setContacts={setContacts}/>:""
                                :
                                contact.name.replaceAll(" ", "").toLowerCase().includes(serchValue.replaceAll(" ", "").toLowerCase())?
                                <OneContact contact={contact} setContacts={setContacts}/>:""
                                :
                                <OneContact contact={contact} setContacts={setContacts}/>
                        )}
                    </div>
                    <Footer setContacts={setContacts}/>
                </div>
            </body>
        </html>
    )
}

export default Contacts