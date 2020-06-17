var dataPublicationsSmall = null
var publicationSelected = null
const urlBaseDev = "http://192.168.1.38:5500/sitio-de-prueba"
const urlBaseProd = "https://traduciendoelderecho.github.io/sitio-de-prueba"
const urlBaseDB = urlBaseProd
const urlJsonSmallPublications = urlBaseDB+"/src/js/data-publications-small.json"
const formFilter = document.getElementById("form-filter")
const contFormFilter = document.getElementById("cont-form-filter")
const logoBuscar =  document.getElementById("logoBuscar")
const logo =  document.getElementById("logo")
const itemsMenu = document.getElementsByClassName('item-menu')
const itemsMenuMovil = document.getElementsByClassName('items-menu-movil')
const itemsMenuPublicaciones  = document.getElementsByClassName('item-menu-publicaciones')
const contPublicaciones = document.getElementById("contenerdor-publicaciones")
const contCategorias = document.getElementById("cont-items-cat")
const comboCategorias = document.getElementById("comboCategorias")
const loaderApp =  document.getElementById("cont-loader")
const contRecomendados = document.getElementById("recomendados")
const urlBaseImages = "/src/imagenes"
const urlCarpetaImagenesArticulos = "/imagenes-articulos/"
const urlCarpetaIconos = "/icons/"
const subtituloNosotros = document.querySelectorAll(".cont-items-nosotros .subtitulo")
var paraDefinir = null

var itemNosotrosSelected = null

const publicacionesOption ={
    buttons: [
        {srcDom : document.getElementById("publicaciones-menu-app-option")},
        {srcDom : document.getElementById("btnHome")}   
    ],
    srcContent: document.getElementById("publicaciones"),
    nombre:"/"  
} 

const nosotrosOption = {
    buttons: [
        {srcDom : document.getElementById("nosotros-menu-app-option")},
        {srcDom : document.getElementById("btnNotros")}
    ],
    srcContent: document.getElementById("nosotros") ,
    nombre:"conocenos" 
}
const contactoOption = {
    buttons: [
        {srcDom : document.getElementById("contacto-menu-app-option")},
        {srcDom : document.getElementById("btnContacto")}
    ],
    srcContent: document.getElementById("contacto"),
    nombre:"contacto" 
}
const publicacionDetallecont = {
    buttons:publicacionesOption.buttons,
    srcContent: document.getElementById("publicacionDetalle") 
}

const collectionItemsMenu =[publicacionesOption,nosotrosOption,contactoOption]

var menuAppSelected = publicacionesOption

var recientesPublicationesOption = {
    button : itemsMenuPublicaciones[0],
    filtro : (data) => utlitarios.filtroPublicaciones(recientesPublicationesOption,data,utlitarios.filterForEtiqueta).publicaciones,
    publicaciones : null,
    categorias : [],
    etiqueta : "recientes"
}
        
var taduTemasPublicationesOption = {
    button : itemsMenuPublicaciones[1],
    filtro : (data)=> utlitarios.filtroPublicaciones(taduTemasPublicationesOption,data,utlitarios.filterForEtiqueta).publicaciones,
    publicaciones : null,
    categorias : [],
    etiqueta:"Tradutema"
}
var traduArticulosPublicationesOption = {
    button : itemsMenuPublicaciones[2],
    filtro : (data)=> utlitarios.filtroPublicaciones(traduArticulosPublicationesOption,data,utlitarios.filterForEtiqueta).publicaciones,
    publicaciones : null,
    categorias : [],
    etiqueta:"Traduarticulo"
}
var traduLeyPublicationesOption = {
    button : itemsMenuPublicaciones[3],
    filtro : (data)=> utlitarios.filtroPublicaciones(traduLeyPublicationesOption,data,utlitarios.filterForEtiqueta).publicaciones,
    publicaciones : null,
    categorias : [],
    etiqueta:"Traduley"
}
var traduInspiracionPublicacionesOption ={
    button : itemsMenuPublicaciones[4],
    filtro : (data) => utlitarios.filtroPublicaciones(traduInspiracionPublicacionesOption,data,utlitarios.filterForEtiqueta).publicaciones,
    publicaciones : null,
    categorias : [],
    etiqueta:"Traduinspiracion"
}
const collectionItemsMenuPublications =  [
    recientesPublicationesOption,
    taduTemasPublicationesOption,
    traduArticulosPublicationesOption,
    traduLeyPublicationesOption,
    traduInspiracionPublicacionesOption
]
var itemMenuPublications  = recientesPublicationesOption
