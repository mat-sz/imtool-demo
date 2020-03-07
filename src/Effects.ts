import { ImTool } from "imtool/lib/ImTool";

type ImToolFunctions = keyof Pick<ImTool, { 
    [K in keyof ImTool]: ImTool[K] extends Function ? K : never 
}[keyof ImTool]>;

export interface ImageEffect {
    id: string,
    fn: ImToolFunctions,
    arguments: any,
};

export enum EffectArgumentType {
    TEXT,
    NUMBER,
    BOOLEAN,
};

export interface EffectArgument {
    name: string,
    type: EffectArgumentType,
    defaultValue: any,
};

export interface Effect {
    name: string,
    fn: ImToolFunctions,
    arguments?: EffectArgument[],
};

export const effects: Effect[] = [
    {
        name: 'Crop',
        fn: 'crop',
        arguments: [
            {
                name: 'X',
                type: EffectArgumentType.NUMBER,
                defaultValue: 0,
            },
            {
                name: 'Y',
                type: EffectArgumentType.NUMBER,
                defaultValue: 0,
            },
            {
                name: 'Width',
                type: EffectArgumentType.NUMBER,
                defaultValue: 100,
            },
            {
                name: 'Height',
                type: EffectArgumentType.NUMBER,
                defaultValue: 100,
            }
        ],
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
        arguments: [
            {
                name: 'Width',
                type: EffectArgumentType.NUMBER,
                defaultValue: 100,
            },
            {
                name: 'Height',
                type: EffectArgumentType.NUMBER,
                defaultValue: 100,
            }
        ],
    },
    {
        name: 'Thumbnail',
        fn: 'thumbnail',
        arguments: [
            {
                name: 'Maximum size',
                type: EffectArgumentType.NUMBER,
                defaultValue: 250,
            },
            {
                name: 'Cover',
                type: EffectArgumentType.BOOLEAN,
                defaultValue: false,
            }
        ],
    }
];