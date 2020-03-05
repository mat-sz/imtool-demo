export enum EffectType {
    THUMBNAIL,
    SCALE,
    CROP,
    FLIP_V,
    FLIP_H,
};

export interface ImageEffect {
    type: EffectType,
    arguments: any,
};

export interface Effect {
    name: string,

};

export const effects: Effect[] = [];

effects[EffectType.CROP] = {
    name: 'Crop',
};

effects[EffectType.FLIP_H] = {
    name: 'Flip horizontally',
};

effects[EffectType.FLIP_V] = {
    name: 'Flip vertically',
};

effects[EffectType.SCALE] = {
    name: 'Scale',
};

effects[EffectType.THUMBNAIL] = {
    name: 'Thumbnail',
};