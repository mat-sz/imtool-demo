import React from "react";

export interface ErrorBarProps {
  error: string | undefined;
}

export const ErrorBar: React.FC<ErrorBarProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return <section className="error-bar">{error}</section>;
};
