import React from 'react';
import { useDropzone } from 'react-dropzone';

export interface SelectFileProps {
    onFile: (file: File) => void
};

export const SelectFile: React.FC<SelectFileProps> = ({ onFile }) => {
    const onDrop = (files: File[]) => onFile(files[0]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    return (
        <div {...getRootProps()} className={"dropzone " + (isDragActive ? 'active' : '')}>
            <input {...getInputProps({ style: {} })} />
            <span>Select your image file by clicking or dropping a file on this area.</span>
        </div>
    );
}
