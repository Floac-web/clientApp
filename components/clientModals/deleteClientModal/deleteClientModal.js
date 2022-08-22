import { DATA__BASE__URL, DATA__BASE__CLIENT } from "../../../constants/firebaseConstants";
import { $modal } from "../../../plugins/modal/modal";
import { firebaseDeleteItem } from "../../../utils/firebaseUtils/firebaseUtils";
import { createClientModalFooter, createClientModalHeader, createClientModalText } from "../clientModal";

import "./deleteClientModal.css"

export function deleteClientModal(clientServeId, deleteClient){
    const deleteBtnName = "Видалити";
    const cancelBtnName = "Відміна";
    const notDeleteTxt = "Ви дійсно хочете видалити данного клієнта"
    const {actionsBtnsContainer, actionClientBtn,
         cancelModalBtn} = createClientModalFooter(deleteBtnName,cancelBtnName)
    const deleteClientModal = $modal(createClientModalHeader("Видалити клієнта", true),
    createClientModalText(notDeleteTxt),
    actionsBtnsContainer)

    actionClientBtn.disabled = false;
    const DATA__BASE__CLIENT__ITEM__URL = DATA__BASE__URL + DATA__BASE__CLIENT + `/${clientServeId}.json`
    actionClientBtn.addEventListener("click", () => {
        firebaseDeleteItem(DATA__BASE__CLIENT__ITEM__URL)
        .then(response => {
            deleteClient()
            deleteClientModal.hide()
        })
    })
    




    return deleteClientModal
}
