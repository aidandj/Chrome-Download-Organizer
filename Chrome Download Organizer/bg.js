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

	for (var i = 0; i < localStorage.length; ++i){
		var bFiletypeValid = false;
		var bUrlValid = false;
		var urls = undefined;
		var filetypes = undefined;

		var filterParts = localStorage.key(i).split(' ');
		for (var j in filterParts) {
			var temp = filterParts[j].split(':');

			switch(temp[0]) {
				case "url":
					urls = temp[1].split(',');
				break;

				case "filetype":
					filetypes = temp[1].split(',');
				break;
			}
		}

		if (urls) {
			for(var j in urls) {
				if (current.indexOf(urls[j]) !== -1) {
					bUrlValid = true;
				}
			}
		}

		if (filetypes) {
			for(var j in filetypes) {
				if (ifilename.indexOf(filetypes[j]) !== -1) {
					bFiletypeValid = true;
				}
			}
		}

		if ((!urls && bFiletypeValid) || (!filetypes && bUrlValid) || (bUrlValid && bFiletypeValid)){
			ifilename = localStorage[localStorage.key(i)] + '/' + item.filename;
		}
	}

	suggest({filename: ifilename, overwrite: false});
});
