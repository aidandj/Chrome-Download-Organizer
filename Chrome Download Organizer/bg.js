// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Force all downloads to overwrite any existing files instead of inserting
// ' (1)', ' (2)', etc.

chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
    var current = item.url;
    for (var i = 0; i < localStorage.length; ++i){
        if (current.search(localStorage[localStorage.key(i)])){
            suggest({filename: localStorage[localStorage.key(i)] + '/' + item.filename, overwrite: false});
                                                   }
                                                   }

});
