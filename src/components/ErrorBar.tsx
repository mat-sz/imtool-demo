import React from 'react';

export interface ErrorBarProps {
    error: string | undefined
};

export const ErrorBar: React.FC<ErrorBarProps> = ({ error }) => {
    if (!error) {
        return null;
    }

    return (
        <div className="error-bar">
            { error }
        </div>
    );
}
