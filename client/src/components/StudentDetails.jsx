import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { PDFDocument, rgb } from "pdf-lib";
import { toPng } from "html-to-image";
import BorderIdCard from "../assets/border.png";

const StudentDetails = ({ student, onClose }) => {
  const qrCodeRef = useRef(null);

  const downloadIDCard = async () => {
    const schoolName = "LNHS";
    const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`;
    const grade = `Grade: ${student.grade}`;
    const section = `Section: ${student.section}`;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([200, 320]);

    // Load the background image
    const backgroundUrl = await fetch(BorderIdCard);
    const backgroundData = await backgroundUrl.arrayBuffer();
    const backgroundImage = await pdfDoc.embedPng(backgroundData);

    // Scale the background image to fit the page dimensions
    const imageSize = backgroundImage.scale(1);

    // Draw the background image
    page.drawImage(backgroundImage, {
      x: 0,
      y: 0,
      width: imageSize.width,
      height: imageSize.height,
    });

    // Convert the QR code SVG to a data URL using html-to-image
    const qrCodeDataUrl = await toPng(qrCodeRef.current);

    // Embed the QR code image in the PDF
    const qrCodeImage = await pdfDoc.embedPng(qrCodeDataUrl);
    const qrCodeDims = qrCodeImage.scale(0.75);
    const qrCodeX = 50;
    const qrCodeY = 150;
    page.drawImage(qrCodeImage, {
      x: qrCodeX,
      y: qrCodeY,
      width: qrCodeDims.width,
      height: qrCodeDims.height,
    });

    // Calculate the center X-coordinate of the QR code
    const qrCodeCenterX = qrCodeX + qrCodeDims.width / 4.5;

    // Calculate the X-coordinate for the school name to center it above the QR code
    const schoolNameX = qrCodeCenterX - schoolName.length * 3;

    // Calculate the Y-coordinate for the school name above the QR code
    const schoolNameY = qrCodeY + qrCodeDims.height + 15;

    // Add the school name to the PDF above the QR code
    page.drawText(schoolName, {
      x: schoolNameX,
      y: schoolNameY,
      size: 20,
      color: rgb(0, 0, 0),
    });

    // Add styled text to the PDF
    page.drawText(fullName, {
      x: 20,
      y: 100,
      size: 14,
      color: rgb(0, 0, 0),
    });
    page.drawText(grade, {
      x: 20,
      y: 70,
      size: 12,
      color: rgb(0, 0, 0),
    });
    page.drawText(section, {
      x: 20,
      y: 50,
      size: 12,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const pdfFilename = `${fullName}_IDCard.pdf`;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfFilename;
    link.click();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-12 rounded shadow-lg">
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
        <div className="mt-4">
          <strong>QR Code:</strong>
          <div ref={qrCodeRef}>
            <QRCode value={student._id} size={128} />
          </div>
          <button
            onClick={downloadIDCard}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
          >
            Download ID Card as PDF
          </button>
        </div>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;
