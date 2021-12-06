//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//events listeners
eventlisteners();

function eventlisteners() {
    
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet)

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);
        crearHTML();
    });
    

    

}


//funciones
function agregarTweet(e) {
    e.preventDefault();

    console.log('agregando tweet.......');
    
    //lugar del textarea donde escribimos
    const tweet = document.querySelector('#tweet').value

    if (tweet === '') {
        mostrarError('un mensaje no puede ir vacio..');

        //evita que se ejecute mas lineas de codigo
        return;
    }
    const tweetObj = {
        id: Date.now(),
        tweet
    }
     //añadir al los arreglos de tweets
     tweets = [...tweets, tweetObj];
     console.log(tweets);



    //  si no mandas a llamar la funcion no te imprime nada
     crearHTML()

     //reiniciar el textarea despues de agregar texto
     formulario.reset();

}
// muestra el error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //ubicar el mensaje
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError);



    //elimina el mensaje despues de un tiempo establecido
    setTimeout(() => {
        mensajeError.remove();
    }, 1000);
}
//muestra un listado de los tweets
function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {

            //agregando un boton
            const btnEliminar = document.createElement('a');

            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.innerText = 'X'

            // añidiendo la funcion de eliminar

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }


            //crear html
            const li = document.createElement('li')

            //añadir texto
            li.textContent = tweet.tweet

            //añadir boton
            li.appendChild(btnEliminar);
            //insertar html
            listaTweets.appendChild(li);
            console.log(listaTweets);
        });
    }
    sincronizarStorage();
}
//agrega loss tweets actuales a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
// eliminar tweet
function borrarTweet(id) {
    console.log('borrando..', id);
    tweets = tweets.filter( tweet => tweet.id !== id)
    
    crearHTML();
}



//limpiar html
function limpiarHTML() {
    while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
}
}