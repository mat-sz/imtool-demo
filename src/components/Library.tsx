import React from 'react';

export const Library: React.FC = () => {
    return (
        <section>
            <p>
                <a href="https://github.com/mat-sz/imtool" target="_blank" rel="noopener noreferrer">
                    ImTool
                </a>&nbsp;
                is an open-source TypeScript library for image manipulation with a consistent API and no dependencies.
                It runs in any modern browser that supports FileReader and Canvas.
                ImTool makes common operations easy - for example: cropping user's avatar before uploading, scaling an image down,
                compressing an image or taking a screenshot or webcam capture.
            </p>
            <p>
                <a className="link-button" href="https://github.com/mat-sz/imtool" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="link-button" href="https://npmjs.com/package/imtool" target="_blank" rel="noopener noreferrer">NPM</a>
            </p>
        </section>
    );
}
