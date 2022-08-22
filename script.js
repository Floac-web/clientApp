
import { createHeader } from "./components/header/header";
import { createClientsTable } from "./components/table/table";

import { firebaseGetItem,  } from "./utils/firebaseUtils/firebaseUtils";
import { DATA__BASE__CLIENT__URL } from "./constants/firebaseConstants";

import { sortTable } from "./components/table/sortTable";
import { searchClient } from "./components/header/headerSearch/searchClient";


const clientTable = createClientsTable()
document.body.append(createHeader() , clientTable.clientsNode)

firebaseGetItem(DATA__BASE__CLIENT__URL)
.then(response => {

    return Object.keys(response).map(key => ({
        ...response[key],
        serveId: key
    }))
}).then(clienttListObj => {
    clientTable.removePreloader();
    searchClient(clienttListObj)
    clienttListObj.forEach(clientObject =>{
        clientTable.addClient(clientObject)
    })
    
}).then(() =>{
    const contactLinks = document.querySelectorAll(".contact__link")

    contactLinks.forEach(contactLink =>{
        contactLink.addEventListener("click", e =>{
            e.preventDefault()
        })
    })
})

document.addEventListener("DOMContentLoaded", () => {
    sortTable()
})




