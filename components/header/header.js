

//import "./header.css"

// "https://i.ibb.co/xSDR5LM/logo.png"

export function createHeader(){
    const header = document.createElement("header")
    header.classList.add("header") 


    header.insertAdjacentHTML("beforeend", `
        <div class="header__container container">
            <div href="" class="header__logo logo">
                <img src="https://i.ibb.co/xSDR5LM/logo.png" alt="" class="logo__img">
            </div>
            <form action="" class="header__form">
                <input type="text" class="header__input" placeholder="введіть запит">
                <ul class="header__find-list hide find-list list"></ul>
            </form>
        </div>`)
    

    return header
}