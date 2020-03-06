import React from 'react';
import { ImTool } from 'imtool/lib/ImTool';

export interface FileDetailsProps {
    tool: ImTool | undefined,
    inputURL: string | undefined,
    outputURL: string | undefined
};

export const FileDetails: React.FC<FileDetailsProps> = ({ tool, inputURL, outputURL }) => {
    if (!tool || !inputURL) return null;

    return (
        <div className="details">
            <div className="preview">
                <div>Input:</div>
                <img src={inputURL} alt="Input" />
                <div>{ tool.originalWidth }x{ tool.originalHeight }</div>
            </div>
            { outputURL ? (
                <>
                    <div className="arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M0 304v-96c0-13.3 10.7-24 24-24h200V80.2c0-21.4 25.8-32.1 41-17L441 239c9.4 9.4 9.4 24.6 0 34L265 448.7c-15.1 15.1-41 4.4-41-17V328H24c-13.3 0-24-10.7-24-24z"/>
                        </svg>
                    </div>
                    <div className="preview">
                        <div>Output:</div>
                        <img src={outputURL} alt="Output" />
                        <div>{ tool.width }x{ tool.height }</div>
                    </div>
                </>
            ) : null}
        </div>
    );
}
