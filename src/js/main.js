var dataPublicationsSmall = null
const urlBaseImages = "../src/imagenes"
const urlCarpetaImagenesArticulos = "/imagenes-articulos/"
const urlCarpetaIconos = "/icons/"
const publicacionesOption ={
    buttons: [
        {srcDom : document.getElementById("publicaciones-menu-app-option")},
        {srcDom : document.getElementById("btnHome")}
    ],
    srcContent: document.getElementById("publicaciones") 
} 

const nosotrosOption = {
    buttons: [
        {srcDom : document.getElementById("nosotros-menu-app-option")},
        {srcDom : document.getElementById("btnNotros")}
    ],
    srcContent: document.getElementById("nosotros") 
}
const contactoOption = {
    buttons: [
        {srcDom : document.getElementById("contacto-menu-app-option")},
        {srcDom : document.getElementById("btnContacto")}
    ],
    srcContent: document.getElementById("contacto") 
}

const collectionItemsMenu =[publicacionesOption,nosotrosOption,contactoOption]
var menuAppSelected = publicacionesOption

const formFilter = document.getElementById("form-filter")
const contFormFilter = document.getElementById("cont-form-filter")
const logoBuscar =  document.getElementById("logoBuscar")
const  logo =  document.getElementById("logo")
const itemsMenu = document.getElementsByClassName('item-menu')
const itemsMenuMovil = document.getElementsByClassName('items-menu-movil')
const itemsMenuPublicaciones  = document.getElementsByClassName('item-menu-publicaciones');
const contPublicaciones = document.getElementById("contenerdor-publicaciones");
document.addEventListener('DOMContentLoaded',request.getData(
    (response)=>{
        dataPublicationsSmall  = JSON.parse(response)
        animations.addPublicationsToContainer(dataPublicationsSmall,contPublicaciones)
        menuAppSelected.srcContent.style.display = "block"
        animations.resaltarItemMenuSelected(menuAppSelected.buttons)
        document.getElementById("cont-loader").style.display = "none"
    },
    "http://192.168.1.38:5500/src/js/data-publications-small.json"
    ))
animations.selectedtitles(itemsMenu)
animations.selectedtitles(itemsMenuMovil)

document.getElementById("logoBuscar").addEventListener(
    'click',
    () => {
        animations.showOrCloseFormFilter(formFilter,contFormFilter,logoBuscar,logo)
    }
)
document.getElementById("btnShowItems").addEventListener('click',
() => {
       let cont = document.getElementById("cont-items-categorigas")
       if(cont.style.display == "block"){
         cont.style.display = "none"
       }else{
        cont.style.display = "block"
        request.getData(
            (response)=>{
               let dataCategories  = JSON.parse(response)
                animations.createItemsForCateories(dataCategories,document.getElementById("cont-items-cat"))
                document.getElementById("loader-6").style.display ="none"
            },
            "http://192.168.1.38:5500/src/js/data-categories.json"
            )
       }
    }    
)


