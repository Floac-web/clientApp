


//import "./preloader.css"

export function createPreloader(){
    const preloader = document.createElement("tr")
    preloader.classList.add("preloader")

    const preloaderTd = document.createElement("td")
    preloaderTd.setAttribute("colspan", "7")

    const spinner = document.createElement("div")
    spinner.classList.add("spinner")

    preloaderTd.append(spinner)
    preloader.appendChild(preloaderTd)
    return preloader
}