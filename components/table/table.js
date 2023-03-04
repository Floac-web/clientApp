import { addUserSvg, otherIconSvg, phoneIconSvg, mailIconSvg, vkIconSvg, fbIconSvg, changeClientDataSvg, deleteClientSvg } from "../../img/svg.js";
import { changeClientDataModal } from "../clientModals/changeClientDataModal/changeClientDataModal.js";
import { addClientModal } from "../clientModals/addClientModal/addClientModal.js";
//import "./table.css"
import { deleteClientModal } from "../clientModals/deleteClientModal/deleteClientModal.js";
import { createPreloader } from "../../utils/preloader/preloder.js";




function createClientContacts(contactsNode,contactsList){
    contactsList.forEach(contact =>{
        const contactLink = document.createElement('a')
        contactLink.classList.add("contact__link")


        let contactIconSvg = otherIconSvg;
        switch(contact.type){
            case "Телефон": 
                contactIconSvg = phoneIconSvg;
            break;
            case "Email":
                contactIconSvg = mailIconSvg;
            break;
            case 'Vk':
                contactIconSvg = vkIconSvg;
            break;
            case 'Facebook':
                contactIconSvg = fbIconSvg;
            break;
        }

        contactLink.innerHTML = `
        <span class="contact__tooltip tooltip">${contact.value}</span>
        ${contactIconSvg}
        `

        contactLink.addEventListener("click", () => {
            contactLink.classList.add("active")
            navigator.clipboard.writeText(contact.value)
            setTimeout(() => contactLink.classList.remove("active"),200)
        })

        contactsNode.append(contactLink)

        // `<a href="" class="contact__link">
        //     <span class="contact__tooltip tooltip">${contact.value}</span>
        //     ${contactIconSvg}
        // </a>`
    })
}


function createClient(client){
    const clientLine = document.createElement("tr")
    clientLine.id = client.serveId;



    clientLine.innerHTML = `
        <td>${client.serveId.slice(0,6)}</td>
        <td>
            <span class="table__SurName">${client.SurName}</span>
            <span class="table__Name">${client.Name}</span>
            <span class="table__LastName">${client.LastName || ""}</span>
        </td>
        <td><span class="table__createData">${client.createData + " "}</span><span class="table__createTime">${client.createTime}</span></td>
        <td><span class="table__changeData">${client.changeData + " "}</span><span class="table__changeTime">${client.changeTime}</span></td>
        <td class="table__contactsList"></td>
        <td><button class="table__changeBtn btn"><span class="changeBtn__svg">${changeClientDataSvg}</span><span class="changeBtn__text">змінити</span></button></td>
        <td><button class="table__deleteBtn btn"><span class="deleteBtn__svg">${deleteClientSvg}</span><span class="deleteBtn__text">видалити</span></button></td>
    `

    const tableContactsList = clientLine.querySelector(".table__contactsList")
    if(client.contacts){
        createClientContacts(tableContactsList,client.contacts)
    }

    const tableSurName = clientLine.querySelector(".table__SurName")
    const tableName = clientLine.querySelector(".table__Name")
    const tableLastName = clientLine.querySelector(".table__LastName")
    const tableChangeData = clientLine.querySelector(".table__changeData")
    const tableChangeTime = clientLine.querySelector(".table__changeTime")
    

    const findItem = document.querySelector(`.${client.serveId}`)


    const changeClientDataBtn = clientLine.querySelector(".table__changeBtn")
    const deleteClientBtn = clientLine.querySelector(".table__deleteBtn")

    

    const setNewClientData = (newClient) => {

        findItem.textContent = `${newClient.SurName} ${newClient.Name} ${newClient.LastName}`

        tableSurName.innerHTML = newClient.SurName;
        tableName.innerHTML = newClient.Name;
        tableLastName.innerHTML = newClient.LastName;
        tableChangeData.innerHTML = newClient.changeData + " ";
        tableChangeTime.innerHTML = newClient.changeTime;

        tableContactsList.innerHTML = ``;
        if(newClient.contacts){
            createClientContacts(tableContactsList,newClient.contacts)
        }

    }

    const deleteClientNode = () => {
        findItem.parentNode.removeChild(findItem)
        clientLine.parentNode.removeChild(clientLine)
    }

    return {clientLine,changeClientDataBtn,deleteClientBtn, setNewClientData, deleteClientNode}
}


export function createClientsTable(clients){
    const clientsNode = document.createElement("section");
    clientsNode.classList.add("clients")

    const clientsContainer = document.createElement("div")
    clientsContainer.classList.add("clients__container", "container")
    
    const clientsTableContainer = document.createElement("div")
    clientsTableContainer.classList.add("clients__table-container")

    const clientsTable = document.createElement("table")
    clientsTable.classList.add("clients__table")
    const tableBody = document.createElement("tbody")

    const preloader = createPreloader()
    tableBody.appendChild(preloader)

    const removePreloader = () => {
        tableBody.removeChild(preloader)
    }

    const addClient = client => {
        const clientLineItems = createClient(client)
        let curentClientData = client

        const setCutentClientData = newClient => {
            curentClientData = newClient
        }
        
        clientLineItems.changeClientDataBtn.addEventListener("click", (e) =>{
            e.preventDefault()
            
            const _changeClientDataModal = changeClientDataModal(curentClientData, clientLineItems.setNewClientData,
                 setCutentClientData, clientLineItems.deleteClientNode)
            _changeClientDataModal.open()
        })


        clientLineItems.deleteClientBtn.addEventListener('click', (e) => {
            e.preventDefault()
            const _deleteClientModal = deleteClientModal(client.serveId, clientLineItems.deleteClientNode)
            _deleteClientModal.open()
        })

        tableBody.append(clientLineItems.clientLine)
    }

    if(clients){
        clients.forEach(client => {
            addClient(client)
        });
    }


    clientsTable.insertAdjacentHTML("afterbegin", `
        <caption>Клиенты</caption>
        <thead>
        <tr>
            <th data-type="id"><span class="table__sorting">id</span></th>
            <th data-type="txt">Фамілія Ім'я по Батькові<span class="table__sorting">а-я</span></th>
            <th data-type="create" class="sorting-down">Дата і час створення <span class="table__sorting"></span></th>
            <th data-type="change">Останні зміни <span class="table__sorting"></span></th>
            <th>Контакти</th>
            <th>Дії</th>
            <th></th>
        </tr>
        </thead>
    `)

    // const thId = clientsTable.querySelector(".table__id")
    // const thTxt = clientsTable.querySelector(".table__txt")
    // const thCreate = clientsTable.querySelector(".table__create")
    // const thChange = clientsTable.querySelector(".table__change")

    // thId.setAttribute()

    clientsTable.append(tableBody)

    clientsContainer.insertAdjacentHTML("beforeend", `
        <form action="" class="clients__form form">
        <button class="clients__btn btn"><span class="clients__btn-svg">${addUserSvg}</span><span class="clients__btn-title">Додати клієнта</span></button>
        </form>
    `)

    const ADD__CLIENT__BTN = clientsContainer.querySelector(".clients__btn")

    ADD__CLIENT__BTN.addEventListener('click', e => {
        e.preventDefault()
        const _addClientModal = addClientModal(addClient)
        _addClientModal.open()
    })
    
    clientsTableContainer.append(clientsTable)
    clientsContainer.prepend(clientsTableContainer)

    clientsNode.append(clientsContainer)

    return {clientsNode,
        addClient,removePreloader
    }

}