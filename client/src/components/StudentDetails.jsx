import React from "react";
import QRCode from "react-qr-code";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import { toPng } from "html-to-image";
import logoImage from "../assets/logo-image.png";
import backgroundImage from "../assets/bg-image.png";

const StudentDetails = ({ student, onClose }) => {
  const downloadIDCard = async () => {
    const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`;
    const grade = `Grade: ${student.grade}`;
    const section = `Section: ${student.section}`;

    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([400, 200]); // Adjust the page size

    // Load the background image
    const backgroundImageData = await fetch(backgroundImage).then((res) =>
      res.arrayBuffer()
    );
    const backgroundImageEmbed = await pdfDoc.embedPng(backgroundImageData);

    // Draw the background image
    const { width, height } = page.getSize();
    page.drawImage(backgroundImageEmbed, {
      x: 0,
      y: 0,
      width,
      height,
    });

    // Calculate positions for logo and QR code
    const logoX = 20;
    const logoY = height - 120;
    const qrCodeX = width - 120;
    const qrCodeY = height - 120;
    const elementWidth = 100;

    // Embed the logo image on the left side
    const logoImageData = await fetch(logoImage).then((res) =>
      res.arrayBuffer()
    );
    const logoImageEmbed = await pdfDoc.embedPng(logoImageData);
    page.drawImage(logoImageEmbed, {
      x: logoX,
      y: logoY,
      width: elementWidth,
      height: elementWidth,
      rotation: degrees(0),
    });

    // Convert the QR code SVG to a PNG image and adjust the size
    const svgElement = document.getElementById("qrcode-svg");
    const pngDataUrl = await toPng(svgElement, { width: 100 }); // Adjust QR code size

    // Embed the QR code image in the PDF on the right side
    const pngImage = await pdfDoc.embedPng(pngDataUrl);
    const pngDims = pngImage.scale(0.75); // Adjust QR code size
    page.drawImage(pngImage, {
      x: qrCodeX,
      y: qrCodeY,
      width: pngDims.width,
      height: pngDims.height,
    });

    // Add styled text to the PDF at the bottom
    page.drawText(fullName, {
      x: 20,
      y: 15,
      size: 14,
      color: rgb(1, 1, 1),
    });
    page.drawText(grade, {
      x: 20,
      y: 40,
      size: 12,
      color: rgb(1, 1, 1),
    });
    page.drawText(section, {
      x: 20,
      y: 60,
      size: 12,
      color: rgb(1, 1, 1),
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
          <div>
            <QRCode id="qrcode-svg" value={student._id} size={128} />
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
