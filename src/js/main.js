let Data = null;
const formFilter = document.getElementById("form-filter");
const contFormFilter = document.getElementById("cont-form-filter");
const logoBuscar =  document.getElementById("logoBuscar")
const  logo =  document.getElementById("logo");
/*
document.addEventListener('DOMContentLoaded',request.getData(
    (response)=>{
        Data  = JSON.parse(response)
    },
    "https://traduciendoelderecho.github.io/src/js/data.json"
    ))
*/
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
                Data  = JSON.parse(response)
                animations.createItemsForCateories(Data,document.getElementById("cont-items-cat"))
                document.getElementById("loader-6").style.display ="none"
            },
            "https://traduciendoelderecho.github.io/src/js/data.json"
            )
       }
    }    
)


