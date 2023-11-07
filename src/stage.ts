import {Application, ICanvas} from "pixi.js";

export default class Stage {
    public app: Application<ICanvas>;
    constructor() {
        const {width, height} = this.getResolution();
        this.app = new Application({
            width,
            height,
            backgroundColor: "black",
            view: document.getElementById('game-canvas') as HTMLCanvasElement,
        });
    }

    //TODO: make it responsible for portrait mobile
    getResolution() {
        return {width: 800, height: 600};
    }



    //todo: listen to page visibility change.
    refresh() {

    }
}