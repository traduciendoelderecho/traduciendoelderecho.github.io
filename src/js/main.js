document.addEventListener('DOMContentLoaded',request.getData((response)=>{
        dataPublicationsSmall  = JSON.parse(response)
        animations.resaltarItemMenu(itemMenuPublications.button)
        animations.addPublicationsToContainer(itemMenuPublications.filtro(dataPublicationsSmall),contPublicaciones)
        menuAppSelected.srcContent.style.display = "block"
        animations.resaltarItemMenuSelected(menuAppSelected.buttons)
        document.getElementById("cont-loader").style.display = "none"
        if(itemMenuPublications.categorias.length == 0){
            comboCategorias.style.display = "none"
        }else{
            comboCategorias.style.display = "inline-grid"
            animations.createItemsForCateories(itemMenuPublications.categorias,contCategorias)
        }        
    },
    "http://192.168.1.38:5500/src/js/data-publications-small.json"
    ))

animations.selectedtitles(itemsMenu)
animations.selectedtitles(itemsMenuMovil)

document.getElementById("logoBuscar").addEventListener('click',() => animations.showOrCloseFormFilter(formFilter,contFormFilter,logoBuscar,logo))
    for(let i = 0 ; i < itemsMenuPublicaciones.length ; i++){
        itemsMenuPublicaciones[i].addEventListener('click',function(){
            animations.noResltarItemMenu(itemMenuPublications.button)
            itemMenuPublications = collectionItemsMenuPublications[i]
            animations.resaltarItemMenu(this)
            contPublicaciones.innerHTML = ""
            animations.addPublicationsToContainer(collectionItemsMenuPublications[i].filtro(dataPublicationsSmall),contPublicaciones)

            if(itemMenuPublications.categorias.length == 0){
                comboCategorias.style.display = "none"
            }else{
                comboCategorias.style.display = "inline-grid"
                animations.createItemsForCateories(itemMenuPublications.categorias,contCategorias)
            }
        })
    }

document.getElementById("btnShowItems").addEventListener('click',() => {
        let cont = document.getElementById("cont-items-categorigas")
        if(cont.style.display == "block"){
            cont.style.display = "none"
        }else{
            cont.style.display = "block"
        }
    }    
)


