import React from 'react';
import { fromWebcam, fromScreen, fromImage } from 'imtool';

export interface CaptureBarProps {
    setImage: (url: string, source: string) => void,
    setError: React.Dispatch<React.SetStateAction<string | undefined>>,
};

export const CaptureBar: React.FC<CaptureBarProps> = ({ setImage, setError }) => {
    const webcam = () => {
        fromWebcam().then(
            tool => tool.toDataURL().then(url => setImage(url, 'fromWebcam'))
        ).catch(e => setError(e.toString()));
    };

    const screen = () => {
        fromScreen().then(
            tool => tool.toDataURL().then(url => setImage(url, 'fromScreen'))
        ).catch(e => setError(e.toString()));
    };

    const example = () => {
        fromImage('/example.jpg').then(
            tool => tool.toDataURL().then(url => setImage(url, 'fromImage'))
        ).catch(e => setError(e.toString()));
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
