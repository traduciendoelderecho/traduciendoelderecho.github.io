document.addEventListener('DOMContentLoaded',()=>{
    utlitarios.getQueryParam()
})

for(let i = 0 ; i < itemsMenuPublicaciones.length ; i++){
        itemsMenuPublicaciones[i].addEventListener('click',function(){
            animations.noResltarItemMenu(itemMenuPublications.button)
            itemMenuPublications = collectionItemsMenuPublications[i]
            animations.resaltarItemMenu(this)
            contPublicaciones.innerHTML = ""
            animations.addPublicationsToContainer(collectionItemsMenuPublications[i].filtro(dataPublicationsSmall),contPublicaciones)
            if(itemMenuPublications.categorias.length == 0){
                formFilter.style.gridTemplateColumns = "0fr auto"
                comboCategorias.style.display ="none"
            }else{
                formFilter.style.gridTemplateColumns = "150px auto"
                comboCategorias.style.display = "inline-grid"
                animations.createItemsForCateories(itemMenuPublications.categorias,contCategorias)
            }
        })
    }

document.getElementById("comboCategorias").addEventListener('click',() => {
        let cont = document.getElementById("cont-items-categorigas")
        if(cont.style.display == "block"){
            cont.style.display = "none"
        }else{
            cont.style.display = "block"
        }
    }    
)
document.getElementById("inputbuscarPublicaciones").addEventListener('input',function(){
          let categoria = document.getElementById("item-combo-categorias-selected").innerText
          if(categoria == "Todo"){
            contPublicaciones.innerHTML = ""
            animations.addPublicationsToContainer(utlitarios.filtrarPorTitulo(itemMenuPublications.publicaciones,this.value),contPublicaciones)
          }else{
            let publicacionesFiltradas = itemMenuPublications.categorias.find((i) =>  i.categoria == categoria).publicaciones.map(e => itemMenuPublications.publicaciones[e])
            contPublicaciones.innerHTML = ""
            animations.addPublicationsToContainer(
                        utlitarios.filtrarPorTitulo(publicacionesFiltradas,this.value),
                        contPublicaciones)
        }
})
Array.prototype.map.call(subtituloNosotros,(item) => {
    item.addEventListener('click',function(){
        animations.ShowOrCloseInfo(this)
    })
})