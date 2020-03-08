import React from 'react';

export interface LoadingOverlayProps {
    active: boolean,
};

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ active }) => {
    return (
        <div className={'loading-overlay ' + (active ? 'active' : '')}>
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};
