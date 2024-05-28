import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import FileUploader from './FileUploader';


describe('FileUploader', () => {
  test('renders the upload prompt', () => {
    const { getByText } = render(<FileUploader onFileAccepted={() => {}} />);
    expect(getByText("Drag 'n' drop a CSV file here, or click to select the file")).toBeInTheDocument();
  });
});

describe('FileUploader Drag and Drop', () => {
  test('shows appropriate message when dragging files', () => {
    const { getByText } = render(<FileUploader onFileAccepted={() => {}} />);
    const dropzone = getByText("Drag 'n' drop a CSV file here, or click to select the file");
    fireEvent.dragEnter(dropzone);
    expect(getByText("Release to drop the file here...")).toBeInTheDocument();
  });
});

describe('FileUploader File Handling', () => {
  test('calls onFileAccepted with the file when dropped', () => {
    const handleFileAccepted = jest.fn();
    const file = new File(['content'], 'test.csv', { type: 'text/csv' });

    const { getByText } = render(<FileUploader onFileAccepted={handleFileAccepted} />);
    const dropzone = getByText("Drag 'n' drop a CSV file here, or click to select the file");

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(handleFileAccepted).toHaveBeenCalledWith(expect.any(File));
    expect(handleFileAccepted).toHaveBeenCalledTimes(1);
  });
});