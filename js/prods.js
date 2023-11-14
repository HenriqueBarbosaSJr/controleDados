// Referências do DOM - HTML

const tbodyList = document.getElementById('tbodyList');
const popup = document.querySelector('.popupWrapper');

const lblCod = document.getElementById('lblCod');
const inpNome = document.getElementById('inpNome');
const inpDesc = document.getElementById('inpDesc');
const inpQtda = document.getElementById('inpQtda');
const inpFab = document.getElementById('inpFab');
const inpPreco = document.getElementById('inpPreco');
const inpCusto = document.getElementById('inpCusto');


const btnAlterar = document.getElementById('btnAlterar');

// Código

let cod;

const api = axios.create({
    baseURL: "https://backend-pg-neon.onrender.com",
    
});

async function consultaGeral(){

       console.log('Consulta de Dados....');

        const res = await api.get('/produtos');
        const data = res.data.result;
      

        console.log('Realizando a Consulta ....');
        console.log(res.data.result);


        let i, tr;
        tbodyList.innerHTML ='';
        for (i = 0; i < data.length; i++ ){
            tr = '<tr>' +
                     '<td>' + data[i].cod + '</td>' +
                     '<td>' + data[i].nome + '</td>' +
                     '<td>' + data[i].descri + '</td>' +
                     '<td>' + data[i].fabricante + '</td>' +
                     '<td>' + data[i].qtda + '</td>' +
                     '<td>' + data[i].preco + '</td>' +
                     '<td>' + data[i].custo + '</td>' +
                     '<td>' + data[i].data + '</td>' +
                     '<td> <a id="btnUpdade" onclick="onEdit(this)"> <img class="imgUpdate"src="../img/updateIcon.png" > </a>' + '</td>' +
                  '</tr>';
            tbodyList.innerHTML += tr;
            tr = tbodyList.childNodes;
        }      
}

function onEdit(td){
  
    let dateselection = td.parentElement.parentElement;
    console.log(dateselection);
    popup.style.display = 'block'; 

    cod = dateselection.cells[0].innerHTML;
    lblCod.innerHTML = cod;
    inpNome.value = dateselection.cells[1].innerHTML;
    inpDesc.value = dateselection.cells[2].innerHTML;
    inpFab.value = dateselection.cells[3].innerHTML;
    inpQtda.value = dateselection.cells[4].innerHTML;
    inpPreco.value = dateselection.cells[5].innerHTML;
    inpCusto.value = dateselection.cells[6].innerHTML;
}

async function updateProds(){
    let nome = inpNome.value;
    let descri = inpDesc.value;
    let fabricante = inpFab.value;
    let qtda = parseInt(inpQtda.value);
    let preco = parseFloat(inpPreco.value);
    let custo = parseFloat(inpCusto.value);

    console.log('Código do produto = ' + cod);
    console.log(preco);
    console.log(typeof(custo));


    data ={
        "nome" : nome,
        "descri" : descri, 
        "fabricante" : fabricante,
        "qtda" : qtda,
        "preco" : preco,
        "custo" : custo
    }

    console.log(data);
    const response = await api.put('/produtos/' + cod, data);
    console.log("Alteração Realizada!");
    consultaGeral();
}

btnAlterar.onclick = ()=>{
    updateProds();
    console.log(cod);
}

popup.addEventListener('click', event => {
    const classClicada = event.target.classList[0];
     //console.log(classClicada); //exibe a classe clicada 
    if (  classClicada === 'popupClose' || 
             classClicada === 'closelinkpopup' ){

                   popup.style.display = 'none'; 
        }
})


consultaGeral();