/**
 * Variables globales
 */
var divPadre

/**
 * Permite obtener un valor random de numeros
 * @param {integer} min valor minimo a general
 * @param {integer} max valor maximo a genera
 * @returns integer
 */
 function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

/**
 * Permite generar una fecha aleatoria
 * @returns string
 */
 function randomDate() {
    let month = getRandomArbitrary(0, 12);
    let day = getRandomArbitrary(1, 30)
    let year = '20' + day
    var date = new Date(year, month, day);
    return date.toDateString();
}

/**
 * Permite obtener la informacion de un post en especifico
 */
function getPostSpecific() {
    let idpost = sessionStorage.getItem('idpost')
    if (idpost > 0) {
        if (idpost <= 100) {
            fetch('https://jsonplaceholder.typicode.com/posts/' + idpost)
                .then((response) => response.json())
                .then((post) => {
                    // agregar el titulo
                    let titlePost = document.getElementById('heading1')
                    titlePost.innerHTML = post.title
                    // agregar la fecha
                    let datePost = document.getElementById('datePost')
                    datePost.innerHTML = randomDate()
                    // agregar titulo 2
                    let titlePost2 = document.getElementById('heading2')
                    titlePost2.innerHTML = post.title
                    // agregar el cuerpo o mensaje
                    let bodyPost = document.getElementById('post-body')
                    bodyPost.innerHTML = post.body
                    // divPadre Comentarios
                    divPadre = document.getElementById('comments')
                    fetch('https://jsonplaceholder.typicode.com/posts/' + idpost + '/comments')
                        .then((response) => response.json())
                        .then((comments) => {
                            for (const llave in comments) {
                                if (Object.hasOwnProperty.call(comments, llave)) {
                                    const element = comments[llave];
                                    insetComments(element)
                                }
                            }
                        }); 
                });
        } else {
            let post = JSON.parse(sessionStorage.getItem('postNew'))
            post = post[0]
               // agregar el titulo
               let titlePost = document.getElementById('heading1')
               titlePost.innerHTML = post.title
               // agregar la fecha
               let datePost = document.getElementById('datePost')
               datePost.innerHTML = randomDate()
               // agregar titulo 2
               let titlePost2 = document.getElementById('heading2')
               titlePost2.innerHTML = post.title
               // agregar el cuerpo o mensaje
               let bodyPost = document.getElementById('post-body')
               bodyPost.innerHTML = post.body
        }
    }
}

function insetComments(comments) {
    console.log('entre');
    // creamos la imagen
    const imgComment = document.createElement('img')
    imgComment.className = 'author-photo'
    imgComment.src = 'https://sayville.artstudioworks.net/wp-content/uploads/2020/11/jack-antal-796914-unsplash-160x160.jpg'
    // creamos el div de avatar
    const divAvatar = document.createElement('div')
    divAvatar.className = 'author-avatar'
    // insertamos la imagen
    divAvatar.appendChild(imgComment)
    // creamos el name user
    const nameUser = document.createElement('h2')
    nameUser.className = 'author-title'
    nameUser.textContent = comments.name
    // creamos el meta-date
    const divMetaEmail = document.createElement('div')
    divMetaEmail.className = 'meta-date'
    divMetaEmail.textContent = randomDate()
    // creamos el div que va contener el nombre y el email
    const divContainNameEmail = document.createElement('div')
    // insertamos el nombre y el email
    divContainNameEmail.appendChild(nameUser)
    divContainNameEmail.appendChild(divMetaEmail)
    // creamos el div author
    const divAuthor = document.createElement('div')
    divAuthor.className = 'author'
    // insertamos el contenedor del autor
    divAuthor.appendChild(divContainNameEmail)
    // creamos el comentario 
    const pComments = document.createElement('p')
    pComments.textContent = comments.body
    // creamos el div contenedor de comentario
    const divComments = document.createElement('div')
    // insertamos el parrafo
    divComments.appendChild(pComments)
    // creamos el div genera de comentario
    const divContaintComment = document.createElement('div')
    divContaintComment.className = 'comment-text'
    // insertamos al author y el comentario
    divContaintComment.appendChild(divAuthor)
    divContaintComment.appendChild(divComments)
    // creamos la tarjeta de comentarios
    const cardComments = document.createElement('div')
    cardComments.className = 'comment-card'
    // insertamos todo
    cardComments.appendChild(divAvatar)
    cardComments.appendChild(divContaintComment)

    // insertamos en el padre
    divPadre.appendChild(cardComments)
}



if (sessionStorage.getItem('idpost') > 0) {
    getPostSpecific()
}