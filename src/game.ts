import {Container, Graphics, Text} from "pixi.js";

export default class Game extends Container {
    constructor() {
        super();
        const playBut = new Graphics();
        playBut.beginFill('rgb(227,88,88)');
        playBut.drawRect(400, 300, 100, 100);
        playBut.interactive = true;
        playBut.on("click", async () => {
            this.removeChild(playBut);
            await this.timeout(333);
            this.bubbleSort([ 644, 334, 225, 152, 272, 181, 909 ]);
        });
        playBut.pivot.set(100 / 2, 100 / 2)
        this.addChild(playBut);
    }

    //TODO: recreate some of the games of 'Prodigy games' math oriented child game

    async spawnBoxes(array: number[]): Promise<Container[]> {
        const boxes: Container[] = [];
        const xStep = 800 / array.length;
        const yStep = 800 / 1500;
        for (let i = 0; i < array.length; i++) {
            const boxContainer = new Container();
            const text = new Text(array[i].toString(), {
                fontFamily: 'Arial',
                fontSize: xStep / 2,
                fill: 'rgb(44,19,19)'
            });
            const obj = new Graphics();
            obj.beginFill('rgb(113,255,124)');
            obj.drawRect(0, 0, xStep - 10, array[i] * yStep);

            // Center the text within the box
            text.anchor.set(0.5);
            text.x = (xStep - 10) / 2;
            text.y = (xStep - 10) / 2;

            obj.addChild(text);
            boxContainer.addChild(obj, text);
            boxContainer.position.set(i * xStep, 0);
            boxes.push(boxContainer);
            await this.timeout(333);
            this.addChild(boxContainer);
        }
        return boxes;
    }

    timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async bubbleSort(array: number[]) {
        console.log(array);
        const graphicalBoxes: Container[] = await this.spawnBoxes(array);
        let i: number = 0;
        let swapped: boolean = false;
        for (i = 0; i < array.length - 1; i++) {
            swapped = false;
            for (let j = 0; j < array.length - i - 1; j++) {
                (graphicalBoxes[j].children[0] as Graphics).tint = 'rgb(255,255,255)';
                if (array[j] > array[j + 1]) {
                    this.swap(array, j, j + 1);
                    this.swap(graphicalBoxes, j, j + 1);
                    this.swapPos(graphicalBoxes, j, j + 1);
                    (graphicalBoxes[j + 1].children[0] as Graphics).tint = 'rgb(199,197,197)';
                    swapped = true;
                    await this.timeout(333);
                    (graphicalBoxes[j].children[0] as Graphics).tint = '0xFFFFFF';
                    (graphicalBoxes[j + 1].children[0] as Graphics).tint = '0xFFFFFF';
                }
            }
            if (swapped == false)
                break;
        }
        console.log(array);
    }

    swap<T>(array: T[], indexA: number, indexB: number): void {
        // A temporary variable to hold one of the elements during the swap
        let temp = array[indexA];
        array[indexA] = array[indexB];
        array[indexB] = temp;
    }

    swapPos(array: {x: number, y: number}[], indexA: number, indexB: number): void {
        let {x, y} = array[indexA];
        array[indexA].x = array[indexB].x;
        array[indexA].y = array[indexB].y;
        array[indexB].x = x;
        array[indexB].y = y;
    }
}