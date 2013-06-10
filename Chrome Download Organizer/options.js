// Save this script as `options.js`

// Saves options to localStorage.
function save_options() {
    var select = document.getElementById("color");
    var color = select.children[select.selectedIndex].value;
    localStorage["color"] = color;
    
    // Update status to let user know options were saved.
    document.location.reload(true);
}

// Adds a website filter
function addFilter() {
    localStorage["testkey"] = "testvalue";
    localStorage[document.getElementById("url").value] = document.getElementById("rename").value;
    document.location.reload(true);
}

//Clear saved filters
function clearStorage() {
    localStorage.clear();
    document.location.reload(true);
}

// Creates a table
function tableCreate(){
    var body = document.body;
    var tbl  = document.createElement('table');
    tbl.style.width='100%';
    tbl.style.border='2px solid black';
    for(var i = 0; i < localStorage.length; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 2; j++){
            if(i==localStorage.length && j==2){
                break;
            } else {
                var td = tr.insertCell();
                if(j == 1){
                    td.appendChild(document.createTextNode(localStorage.key(i)));
                }
                if(j == 0){
                    td.appendChild(document.createTextNode(localStorage[localStorage.key(i)]))
                }
//                if(i==1&&j==1){
//                    td.setAttribute('rowSpan','2');
//                }
            }
        }
    }
    body.appendChild(tbl);
    return 
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    tableCreate();
    //    for (var i = 0; i < localStorage.length; ++i) {
    //        localstorage[i]
    //    }
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#add').addEventListener('click', addFilter);
document.querySelector('#clear').addEventListener('click', clearStorage);
