

let form = document.getElementById('view')
let name = document.getElementById('referenceForView')
let response = document.getElementById('resposta')

function sendForm()
{

    let ajax = new XMLHttpRequest()
    let params='referenceForView='+name.value

    ajax.open('POST','http://localhost:10001/administrator/control/products')
    ajax.setRequestHeader('Content-type' ,'application/x-www-form-urlencoded')
    ajax.onreadystatechange = function()
    {
        if(ajax.status === 200 && ajax.readyState === 4)
        { 
            response.value = ajax.responseText

        }
    }

ajax.send(params)
}
form.addEventListener('submit', sendForm)



/*
( function readJS(win,doc) {
    'use strict';


let formView = doc.getElementById('view')
let name = doc.getElementById('referenceForView ')
let responseProduct = doc.getElementById('product')

function sendForm(){
    event.preventDefault()

    
    let ajax = new XMLHttpRequest()
    let params = 'referenceForView='+name.value

    ajax.open( 'GET', '../users/index.js')
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    ajax.onreadystatechange = function()
    {

        if(ajax.status === 200  &&  ajax.readyState === 4)
        {
            console.log(ajax.responseText)
            console.log('resposta')
        }
    }
    ajax.send(params)

}
formView.addEventListener('submit', sendForm, false)


})(window, document)
*/