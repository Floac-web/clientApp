

//import "./modal.css"



// Element.prototype.appendAfter = function(element)  {
//     element.parentNode.insertBefore(this, element.nextSibling)
// }

// function noop(){}


// function createModalFooter(buttons = []){
//     if(buttons.length === 0){
//         return document.createElement("div")
//     }

//     const footer = document.createElement("div");
//     footer.classList.add("modal__footer");

//     const buttonsContainer = document.createElement("div")
//     buttonsContainer.classList.add("footer__btns");
    
//     footer.appendChild(buttonsContainer)

//     buttons.forEach(btn => {
//         const _btn = document.createElement("button");
//         _btn.textContent = btn.text;
//         _btn.classList.add("btn");
//         _btn.classList.add(`btn-${btn.class || "base"}`);
//         _btn.onclick = btn.handler || noop;

//         buttonsContainer.appendChild(_btn);
//     })

//     return footer
// }




function createModal(modalHeader,modalBody,modalFooter){
    const modal = document.createElement("div")
    modal.classList.add("modal")
    modal.classList.add("hide")

    const modalOverfly = document.createElement("div");
    modalOverfly.classList.add("modal__overfly")
    modalOverfly.dataset.close = 'true'

    const modalWindow = document.createElement("div")
    modalWindow.classList.add("modal__window")


    modalWindow.insertAdjacentHTML("afterbegin", modalHeader)
    modalWindow.append(modalBody)
    if(modalFooter){
        modalWindow.append(modalFooter)
    }
    modalOverfly.append(modalWindow)
    modal.append(modalOverfly)
    document.body.appendChild(modal)
    return modal
}


export function $modal(modalHeader,modalBody,modalFooter){

    const _modal = createModal(modalHeader,modalBody,modalFooter)
    let isDestroyed = false;

    const modal = {
        open(){
            if(isDestroyed){return}
            
            _modal.classList.remove("hide")
            setTimeout(()=>{_modal.classList.add("active")},100)

        },
        hide(){
            _modal.classList.remove("active")
            setTimeout(()=>{_modal.classList.add("hide")}, 300)
            setTimeout(() => {
                _modal.parentNode.removeChild(_modal);
                _modal.removeEventListener("click", listener);
                isDestroyed = true;
            },2000)
        },
        modalDom: _modal,
    }

    const listener = event => {
        if(event.target.dataset.close){
           event.preventDefault();
           modal.hide()
        }
    }
    _modal.addEventListener("click", listener)

    return Object.assign(modal,{
        setContent(htmlTitle,htmlBody){
            _modal.querySelector(".modal__header").innerHTML = htmlTitle || "<h4>base title</h4>";
            _modal.querySelector(".modal__body").innerHTML = htmlBody || "<p>base text</p>"
        }
    })

    
}



