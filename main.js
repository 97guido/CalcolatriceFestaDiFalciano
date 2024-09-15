var tot = 0;

function init() {
    setButtonNames();
    setAllItems();
}

function setAllItems() {

    items.forEach(item => {

        var newDiv = createListItem(item);
    
        if (item.categorie.includes("cibo")) document.querySelectorAll('#div_mangiare')[0].appendChild(newDiv);
        if (item.categorie.includes("bar")) document.querySelectorAll('#div_bere')[0].appendChild(newDiv);
        if (item.categorie.includes("cibo") && item.categorie.includes("bar")) {
            var newDivDup = createListItem(item);
            document.querySelectorAll('#div_mangiare')[0].appendChild(newDivDup);
        };
    });   
}

function createListItem(item) {
    var newDiv = document.createElement('div');
    newDiv.classList.add("itemBox");

    var newBtn = document.createElement('input');
    newBtn.id = item.id_num.replaceAll('num_', 'btn_');
    newBtn.type = "button";
    newBtn.value = item.name;
    newBtn.style.background = item.colore;
    newBtn.classList.add("label_btn");
    newBtn.onclick = function() { addToItem(item.id_num) };
    
    var newBtnDel = document.createElement('input');
    newBtnDel.value = "-";
    newBtnDel.type = "button";
    newBtnDel.classList.add("del_btn");
    newBtnDel.onclick = function() { removeToItem(item.id_num) };
    
    var newNum = document.createElement('input');
    newNum.id = item.id_num;
    newNum.type = "number";
    newNum.value = 0;
    newNum.oninput = function() { updateNumber(item.id_num) };

    newDiv.appendChild(newBtn);
    newDiv.appendChild(newBtnDel);
    newDiv.appendChild(newNum);

    return newDiv;
}


function setButtonNames() {
    document.querySelectorAll('div > div > div > input[type=button]').forEach(el => {
        if (el.id != '') {
            var idToFind = el.id.replaceAll('btn_','num_');
            items.forEach(item => {
                if (idToFind == item.id_num) el.value = item.name;
            });
        }
    });
}

function addToItem(idItem) {
    
    var numItem = -1;
    
    items.forEach((el, index) => {
        if (el.id_num == idItem) numItem = index;
    });

    if (numItem == -1) return;

    ++(items[numItem].quantita);
    document.getElementById(items[numItem].id_num).value = items[numItem].quantita;
    updateConto();
}

function removeToItem(idItem) {

    var numItem = -1;
    
    items.forEach((el, index) => {
        if (el.id_num == idItem) numItem = index;
    });

    if (numItem == -1) return;

    if (items[numItem].quantita < 1) return;
    --(items[numItem].quantita);
    document.getElementById(items[numItem].id_num).value = items[numItem].quantita;
    updateConto();
}

function updateNumber(idItem) {

    var numItem = -1;
    
    items.forEach((el, index) => {
        if (el.id_num == idItem) numItem = index;
    });

    if (numItem == -1) return;

    var qty = Number(document.getElementById(items[numItem].id_num).value);
    if (qty < 0) qty = 0;
    items[numItem].quantita = qty;
    updateConto();
}

function updateConto() {
    tot = 0;
    
    items.forEach(el => {
        tot += el.prezzo * el.quantita;

        if (document.getElementById(el.id_num) != undefined) {
            document.getElementById(el.id_num).value = el.quantita;

            document.querySelectorAll(`#${el.id_num}`).forEach(node => {
                node.value = el.quantita;
            });

            if (el.quantita > 0) {
                document.querySelectorAll(`#${el.id_num.replaceAll('num_', 'btn_')}`).forEach(node => { node.style.background = '#71c06a'; });
                document.querySelectorAll(`#${el.id_num}`).forEach(node => { node.style.background = '#71c06a'; });
            }
            else {
                document.querySelectorAll(`#${el.id_num.replaceAll('num_', 'btn_')}`).forEach(node => { node.style.background = el.colore; });
                document.querySelectorAll(`#${el.id_num}`).forEach(node => { node.style.background = 'white'; });
            }
        }




    });
    document.getElementById('totBox').innerHTML = `Totale € ${tot.toFixed(2)}`.replaceAll('.', ',');
    calcolaResto();
}

function cancellaTutto() {
    tot = 0;
    items.forEach(el => {
        el.quantita = 0;
    });
    document.getElementById('totBox').innerHTML = 'Totale:';
    updateConto();
    document.getElementById('num_pagato').value = undefined;
    document.getElementById('restoBox').innerText = 'Resto € 0';
}

function calcolaResto() {
    var pagato = document.getElementById('num_pagato').value;
    if (tot >= pagato) {
        document.getElementById('restoBox').innerText = 'Resto € 0';
        return;
    }
    document.getElementById('restoBox').innerText = `Resto € ${(pagato-tot).toFixed(2).replaceAll('.', ',')}`;
}