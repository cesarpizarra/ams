import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import jsQR from "jsqr";
import Swal from "sweetalert2";

const ScanPage = () => {
  const navigate = useNavigate();
  const [scannedData, setScannedData] = useState("");
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setScannedData(data);
      setScanning(false);
    }
  };
  const handleError = (err) => {
    console.error(err);
    setError("An error occurred while scanning. Please try again.");
    setScanning(false);
  };

  const startScanningCamera = () => {
    setScannedData("");
    setError(null);
    setScanning(true);

    const video = videoRef.current;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
          setError("Error accessing camera. Please check permissions.");
          setScanning(false);
        });
    } else {
      setError("Camera not available in this browser.");
      setScanning(false);
    }
  };

  const stopScanningCamera = () => {
    const video = videoRef.current;
    if (video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
    }
    setScanning(false);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result;

        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, image.width, image.height);
          const imageData = ctx.getImageData(0, 0, image.width, image.height);

          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            setScannedData(code.data);
          } else {
            setError("No QR code found in the uploaded image.");
          }

          // Set the uploaded image for display
          setUploadedImage(reader.result);
        };
      };
      reader.readAsDataURL(uploadedFile);
      setFile(uploadedFile);
    } else {
      alert("No file selected. Please choose an image file to upload.");
    }
  };

  const handleTimeIn = async () => {
    try {
      if (scannedData) {
        // Send the scanned data (studentId) to the backend
        await Axios.post("http://localhost:3000/api/attendance/timein", {
          studentId: scannedData,
        });
        Swal.fire({
          icon: "success",
          title: "Time in successful",
          showConfirmButton: false,
          timer: 1500,
        });
        // Reset the scannedData state
        setScannedData("");
        // Reset the file input field
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        // Reset the uploaded image state
        setUploadedImage(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No QR code scanned. Please scan a QR code.",
        });
      }
    } catch (error) {
      console.error("Error recording Time In:", error);
    }
  };

  const handleTimeOut = async () => {
    try {
      if (scannedData) {
        // Send the scanned data (studentId) to the backend
        await Axios.post("http://localhost:3000/api/attendance/timeout", {
          studentId: scannedData,
        });
        Swal.fire({
          icon: "success",
          title: "Time out successful",
          showConfirmButton: false,
          timer: 1500,
        });
        // Reset the scannedData state
        setScannedData("");
        // Reset the file input field
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        // Reset the uploaded image state
        setUploadedImage(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No QR code scanned. Please scan a QR code.",
        });
      }
    } catch (error) {
      console.error("Error recording Time Out:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">QR Code Scanner</h2>
      <div className="mb-4">
        <div className="flex">
          <button
            onClick={startScanningCamera}
            className={`${
              scanning ? "bg-blue-500" : "bg-gray-300"
            } text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 mr-2`}
          >
            Scan as Camera
          </button>
          <button
            onClick={stopScanningCamera}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600"
            disabled={!scanning}
          >
            Stop Camera
          </button>
        </div>
        {scanning && (
          <div className="mt-2">
            <video ref={videoRef} className="w-96"></video>
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="mt-2"
        ref={fileInputRef}
      />
      {scannedData ? (
        <div>
          <p>Scanned Data:</p>
          <p>{scannedData}</p>
          {uploadedImage && (
            <div>
              <p>Uploaded Image:</p>
              <img src={uploadedImage} alt="Uploaded QR Code" />
            </div>
          )}
          <div className="flex">
            <button
              onClick={handleTimeIn}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover-bg-blue-600 mr-2"
            >
              Time In
            </button>
            <button
              onClick={handleTimeOut}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover-bg-red-600"
            >
              Time Out
            </button>
          </div>
        </div>
      ) : null}{" "}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ScanPage;
