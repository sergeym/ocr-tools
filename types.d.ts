import Image from "image-js";

declare namespace OcrTools {
    export interface TextLines {
        lines: any
        painted: Image,
        mask: Image,
        averageSurface: number
    }

    export interface RoiOptions {
        positive: boolean,
        negative: boolean,
        minSurface: number,
        minRatio: number,
        maxRatio: number,
        algorithm: string,
        randomColors: boolean
    }

    export function getLinesFromImage(
        image: Image,
        roiOptions: RoiOptions
    ): TextLines;
}
