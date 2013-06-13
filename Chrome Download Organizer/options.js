//Debugs for me
function message(msg) {
var status = document.getElementById('status');
status.innerHTML = msg;
setTimeout(function() {
           status.innerHTML = "";
           }, 1750);
}
    
// Adds a website filter
function addFilter() {
    if(document.getElementById('url').value==''){
        return;
    }
    if(document.getElementById('rename').value==''){
        return;
    }
    localStorage[document.getElementById('url').value] = document.getElementById('rename').value;
    document.getElementById('url').value='';
    document.getElementById('rename').value='';
    //document.location.reload(true);
    tableCreate();
    saveStorage();
}

//Clear saved filters
function clearStorage() {
    if(document.getElementById('checkboxall').checked){
    localStorage.clear();
    }
    for(var i = 0; i < localStorage.length; i++){
        if((localStorage.key(i) == 'torrents') || (localStorage.key(i) == 'images') || (localStorage.key(i) == 'music') || (localStorage.key(i) == 'docs')) {
            continue;
        }
        if(document.getElementById('checkbox' + localStorage.key(i)).checked){
            localStorage.removeItem(localStorage.key(i));
            i = 0;
            }
    }
    //document.location.reload(true);
    tableCreate();
    saveStorage();
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
    tblbody.innerHTML = '';
    var tbl  = document.createElement('table');
    tblbody.style.width='95%';
    tbl.style.width='95%';
    for(var i = 0; i < localStorage.length; i++){
        if((localStorage.key(i) == 'torrents') || (localStorage.key(i) == 'images') || (localStorage.key(i) == 'music') || (localStorage.key(i) == 'docs')) {
            continue;
        }
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

//sync accross accounts
function saveStorage() {
    var obj = {};
    for (var i = 0; i < localStorage.length; ++i){
        obj[localStorage.key(i)] = localStorage[localStorage.key(i)];
    }
    chrome.storage.sync.set(obj, function() {
                            message('Settings Sync');
                             });
}

//sync back (not functional)
//function restoreStorage() {
//    chrome.storage.local.get(null, function(items) {
//                             for (var i = 0; i < items.length; ++i){
//                             localStorage.key(i) = localStorage[localStorage.key(i)];
//                             }
//
//                             });
//
//}

//Sets filters based on checkboxes
function checkboxes() {
    chrome.storage.local.set({'images': document.getElementById('filtercheckbox.jpg').checked}, function() {
                            // Notify that we saved.
                            message('Settings saved');
                            });
    chrome.storage.local.set({'torrents': document.getElementById('filtercheckbox.torrent').checked}, function() {
                            // Notify that we saved.
                            message('Settings saved');
                            });
    chrome.storage.local.set({'music': document.getElementById('filtercheckbox.mp3').checked}, function() {
                            // Notify that we saved.
                            message('Settings saved');
                            });
    chrome.storage.local.set({'docs': document.getElementById('filtercheckbox.doc').checked}, function() {
                            // Notify that we saved.
                            message('Settings saved');
                            });
    tableCreate();
    //saveStorage();

}


// Restores table state to saved value from localStorage.
function restore_options() {
    tableCreate();
    
    chrome.storage.local.get(null, function(items) {
                            localStorage.images = items.images;
                            localStorage.torrents = items.torrents;
                            localStorage.music = items.music;
                            localStorage.docs = items.docs;
                             document.getElementById('filtercheckbox.jpg').checked = items.images;
                             document.getElementById('filtercheckbox.torrent').checked = items.torrents;
                             document.getElementById('filtercheckbox.mp3').checked = items.music;
                             document.getElementById('filtercheckbox.doc').checked = items.docs;
                             });

   }
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#add').addEventListener('click', addFilter);
document.querySelector('#clear').addEventListener('click', clearStorage);
document.getElementById('rename').addEventListener('keyup', enterPress);
document.getElementById('filtercheckbox.jpg').addEventListener('click', checkboxes);
document.getElementById('filtercheckbox.torrent').addEventListener('click', checkboxes);
document.getElementById('filtercheckbox.mp3').addEventListener('click', checkboxes);
document.getElementById('filtercheckbox.doc').addEventListener('click', checkboxes);