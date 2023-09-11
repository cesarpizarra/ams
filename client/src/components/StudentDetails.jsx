import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { PDFDocument, rgb } from "pdf-lib";
import { toPng } from "html-to-image";

const StudentDetails = ({ student, onClose }) => {
  const qrCodeRef = useRef(null);

  const downloadIDCard = async () => {
    const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`;
    const grade = `Grade: ${student.grade}`;
    const section = `Section: ${student.section}`;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([200, 300]); // Adjust the page size to portrait

    // Calculate positions for QR code and text
    const qrCodeX = 50;
    const qrCodeY = 150;
    const textX = 20;
    const textY = 100;

    // Convert the QR code SVG to a data URL using html-to-image
    const qrCodeDataUrl = await toPng(qrCodeRef.current);

    // Embed the QR code image in the PDF
    const qrCodeImage = await pdfDoc.embedPng(qrCodeDataUrl);
    const qrCodeDims = qrCodeImage.scale(0.75); // Adjust QR code size
    page.drawImage(qrCodeImage, {
      x: qrCodeX,
      y: qrCodeY,
      width: qrCodeDims.width,
      height: qrCodeDims.height,
    });

    // Add styled text to the PDF
    page.drawText(fullName, {
      x: textX,
      y: textY,
      size: 14,
      color: rgb(0, 0, 0), // Black color
    });
    page.drawText(grade, {
      x: textX,
      y: textY - 30,
      size: 12,
      color: rgb(0, 0, 0), // Black color
    });
    page.drawText(section, {
      x: textX,
      y: textY - 50,
      size: 12,
      color: rgb(0, 0, 0), // Black color
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
        <div className="mt-4">
          <strong>QR Code:</strong>
          <div ref={qrCodeRef}>
            <QRCode value={student._id} size={128} />
          </div>
          <button
            onClick={downloadIDCard}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Download ID Card as PDF
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
