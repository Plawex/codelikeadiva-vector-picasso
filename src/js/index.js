import Project from './project';
import ChallengeCode from './my-code/index';
import jsonText from '../json/text.json';
import jsonCoordinates from '../json/coordinates.json'


class ArtworkSvg {
    constructor() {
        this.text = jsonText;
        this.coordinates = jsonCoordinates;
        this.artWorkDiv = document.getElementById("artwork-svg");
    }

    init() {
        for (let i = 0; i < this.text.length; i += 1) {
            const htmlTextElement = document.createElementNS("http://www.w3.org/2000/svg",'text');
            htmlTextElement.setAttributeNS(null,'x', this.coordinates[i].x);
            htmlTextElement.setAttributeNS(null, 'y', this.coordinates[i].y);
            let textNode = document.createTextNode(this.text[i].text);
            htmlTextElement.appendChild(textNode);
            this.artWorkDiv.append(htmlTextElement);
        }
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

