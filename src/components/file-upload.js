import React, { useState } from "react";
import axios from "axios";

export default function FileUpload() {
  const [files, setFiles] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);

  const uploadFile = async () => {
    if (!files) {
      setMsg("No file selected");
      return;
    }

    const fd = new FormData();
    fd.append("file", files[0]);

    try {
      const response = await axios.post("https://email-validation-backend-5.onrender.com/message", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => ({
            ...prevState,
            pc: Math.round((progressEvent.loaded * 100) / progressEvent.total),
          }));
        },
      });
      setData(response.data);
      setMsg("Upload completed");
    } catch (error) {
      console.log(error);
      setMsg("Error occurred");
    }
  };

  return (
    <main>
      <div className="flex flex-col space-y-12 justify-center items-center mt-[12rem]">
        <input
          onChange={(e) => {
            setFiles(e.target.files);
          }}
          type="file"
          className=""
        />
        <button
          onClick={uploadFile}
          className="w-28 h-10 rounded-md font-mono bg-red-300"
        >
          Submit
        </button>
        {progress.started && (
          <progress max="100" value={progress.pc}></progress>
        )}
        {msg && <span>{msg}</span>}
      </div>
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Is Valid</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.email}</td>
                <td>{item.is_valid ? "Valid" : "Invalid"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
