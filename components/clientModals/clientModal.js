
import { closeModalSvg } from "../../img/svg.js"
import {addContactForm} from "./addContact/addContact.js"
import { isInputValid } from "../../utils/isInputValidUtil.js"





export function createClientModalHeader(headerTitle,isDeleteModal,headerTitleSpan){
    if(headerTitleSpan){
        return `<div class="clientModal__header"><h2>${headerTitle || "Новий клієнт"}<span>ID:&nbsp;&nbsp;${headerTitleSpan || ""}</span></h2><span class="clientModal__closer" data-close="true">${closeModalSvg}</span></div>`
    }
    let deleteModalClass = ``
    if(isDeleteModal){
        deleteModalClass = "deleteModal__header"
    }
    return `<div class="clientModal__header ${deleteModalClass}"><h2>${headerTitle || "Новий клієнт"}<span>${headerTitleSpan || ""}</span></h2><span class="clientModal__closer" data-close="true">${closeModalSvg}</span></div>`
}

export function createClientModalForm(SurName,Name,LastName, contacts,actionBtnName,cancelBtnName){
    const addContactItem = addContactForm("Телефон", ["Телефон","Email",'Vk', 'Facebook', "Інше"])

    if(contacts){
        contacts.forEach(contact => {
            addContactItem.addContactInput(contact.type , contact.value)
        });
    }


    const clientModalForm = document.createElement("form")
    clientModalForm.classList.add("clientModal__form", "form")

    const formInputs = document.createElement("div")
    formInputs.classList.add("form__inputs")
    formInputs.innerHTML = `
    <div class="form__floating">
        <input type="text" id="inputSurName" class="form__input" placeholder=" " value="${SurName || ''}">
        <label for="inputSurName">Прізвище<span class="form__required">*</span></label>
    </div>
    <div class="form__floating">
        <input type="text" id="inputName" class="form__input" placeholder=" " value="${Name || ''}">
        <label for="inputName">Ім'я<span class="form__required">*</span></label>  
    </div>
    <div class="form__floating">
        <input type="text" id="inputLastName" class="form__input" placeholder=" " value="${LastName || ''}">
        <label for="inputLastName">По-батькові</label>
    </div>
    `

    const addContactContainer = document.createElement("div")
    addContactContainer.classList.add("form__addContact", "addContact")
    addContactContainer.append(addContactItem.addContact)

    const {actionsBtnsContainer,
         actionClientBtn, cancelModalBtn} = createClientModalFooter(actionBtnName,cancelBtnName)

    
    
    clientModalForm.append(formInputs,addContactContainer,actionsBtnsContainer)

    const inputSurName = formInputs.querySelector('#inputSurName')
    const inputName = formInputs.querySelector('#inputName')
    const inputLastName = formInputs.querySelector('#inputLastName')

    const addContactBtn = addContactItem.addContactBtn

    const formValidBehavior = () => {
        const addContactItemList = document.querySelector(".addContact__forms")
        const addContactItemListLength = addContactItemList.childElementCount
        
        let isClientContactsValid = true;
        if(addContactItemListLength > 0){
            const contactItems = addContactItemList.querySelectorAll(".contact__input")
            contactItems.forEach(contactItem => {
                const isContactInputValid = isInputValid(contactItem.value)
                if(!isContactInputValid){
                    isClientContactsValid = false
                }
            })
        }

        const isClientSurNameValid = isInputValid(inputSurName.value)
        const isClientNameValid = isInputValid(inputName.value)

        if(isClientNameValid && isClientSurNameValid && isClientContactsValid){
            actionClientBtn.disabled = false;
        }else{
            actionClientBtn.disabled = true;
        }
    }


    clientModalForm.addEventListener("input",formValidBehavior)
    clientModalForm.addEventListener("click", formValidBehavior)




    const clientObjData = () => {
        const clientObj = {}

        const clientContactTypes = addContactItem.addContact.querySelectorAll(".contact__nameBtn")
        const clientContactValues = addContactItem.addContact.querySelectorAll(".contact__input")

        let clientContacts = []
    
        for(let i = 0; i < clientContactTypes.length; i++){
            clientContacts.push({
                type: clientContactTypes[i].innerText,
                value: clientContactValues[i].value
            })
        }

        
        clientObj.SurName = inputSurName.value;
        clientObj.Name = inputName.value;
        clientObj.LastName = inputLastName.value;
        clientObj.contacts = clientContacts
    
        const addTime = new Date()
        clientObj.changeData = addTime.toLocaleDateString()
        clientObj.changeTime = addTime.toLocaleTimeString([], {hour: "2-digit",minute: "2-digit"})

        return clientObj

    }


    return {clientModalForm, actionClientBtn, cancelModalBtn, clientObjData}

}


export function createClientModalText(txt){
    const modalTxt = document.createElement("p")
    modalTxt.classList.add("clientModal__txt")

    modalTxt.innerText = txt

    return modalTxt
}

export function createClientModalFooter(actionBtnName,cancelBtnName){
    const actionsBtnsContainer = document.createElement("div")
    actionsBtnsContainer.classList.add("form__actionsBtns")
    actionsBtnsContainer.innerHTML = `
        <button class="saveClientBtn btn" disabled="">${actionBtnName || "Зберегти"}</button>
        <button class="cancelModalBtn btn" data-close="true">${cancelBtnName || "відмінити"}</button>
    `
  
    const actionClientBtn = actionsBtnsContainer.querySelector(".saveClientBtn")
    const cancelModalBtn = actionsBtnsContainer.querySelector(".cancelModalBtn")

    return {actionsBtnsContainer, actionClientBtn, cancelModalBtn}
}