import Image from "image-js";

declare namespace OcrTools {
    export interface TextLines {
        lines: any
        painted: Image,
        mask: Image,
        averageSurface: float
    }

    export interface RoiOptions {
        positive: boolean,
        negative: boolean,
        minSurface: number,
        minRatio: number,
        maxRatio: number,
        algorithm: string,
        randomColors: boo
    }

    export declare function getLinesFromImage(
        image: Image, 
        roiOptions: RoiOptions
    ): TextLines;
}
