
//import "./searchClient.css"


export function createFindItem(client){
    const findList = document.querySelector(".header__find-list")
    
    const findItem = document.createElement("li")
    const findLink = document.createElement("a")
    

    findItem.classList.add("find-list__item", "hide", `${client.serveId}`)
    findLink.classList.add("find-list__link")


    findLink.textContent = `${client.SurName} ${client.Name} ${client.LastName}`
    findLink.href = `#`


    findItem.addEventListener("click", () => {
        findList.classList.add("hide")
        const gotoClient = document.querySelector(`#${client.serveId}`)
        gotoClient.classList.add("active")
        //const yetScroled = window.pageYOffset
        const gotoClientPos = gotoClient.getBoundingClientRect().top;

        window.scrollTo({top:gotoClientPos,behavior: "smooth"})

        setTimeout(() => gotoClient.classList.remove("active"),3000)
    })

    findItem.append(findLink)
    findList.append(findItem)
}

export function searchClient(clienttListObj) {
    const headerForm = document.querySelector(".header__form")
    const findInput = document.querySelector(".header__input")
    const findList = document.querySelector(".header__find-list")
    

    clienttListObj.forEach(client => {
        createFindItem(client)
        
    });

    headerForm.addEventListener("submit", e => {
        e.preventDefault()
    })

    


    findInput.addEventListener("input", () => {
        const value = findInput.value.trim().toLowerCase()
        const foundItems = findList.querySelectorAll(".find-list__item")
        let countOfItems = findList.childNodes.length

        const insertMark = (str, pos, len) => "<a class=`find-list__link`>" +
        str.slice(0,pos) + "<mark>" + str.slice(pos, pos + len) +
         "</mark>" + str.slice(pos + len) + "</a>";
        
        if(value){
            foundItems.forEach(link => {
                if(link.innerText.toLowerCase().search(value) == -1){
                    link.classList.add("hide")
                    countOfItems--
                    if(countOfItems === 0){
                        findList.classList.add("hide")
                    }
                }else{
                    findList.classList.remove("hide")
                    link.classList.remove("hide")
                    
                    
                    
                    const str = link.innerText;
                    const pos = str.toLowerCase().search(value)
                    const len = value.length

                    
                    link.innerHTML = insertMark(str,pos,len)
                }
            })
        } else {
            findList.classList.add("hide")
        }

    })

    findInput.addEventListener("focusout", () => {
        setTimeout(() => findList.classList.add("hide"),1000)
    })



}