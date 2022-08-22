
export function sortTable(){
    const table = document.querySelector(".clients__table")
    const theaders = table.querySelectorAll("th")
    const tbody = table.querySelector("tbody")

    const directions = Array.from(theaders).map(() => '')

    const transform = (type,content) => {

        switch(type){
            case "id":
            case "txt":
                 return content;
            case "create":
            case "change":
                const dataTime = content.split(" ");
                const data = dataTime[0].split(".").reverse()
                const time = dataTime[1].split(":");
                const correctDataTime = data + "," + time
                
                return correctDataTime.split(",").join("-")
                 
        }
    }

    const sortColumn = (type, index) => {
        const rows = tbody.querySelectorAll("tr");
        const direction = directions[index] || "sortDown"
        const multiply = direction === "sortDown" ? -1 : 1

        const newRows = Array.from(rows)

        newRows.sort((row1,row2) => {
            const cellA = row1.querySelectorAll("td")[index].textContent
            const cellB = row2.querySelectorAll("td")[index].textContent

            const a = transform(type,cellA)
            const b = transform(type,cellB)
            
            
            switch(true){
                case a < b:
                    return 1 * multiply;
                case a > b:
                    return -1 * multiply;
                case a == b:
                    return 0
            }
        })

        rows.forEach(row => {
            tbody.removeChild(row)
        })

        directions[index] = direction === "sortDown" ? "sortUp" : "sortDown"

        newRows.forEach(newRow => [
            tbody.appendChild(newRow)
        ])

    
    }

    theaders.forEach((th, index) => {
        th.addEventListener("click", (e) => {
            th.classList.toggle("sorting-down")
            const headerType = th.getAttribute("data-type")
            sortColumn(headerType,index)
        })
    })


}