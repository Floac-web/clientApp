


export function firebaseSetItem(url, item){
    
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(item),
        headers:{
            'Content-Type': 'aplication/json'
        }
    } ).then(response => response.json())
}


export function firebaseGetItem(url){

    return fetch(url,{
        method: "GET",
    }).then(response => response.json())
}

export function firebasePathItem(url, item){
    // const DATA__BASE__CLIENT__ITEM__URL = url + `/${itemId}.json`
    return fetch(url,{
        method: "PATCH",
        body: JSON.stringify(item),
        headers:{
            'Content-Type': 'aplication/json'
        }
    })
    .then(response => response.json())
}

export function firebaseDeleteItem(url){
    return fetch(url,{
        method: "DELETE",
    })
    .then(response => response.json())
}