import Project from './project';
import ChallengeCode from './my-code/index';
import jsonText from '../json/text.json';


class ArtworkSvg {
    constructor(vorschau) {
        this.text = jsonText;
        this.artWorkDiv = document.getElementById("artwork-svg");
        this.vorschau = vorschau;
    }

    init() {


        let img = this.vorschau;
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        let size = 200;
        ctx.drawImage(img, 0, 0);
        var imgData = ctx.getImageData(0, 0, size, size);
        console.log(imgData);
        let y = -1;
        console.log(this.getRandomArbitrary(0,1));
        var CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]

        for (let i = 0; i < imgData.data.length; i += 4) {


            if (imgData.data[i +3] === 255 && imgData.data[i + 1] < 150 && imgData.data[i + 1] < 150 && imgData.data[i] < 150) {
                const htmlTextElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

                htmlTextElement.setAttributeNS(null, 'cx', ((i % (size * 4))));
                htmlTextElement.setAttributeNS(null, 'cy', y );
                htmlTextElement.setAttributeNS(null, 'r', 5 );
               htmlTextElement.setAttributeNS(null, 'fill', CSS_COLOR_NAMES[this.getRandomInt(0,CSS_COLOR_NAMES.length)]);
                //htmlTextElement.setAttributeNS(null, 'fill', "black");
                if(i % (size * 4) === 0) {
                    y += 4;
                }
                let textNode = document.createTextNode("LOVE");
                if(this.getRandomInt(1,1) === 1) {
                    htmlTextElement.appendChild(textNode);
                    this.artWorkDiv.append(htmlTextElement);
                }

            }


        }



    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


    help() {
        let a = new Array(20);
        for (let i = 0; i < a.length; i++) {
            a[i] = new Array(20);
        }
        for (let s = 0; s < a.length; s++) {
            for (let t = 0; t < a[s].length; t++) {
                if (imgData.data[(t * s )] === 255) {
                    a[s][t] = 1;
                } else {
                    a[s][t] = 0;
                }
            }
        }
        console.log(a);


        for (let s = 0; s < a.length; s++) {
            for (let t = 0; t < a[s].length; t++) {
                if (a[s][t] === 1) {
                    const htmlTextElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                    htmlTextElement.setAttributeNS(null, 'x', s);
                    htmlTextElement.setAttributeNS(null, 'y', t);
                    let textNode = document.createTextNode(".");
                    htmlTextElement.appendChild(textNode);
                    this.artWorkDiv.append(htmlTextElement);

                } else {

                }
            }
        }
    }


}


document.addEventListener('DOMContentLoaded', () => {
    // general project code [PLEASE KEEP THAT CODE!]
    (new Project()).init();

    // EXECUTE YOUR CODE HERE...
    document.getElementById('files')
        .addEventListener('change', dateiauswahl, false);


    (new ChallengeCode()).init();
});

window.URL = window.URL || window.webkitURL;

function dateiauswahl(evt) {
    var dateien = evt.target.files; // FileList object
    var vorschau;
    // Auslesen der gespeicherten Dateien durch Schleife
    for (var i = 0, f; f = dateien[i]; i++) {
        // nur Bild-Dateien
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                // erzeuge Thumbnails.
                vorschau = document.createElement('img');
                vorschau.className = 'vorschau';
                vorschau.src = e.target.result;
                vorschau.title = theFile.name;
                document.getElementById('list')
                    .insertBefore(vorschau, null);

            };
        })(f);
        // Bilder als Data URL auslesen.
        reader.readAsDataURL(f);
    }

    setTimeout(function () {
        const artworkSvg = new ArtworkSvg(vorschau);
        artworkSvg.init();
    }, 1000);

}
// Auf neue Auswahl reagieren und gegebenenfalls Funktion dateiauswahl neu ausführen.

