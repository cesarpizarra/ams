import { formatTime } from './index';
export const generatePrintHTML = (student, attendanceRecords) => {
  return `
      <html>
        <head>
          <title>${student.firstName} ${student.middleName} ${
    student.lastName
  } - Attendance Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              text-align: center;
            }
            h1 {
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
          </style>
        </head>
        <body>
          <h4>${student.firstName} ${student.middleName} ${
    student.lastName
  }</h4>
          <h2>Attendance Record</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${attendanceRecords
                .map(
                  (record) => `
                    <tr>
                      <td>${record.date}</td>
                      <td>   ${
                        record.timeIn ? formatTime(record.timeIn) : 'No Time In'
                      }</td>
                      <td>${
                        record.timeOut
                          ? formatTime(record.timeOut)
                          : 'No Time Out'
                      }</td>
                      <td>${record.status}</td>
                    </tr>
                  `
                )
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
};
