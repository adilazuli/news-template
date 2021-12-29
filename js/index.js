// ----------------modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var btn2 = document.getElementById("myBtn2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks the button, open the modal 
btn2.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // ----------------modal
    /**
     * Variables globales
     */
sessionStorage.setItem('idpost', 0)
var allPhotos = []
var indexPostDelete = []
var newsPost = []
var divPadre
var showPostPage = 0

/**
 * Permite obtener todas las fotos disponibles
 */
function getAllPhotos() {
    fetch('https://jsonplaceholder.typicode.com/photos')
        .then((response) => response.json())
        .then((photos) => {
            allPhotos = photos
            getPosts()
        });
}


/**
 * Permite obtener la informacion de los posts a mostrar
 */
function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((valores) => {
            divPadre = document.getElementById('articles-gen') // obtengo el id contenedor o id padre
            divPadre.innerHTML = ''
            let posts = valores.concat(newsPost) // agrego la informacion de los posts nuevos
            posts = posts.reverse() // ordeno de mayor a menor el arreglo
            posts = posts.slice(0, 12) // selecciono los primeros 12 posts
            for (const llave in posts) { // recorro el arreglo con la data.
                if (Object.hasOwnProperty.call(posts, llave)) { // verifico si la llave existe
                    const element = posts[llave]; // trabajo con el objecto ya validado
                    appendPosts(element)
                }
            }
        });
}

/**
 * Permite agregar la informacion de los post en el dom de la web
 * @param {object} post 
 */
function appendPosts(post) {
    if (!indexPostDelete.includes(post.id)) {
        var photo = getPhotoPost(post.id)
            // div fila
        const divArow3 = document.createElement("div")
        divArow3.className = 'a-row4'
            // div tarjeta
        const divArtileCard = document.createElement("div")
        divArtileCard.className = 'article-card'
            // contenedor opciones imagen
        const divOptions = document.createElement("div")
        divOptions.className = 'img-post'
            // link imagen 
        const linkPost = document.createElement("div")
        linkPost.className = 'link-post'
            // imagen tarjeta
        const imgPost = document.createElement("img")
        imgPost.className = 'card-picture'
        imgPost.src = photo.url
            // div hover
        const divHover = document.createElement("div")
        divHover.className = 'hover-options'
            // div opciones
        const divOption = document.createElement("div")
        divOption.className = 'options a-flex link-btn'
            // links de opciones
            // ver
        const btnShow = document.createElement("a")
        btnShow.href = 'javascript:;'
        btnShow.addEventListener("click", function() {
            showPosts(post.id)
        }, false);
        const eye = document.createElement("i")
        eye.className = 'fa fa-eye'
            // borrar
        const btnDelete = document.createElement("a")
        btnDelete.href = 'javascript:;'
        btnDelete.addEventListener("click", function() {
            deletePost(post.id)
        }, false);
        const trash = document.createElement("i")
        trash.className = 'fa fa-trash'
            // articulo tarjeta
        const article = document.createElement("article")
            // parrafo fecha tarjeta
        const pDate = document.createElement("p")
        pDate.className = 'date'
        pDate.textContent = randomDate()
            // titulo tarjeta
        const title = document.createElement("h3")
        title.className = 'heading-card no-margin'
        title.textContent = post.title
            // footer tarjeta
        const footer = document.createElement("footer")
        footer.className = 'btn-card link-btn'
            // Link tarjeta
        const link = document.createElement("a")
        link.className = 'btn'
        link.textContent = 'Leer Artículo'
        link.addEventListener("click", function() {
            showPosts(post.id)
        }, false);
        link.href = 'javascript:;'
        // link a borrar desde la carta
        const linkDelete = document.createElement("a")
        linkDelete.className = 'btn btn-red'
        linkDelete.textContent = 'Borrar'
        linkDelete.addEventListener("click", function() {
            deletePost(post.id)
        }, false);
        linkDelete.href = 'javascript:;'

        // insertar todos los elementos
        footer.appendChild(link) // insertamos el link en el footer
        footer.appendChild(linkDelete) // insertamos el link Delete en el footer
        article.appendChild(pDate) // insertamos la fecha en el articulo
        article.appendChild(title) // insertamos el titulo en el articulo
        article.appendChild(footer) // insertamos el footer en el articulo
        linkPost.appendChild(imgPost) // insertamos la imagen un div para acceder a las opciones
        btnShow.appendChild(eye) // insertamos el icono en el boton
        btnDelete.appendChild(trash) // insertamos el icono en el boton
        divOption.appendChild(btnShow) // insertamos el boton de ver
        divOption.appendChild(btnDelete) // insertamos el boton de borrar
        divHover.appendChild(divOption) // insertamos la opciones en el hover
        divOptions.appendChild(linkPost) // insertamos el linkPost en el contenedor
        divOptions.appendChild(divHover) // insertamos el hover en el contenedor
        divArtileCard.appendChild(divOptions) // insertamos el la imagen en la tarjera
        divArtileCard.appendChild(article) // insertamos el articulo en la tarjeta
        divArow3.appendChild(divArtileCard) // insertamos la tarjeta en la fila 
            // inserta en el padre
        divPadre.appendChild(divArow3)
    }
}

/**
 * Permite obtener las fotos de un post en especifico
 * @param {integer} idPost id del posta obtenen la foto
 * @returns object
 */
function getPhotoPost(idPost) {
    return allPhotos[idPost]
}



/**
 * Permite borrar un post en especifico
 * @param {integer} idPost 
 */
function deletePost(idPost) {
    indexPostDelete.push(idPost)
    fetch('https://jsonplaceholder.typicode.com/posts/' + idPost, {
        method: 'DELETE',
    });
    getPosts()
}

/**
 * Permite crear un nuevo posts de forma aleatoria
 */
function createPosts(title, body) {
    newsPost = []
        // let title = getRandomArbitrary(0, 10)
        // let body = getRandomArbitrary(0, 10)
    let user = getRandomArbitrary(0, 5)
        // let dataNew = getTitleAndBody(title, body)
    fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: user,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => {
            newsPost.push(json)
            getPosts()
        });

}

/**
 * Permite crear un nuevo post
 */
function newPost() {
    let title = document.getElementById('inpTitle').value
    let body = document.getElementById('inpBody').value
    createPosts(title, body)
    modal.style.display = "none";
}

/**
 * Permite obtener un titulo y un mensaje de forma aleatoria
 * @param {integer} title indice del titulo
 * @param {integer} body indice del cuerpo
 * @returns object
 */
function getTitleAndBody(title, body) {
    const text = [
        `I'm baby intelligentsia hot chicken iPhone, letterpress food truck lomo roof party celiac +1 photo booth yr thundercats affogato. Poke pork belly PBR&B, vape fashion axe hashtag chillwave brooklyn cloud bread marfa cold-pressed adaptogen. Ennui tilde fam, chicharrones irony you probably haven't heard of them raclette poutine. Intelligentsia seitan chicharrones, enamel pin brunch vaporware art party kitsch retro. Vegan sustainable tumeric cronut. Pug aesthetic PBR&B glossier selvage, art party salvia wayfarers. Etsy taiyaki typewriter chicharrones, taxidermy cold-pressed pabst vinyl cronut pok pok 8-bit fam.`,
        `Activated charcoal direct trade palo santo vape everyday carry pork belly mustache kitsch gochujang. Vexillologist shoreditch deep v, keytar ethical seitan sartorial kale chips irony tumeric microdosing brunch. Keffiyeh master cleanse next level, glossier lumbersexual shaman af edison bulb distillery knausgaard vape small batch portland. Cred truffaut vape deep v +1, gastropub hot chicken raw denim helvetica umami offal.`,
        `Dreamcatcher sartorial asymmetrical crucifix wolf godard, coloring book squid freegan affogato lumbersexual franzen. Drinking vinegar vape chillwave pinterest tofu pug hella sartorial neutra cray tumeric. Poke cloud bread XOXO salvia. Glossier jean shorts craft beer gastropub, squid pitchfork humblebrag listicle taiyaki messenger bag retro thundercats subway tile raw denim. Hoodie asymmetrical food truck listicle pour-over.`,
        `Pop-up tote bag twee squid asymmetrical lyft roof party ugh try-hard glossier pabst bicycle rights jean shorts single-origin coffee. IPhone tumblr narwhal, tattooed mumblecore you probably haven't heard of them XOXO authentic art party bicycle rights. Bespoke bitters master cleanse austin authentic lumbersexual mixtape man bun art party tilde swag. Tacos bitters chicharrones thundercats selfies chartreuse chia. Put a bird on it taxidermy cornhole VHS, tousled ennui fam hexagon craft beer marfa DIY pinterest.`,
        `Air plant deep v polaroid church-key. Farm-to-table ramps put a bird on it pickled aesthetic pork belly beard tbh street art pabst. Pop-up cliche before they sold out hoodie heirloom flannel schlitz organic. Crucifix forage cardigan before they sold out umami echo park subway tile art party squid shoreditch photo booth.`,
        `Yr offal cornhole neutra. Cronut kale chips hoodie, mustache tilde tacos palo santo fashion axe whatever pop-up post-ironic pitchfork pok pok ethical. Literally freegan post-ironic wolf listicle synth gochujang tousled palo santo 3 wolf moon health goth next level. Asymmetrical you probably haven't heard of them lomo post-ironic, pitchfork crucifix narwhal retro chia tofu schlitz. Kitsch keytar normcore listicle flexitarian fashion axe chartreuse jianbing yr vice flannel cred.`,
        `Jianbing live-edge bicycle rights messenger bag, street art offal squid gastropub food truck kale chips locavore. Mustache humblebrag banjo, shaman offal photo booth coloring book mumblecore typewriter tbh you probably haven't heard of them. Disrupt glossier umami pop-up, schlitz listicle keytar ramps. Try-hard tumblr crucifix aesthetic lyft.`,
        `Try-hard woke irony selvage listicle, literally adaptogen tilde messenger bag deep v hexagon stumptown gastropub. YOLO yuccie godard copper mug, slow-carb put a bird on it williamsburg offal craft beer trust fund sustainable palo santo 8-bit. Venmo XOXO drinking vinegar kale chips cred semiotics, vinyl helvetica hoodie bespoke leggings pop-up. Polaroid lomo tofu vape. Chicharrones mumblecore taiyaki, direct trade prism vinyl cardigan subway tile flexitarian. Aesthetic food truck glossier coloring book. Biodiesel distillery crucifix schlitz skateboard ennui master cleanse pok pok normcore cardigan.`,
        `Cliche organic woke yr gluten-free, twee PBR&B everyday carry 8-bit roof party. Hexagon craft beer pinterest humblebrag raw denim pabst schlitz celiac. Quinoa hoodie man braid, iPhone flannel chia scenester pinterest kickstarter enamel pin health goth aesthetic art party cliche mustache. Irony cred street art locavore green juice.`,
        `Tilde twee af drinking vinegar trust fund. Ramps vaporware hell of kombucha 8-bit chambray YOLO wolf vinyl pop-up cornhole activated charcoal mixtape. Mixtape marfa before they sold out XOXO poutine craft beer scenester cronut drinking vinegar knausgaard you probably haven't heard of them hella. Literally selvage mumblecore activated charcoal echo park vegan deep v fingerstache irony kogi microdosing trust fund. Schlitz cloud bread activated charcoal, master cleanse kitsch shoreditch umami bicycle rights la croix post-ironic biodiesel edison bulb. 8-bit disrupt banjo selvage. Flannel selfies organic put a bird on it keytar, lo-fi health goth umami fam four loko kombucha adaptogen hammock austin tilde.`
    ]
    let textTitle = text[title]
    var data = {
        'title': textTitle.substring(0, 20),
        'body': text[body]
    };
    return data
}

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
 * Permite ver un posts en especifico
 * @param {integer} idpost 
 */
function showPosts(idpost) {
    sessionStorage.setItem('idpost', idpost)
    sessionStorage.setItem('postNew', JSON.stringify(newsPost))
    window.location.href = 'post.html'
}



getAllPhotos();