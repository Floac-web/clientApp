import { deleteContactSvg, addContactSvg } from "../../../img/svg.js";
//import "./addContact.css"


function renderContactTypes(TypeList){
    let contactTypesHtml = ``
    TypeList.forEach(element => {
        contactTypesHtml += `<li class="contact__el">${element}</li>`
    })
    return contactTypesHtml;
}


function renderContactInput(baseType,contactTypesHtml, contactValue){
    const contactInput = document.createElement("div")
    contactInput.classList.add("addContact__item")

    contactInput.innerHTML = 
    `
    <div class="contact__type">
    <button class="contact__nameBtn btn">${baseType}</button>
    <ul class="contact__list list">
        ${contactTypesHtml}
    </ul>
    </div>
    <input type="text" class="contact__input" placeholder="Введіть дані контакту" maxlength="12"
    value="${contactValue || ""}">
    <button class="contact__cancelBtn btn"><span class="cancelBtn__tooltip tooltip">Видалити контакт</span><span>${deleteContactSvg}
    </span></button>    
    `

    const contactInputType = contactInput.querySelector(".contact__type");
    const contactInputTypeName = contactInputType.querySelector('.contact__nameBtn')
    const contactInputTypeList = contactInputType.querySelector(".contact__list")
    contactInputTypeName.addEventListener("click", (e)=>{
        e.preventDefault()
        contactInputTypeName.classList.toggle("contact__type-active")
        contactInputTypeList.classList.toggle("contact__list-active")
    })
    const contactInputTypeElement = contactInput.querySelectorAll(".contact__el");
    contactInputTypeElement.forEach(inputElement =>{
        inputElement.addEventListener("click", e=>{
            contactInputTypeName.innerText = e.target.innerText
            contactInputTypeName.classList.remove("contact__type-active")
            contactInputTypeList.classList.remove("contact__list-active")
        })
    })
    contactInputType.addEventListener("mouseleave", () =>{
        contactInputTypeName.classList.remove("contact__type-active")
        contactInputTypeList.classList.remove("contact__list-active")
    })

    const contactDeleteBtn = contactInput.querySelector('.contact__cancelBtn')
   

    return {contactInput, contactDeleteBtn}
}


export function addContactForm(baseType,TypeList){
    const contactTypesHtml = renderContactTypes(TypeList)

    const addContact = document.createElement("div")
    addContact.classList.add("addContact__block")

    const contactInputList = document.createElement('div')
    contactInputList.classList.add("addContact__forms")
    
    

    const addContactBtn = document.createElement("button")
    addContactBtn.classList.add("addContact__btn", "btn")
    addContactBtn.innerHTML = `<span class="addContact__btn-svg">${addContactSvg}</span><span class="addContact__btn-title">Додати контакт</span>`

    addContact.append(addContactBtn)
    addContact.prepend(contactInputList)

    const checkContactInputList = () => {
        const listLength = contactInputList.childElementCount
        if(listLength == 0){
            contactInputList.classList.remove("addContact__forms--contact")
        }
        else if(listLength > 3){
            addContactBtn.style.display = "none"
        }
        else if(listLength > 0){
            contactInputList.classList.add("addContact__forms--contact")
            addContactBtn.style.display = "flex"
        }
    }

    const addContactInput = (baseType, contactValue) => {
        const contactItem = renderContactInput(baseType,contactTypesHtml, contactValue)

        contactItem.contactDeleteBtn.addEventListener("click", e => {
            e.preventDefault()
            contactItem.contactInput.remove()
            checkContactInputList()
        })

        contactInputList.append(contactItem.contactInput)
        checkContactInputList()
    }



    addContactBtn.addEventListener('click', e => {
        e.preventDefault()
        addContactInput(baseType)
    })

    return {addContact,addContactBtn, addContactInput}

}