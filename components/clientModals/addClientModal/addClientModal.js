import { DATA__BASE__CLIENT__URL } from "../../../constants/firebaseConstants.js"

import { $modal } from "../../../plugins/modal/modal.js"
import { firebaseSetItem } from "../../../utils/firebaseUtils/firebaseUtils.js"

import { createClientModalHeader, createClientModalForm} from "../clientModal.js"
//import "../clientModal.css"
//import "./addClientModal.css"
import { createFindItem } from "../../header/headerSearch/searchClient.js"





export function addClientModal(addClient){
    const clientModalFormItems = createClientModalForm()
    const clientModal = $modal(createClientModalHeader(),clientModalFormItems.clientModalForm)

    const saveClientBtn = clientModalFormItems.actionClientBtn

    saveClientBtn.addEventListener("click", e => {
        e.preventDefault()
        const clientObj = clientModalFormItems.clientObjData()
        clientObj.createTime = clientObj.changeTime
        clientObj.createData = clientObj.changeData

        saveClientBtn.disabled = true
        firebaseSetItem(DATA__BASE__CLIENT__URL,clientObj)
        .then(response => {
        clientModal.hide()
        clientObj.serveId = response.name;
        createFindItem(clientObj)
        addClient(clientObj)
        
        return response
        })
    })


    return clientModal
}

