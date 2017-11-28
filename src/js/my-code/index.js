class Artwork {
    constructor() {
        this.uploadedImage = [];
        this.artWorkDiv = document.getElementById("artwork-svg");
        this.active = false;
        this.blackWhiteFilter = document.getElementById('blackWhiteFilter');
        this.sizeSlider = document.getElementById('sizeSlider');
        this.distanceSlider = document.getElementById('distanceSlider');
        this.selector = document.getElementById("styleSelector");
        this.textField = document.getElementById('text');
        this.reloadButton = document.getElementById('reloadButton');
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
                    self.uploadedImage = document.createElement('img');
                    self.uploadedImage.src = e.target.result;
                };
            })(datei);
            reader.readAsDataURL(datei);
            setTimeout(function () {
                self.create();
            }, 1000);
        });
        // Nav:
        // New Load
        document.getElementById('reloadButton').addEventListener('click', () => {
            self.create();
        });
        // Black-White Filter
        this.blackWhiteFilter.addEventListener('input', () => {
            self.changeFilter()
        });
        // Size Elements
        this.sizeSlider.addEventListener('input', () => {
            self.changeSize()
        });
        // Distance
        this.distanceSlider.addEventListener('input', () => {
            self.changeDistance()
        });
    }

    changeSize() {
        let sizeOutput = document.getElementById('sizeOutput');
        sizeOutput.innerHTML = this.sizeSlider.value;
    }

    changeDistance() {
        let distanceOutput = document.getElementById('distanceOutput');
        distanceOutput.innerHTML = this.distanceSlider.value;
    }

    changeFilter() {
        let filterOutput = document.getElementById('blackWhiteFilterOutput');
        filterOutput.innerHTML = this.blackWhiteFilter.value;
    }

    deleteExistingSvg() {
        if (this.active) {
            while (this.artWorkDiv.firstChild) {
                this.artWorkDiv.removeChild(this.artWorkDiv.firstChild);
            }
        }
    }

    create() {
        this.blockReloadButton();
        this.deleteExistingSvg();
        // Get values
        let selectedStyle = this.selector.value;
        let blackWhiteFilterValue = this.blackWhiteFilter.value;
        let elementSize = this.sizeSlider.value;
        let text = this.textField.value;
        let distanceValue = this.distanceSlider.value;
        let img = this.uploadedImage;
        // Create Canvas
        let canvas = document.createElement('canvas');
        const canvasSize = 200;
        canvas.setAttribute('width', canvasSize);
        canvas.setAttribute('height', canvasSize);
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        let imgData = ctx.getImageData(0, 0, canvasSize, canvasSize);
        console.log(imgData);
        // Create Elements
        let y = -1;
        for (let i = 0; i < imgData.data.length; i += (4 * distanceValue)) {
            if (imgData.data[i + 3] === 255 && imgData.data[i + 1] < blackWhiteFilterValue && imgData.data[i + 2] < blackWhiteFilterValue && imgData.data[i] < blackWhiteFilterValue) {
                const htmlTextElement = document.createElementNS("http://www.w3.org/2000/svg", selectedStyle);
                htmlTextElement.setAttributeNS(null, 'x', ((i % (canvasSize * 4)) ));
                htmlTextElement.setAttributeNS(null, 'y', y);
                htmlTextElement.setAttributeNS(null, 'cx', ((i % (canvasSize * 4))));
                htmlTextElement.setAttributeNS(null, 'cy', y);
                htmlTextElement.setAttributeNS(null, 'font-size', elementSize);
                htmlTextElement.setAttributeNS(null, 'r', elementSize);
                htmlTextElement.setAttributeNS(null, 'height', elementSize);
                htmlTextElement.setAttributeNS(null, 'width', elementSize);
                htmlTextElement.setAttributeNS(null, 'fill', this.rgbToHex(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]));
                let textNode = document.createTextNode(text);
                htmlTextElement.appendChild(textNode);
                this.artWorkDiv.append(htmlTextElement);
                this.active = true;

                if (i % (canvasSize * 4) === 0) {
                    y += 3;
                }
            }
        }
    }

    blockReloadButton() {
        this.reloadButton.disabled = true;
        setTimeout(function () {
            this.reloadButton.disabled = false;
        }, 2000);
    }

    componentToHex(c) {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }
}

export default Artwork;
