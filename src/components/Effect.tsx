import React from 'react';

import { ImageEffect, effects } from '../Effects';

export interface EffectProps {
    setEffects: React.Dispatch<React.SetStateAction<ImageEffect[]>>,
    imageEffect: ImageEffect,
}

export const Effect: React.FC<EffectProps> = ({ imageEffect, setEffects }) => {
    const onClick = () => {
        setEffects(effects => effects.filter(effect => effect.id !== imageEffect.id));
    };

    const effect = effects.find((effect) => effect.fn === imageEffect.fn);
    if (!effect) {
        return (
            <div>
                Unknown effect?
            </div>
        );
    }

    return (
        <div className="effect">
            <h3>{ effect.name }</h3>
            { effect.arguments ? 
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        effect.arguments.map((argument, i) => (
                            <tr>
                                <td>{ argument.name }</td>
                                <td>{ imageEffect.arguments[i] ?? argument.defaultValue }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            : null }
            <button onClick={onClick}>Remove</button>
        </div>
    )
};
