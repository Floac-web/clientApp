
import { createHeader } from "./components/header/header.js";
import { createClientsTable } from "./components/table/table.js";

import { firebaseGetItem,  } from "./utils/firebaseUtils/firebaseUtils.js";
import { DATA__BASE__CLIENT__URL } from "./constants/firebaseConstants.js";

import { sortTable } from "./components/table/sortTable.js";
import { searchClient } from "./components/header/headerSearch/searchClient.js";


const clientTable = createClientsTable()
document.body.append(createHeader() , clientTable.clientsNode)

const response = await firebaseGetItem(DATA__BASE__CLIENT__URL)
clientTable.removePreloader();

if(response){
  const clientListObj = Object.keys(response).map(key => ({
      ...response[key],
        serveId: key
}))


    searchClient(clientListObj)
    clientListObj.forEach(clientObject =>{
        clientTable.addClient(clientObject)
    })
    

    const contactLinks = document.querySelectorAll(".contact__link")

    contactLinks.forEach(contactLink =>{
        contactLink.addEventListener("click", e =>{
            e.preventDefault()
        })
    })
}




document.addEventListener("DOMContentLoaded", () => {
    sortTable()
})




