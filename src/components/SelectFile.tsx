import React from 'react';
import { useDropzone } from 'react-dropzone';

export interface SelectFileProps {
    onFile: (file: File) => void
};

export const SelectFile: React.FC<SelectFileProps> = ({ onFile }) => {
    const onDrop = (files: File[]) => onFile(files[0]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    });

    return (
        <div {...getRootProps()} className={"dropzone " + (isDragActive ? 'active' : '')}>
            <input {...getInputProps({
                style: {}
            })} accept={'*'} tabIndex={1} />
            Select your image file by clicking or dropping a file on this area.
        </div>
    );
}
