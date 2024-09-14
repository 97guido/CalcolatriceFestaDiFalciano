var tot = 0;

function init() {
    setButtonNames();
    setAllItems();
}

function setAllItems() {

    items.forEach(item => {

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
    
        if (item.categoria == "bar") document.querySelectorAll('#div_bere')[0].appendChild(newDiv);
        else document.querySelectorAll('#div_mangiare')[0].appendChild(newDiv);
    });


    // <div class="itemBox">
    //     <input id='btn_liquore' type="button" class="label_btn" onclick="addToItem('num_liquore')"/>
    //     <input type="button" value="-" class="del_btn" onclick="removeToItem('num_liquore')"/>
    //     <input id='num_liquore' type="number" oninput="updateNumber('num_liquore')" value="0"/>
    // </div>      
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

// function addToItem(numItem) {
//     ++(items[numItem].quantita);
//     document.getElementById(items[numItem].id_num).value = items[numItem].quantita;
//     updateConto();
// }

// function removeToItem(numItem) {
//     if (items[numItem].quantita < 1) return;
//     --(items[numItem].quantita);
//     document.getElementById(items[numItem].id_num).value = items[numItem].quantita;
//     updateConto();
// }

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

// function updateNumber(numItem) {
//     var qty = Number(document.getElementById(items[numItem].id_num).value);
//     if (qty < 0) qty = 0;
//     items[numItem].quantita = qty;
//     updateConto();
// }

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
            if (el.quantita > 0) {
                document.getElementById(el.id_num.replaceAll('num_', 'btn_')).style.background = 'green';
                document.getElementById(el.id_num).style.background = 'green';
            }
            else {
                document.getElementById(el.id_num.replaceAll('num_', 'btn_')).style.background = el.colore;
                document.getElementById(el.id_num).style.background = 'white';
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