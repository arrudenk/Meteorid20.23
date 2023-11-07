import {Assets} from "pixi.js";
import {GameAssets} from "./defines/game-assets";

export default class GameLoader {
    constructor() {

    }

    async loadAssets() {
        for (const config in GameAssets) {
            await Assets.add(GameAssets[config].name, GameAssets[config].path);
        }
    }
}