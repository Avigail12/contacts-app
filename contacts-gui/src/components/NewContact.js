import React ,{useState, useEffect} from "react";
import { Link,useNavigate, useParams, useLocation  } from 'react-router-dom';
import './contact.css';
import axios from 'axios'


function NewContact(){
    const navigate  = useNavigate();
    const [contact, setContact]= useState({})
    const [newContact, setNewContact]= useState({name:"", phone:"", title:"", img:""})
    let { id } = useParams();
    const location = useLocation();
    
    useEffect(()=>{
        if(location.pathname.slice(location.pathname.lastIndexOf('/') + 1) !== 'new'){
            getContact()
        }
        else{
            randomContactImage()
        }
    },[])

    function getContact(){

        axios.get('http://localhost:8000/api/contacts/' + id).then(res => {
            setNewContact(res.data)
        }).catch((error) => {
            return Promise.reject(error);
        });
    }

    function randomContactImage(){
        var gender = Math.floor(Math.random() * 2) === 0?'men':'women'
        var randomImg = `https://randomuser.me/api/portraits/${gender}/${Math.floor(Math.random() * 100) + 1}.jpg`
        setNewContact(contact => ({
            ...contact,img: randomImg
        }))
    }

    function addContact(){
        if(newContact.name.length < 1){
            document.getElementById('lbltipAddedComment').innerHTML = "NAME is a required field"
            document.getElementById('lbltipAddedComment').style.color = "red";
            return
        }
        if(newContact.phone.length < 1){
            document.getElementById('lbltipAddedComment').innerHTML = "PHONE is a required field"
            document.getElementById('lbltipAddedComment').style.color = "red";
            return
        }
        if(newContact.title.length < 1){
            document.getElementById('lbltipAddedComment').innerHTML = "TITLE is a required field"
            document.getElementById('lbltipAddedComment').style.color = "red";
            return
        }
        if(newContact.name.length > 30){
            document.getElementById('lbltipAddedComment').innerHTML = "NAME cannot be longer than 30 characters"
            document.getElementById('lbltipAddedComment').style.color = "red";
            return
        }

        if(location.pathname.slice(location.pathname.lastIndexOf('/') + 1) !== 'new'){
            axios.put('http://localhost:8000/api/contacts/'+ id,{newContact}).then(res => {
                navigate('/')
            }).catch((error) => {
                return Promise.reject(error);
            });
        }
        else{
            axios.post('http://localhost:8000/api/contacts',{newContact}).then(res => {
                navigate('/')
            }).catch((error) => {
                return Promise.reject(error);
            });
        }
    }

    function setName(contactName){
        if(contactName.length > 30){
            document.getElementById('lbltipAddedComment').innerHTML = "NAME cannot be longer than 30 characters"
            document.getElementById('lbltipAddedComment').style.color = "red";
            setNewContact({...newContact,name:""})
        }
        else{
            setNewContact({...newContact,name:contactName})
        }
    }

    function cancel(){
        navigate('/')
    }

    return(
        <div className="contact-container">
            <div className="new-contact-container">
                <div className="new-contact-avatar">
                        <img src={newContact.img}/>
                        <button onClick={randomContactImage}><i className="fa fa-refresh" aria-hidden="true"></i></button>
                </div>
                <div className="new-contact-inputs">
                    <div className="new-contact-input">
                        <label>Name</label>
                        <input  value={newContact.name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="new-contact-input">
                        <label>Phone</label>
                        <input value={newContact.phone} onChange={e => setNewContact({...newContact,phone:e.target.value})}/>
                    </div>
                    <div className="new-contact-input">
                        <label>Title</label>
                        <input value={newContact.title} onChange={e => setNewContact({...newContact,title:e.target.value})}/>
                    </div>
                </div>
                <div>
                    <label id="lbltipAddedComment"></label>
                </div>
                <div className="new-contact-buttons">
                    <button className="button-ok" onClick={addContact}>Save</button>
                    <button className="button-cancel" onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default NewContact