import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react'
import Contacts from './Contacts'
import NewContact from './NewContact'

function GetRoutes(){
    return(
        <Routes>
            <Route path="/*" element={<Contacts />}></Route>
            <Route path="/contacts" element={<Contacts />}></Route>
            <Route path='/contacts/new' element={<NewContact />}></Route>
            <Route path='/contacts/:id' element={<NewContact />}></Route>
        </Routes>
    )
}

export default GetRoutes