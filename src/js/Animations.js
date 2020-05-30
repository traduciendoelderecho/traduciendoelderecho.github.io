let banderaFiltro = false;
const  animations = {
        showOrCloseFormFilter: ( formFilter , contFormFilter,logoBuscar,logo) =>{
            if(banderaFiltro){        
                formFilter.style.display="none"
                logoBuscar.style.backgroundColor = "transparent"
                logo.style.display = "inline-block"
                banderaFiltro = false
            }else{
                formFilter.style.display="inline-block"
                logoBuscar.style.backgroundColor = "#ECECEC"
                banderaFiltro=true
            }
        },
        createItemsForCateories : (data,containerItems) => {
                while(containerItems.firstChild){
                    containerItems.removeChild(containerItems.firstChild)
                }
                data.forEach((item) => {
                    let divText = document.createElement("div")
                    let pText = document.createElement("p")
                    let divIcon = document.createElement("div")
                    divText.className ="items-combo-categorias cursor-pointer"
                    pText.innerText = item.title
                    divText.addEventListener('click',(e)=>{
                        animations.limpiaFiltros()
                        let categoria =  divText.firstChild.nextSibling.innerText
                        document.getElementById("item-combo-categorias-selected").innerText = categoria
                        divText.firstChild.style.backgroundImage = "url("+urlBaseImages+urlCarpetaIconos+"radio_button_checked.svg)"
                    })
                    divIcon.className = "icon-check"
                    divText.appendChild(divIcon)
                    divText.appendChild(pText)
                    containerItems.appendChild(divText)
                })
        }, limpiaFiltros : ()=>{
            let items  = document.getElementsByClassName("items-combo-categorias");
            for(let i = 0  ; i < items.length; i++){
                    items[i].firstChild.style.backgroundImage = "url("+urlBaseImages+urlCarpetaIconos+"radio_button_unchecked.svg)"
            }
        },
        selectedtitles : (titles)=>{
            for(let  i = 0 ; i < titles.length;i++){
                titles[i].addEventListener('click',(e)=>{
                    let elemtoSelecionado =  e.srcElement;
                   
                    animations.desSelectItemMenu(menuAppSelected.buttons)
                    menuAppSelected.srcContent.style.display ="none"
                    
                    collectionItemsMenu.forEach(item => {
                        item.buttons.forEach( subitem =>{
                            if(elemtoSelecionado == subitem.srcDom){
                                menuAppSelected = item
                                animations.resaltarItemMenuSelected(menuAppSelected.buttons)
                                menuAppSelected.srcContent.style.display = "block"
                            }
                        })
                    })
                    
                })
            }
        },
        resaltarItemMenuSelected : (items) =>{
            items.forEach(item => {
                tipo = item.srcDom.dataset.tipo 
                if(tipo == "desktop"){
                    item.srcDom.style.fontWeight = "700"
                    item.srcDom.firstChild.nextSibling.style.display ="block"
                 }else{
                    item.srcDom.style.opacity = "1"
                 }
            })
        },
        desSelectItemMenu:(items)=>{
            items.forEach(item => {
                tipo = item.srcDom.dataset.tipo 
                if(tipo == "desktop"){
                    item.srcDom.style.fontWeight = "100"
                    item.srcDom.firstChild.nextSibling.style.display ="none"
                 }else{
                    item.srcDom.style.opacity = "0.5"
                 }
            })
        }
        ,
        addPublicationsToContainer:(data,container)=>{
            data.map( (publicacion) => animations.createNodosForPublication(publicacion))
            .forEach( elemnt => container.appendChild(elemnt))
        },
        createNodosForPublication:(publication)=>{
      
            let publicacion  = document.createElement("article")
            let encabezado = document.createElement("div")
            let titulo = document.createElement("h2")
            let categoria =  document.createElement("span")
            let intro = document.createElement("p")
            let fecha =  document.createElement("span")
            encabezado.className ="encabezado text-color-white"
            publicacion.className = "publicacion cursor-pointer"
            categoria.className = "tema"
            fecha.className = "fecha"
            encabezado.style.backgroundImage = "url("+urlBaseImages+urlCarpetaImagenesArticulos+publication.imgPortada+")"
            titulo.innerText = publication.titulo
            categoria.innerText = publication.categoria
            intro.innerText = publication.introducion
            fecha.innerText = publication.fecha
            publicacion.dataset.id = publication.id
            encabezado.appendChild(titulo)
            encabezado.appendChild(categoria)
            publicacion.appendChild(encabezado)
            publicacion.appendChild(intro)
            publicacion.appendChild(fecha)
            return publicacion
        }
}