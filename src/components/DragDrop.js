import { useState, useRef } from "react";
import axios from 'axios'; // Make sure to import axios

const DragDropFiles = (props) => {
  const [files, setFiles] = useState(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      setFiles(event.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!files) return;

    setUploading(true); // Show loading state

    const formData = new FormData();
    formData.append('file', files);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('File URL:', response.data.fileUrl);
      setFiles(JSON.stringify(response.data.fileUrl));
      if (props.props === "interviewer") {
        window.sessionStorage.setItem("InterviewerResume", response.data.fileUrl);
      }
      if (props.props === "interviewee") {
        window.sessionStorage.setItem("IntervieweeResume", response.data.fileUrl);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false); // Hide loading state
    }
  };

  const handleCancel = () => {
    setFiles(null); // Remove file
  };

  return (
    <div className="hover:scale-105 transition-transform duration-300 ease-in-out">
      {files ? (
        <div className="flex flex-col gap-4 items-center p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white/30 text-white shadow-lg transition-shadow duration-300 ease-in-out">
          <p className="text-center font-medium text-lg">
            {files.name} <br />
            <span className="text-sm text-gray-200">{files.size} bytes</span>
          </p>
          <div className="flex gap-4">
            {!uploading && (
              <>
                <button 
                  onClick={handleCancel} 
                  className="px-4 py-2 text-white bg-red-600 rounded-md font-semibold transition-colors duration-300 hover:bg-red-800">
                  Cancel
                </button>
                <button 
                  onClick={handleUpload} 
                  className="px-4 py-2 text-white bg-green-600 rounded-md font-semibold transition-colors duration-300 hover:bg-green-800">
                  Upload
                </button>
              </>
            )}
            {uploading && (
              <p className="text-yellow-300 font-semibold">Uploading...</p>
            )}
          </div>
        </div>
      ) : (
        <div
          className="flex text-white flex-col gap-4 items-center p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl border border-white/30 shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
        >
          <div>
            {props.props=="interviewer"?"Enter the Interviewer's Resume":"Enter Candidate's Resume"}
          </div>
          <button className="px-4 py-2 text-white bg-black rounded-md font-semibold transition-colors duration-300 hover:bg-gray-800">
            Select files to upload
          </button>
          <p className="text-sm">or drag and drop files to upload</p>
          <input
            type="file"
            onChange={(event) => setFiles(event.target.files[0])}
            hidden
            ref={inputRef}
          />
        </div>
      )}
    </div>
  );
};

export default DragDropFiles;
