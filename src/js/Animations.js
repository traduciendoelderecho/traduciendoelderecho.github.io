let banderaFiltro = false;
const  animations = {
        showOrCloseFormFilter: ( formFilter , contFormFilter,logoBuscar,logo) =>{
            if(banderaFiltro){        
                formFilter.style.display="none"
                contFormFilter.style.gridColumnStart="logobuscar"
                contFormFilter.style.gridColumnEnd="logobuscar"
                contFormFilter.style.gridRowStart="logobuscar"
                contFormFilter.style.gridRowEnd="logobuscar"
                logoBuscar.style.backgroundColor = "transparent"
                logoBuscar.style.backgroundImage = "url(./src/imagenes/icons/search.svg)"
                logo.style.display = "inline-block"
                banderaFiltro = false
            }else{
                formFilter.style.display="inline-block"
                if(document.body.clientWidth <= 411){
                    contFormFilter.style.gridColumnStart="logo"
                    contFormFilter.style.gridColumnEnd="logobuscar"
                    contFormFilter.style.gridRowStart="logo"
                    contFormFilter.style.gridRowEnd="logo"
                    logo.style.display = "none"
                }else{
                    contFormFilter.style.gridColumnStart="nada"
                    contFormFilter.style.gridColumnEnd="logobuscar"
                    contFormFilter.style.gridRowStart="nada"
                    contFormFilter.style.gridRowEnd="nada"
                }
                
                logoBuscar.style.backgroundColor = "#ECECEC"
                logoBuscar.style.backgroundImage = "url(./src/imagenes/icons/search-dark.svg)"
                banderaFiltro=true
            }
        },
        createItemsForCateories : (data,containerItems) => {
                while(containerItems.firstChild){
                    containerItems.removeChild(containerItems.firstChild)
                }
                data.forEach((item) => {
                    let divText = document.createElement("div")
                    let divIcon = document.createElement("div")
                    divText.className ="items-combo-categorias"
                    divText.innerText = item.title
                    divText.addEventListener('click',(e)=>{
                        console.log(e.srcElement.innerText)
                    })
                    divIcon.className = "icon-check"
                    divText.appendChild(divIcon)
                    containerItems.appendChild(divText)
                    
                   
                })
        }
}