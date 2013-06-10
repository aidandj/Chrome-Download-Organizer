chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
    var current = item.url;
    for (var i = 0; i < localStorage.length; ++i){
        if (current.search(localStorage[localStorage.key(i)])){
            suggest({filename: localStorage[localStorage.key(i)] + '/' + item.filename, overwrite: false});
        }
    }
});
