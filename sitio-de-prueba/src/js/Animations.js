const  animations = {
        createItemsForCateories : (data,containerItems) => {
                let  itemSelected =  document.getElementById("item-combo-categorias-selected");
                itemSelected.innerText = "Todo"
                while(containerItems.firstChild){      
                    containerItems.removeChild(containerItems.firstChild)
                }
                
                let divTextTodo = animations.createNodoForItemCategori({categoria:"Todo"})
                divTextTodo.firstChild.style.backgroundImage = "url("+urlBaseDB+urlBaseImages+urlCarpetaIconos+"radio_button_checked.svg)"
                    
                divTextTodo.addEventListener('click',(e)=>{
                    animations.limpiaFiltros()
                    let categoria =  divTextTodo.firstChild.nextSibling.innerText
                    itemSelected.innerText = categoria
                    divTextTodo.firstChild.style.backgroundImage = "url("+urlBaseDB+urlBaseImages+urlCarpetaIconos+"radio_button_checked.svg)"
                    let publicacionesfiltradas = itemMenuPublications.publicaciones;
                    contPublicaciones.innerHTML = ""
                    animations.addPublicationsToContainer(publicacionesfiltradas,contPublicaciones)
                })
                containerItems.appendChild(divTextTodo)

                data.forEach((item) => {
                    let divText = animations.createNodoForItemCategori(item)
                    divText.addEventListener('click',(e)=>{
                        animations.limpiaFiltros()
                        let categoria =  divText.firstChild.nextSibling.innerText
                        itemSelected.innerText = categoria
                        divText.firstChild.style.backgroundImage = "url("+urlBaseDB+urlBaseImages+urlCarpetaIconos+"radio_button_checked.svg)"
                        let  publicacionesfiltradas = itemMenuPublications.categorias
                            .find( i => i.categoria == categoria).publicaciones
                            .map(e => itemMenuPublications.publicaciones[e])
                            contPublicaciones.innerHTML = ""
                        animations.addPublicationsToContainer(publicacionesfiltradas,contPublicaciones)
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
                    items[i].firstChild.style.backgroundImage = "url("+urlBaseDB+urlBaseImages+urlCarpetaIconos+"radio_button_unchecked.svg)"
            }
        },
        selectedtitles : (titles)=>{
            for(let  i = 0 ; i < titles.length;i++){
                titles[i].buttons.forEach( b => {
                    b.srcDom.addEventListener('click',function(){
                        window.location = urlBaseDB+"/?seccion="+titles[i].nombre
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
        
            //container.innerHTML = ""
            
            if(data.length == 0){
                container.innerHTML = "<h2>No se encontraron resultados para  la busqueda</h2>"
            }else{
                data.map( (publicacion) => {
                   let  p = animations.createNodosForPublication(publicacion)
                   p.addEventListener('click',function(){
                        let id  = parseInt(this.dataset.id)
                        id  =  0
                        window.location=urlBaseDB+"/?publicacion="+id
                   })
                   return p
                }).forEach( elemnt => container.appendChild(elemnt))
            }
            
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
            encabezado.style.backgroundImage = "url("+urlBaseDB+urlBaseImages+urlCarpetaImagenesArticulos+publication.imgPortada+")"
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
        },
        openDetailsPublication: (publicacion)=>{
            let mapa = { 
                    titulo : {
                        nombre : null, 
                        id : null},
                    intro : "#intro", 
                    temas : []
                }
            const contPublicacion = document.getElementById("detallePublicacion")
            let titulo =  document.createElement("h1")
            let espacioParaMapa =  document.createElement("div")
            let img = document.createElement("img")
            let Intro =  document.createElement("div")
            Intro.id = "intro"
            let autores = document.createElement("div")
            let fecha = document.createElement("div")
            img.src = urlBaseDB+urlBaseImages + urlCarpetaImagenesArticulos + publicacion.img
            
            publicacion.introducion.forEach( e => {
                let parrafo =  document.createElement("p")
                parrafo.innerText = e.parrafo
                Intro.appendChild(parrafo)
            })
            let idTitulo  = utlitarios.createID(publicacion.tituloPublicacion)
            mapa.titulo.id = "#"+idTitulo
            mapa.titulo.nombre = publicacion.tituloPublicacion
            titulo.id = idTitulo
            titulo.innerText = publicacion.tituloPublicacion
            contPublicacion.appendChild(espacioParaMapa)
            contPublicacion.appendChild(titulo)
            contPublicacion.appendChild(img)
            contPublicacion.appendChild(Intro)
            let contadorSubTemas = 0;
            publicacion.temas.map( e => {
                contadorSubTemas++
                let cont = document.createElement("div")
                let subTitulo =  document.createElement("h2")
                subTitulo.innerText = contadorSubTemas +". "+e.subtitulo
                let idSubtituto = utlitarios.createID(e.subtitulo)
                subTitulo.id = idSubtituto
                mapa.temas.push({titulo : e.subtitulo,id : "#"+idSubtituto})
                cont.appendChild(subTitulo)
                e.parrafos.forEach(t => {
                    let parrafo =  document.createElement("p")
                    parrafo.innerHTML = utlitarios.searchDefinitions(t.parrafo,publicacion.definiciones)
                    cont.appendChild(parrafo)
                })
                return cont
            }).forEach( r => contPublicacion.appendChild(r))
            espacioParaMapa.appendChild(animations.crearMapaDePublicacion(mapa))  
            autores.className = "pie-publicacion" 
            autores.innerText = "Publicado por : "+publicacion.autores.map(e => e.nombre).join()  
            fecha.innerText ="Fecha : " + publicacion.fecha
            fecha.className = "pie-publicacion"
            contPublicacion.appendChild(autores)
            contPublicacion.appendChild(fecha)
            
            document.getElementById("publicacionDetalle").style.display = "grid"
        },
        crearMapaDePublicacion : (mapa)=>{

                let contenerdor =  document.createElement("div")
                
                let listaContenidoPublicacion = document.createElement("ul")
                let itemListaTitulotema = document.createElement("li")
                
                let titulo = document.createElement("h3")
                let tituloTema = document.createElement("a")
                let hRefIntro = document.createElement("a")
                
                tituloTema.innerText = mapa.titulo.nombre
                tituloTema.href = mapa.titulo.id
                itemListaTitulotema.appendChild(tituloTema)

                titulo.innerText = "Tabla de contenido"
                titulo.className = "text-align-center"
                contenerdor.id = "tablaContenido"
                hRefIntro.href = "#intro"
                hRefIntro.innerText = "Introducion"
                
                //agregando hijos
                contenerdor.appendChild(titulo)  
                let listaSubTemas = document.createElement("ol")
                mapa.temas.map( e => {
                    let aHrf = document.createElement("a")
                    let item =  document.createElement("li")
                    aHrf.innerText =  e.titulo
                    aHrf.href = e.id
                    aHrf.style.display = "block"
                    item.appendChild(aHrf)
                    listaSubTemas.appendChild(item) 
                })
                itemListaTitulotema.appendChild(listaSubTemas)
                listaContenidoPublicacion.appendChild(itemListaTitulotema)
                contenerdor.appendChild(listaContenidoPublicacion)
                return contenerdor
            },
    ShowOrCloseInfo : (elemnt) => { 
        if(elemnt == itemNosotrosSelected){
            animations.closeItemNosotros(elemnt)
            itemNosotrosSelected =  null
        }else{
            animations.showItemItemNosotros(elemnt)
            if(itemNosotrosSelected !== null){
                animations.closeItemNosotros(itemNosotrosSelected)
            }
            itemNosotrosSelected =  elemnt
        }
    },
    closeItemNosotros : (elemnt) => {
        let arrow = elemnt.querySelector(".arrow")
        let info = elemnt.parentNode.querySelector(".info")
        arrow.style.backgroundImage =  "url("+urlBaseDB+urlBaseImages+urlCarpetaIconos+"/expand_more.svg)"
        arrow.style.transform = "rotate(0deg)" 
        elemnt.style.backgroundColor = "transparent"
        elemnt.style.color = "#696969"
        info.style.height = "0"
    },
    showItemItemNosotros : (elemnt) => {
        let altoAnchoVentana = utlitarios.getWithAndHeigthOfWindow()
        let arrow = elemnt.querySelector(".arrow")
        let info = elemnt.parentNode.querySelector(".info")
        let alturaImg = (elemnt.parentNode.querySelector(".avatar") !== null ) ? elemnt.parentNode.querySelector(".avatar").clientHeight : null
        let alturaParrafo =  elemnt.parentNode.querySelector("p").clientHeight
        let alturaForInfoDiv = 0
        arrow.style.backgroundImage = "url("+urlBaseDB+urlBaseImages+urlCarpetaIconos+"/expand_more_white.svg)"
        arrow.style.transform = "rotate(180deg)"
        elemnt.style.backgroundColor = "#0d3a67"
        elemnt.style.color = "white"
        if(altoAnchoVentana.ancho < 750){
            alturaForInfoDiv = ( alturaImg == null ) ? alturaParrafo : alturaImg + alturaParrafo
        }else{
            alturaForInfoDiv = ( alturaImg == null) ? alturaParrafo : utlitarios.calculaMayor(alturaParrafo,alturaImg)
        }
        info.style.height = (alturaForInfoDiv + 10)+"px"
        
    },
    createdDefinicion : (e) => {
        let definicion  = e.dataset.definicion
        let divDefinicion = document.createElement("div")
        let iconClose = document.createElement("span")
        let posicionElemento = null
        divDefinicion.innerText = definicion
        iconClose.className = "icon-close"
        iconClose.addEventListener('click', () => {
            let p = iconClose.parentNode.parentNode
            p.removeChild(p.querySelector(".definicion"))
        })
        divDefinicion.className = "definicion transition"
        divDefinicion.appendChild(iconClose)
        e.appendChild(divDefinicion)
        divDefinicion.style.top = "-"+divDefinicion.clientHeight+"px"
        posicionElemento = divDefinicion.getBoundingClientRect()
        if(posicionElemento.left < 0){
            divDefinicion.style.left = 0+"px" 
        }else if(posicionElemento.right < 0){
            divDefinicion.style.right = 0+"px" 
        }
    
    }
}