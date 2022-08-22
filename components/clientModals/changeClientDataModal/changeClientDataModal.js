import { $modal } from "../../../plugins/modal/modal.js";
import { firebasePathItem, firebaseDeleteItem } from "../../../utils/firebaseUtils/firebaseUtils.js";
import { createClientModalHeader, createClientModalForm } from "../clientModal.js";
import { DATA__BASE__URL, DATA__BASE__CLIENT } from "../../../constants/firebaseConstants.js";


export function changeClientDataModal(client, clientChangedLine, setCutentClientData, deleteClient){
    const actionBtnName = "Зберегти";
    const cancelBtnName = "видалити клієнта";
    const changeDataModalFormItems = createClientModalForm(client.SurName, client.Name, client.LastName, client.contacts, actionBtnName, cancelBtnName)
    const changeDataModalForm = changeDataModalFormItems.clientModalForm
    const changeDataModal = $modal(createClientModalHeader("Змінити дані",false, client.serveId), changeDataModalForm)

    const changeClientDataBtn = changeDataModalFormItems.actionClientBtn
    const deleteClientBtn = changeDataModalFormItems.cancelModalBtn

    const DATA__BASE__CLIENT__ITEM__URL = DATA__BASE__URL + DATA__BASE__CLIENT + `/${client.serveId}.json`

    changeClientDataBtn.addEventListener("click", e => {
        e.preventDefault()
        changeClientDataBtn.disabled = true;
        const clientChangedObj = changeDataModalFormItems.clientObjData()
        clientChangedObj.id = client.serveId
        clientChangedObj.createData = client.createData
        clientChangedObj.createTime = client.createTime

    
        
        firebasePathItem(DATA__BASE__CLIENT__ITEM__URL,clientChangedObj)
        .then(() => {
            clientChangedLine(clientChangedObj)
            setCutentClientData(clientChangedObj)
            changeDataModal.hide()
        })
    })

    deleteClientBtn.addEventListener("click", (e) => {
        e.preventDefault()
        deleteClient()
        firebaseDeleteItem(DATA__BASE__CLIENT__ITEM__URL)
    })

    
    
    return changeDataModal
}