import Stage from "./stage";
import Game from "./game";

const stage = new Stage();
const game = new Game();


//TODO: init when load complete
stage.app.stage.addChild(game);