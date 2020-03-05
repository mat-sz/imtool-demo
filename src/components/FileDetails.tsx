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
            <div>
                <img src={inputURL} alt="Input" />
                <div>{ tool.originalWidth }x{ tool.originalHeight }</div>
            </div>
            { outputURL ? (
                <>
                    <div>
                        ->
                    </div>
                    <div>
                        <img src={outputURL} alt="Output" />
                        <div>{ tool.width }x{ tool.height }</div>
                    </div>
                </>
            ) : null}
        </div>
    );
}
