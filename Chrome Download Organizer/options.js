//Google analytics code
var _gaCode = 'UA-41728018-1';

var _gaq = _gaq || [];
_gaq.push(['_setAccount', _gaCode]);
_gaq.push(['_setCustomVar',
           4,
           'Version',
           getVersion()
           ]);
_gaq.push(['_trackPageview']);

(function() {
 var ga = document.createElement('script');
 ga.type = 'text/javascript';
 ga.async = true;
 ga.src = 'https://ssl.google-analytics.com/ga.js';
 var s = document.getElementsByTagName('script')[0];
 s.parentNode.insertBefore(ga, s);
 })();


//Debugs for me
function message(msg) {
    var status = document.getElementById('status');
    status.innerHTML = msg;
    setTimeout(function() {
               status.innerHTML = "";
               }, 1750);
}

//Gets version number
function getVersion() {
    var manifestData = chrome.app.getDetails();
    return manifestData.version;
}

// Adds a website filter
function addFilter() {
    var _url = document.getElementById('url').value;
    var _folder = document.getElementById('rename').value;
    console.log(_url);
    var data = {};
    data[_url] = _folder;
    if(document.getElementById('url').value==''){
        document.getElementById('url').style.backgroundColor = 'red';
        document.getElementById('url').style.opacity = '0.4';
        setTimeout(function() {
                   document.getElementById('url').style.backgroundColor = '';
                   document.getElementById('url').style.opacity = '1';
                   }, 1750);
        document.getElementById('url').focus();
        return;
    }
    if(document.getElementById('rename').value==''){
        document.getElementById('rename').style.backgroundColor = 'red';
        document.getElementById('rename').style.opacity = '0.4';
        document.getElementById('rename').focus();
        setTimeout(function() {
                   document.getElementById('rename').style.backgroundColor = '';
                   document.getElementById('rename').style.opacity = '1';
                   }, 1750);
        document.getElementById('rename').focus();
        return;
    }
    chrome.storage.local.set(data, function() {
                             // Notify that we saved.
                             message('Settings saved');
                             debugChanges(data, 'Set');
                             });
    
    document.getElementById('url').value='';
    document.getElementById('rename').value='';
    tableCreate();
    //saveStorage();
}

//Clear saved filters
function clearStorage() {
    //var data = new Array();
    if(document.getElementById('checkboxall').checked){
        chrome.storage.local.clear(function() {
                                   // Notify that we saved.
                                   message('Settings saved');
                                   debugChanges(data, 'Local Set');
                                   });
        chrome.storage.sync.clear(function() {
                                  // Notify that we saved.
                                  message('Settings saved');
                                  debugChanges(data, 'Sync Set');
                                  });
        document.getElementById('filtercheckbox.jpg').checked = false;
        document.getElementById('filtercheckbox.torrent').checked = false;
        document.getElementById('filtercheckbox.mp3').checked = false;
        document.getElementById('filtercheckbox.doc').checked = false;
        document.getElementById('filtercheckbox.arch').checked = false;
        
        
    }
    chrome.storage.local.get(null, function(items) {
                             for(key in items) {
                             if((key == 'torrents') || (key == 'images') || (key == 'music') || (key == 'docs') || (key == 'arch')) {
                             continue;
                             }
                             if(document.getElementById('checkbox' + key).checked){
                             chrome.storage.local.remove(key, function() {
                                                         //console.log('removed ' + key);
                                                         //tableCreate();
                                                         });
                             
                             }
                             }
                             });
    if (arguments[0] !== null){
    chrome.storage.local.remove(arguments[0], function() {
                                console.log('removed ' + key);
                                //tableCreate();
                                });
    }
    //saveStorage();
}


//Catches enter in the second box
function enterPress(e) {
    if (e.keyCode == 13) {
        document.getElementById('url').focus();
        addFilter();
        return false;
    }
}

// Creates a table
function tableCreate(){
    chrome.storage.local.get(null, function(storage) {
                             var tblbody = document.getElementById('table');;
                             tblbody.innerHTML = '';
                             var tbl  = document.createElement('table');
                             for(key in storage){
                             if((key == 'torrents') || (key == 'images') || (key == 'music') || (key == 'docs') || (key == 'arch')) {
                             continue;
                             }
                             var tr = tbl.insertRow();
                             for(var j = 0; j < 3; j++){
                             if(j==3){
                             break;
                             } else {
                             var td = tr.insertCell();
                             td.style.border='2px solid black';
                             td.style.width='33%';
                             if(j == 2){
                             td.appendChild(document.createTextNode(key));
                             }
                             if(j == 1){
                             td.appendChild(document.createTextNode(storage[key]))
                             }
                             if(j == 0) {
//                             var removeButton = document.createElement('input');
//                             removeButton.type = "button";
//                             removeButton.id = "button" + key;
//                             removeButton.value = "Remove";
//                             //removeButton.onClick=clearStorage(key);
//                             //removeButton.addEventListener('click', clearStorage(key));
//                             td.appendChild(removeButton);
                             
                             var checkbox = document.createElement('input');
                             checkbox.type = "checkbox";
                             checkbox.name = "name";
                             checkbox.value = "value";
                             checkbox.id = "checkbox" + key;
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
                             });
    return
}

//sync back
function restoreStorage() {
    
    chrome.storage.sync.get(null, function(items) {
                             chrome.storage.local.set(items, function() {
                                                      //console.log("synced");
                                                      });
                             
                                                          });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
                                     for(key in changes) {
                                     if(key == 'torrents') {
                                        document.getElementById('filtercheckbox.torrent').checked = changes['torrents'].newValue;

                                        
                                        }
                                        if(key == 'images') {
                                        document.getElementById('filtercheckbox.jpg').checked = changes['images'].newValue;
                                        
                                        }if(key == 'music') {
                                        document.getElementById('filtercheckbox.mp3').checked = changes['music'].newValue;
                                        
                                        }
                                        if(key == 'docs') {
                                        document.getElementById('filtercheckbox.doc').checked = changes['docs'].newValue;
                                        
                                        }
                                        if(key == 'arch') {
                                        document.getElementById('filtercheckbox.arch').checked = changes['arch'].newValue;
                                     
                                     }
                                    if((namespace == 'local') && (changes[key].newValue == null)) {
                                     localStorage.removeItem(key);
                                     //console.log("Removed " + key +':'+changes[key].oldValue + 'localstorage now ' + localStorage[key]);
                                     chrome.storage.sync.remove(key, function() {
                                                                 //console.log('removed ' + key);
                                                                 //tableCreate();
                                                                 });                                     
                                     } else if((namespace == 'local') && (changes[key].newValue !== null)){
                                     var data = {};
                                     data[key] = changes[key].newValue;
                                               chrome.storage.sync.set(data , function() {
                                                                        // Notify that we saved.
                                                                        //message('Settings saved');
                                                                        });
                                               localStorage[key] = changes[key].newValue;
                                               //console.log("Added " + key +':'+changes[key].newValue + 'localstorage: ' + key + ' now ' + localStorage[key]);

                                               }
                                     else if((namespace == 'sync') && (changes[key].newValue == null)) {
                                     localStorage.removeItem(key);
                                     //console.log("Removed " + key +':'+changes[key].oldValue + 'localstorage now ' + localStorage[key]);
                                     chrome.storage.local.remove(key, function() {
                                                                //console.log('removed ' + key);
                                                                //tableCreate();
                                                                });                                     
                                     } else if((namespace == 'sync') && (changes[key].newValue !== null)){
                                     var data = {};
                                     data[key] = changes[key].newValue;
                                     chrome.storage.local.set(data , function() {
                                                              // Notify that we saved.
                                                              //message('Settings saved');
                                                              });
                                     localStorage[key] = changes[key].newValue;
                                     //console.log("Added " + key +':'+changes[key].newValue + 'localstorage now ' + localStorage[key]);
                                     }
                                     
                                     
                                     //valueChanged(changes["images"].newValue);
                                     }
                                     debugChanges(changes, 'onChanged ' + namespace);
                                     tableCreate();
                                     //updateCheckboxes();
                                     message("Filters Saved");
                                     });

// For debugging purposes:
function debugChanges(changes, namespace) {
    for (key in changes) {
        //console.log(namespace + ' Storage change: key='+key+' value='+JSON.stringify(changes[key]));
    }
}

//Sets filters based on checkboxes
function checkboxes() {
    chrome.storage.local.set({'images': document.getElementById('filtercheckbox.jpg').checked}, function() {
                             // Notify that we saved.
                             //message('Settings saved');
                             });
    chrome.storage.local.set({'torrents': document.getElementById('filtercheckbox.torrent').checked}, function() {
                             // Notify that we saved.
                             //message('Settings saved');
                             });
    chrome.storage.local.set({'music': document.getElementById('filtercheckbox.mp3').checked}, function() {
                             // Notify that we saved.
                             //message('Settings saved');
                             });
    chrome.storage.local.set({'docs': document.getElementById('filtercheckbox.doc').checked}, function() {
                             // Notify that we saved.
                             //message('Settings saved');
                             });
    chrome.storage.local.set({'arch': document.getElementById('filtercheckbox.arch').checked}, function() {
                             // Notify that we saved.
                             //message('Settings saved');
                             });
    //saveStorage();
    
}


// Restores table state to saved value from localStorage.
function restore_options() {
    tableCreate();
    restoreStorage();
    document.getElementById('version').innerHTML += getVersion();
    chrome.storage.sync.get(null, function(items) {
                             localStorage.images = items.images;
                             localStorage.torrents = items.torrents;
                             localStorage.music = items.music;
                             localStorage.docs = items.docs;
                             localStorage.arch = items.arch;
                             document.getElementById('filtercheckbox.jpg').checked = items.images;
                             document.getElementById('filtercheckbox.torrent').checked = items.torrents;
                             document.getElementById('filtercheckbox.mp3').checked = items.music;
                             document.getElementById('filtercheckbox.doc').checked = items.docs;
                             document.getElementById('filtercheckbox.arch').checked = items.arch;
                             });
    
}


document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#add').addEventListener('click', addFilter);
document.querySelector('#clear').addEventListener('click', clearStorage);
document.getElementById('rename').addEventListener('keyup', enterPress);
document.getElementById('url').addEventListener('keyup', enterPress);
document.getElementById('filtercheckbox.jpg').addEventListener('click', checkboxes);
document.getElementById('filtercheckbox.torrent').addEventListener('click', checkboxes);
document.getElementById('filtercheckbox.mp3').addEventListener('click', checkboxes);
document.getElementById('filtercheckbox.doc').addEventListener('click', checkboxes);
document.getElementById('filtercheckbox.arch').addEventListener('click', checkboxes);