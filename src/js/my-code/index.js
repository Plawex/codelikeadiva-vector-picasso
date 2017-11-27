class Artwork {
    constructor() {
        this.vorschau = [];
        this.artWorkDiv = document.getElementById("artwork-svg");
        this.active = false;
    }

    init() {
        this.bindEvents();

    }

    bindEvents() {
        let self = this;

        //Fileupload
        document.getElementById('files').addEventListener('change', (event) => {
            const datei = event.target.files[0]; // FileList object
            if (!datei.type.match('image.*')) {
                alert("error")
            }
            let reader = new FileReader();
            reader.onload = (function () {
                return function (e) {
                    self.vorschau = document.createElement('img');
                    self.vorschau.src = e.target.result;
                };
            })(datei);
            reader.readAsDataURL(datei);
            setTimeout(function () {
                self.create();
            }, 1000);
        });
        // Nav:
        // New Load
        document.getElementById('button1').addEventListener('click', () => {
            self.create();
        });
        // Black-White Filter
        document.querySelector('#grayscale').addEventListener('input', () => {
            self.grayScale()
        } );
        // Size Elements
        document.querySelector('#size').addEventListener('input', () => {
            self.sizeF()
        } );
        // Space
        document.querySelector('#space').addEventListener('input', () => {
            self.spaceF()
        } );
    }

    sizeF() {
        let grayscaleInputElement = document.querySelector('#size');
        let x = document.getElementById('sizeValue');
        x.innerHTML = grayscaleInputElement.value;
    }

    spaceF() {
        let grayscaleInputElement = document.querySelector('#space');

        let x = document.getElementById('spaceValue');

        x.innerHTML = grayscaleInputElement.value;


    }
    grayScale() {
        let grayscaleInputElement = document.querySelector('#grayscale');

        let x = document.getElementById('grayscaleValue');

        x.innerHTML = grayscaleInputElement.value;


    }

    create() {
        let x = document.getElementById('button1');
        x.disabled = true;
        setTimeout(function () {
            x.disabled = false;
        }, 2000);


        if (this.active) {
            while (this.artWorkDiv.firstChild) {
                this.artWorkDiv.removeChild(this.artWorkDiv.firstChild);
            }
        }
        let select = document.getElementById("select1");
        let grayscaleInputElement = document.querySelector('#grayscale');
        let dotsize = document.querySelector('#size').value;
        let text = document.getElementById('text').value;
        let space = document.querySelector('#space').value;
        let img = this.vorschau;
        var c = document.createElement('canvas');
        let size = 200;
        c.setAttribute('width', size);
        c.setAttribute('height', size);
        var ctx = c.getContext("2d");

        console.log(this.rgbToHex(47, 47, 47));

        ctx.drawImage(img, 0, 0);
        var imgData = ctx.getImageData(0, 0, size, size);
        console.log(imgData);
        let y = -1;
        var CSS_COLOR_NAMES = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"]
        let test;
        for (let i = 0; i < imgData.data.length; i += (4 * space)) {

            if (imgData.data[i + 3] === 255 && imgData.data[i + 1] < grayscaleInputElement.value && imgData.data[i + 2] < grayscaleInputElement.value && imgData.data[i] < grayscaleInputElement.value) {
                const htmlTextElement = document.createElementNS("http://www.w3.org/2000/svg", select.value);

                htmlTextElement.setAttributeNS(null, 'x', ((i % (size * 4)) ));
                htmlTextElement.setAttributeNS(null, 'y', y);
                htmlTextElement.setAttributeNS(null, 'cx', ((i % (size * 4))));
                htmlTextElement.setAttributeNS(null, 'cy', y);
                htmlTextElement.setAttributeNS(null, 'width', dotsize);
                htmlTextElement.setAttributeNS(null, 'height', dotsize);

                htmlTextElement.setAttributeNS(null, 'r', dotsize);

                //htmlTextElement.setAttributeNS(null, 'fill', CSS_COLOR_NAMES[this.getRandomInt(0,CSS_COLOR_NAMES.length)]);
                htmlTextElement.setAttributeNS(null, 'fill', this.rgbToHex(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]));
                if (i % (size * 4) === 0) {
                    y += 3;
                }
                let textNode = document.createTextNode(text);

                htmlTextElement.appendChild(textNode);
                this.artWorkDiv.append(htmlTextElement);


                this.active = true;

            }
        }


    }

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }
}

export default Artwork;
