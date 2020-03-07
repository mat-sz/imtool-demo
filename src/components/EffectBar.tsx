import React from 'react';

import { effects, Effect, ImageEffect } from '../Effects';
import { v4 as uuid } from 'uuid';

export interface EffectBarProps {
    setEffects: React.Dispatch<React.SetStateAction<ImageEffect[]>>
};

export const EffectBar: React.FC<EffectBarProps> = ({ setEffects }) => {
    const EffectButton: React.FC<{ effect: Effect }> = ({ effect }) => {
        const onClick = () => {
            setEffects(effects => [...effects, {
                id: uuid(),
                fn: effect.fn,
                arguments: effect.arguments ? effect.arguments.map((argument) => argument.defaultValue) : null
            }]);
        };

        return (
            <button onClick={onClick}>{ effect.name }</button>
        )
    };

    return (
        <div className="button-bar">
            { effects.map((effect, i) => <EffectButton effect={effect} key={i} />) }
        </div>
    );
}
