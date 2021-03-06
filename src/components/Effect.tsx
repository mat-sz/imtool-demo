import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { animationProps } from "../animationSettings";
import {
  ImageEffect,
  effects,
  EffectArgument,
  EffectArgumentType,
} from "../Effects";

export interface EffectProps {
  setEffects: React.Dispatch<React.SetStateAction<ImageEffect[]>>;
  imageEffect: ImageEffect;
  error?: string;
}

interface EffectArgumentRowProps {
  argument: EffectArgument;
  i: number;
  setEffects: React.Dispatch<React.SetStateAction<ImageEffect[]>>;
  imageEffect: ImageEffect;
}

const EffectArgumentRow: React.FC<EffectArgumentRowProps> = ({
  argument,
  i,
  setEffects,
  imageEffect,
}) => {
  const updateEffect = (value: any) => {
    setEffects((effects) =>
      effects.map((effect) => {
        if (effect.id === imageEffect.id) {
          effect.arguments[i] = value;
        }
        return effect;
      })
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateEffect(e.target.value);
  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateEffect(e.target.checked);
  const value = imageEffect.arguments[i];

  switch (argument.type) {
    case EffectArgumentType.BOOLEAN:
      return (
        <tr>
          <td>{argument.name}</td>
          <td>
            <input
              type="checkbox"
              defaultChecked={value}
              onChange={onChangeCheckbox}
            />
          </td>
        </tr>
      );
    case EffectArgumentType.NUMBER:
      return (
        <tr>
          <td>{argument.name}</td>
          <td>
            <input
              type="number"
              defaultValue={value}
              min="0"
              onChange={onChange}
            />
          </td>
        </tr>
      );
    case EffectArgumentType.TEXT:
      return (
        <tr>
          <td>{argument.name}</td>
          <td>
            <input type="text" defaultValue={value} onChange={onChange} />
          </td>
        </tr>
      );
    default:
      return (
        <tr>
          <td>{argument.name}</td>
          <td>{value}</td>
        </tr>
      );
  }
};

export const Effect: React.FC<EffectProps> = ({
  imageEffect,
  setEffects,
  error,
}) => {
  const onClick = () => {
    setEffects((effects) =>
      effects.filter((effect) => effect.id !== imageEffect.id)
    );
  };

  const effect = effects.find((effect) => effect.fn === imageEffect.fn);
  if (!effect) {
    return <div>Unknown effect?</div>;
  }

  return (
    <motion.section {...animationProps} className="effect">
      <div className="effect-header">
        <h3>{effect.name}</h3>
        <button onClick={onClick}>Remove</button>
      </div>
      <AnimatePresence>
        {error ? (
          <motion.div {...animationProps} className="error-bar">
            {error}
          </motion.div>
        ) : null}
      </AnimatePresence>
      {effect.arguments ? (
        <table>
          <tbody>
            {effect.arguments.map((argument, i) => (
              <EffectArgumentRow
                argument={argument}
                i={i}
                key={i}
                setEffects={setEffects}
                imageEffect={imageEffect}
              />
            ))}
          </tbody>
        </table>
      ) : null}
    </motion.section>
  );
};
