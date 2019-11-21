/*********************************************************** */
/** Data Manipulation */
var data = {name: "", url: "", image: "", notes: "", fonts: [], colors: []};
datacollect();

//Data Collect
function datacollect () {
    /************************************** */
    var link = "";
    var title = "";

    //Get active tab url and name
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        var tab = tabs[0];

        link = tab.url;
        title = tab.title;

        var linksection = document.getElementById("url");
        var titlesection = document.getElementById("title");

        data.name = title;
        data.url = link;

        linksection.innerText = link;
        titlesection.innerText = title;

    });

    //Get screenshot of the visible section on the active tab
    chrome.tabs.captureVisibleTab(null, {}, function(screenshot) {
        var image = document.getElementById("screenshot");

        image.src = screenshot;

        data.image = screenshot;
    });

    /************************************* */
    //Color detection code
    var screenshot = document.getElementById("screenshot");
    var colors = [];

    screenshot.addEventListener('load', function() {
        Vibrant.from(screenshot).getPalette().then(function(palette) {
        
            for(var swatch in palette) {
                if(palette.hasOwnProperty(swatch) && palette[swatch]) {
                    var hexcolor = palette[swatch].getHex();

                    var div = document.createElement('div');
                    div.style.width = "100px";
                    div.style.height = "70px";
                    div.style.background = hexcolor;
                    div.id = "color_" + hexcolor;

                    document.getElementById('color_scheme').appendChild(div);
                    
                    var color_value = document.createTextNode(hexcolor);
                    document.getElementById(div.id).appendChild(color_value);

                    colors.push(hexcolor);
                }
            }

            data.colors = colors;

        });
    });

    /****************************************** */
    //Fonts Script Execution
    chrome.tabs.executeScript({
        file: '/src/js/fonts.js'
    });

    //Receiving fonts from content scripts
    var receivedfonts = [];
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
        if (request.greeting == "Wanderer Fonts Detection") {
            receivedfonts = request.data;

            data.fonts = receivedfonts;

            sendResponse({farewell: "goodbye"});

            for (var i = 0; i < receivedfonts.length; i++) {
        
                var li = document.createElement('li');
                var lifont = document.createTextNode(receivedfonts[i]);
        
                li.className = "capitalize";
                li.appendChild(lifont);
                document.getElementById('fonts_used').appendChild(li);
            }
        }
    });
}

/********************************************************** */
//Saving data
document.getElementById('savebutton').addEventListener('click', function() {
    var extra_notes = document.getElementById('notes').value;

    data.notes = extra_notes;
    console.log(extra_notes);

    localStorage.setItem(data.name, JSON.stringify(data));
});