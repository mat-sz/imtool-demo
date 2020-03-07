import { ImTool } from "imtool/lib/ImTool";

type Functions<T> = Pick<T, { 
    [K in keyof T]: T[K] extends Function ? K : never 
}[keyof T]>;

export interface ImageEffect {
    id: string,
    fn: keyof Functions<ImTool>,
    arguments: any,
};

export interface Effect {
    name: string,
    fn: keyof Functions<ImTool>,
};

export const effects: Effect[] = [
    {
        name: 'Crop',
        fn: 'crop',
    },
    {
        name: 'Flip horizontally',
        fn: 'flipH',
    },
    {
        name: 'Flip vertically',
        fn: 'flipV',
    },
    {
        name: 'Scale',
        fn: 'scale',
    },
    {
        name: 'Thumbnail',
        fn: 'thumbnail',
    }
];