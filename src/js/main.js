var dataPublicationsSmall = null
const formFilter = document.getElementById("form-filter")
const contFormFilter = document.getElementById("cont-form-filter")
const logoBuscar =  document.getElementById("logoBuscar")
const  logo =  document.getElementById("logo")
const itemsMenu = document.getElementsByClassName('item-menu')
const itemsMenuPublicaciones  = document.getElementsByClassName('item-menu-publicaciones');
const contPublicaciones = document.getElementById("contenerdor-publicaciones");
document.addEventListener('DOMContentLoaded',request.getData(
    (response)=>{
        dataPublicationsSmall  = JSON.parse(response)
        animations.addPublicationsToContainer(dataPublicationsSmall,contPublicaciones)
    },
    "http://192.168.1.38:5500/src/js/data-publications-small.json"
    ))


animations.selectedtitles(itemsMenu)
animations.selectedtitles(itemsMenuPublicaciones)
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


