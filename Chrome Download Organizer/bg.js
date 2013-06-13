chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
                                                   var current = item.url;
                                                   var ifilename = item.filename;
                                                   var jfilename = item.filename;
    for (var i = 0; i < localStorage.length; ++i){
                                                   if((localStorage.key(i) == 'torrents') || (localStorage.key(i) == 'images') || (localStorage.key(i) == 'music')) {
                                                   continue;
                                                   }
        if (current.indexOf(localStorage.key(i)) !== -1){
                ifilename = localStorage[localStorage.key(i)] + '/' + item.filename;
                                                   }
    }
                                                   if(localStorage.torrents && (jfilename.indexOf('.torrent') !== -1)) {
                                                        ifilename = 'Torrents/' + ifilename;
                                                   }
                                                   if(localStorage.music && ((jfilename.indexOf('.mp3') !== -1) || (jfilename.indexOf('.wav') !== -1))) {
                                                   ifilename = 'Music/' + ifilename;
                                                   }
                                                   if(localStorage.images && ((jfilename.indexOf('.jpg') !== -1) || (jfilename.indexOf('.png') !== -1))) {
                                                   ifilename = 'Images/' + ifilename;
                                                   }
                                                   if(localStorage.docs && ((jfilename.indexOf('.doc') !== -1) || (jfilename.indexOf('.ppt') !== -1) || (jfilename.indexOf('.rtf') !== -1) || (jfilename.indexOf('.xls') !== -1) || (jfilename.indexOf('.pdf') !== -1) || (jfilename.indexOf('.txt') !== -1) || (jfilename.indexOf('.xls') !== -1))) {
                                                   ifilename = 'Documents/' + ifilename;
                                                   }

     suggest({filename: ifilename, overwrite: false});
});
