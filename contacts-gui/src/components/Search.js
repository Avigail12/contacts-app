import React  from "react";
import './contact.css';
import axios from 'axios'

function Search(props){
    const {setSerchValue} = props

    function contactsFilter(name){
        setSerchValue(name)
    }

    return(
        <div className="search-input">
            <input type="text" onChange={e => contactsFilter(e.target.value)} placeholder="search in contacts..."/>
            <div className="search-icon">
                <i className="fa fa-search" aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default Search
