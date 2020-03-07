import React from 'react';
import { fromWebcam, fromScreen, fromImage } from 'imtool';

export interface CaptureBarProps {
    setImage: (url: string, source: string) => void,
};

export const CaptureBar: React.FC<CaptureBarProps> = ({ setImage }) => {
    const webcam = () => {
        fromWebcam().then(
            tool => tool.toDataURL().then(url => setImage(url, 'fromWebcam'))
        );
    };

    const screen = () => {
        fromScreen().then(
            tool => tool.toDataURL().then(url => setImage(url, 'fromScreen'))
        );
    };

    const example = () => {
        fromImage('/example.jpg').then(
            tool => tool.toDataURL().then(url => setImage(url, 'fromImage'))
        );
    };

    return (
        <div className="button-bar">
            <span>...or capture from:</span>
            <button onClick={example}>Example image</button>
            <button onClick={webcam}>Webcam</button>
            <button onClick={screen}>Screen</button>
        </div>
    );
}
