import React from 'react';
import { fromWebcam, fromScreen, fromImage } from 'imtool';

export interface CaptureBarProps {
    setImage: (url: string, source: string) => void,
    setError: React.Dispatch<React.SetStateAction<string | undefined>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
};

export const CaptureBar: React.FC<CaptureBarProps> = ({ setImage, setError, setLoading }) => {
    const webcam = () => {
        setLoading(true);
        fromWebcam().then(
            tool => tool.toDataURL()
        )
        .then(url => setImage(url, 'fromWebcam'))
        .catch(e => setError(e.toString()))
        .finally(() => setLoading(false));
    };

    const screen = () => {
        setLoading(true);
        fromScreen().then(
            tool => tool.toDataURL()
        )
        .then(url => setImage(url, 'fromScreen'))
        .catch(e => setError(e.toString()))
        .finally(() => setLoading(false));
    };

    const example = () => {
        setLoading(true);
        fromImage('./example.jpg').then(
            tool => tool.toDataURL()
        )
        .then(url => setImage(url, 'fromImage'))
        .catch(e => setError(e.toString()))
        .finally(() => setLoading(false));
    };

    return (
        <section className="button-bar">
            <span>...or capture from:</span>
            <button onClick={example}>Example image</button>
            <button onClick={webcam}>Webcam</button>
            <button onClick={screen}>Screen</button>
        </section>
    );
}
