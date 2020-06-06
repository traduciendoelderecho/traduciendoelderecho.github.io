const utlitarios = {
    filterForEtiqueta : (etiqueta,data) => {
        let arrayDatos = null;
        if(etiqueta == "recientes"){
            arrayDatos = data.slice(data.length - 6 )
        }else{
            arrayDatos = data.filter(item => item.tipopublicaion == etiqueta)
        }
        return arrayDatos.reverse()
    },
    filtraCategorias : (item) =>{
        item.publicaciones.filter((publicacion) => publicacion.categoria !== null)
        .map((publicacion) => {        
           let indice = item.categorias.findIndex(i => i.categoria == publicacion.categoria)
           if(indice == -1){
               item.categorias.push({categoria : publicacion.categoria,publicaciones : [utlitarios.getIndexForId(item.publicaciones,publicacion.id)]})
           }else{
               item.categorias[indice].publicaciones.push(utlitarios.getIndexForId(item.publicaciones,publicacion.id))
           }
       })
       return item.categorias
    },
    getIndexForId : (data,id)=>{
        return data.findIndex( i => i.id == id)
    },
    filtroPublicaciones : (itemMenuPublicacion,data,filtro) => {
        if(itemMenuPublicacion.publicaciones == null){
            itemMenuPublicacion.publicaciones =  filtro(itemMenuPublicacion.etiqueta,data)
            itemMenuPublicacion.categorias = utlitarios.filtraCategorias(itemMenuPublicacion)
        }
        return itemMenuPublicacion
    },
    filtrarPorTitulo : (publicaciones,key)=> publicaciones.filter( p => p.titulo.includes(key)),
    getQueryParam : () => {
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.entries().next().value !== undefined){
            let key  = urlParams.entries().next().value    
            utlitarios.ActionLoad( { clave : key[0], valor : key[1] } )
        }else {
            utlitarios.loadDefault()            
        }
    },
    ActionLoad : (valor) =>{
        switch(valor.clave){
            case 'publicacion':
                    request.getData(
                        (data)=>{
                            let publicacion = JSON.parse(data)
                            animations.openDetailsPublication(publicacion)
                            loaderApp.style.display = "none"
                            utlitarios.getPublicationsSmall(publicacion)
                        },urlBaseDB+"/src/js/publicaciones/"+valor.valor+".json")
                         menuAppSelected = publicacionDetallecont
                         
                break
            case 'seccion':
                    if(valor.valor == "conocenos"){
                        nosotrosOption.srcContent.style.display = "block"
                        menuAppSelected = nosotrosOption
                        loaderApp.style.display = "none"
                    }else if(valor.valor == "contacto"){
                        contactoOption.srcContent.style.display = "block"
                        loaderApp.style.display = "none"
                        menuAppSelected = contactoOption
                    }else {
                        menuAppSelected = publicacionesOption
                        window.location=urlBaseDB
                    }
                    utlitarios.getPublicationsSmall()
                break
            default:
                menuAppSelected = publicacionesOption
                window.location=urlBaseDB
                break
        }
        
       
        
    },
    loadDefault : () => {
        request.getData((response)=>{   
            dataPublicationsSmall  = JSON.parse(response)
            animations.resaltarItemMenu(itemMenuPublications.button)
            animations.addPublicationsToContainer(itemMenuPublications.filtro(dataPublicationsSmall),contPublicaciones)
            animations.resaltarItemMenuSelected(menuAppSelected.buttons)
            if(itemMenuPublications.categorias.length == 0){
                comboCategorias.style.display = "none"
            }else{
                comboCategorias.style.display = "inline-grid"
                animations.createItemsForCateories(itemMenuPublications.categorias,contCategorias)
            }
            menuAppSelected.srcContent.style.display = "block"
            loaderApp.style.display = "none"    
                    
        },
            urlBaseDB+"/src/js/data-publications-small.json"
        )
    },getPublicationsSmall : (publicacion) => {
        request.getData(
            (response)=>{
                dataPublicationsSmall  = JSON.parse(response)
                animations.resaltarItemMenu(itemMenuPublications.button)
                animations.addPublicationsToContainer(itemMenuPublications.filtro(dataPublicationsSmall),contPublicaciones)
                animations.resaltarItemMenuSelected(menuAppSelected.buttons)
                let recomendados = dataPublicationsSmall.filter(e => e.tipopublicaion == publicacion.tipo.tipoPublicacion && e.id !== publicacion.id).reverse()
                animations.addPublicationsToContainer(recomendados.slice(recomendados.length - 4),contRecomendados)
            },
            urlBaseDB+"/src/js/data-publications-small.json"
        )
    },
    createID : (texto)=>{
        return Array.from(texto,i => (i == " ") ? "" : i).join("")
    }

}
