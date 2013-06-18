function openOrFocusOptionsPage() {
    var optionsUrl = chrome.extension.getURL('options.html');
    chrome.tabs.query({}, function(extensionTabs) {
                      var found = false;
                      for (var i=0; i < extensionTabs.length; i++) {
                      if (optionsUrl == extensionTabs[i].url) {
                      found = true;
                      //console.log("tab id: " + extensionTabs[i].id);
                      chrome.tabs.update(extensionTabs[i].id, {"selected": true});
                      }
                      }
                      if (found == false) {
                      chrome.tabs.create({url: "options.html"});
                      }
                      });
}
chrome.extension.onConnect.addListener(function(port) {
                                       var tab = port.sender.tab;
                                       // This will get called by the content script we execute in
                                       // the tab as a result of the user pressing the browser action.
                                       port.onMessage.addListener(function(info) {
                                                                  var max_length = 1024;
                                                                  if (info.selection.length > max_length)
                                                                  info.selection = info.selection.substring(0, max_length);
                                                                  openOrFocusOptionsPage();
                                                                  });
                                       });

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
                                           openOrFocusOptionsPage();
                                           });

chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
                                                   var current = item.url;
                                                   var ifilename = item.filename;
                                                   var jfilename = item.filename;
    for (var i = 0; i < localStorage.length; ++i){
                                                   if((localStorage.key(i) == 'torrents') || (localStorage.key(i) == 'images') || (localStorage.key(i) == 'music') || (localStorage.key(i) == 'docs') || (localStorage.key(i) == 'arch')) {
                                                   continue;
                                                   }
        if (current.indexOf(localStorage.key(i)) !== -1){
                ifilename = localStorage[localStorage.key(i)] + '/' + item.filename;
                                                   }
    }
                                                   if((localStorage.torrents == 'true') && (jfilename.indexOf('.torrent') !== -1)) {
                                                   console.log("Torrents added because localStorage.torrents = " + localStorage.torrents);
                                                        ifilename = 'Torrents/' + ifilename;
                                                   }
                                                   if((localStorage.music == 'true') && ((jfilename.indexOf('.mp3') !== -1) || (jfilename.indexOf('.wav') !== -1))) {
                                                   ifilename = 'Music/' + ifilename;
                                                   }
                                                   if((localStorage.images == 'true') && ((jfilename.indexOf('.jpg') !== -1) || (jfilename.indexOf('.png') !== -1))) {
                                                   ifilename = 'Images/' + ifilename;
                                                   }
                                                   if((localStorage.docs == 'true') && ((jfilename.indexOf('.doc') !== -1) || (jfilename.indexOf('.ppt') !== -1) || (jfilename.indexOf('.rtf') !== -1) || (jfilename.indexOf('.xls') !== -1) || (jfilename.indexOf('.pdf') !== -1) || (jfilename.indexOf('.txt') !== -1) || (jfilename.indexOf('.xls') !== -1))) {
                                                   ifilename = 'Documents/' + ifilename;
                                                   }
                                                   if((localStorage.arch == 'true') && ((jfilename.indexOf('.zip') !== -1) || (jfilename.indexOf('.rar') !== -1) || (jfilename.indexOf('.dmg') !== -1))) {
                                                   ifilename = 'Archives/' + ifilename;
                                                   }

     suggest({filename: ifilename, overwrite: false});
});
