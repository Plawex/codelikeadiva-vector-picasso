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
        for (let i = 0; i < imgData.data.length; i += 4) {


            if (imgData.data[i +3] === 255 && imgData.data[i + 1] === 0 && imgData.data[i + 1] === 0 && imgData.data[i] === 0) {
                const htmlTextElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                htmlTextElement.setAttributeNS(null, 'x', ((i % (size * 4)) + 90));
                htmlTextElement.setAttributeNS(null, 'y', y);
                if(i % (size * 4) === 0) {
                    y += 1;
                }
                let textNode = document.createTextNode(".");
                htmlTextElement.appendChild(textNode);
                this.artWorkDiv.append(htmlTextElement);
            }

        }


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

