var data = {name: "", url: "", image: "", notes: "", colors: [], fonts: []};

var allkeys = Object.keys(localStorage);

for(var i = 0; i < allkeys.length; i++) {
    var mainkey = localStorage.getItem(allkeys[i]);
    
    //Converting JSON to Object
    data = JSON.parse(mainkey);

    /************************************************************ */
    var maindiv = document.getElementById('designs');

    //main div per element
    var div = document.createElement('div');
    div.id = "design_" + i;
    div.classList.add("saved_design");
    maindiv.appendChild(div);

    var sub_div_id = document.getElementById("design_" + i);

    /************************************************************ */
    // Image
    var image = document.createElement('img');
    image.id = div.id + "_image";
    image.classList.add("designs_image");
    image.src = data.image;
    sub_div_id.appendChild(image);

    /************************************************************ */
    // Title
    var title = document.createElement('a');
    title.id = div.id + "_title";
    title.classList.add("designs_title");
    title.href = data.url;
    sub_div_id.appendChild(title);

    var title_id = document.getElementById(div.id + "_title");

    var title_content = document.createTextNode(data.name);
    title_id.appendChild(title_content);

    /************************************************************ */
    // Extra Notes
    var extra_notes = document.createElement('p');
    extra_notes.id = div.id + "_notes";
    extra_notes.classList.add("designs_notes");
    sub_div_id.appendChild(extra_notes);

    var extra_notes_id = document.getElementById(div.id + "_notes");

    var notes_content = document.createTextNode(data.notes);
    extra_notes.appendChild(notes_content);

    /************************************************************ */
    // ColorsList
    var colors = document.createElement('div');
    colors.id = div.id + "_colors";
    colors.classList.add("designs_colors");
    sub_div_id.appendChild(colors);

    var colors_id = document.getElementById(div.id + "_colors");

    var colors_list = data.colors;
    for(var color in colors_list) {
        var colordiv = document.createElement('div');
        colordiv.classList.add('designs_single_color');
        colordiv.style.width = "75px";
        colordiv.style.height = "50px";
        colordiv.style.background = colors_list[color];

        colors_id.appendChild(colordiv);
    }

    /************************************************************ */
    // ColorsList
    var fonts = document.createElement('ul');
    fonts.id = div.id + "_fonts";
    fonts.classList.add("designs_fonts");
    sub_div_id.appendChild(fonts);

    var fonts_id = document.getElementById(div.id + "_fonts");

    var fonts_list = data.fonts;
    for(var font in fonts_list) {

        console.log(fonts_list[font]);

        var fontli = document.createElement('li');
        fontli.id = 'design_' + i + '_font' + font;
        fontli.classList.add('designs_single_font');
        fonts_id.appendChild(fontli);

        var font_content = document.createTextNode(fonts_list[font]);
        document.getElementById('design_' + i + '_font' + font).appendChild(font_content);
    }

    /* Colors Element */
    var colors_title = document.createElement('p');
    colors_title.classList.add('colors_init');
    colors_title.appendChild(document.createTextNode('Color Scheme: '));
    sub_div_id.insertBefore(colors_title, colors_id);

    /* Fonts Element */
    var fonts_title = document.createElement('p');
    fonts_title.classList.add('fonts_init');
    fonts_title.appendChild(document.createTextNode('Fonts Used: '))
    sub_div_id.insertBefore(fonts_title, fonts_id);

    /* Delete Button */
    var delete_button = document.createElement('button');
    delete_button.classList.add('btn-delete', 'btn', 'btn-lg', 'btn-outline-info');
    delete_button.type = 'button';
    delete_button.id = div.id + "_delete";
            
    var delete_icon = document.createElement('i');
    delete_icon.classList.add('fa', 'fa-trash-o');
    delete_button.appendChild(delete_icon);

    sub_div_id.appendChild(delete_button);

    var delete_id = div.id + "_delete";
    document.getElementById(delete_id).addEventListener('click', function() {
        var componenet_id = data.name;
        localStorage.removeItem(componenet_id);
        location.reload();
    });
}

