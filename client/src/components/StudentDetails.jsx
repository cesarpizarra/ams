import React from "react";
import { saveSvgAsPng } from "save-svg-as-png"; // Import SVG to PNG conversion library
import QRCode from "react-qr-code";

const StudentDetails = ({ student, onClose }) => {
  // Function to download the QR code as PNG
  const downloadQRCode = () => {
    const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`;
    const idCardInfo = `${fullName}\nGrade: ${student.grade}\nSection: ${student.section}`;
    const svgElement = document.getElementById("qrcode-svg"); // Get the QR code SVG element
    const pngFilename = `${fullName}_IDCard_qrcode.png`; // Define a filename for the PNG

    // Convert and save the QR code as a PNG with the ID card information as its value
    saveSvgAsPng(svgElement, pngFilename, {
      scale: 4,
      encoderOptions: 1.0, // Higher quality to ensure text is readable
      customDownload: (dataUri, filename) => {
        // Create a link and trigger a click event to download the PNG
        const link = document.createElement("a");
        link.href = dataUri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      value: idCardInfo, // Set the value of the QR code
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Student Details</h2>
        <div>
          <strong>First Name:</strong> {student.firstName}
        </div>
        <div>
          <strong>Middle Name:</strong> {student.middleName}
        </div>
        <div>
          <strong>Last Name:</strong> {student.lastName}
        </div>
        <div>
          <strong>Grade:</strong> {student.grade}
        </div>
        <div>
          <strong>Section:</strong> {student.section}
        </div>
        {/* QR Code */}
        <div className="mt-4">
          <strong>QR Code:</strong>
          <div>
            <QRCode id="qrcode-svg" value={student._id} size={128} />
          </div>
          <button
            onClick={downloadQRCode}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Download ID Card
          </button>
        </div>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;
