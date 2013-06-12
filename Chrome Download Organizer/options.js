
// Adds a website filter
function addFilter() {
    if(document.getElementById("url").value==''){
        return;
    }
    if(document.getElementById("rename").value==''){
        return;
    }
    localStorage[document.getElementById("url").value] = document.getElementById("rename").value;
    document.getElementById("url").value='';
    document.getElementById("rename").value='';
    document.location.reload(true);
}

//Clear saved filters
function clearStorage() {
    if(document.getElementById("checkboxall").checked){
    localStorage.clear();
    }
    for(var i = 0; i < localStorage.length; i++){
        if(document.getElementById("checkbox" + localStorage.key(i)).checked){
            localStorage.removeItem(localStorage.key(i));
            }
    }
    document.location.reload(true);
}

//Catches enter in the second box
function enterPress(e) {
    if (e.keyCode == 13) {
        addFilter();
        return false;
    }
}


// Creates a table
function tableCreate(){
    var tblbody = document.getElementById('table');;
    var tbl  = document.createElement('table');
    tblbody.style.width='95%';
    tbl.style.width='95%';
    for(var i = 0; i < localStorage.length; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 3; j++){
            if(i==localStorage.length && j==3){
                break;
            } else {
                var td = tr.insertCell();
                td.style.border='2px solid black';
                td.style.width='33%';
                if(j == 2){
                    td.appendChild(document.createTextNode(localStorage.key(i)));
                }
                if(j == 1){
                    td.appendChild(document.createTextNode(localStorage[localStorage.key(i)]))
                }
                if(j == 0) {
                    var checkbox = document.createElement('input');
                    checkbox.type = "checkbox";
                    checkbox.name = "name";
                    checkbox.value = "value";
                    checkbox.id = "checkbox" + localStorage.key(i);
                    td.style.width='10%';
                    td.appendChild(checkbox);
                    td.appendChild(document.createTextNode("Remove"));
                }
            }
        }
    }
    var tr = tbl.insertRow();
    var td = tr.insertCell();
    
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.value = "value";
    checkbox.id = "checkboxall";
    td.style.width='10%';
    td.style.border='2px solid black';
    td.appendChild(checkbox);
    td.innerHTML += "<b><u>Remove All</u></b>";
    var td = tr.insertCell();
    td.style.width='33%';
    td.style.border='2px solid black';
    td.appendChild(document.createTextNode(""));
    td.innerHTML = "<b><u>Folder Name:</u></b>";
    var td = tr.insertCell();
    td.style.width='33%';
    td.style.border='2px solid black';
    td.appendChild(document.createTextNode(""));
    td.innerHTML = "<b><u>URL:</u></b>";
    tblbody.appendChild(tbl);
    return 
}

// Restores table state to saved value from localStorage.
function restore_options() {
    tableCreate();
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#add').addEventListener('click', addFilter);
document.querySelector('#clear').addEventListener('click', clearStorage);
document.getElementById('rename').addEventListener('keyup', enterPress);
