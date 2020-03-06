import React from 'react';
import { fromWebcam, fromScreen } from 'imtool';

export interface CaptureBarProps {
    setInputURL: React.Dispatch<React.SetStateAction<string | undefined>>
};

export const CaptureBar: React.FC<CaptureBarProps> = ({ setInputURL }) => {
    const webcam = () => {
        fromWebcam().then(
            tool => tool.toDataURL().then(url => setInputURL(url))
        );
    };

    const screen = () => {
        fromScreen().then(
            tool => tool.toDataURL().then(url => setInputURL(url))
        );
    };

    return (
        <div className="button-bar">
            <span>...or capture from:</span>
            <button onClick={webcam}>Webcam</button>
            <button onClick={screen}>Screen</button>
        </div>
    );
}
