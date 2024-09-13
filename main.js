var tot = 0;


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
                document.getElementById(el.id_num.replaceAll('num_', 'btn_')).style.background = 'white';
                document.getElementById(el.id_num).style.background = 'white';
            }
        }
    });
    document.getElementById('totBox').innerHTML = `€ ${tot}`.replaceAll('.', ',');
}

function cancellaTutto() {
    tot = 0;
    items.forEach(el => {
        el.quantita = 0;
    });
    document.getElementById('totBox').innerHTML = 'Totale:';
    updateConto();
}