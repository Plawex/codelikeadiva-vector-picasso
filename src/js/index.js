import Project from './project';
import ChallengeCode from './my-code/index';
import jsonText from '../json/text.json';


class ArtworkSvg {
    constructor() {
        this.text = jsonText;
        this.artWorkDiv = document.getElementById("artwork-svg");
    }

    init() {


        let img = "?";
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");

        ctx.drawImage(img, 0, 0);
        var imgData = ctx.getImageData(0, 0, c.width, c.height);



        let a = new Array(841);
        for (let i = 0; i < a.length; i++) {
            a[i] = new Array(600);
        }
        for (let s = 0; s < a.length; s++) {
            for (let t = 0; t < a[s].length; t++) {
                if (true) {
                    a[s][t] = 1;
                } else {
                    a[s][t] = 0;
                }
            }
        }
        console.log(a);

        for (let i = 0; i < 2000; i += 1) {
            const htmlTextElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            htmlTextElement.setAttributeNS(null, 'x', this.getRandomArbitrary(0, 842));
            htmlTextElement.setAttributeNS(null, 'y', this.getRandomArbitrary(0, 600));
            let c = parseInt(this.getRandomArbitrary(0, 3));
            let textNode = document.createTextNode("I");
            htmlTextElement.appendChild(textNode);
            this.artWorkDiv.append(htmlTextElement);
        }
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

}

document.addEventListener('DOMContentLoaded', () => {
    // general project code [PLEASE KEEP THAT CODE!]
    (new Project()).init();

    // EXECUTE YOUR CODE HERE...
    const artworkSvg = new ArtworkSvg();
    artworkSvg.init();

    (new ChallengeCode()).init();
});

