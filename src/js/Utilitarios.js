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
    }
}
