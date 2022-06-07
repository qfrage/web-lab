let DATA;
let catalog_data;
let catalog_id = document.getElementById("catalog")
let admin_panel = document.getElementById("admin-panel");
var catalog_item = 
`<div class="catalog-item">
<div class="image">
    <img src="item-photo/0.jpg" alt="" class = "item-photo">
</div>
<div class="info">
    <p class = 'info-name'>Ivan Ivanovich Ivan</p>
    <p class="info-work">Work</p>
    <p class="info-special">Special</p>
</div>
</div>`

let sort_by = ""

function getFile (fileName) {

    var request = new XMLHttpRequest();

    request.open('GET', fileName);

    request.onloadend = function() {
        parse(request.responseText);
    }

    request.send();
}
function loadCatalog(obj){
    catalog_id.innerHTML = ""
    obj.forEach(element => {
        if(sort_by != ""){
            if(sort_by == "cook" && element.Work != "Кухар") return true
            else if(sort_by == "of" && element.Work != "Офіціант") return true
            else if(sort_by == "bar" && element.Work != "Бармен") return true
        }
        catalog_id.innerHTML+=
        `<div class="catalog-item">
            <div class="image">
                <img src="${element.Photo}" alt="" class = "item-photo">
            </div>
            <div class="info">
                <p class = 'info-name'>${element.Surname} ${element.Name} ${element.Patronymic}</p>
                <p class="info-work">Спеціальність: ${element.Work}</p>
                <p class="info-special">Стаж: ${element.Level}</p>
            </div>
        </div>`
    });
    catalog_data = obj;
}

function parse(obj) {

    catalog_data = JSON.parse(obj);
    loadCatalog(catalog_data)
}

function filter_set(filter_name){
    sort_by = filter_name
    getFile('catalog.json')
}
function showAdminPanel(){
    if(admin_panel.style.display == "none"){
        admin_panel.style.display = "block"

    }else{
        admin_panel.style.display = 'none'
    }
}
function addNewPers(){
    let name = document.getElementById("admin-input-name").value;
    let surname = document.getElementById("admin-input-surname").value;
    let patr = document.getElementById("admin-input-patronymic").value;
    let level = document.getElementById("admin-input-level").value;
    let work =  document.getElementById("admin-input-work");
    var strUser = work.options[work.selectedIndex].text;
    let photo = document.getElementById("admin-input-photo").value;
    catalog_id.innerHTML+=
        `<div class="catalog-item">
            <div class="image">
                <img src="${photo}" alt="" class = "item-photo">
            </div>
            <div class="info">
                <p class = 'info-name'>${surname} ${name} ${patr}</p>
                <p class="info-work">Спеціальність: ${strUser}</p>
                <p class="info-special">Стаж: ${level}</p>
            </div>
        </div>`
}
getFile('catalog.json'); //путь к файлу


