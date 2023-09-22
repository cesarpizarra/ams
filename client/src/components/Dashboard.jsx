import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import logo from "../assets/logo-image.png";
import { BiLogOut, BiListOl, BiScan } from "react-icons/bi";
import Axios from "axios";
import { jsQR } from "jsqr";
import beepSound from "../assets/beep.mp3";
import { Link } from "react-router-dom";

const Dashboard = ({ children }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [error, setError] = useState(null);
  const [showTimeButtons, setShowTimeButtons] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const beepRef = useRef(null);

  useEffect(() => {
    if (showCamera) {
      startCamera();
    }
  }, [showCamera]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    });
  };

  const handleScanButtonClick = () => {
    if (!showCamera) {
      setShowCamera(true);
      setShowTimeButtons(false);
      setScannedData("");
    }
  };

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
        setError("Error accessing camera. Please check permissions.");
      });
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    videoRef.current.srcObject = null;
  };

  const scanQRCode = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Use jsqr to scan for QR codes
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      setScannedData(code.data);
      setShowTimeButtons(true);

      // Log the detected QR code to the console
      console.log("Detected QR code:", code.data);

      // Play the beep sound
      beepRef.current.play();
    } else {
      setError("No QR code found. Please try again.");
      setShowTimeButtons(false);
    }
  };

  const handleTimeIn = async () => {
    try {
      if (scannedData) {
        // Send the scanned data (studentId) to the backend for Time In
        await Axios.post("http://localhost:3000/api/attendance/timein", {
          studentId: scannedData,
        });
        Swal.fire({
          icon: "success",
          title: "Time in successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setShowCamera(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No QR code scanned. Please scan a QR code.",
        });
      }
    } catch (error) {
      console.error("Error recording Timse In:", error);
    }
  };

  const handleTimeOut = async () => {
    try {
      if (scannedData) {
        // Send the scanned data (studentId) to the backend for Time Out
        await Axios.post("http://localhost:3000/api/attendance/timeout", {
          studentId: scannedData,
        });
        Swal.fire({
          icon: "success",
          title: "Time out successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setShowCamera(true);
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
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <nav className="hidden md:block w-64 bg-white border-r overflow-y-auto fixed h-full">
        <div className="flex items-center gap-4 p-4">
          <img src={logo} alt="logo" className="w-8" />
          <span className="text-2xl font-semibold text-gray-700">
            Dashboard
          </span>
        </div>
        <ul className="p-2">
          <li className="px-4 py-2 border-b-2 border-gray-300">
            <Link to="/students" className="flex items-center gap-2">
              <span>
                <BiListOl />
              </span>
              List of Students
            </Link>
          </li>
          <li className="px-4 py-2 border-b-2 border-gray-300">
            <Link to="/scan" className="flex items-center gap-2">
              <span>
                <BiScan />
              </span>
              Scan
            </Link>
          </li>
          <li className="px-4 py-2 border-b-2 border-gray-300">
            <button onClick={handleLogout} className="flex items-center gap-2">
              <span>
                <BiLogOut />
              </span>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Right Content */}
      <div className="hidden md:block flex-grow p-6 ml-64">{children}</div>

      {/* Mobile Scan Button and Camera */}
      <div className="flex md:hidden flex-col gap-10 items-center justify-center w-full px-4">
        {showCamera ? (
          <div className="px-12">
            <video ref={videoRef} autoPlay playsInline />
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        ) : (
          <div className="flex flex-col gap-8 ">
            <img src={logo} alt="logo" className="w-56" />
            <button onClick={handleScanButtonClick} className="scan-btn">
              <span> SCAN</span>
            </button>
          </div>
        )}

        {/* Show time buttons when a QR code is detected */}
        {showTimeButtons && (
          <div>
            <div className="flex">
              <button
                onClick={handleTimeIn}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 mr-2"
              >
                Time In
              </button>
              <button
                onClick={handleTimeOut}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600"
              >
                Time Out
              </button>
            </div>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Beep Sound */}
      <audio ref={beepRef} src={beepSound} preload="auto"></audio>
    </div>
  );
};

export default Dashboard;
