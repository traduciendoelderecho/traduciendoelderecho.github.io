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
                    console.log(containerItems)         
                    containerItems.removeChild(containerItems.firstChild)
                }
                let divTextTodo = animations.createNodoForItemCategori({categoria:"Todo"})
                divTextTodo.addEventListener('click',(e)=>{
                    animations.limpiaFiltros()
                    let categoria =  divTextTodo.firstChild.nextSibling.innerText
                    document.getElementById("item-combo-categorias-selected").innerText = categoria
                    divTextTodo.firstChild.style.backgroundImage = "url("+urlBaseImages+urlCarpetaIconos+"radio_button_checked.svg)"
                    let publicacionesfiltradas = itemMenuPublications.publicaciones;
                    animations.addPublicationsToContainer(publicacionesfiltradas,contPublicaciones)
                    containerItems.parentNode.style.display = "none"
                })
                containerItems.appendChild(divTextTodo)

                data.forEach((item) => {
                    let divText = animations.createNodoForItemCategori(item)
                    divText.addEventListener('click',(e)=>{
                        animations.limpiaFiltros()
                        let categoria =  divText.firstChild.nextSibling.innerText
                        document.getElementById("item-combo-categorias-selected").innerText = categoria
                        divText.firstChild.style.backgroundImage = "url("+urlBaseImages+urlCarpetaIconos+"radio_button_checked.svg)"

                        let  publicacionesfiltradas = itemMenuPublications.categorias
                            .find( i => i.categoria == categoria).publicaciones
                            .map(e => itemMenuPublications.publicaciones[e])
                        animations.addPublicationsToContainer(publicacionesfiltradas,contPublicaciones)
                        containerItems.parentNode.style.display = "none"
                    })
                    containerItems.appendChild(divText)
                })
        },createNodoForItemCategori:(categoria) =>{
            let divText = document.createElement("div")
            let pText = document.createElement("p")
            let divIcon = document.createElement("div")
            divText.className ="items-combo-categorias cursor-pointer"
            pText.innerText = categoria.categoria
            divIcon.className = "icon-check"
            divText.appendChild(divIcon)
            divText.appendChild(pText)
            return divText
        },limpiaFiltros : ()=>{
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
                        animations.resaltarItemMenu(item.srcDom)
                 }else{
                    item.srcDom.style.opacity = "1"
                 }
            })
        },
        desSelectItemMenu:(items)=>{
            items.forEach(item => {
                tipo = item.srcDom.dataset.tipo 
                if(tipo == "desktop"){
                    animations.noResltarItemMenu(item.srcDom)
                 }else{
                    item.srcDom.style.opacity = "0.5"
                 }
            })
        },resaltarItemMenu:(item)=>{
            item.style.fontWeight = "700"
            item.firstChild.nextSibling.style.display ="block"
        },noResltarItemMenu:(item)=>{
            item.style.fontWeight = "100"
            item.firstChild.nextSibling.style.display ="none"
        },
        addPublicationsToContainer:(data,container)=>{
            container.innerHTML = ""
            data.map( (publicacion) => animations.createNodosForPublication(publicacion))
            .forEach( elemnt => container.appendChild(elemnt))
        },
        createNodosForPublication:(publication)=>{
            let publicacion  = document.createElement("article")
            let encabezado = document.createElement("div")
            let titulo = document.createElement("h2")
            
            let intro = document.createElement("p")
            let fecha =  document.createElement("span")
            encabezado.className ="encabezado text-color-white"
            publicacion.className = "publicacion cursor-pointer"
            
            fecha.className = "fecha"
            encabezado.style.backgroundImage = "url("+urlBaseImages+urlCarpetaImagenesArticulos+publication.imgPortada+")"
            titulo.innerText = publication.titulo
            
            intro.innerText = publication.introducion
            fecha.innerText = publication.fecha
            publicacion.dataset.id = publication.id
            encabezado.appendChild(titulo)

            if(publication.categoria !== null){
                let categoria =  document.createElement("span")
                categoria.className = "tema"
                categoria.innerText = publication.categoria
                encabezado.appendChild(categoria)
            }

            publicacion.appendChild(encabezado)
            publicacion.appendChild(intro)
            publicacion.appendChild(fecha)
            return publicacion
        }
}