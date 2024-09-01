import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { deleteAttendance } from '../services/student';
import { formatDate, formatTime } from '../utils';
import { FaFileExcel, FaRegTrashAlt } from 'react-icons/fa';
import { EncryptStorage } from 'encrypt-storage';
import { useAttendanceDetails } from '../hooks/useAttendanceDetails';
import Loader from '../common/Loader';
const SECRET = import.meta.env.VITE_LOCAL_KEY;
import { Table } from 'react-bootstrap';
const encryptStorage = new EncryptStorage(SECRET, {
  storageType: 'localStorage',
});
const AttendanceDetails: React.FC = () => {
  const { firstName, middleName, lastName, grade, section, lrn } = useParams();
  const { data, isLoading, error } = useAttendanceDetails(lrn);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    // Retrieve role from encrypted storage
    const storedRole = encryptStorage.getItem('ascs');
    setUserData(storedRole);
  }, []);

  const handleDeleteAttendance = async () => {
    if (!data || data?.length === 0) {
      return Swal.fire(
        'Oops!',
        'Unable to delete, no data available',
        'warning'
      );
    }
    try {
      // Use SweetAlert for confirmation
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        await deleteAttendance(lrn);

        Swal.fire('Deleted!', 'Student has been deleted.', 'success');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const exportToExcel = () => {
    if (!data || data?.length === 0) {
      return Swal.fire('Oops!', 'No data, unable to export', 'warning');
    }
    const dataForExport =
      data?.map((record) => ({
        Date: formatDate(record.date),
        'Time In': record.timeIn ? formatTime(record.timeIn) : 'No Time In',
        'Time Out': record.timeOut ? formatTime(record.timeOut) : 'No Time Out',
        Status: record.status,
      })) || [];

    const ws = XLSX.utils.json_to_sheet(dataForExport);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const fileName = `${firstName}_${middleName}_${lastName}_Attendance.xlsx`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  };

  if (isLoading) return <Loader />;
  if (error) return <p>{(error as Error).message}</p>;

  return (
    <div className="container-fluid mt-5">
      <Link
        to={`${
          userData && userData.role === 'admin'
            ? '/attendance'
            : '/student-list'
        }`}
        className="btn btn-secondary"
      >
        Back
      </Link>
      <div className="d-md-flex align-items-center justify-content-between mt-3">
        <h2>
          {firstName} {middleName} {lastName}
        </h2>
        <div className="d-md-flex gap-4 align-items-center ">
          <p className="mb-0">Grade: {grade}</p>
          <p className="mb-0">Section: {section}</p>

          <div className="d-flex align-items-center justify-content-end gap-3">
            <button
              onClick={exportToExcel}
              type="button"
              className="btn btn-success"
              title="Export to Excel"
            >
              <FaFileExcel />
            </button>
            <button
              onClick={handleDeleteAttendance}
              type="button"
              className="btn btn-danger"
              title="Delete Records"
            >
              <FaRegTrashAlt />
            </button>
          </div>
        </div>
      </div>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Time In</th>
            <th scope="col">Time Out</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((record, i) => (
              <tr key={i} className="table-light">
                <td>{formatDate(record.date)}</td>
                <td>
                  {record.timeIn ? formatTime(record.timeIn) : 'No Time In'}
                </td>
                <td>
                  {record.timeOut ? formatTime(record.timeOut) : 'No Time Out'}
                </td>
                <td
                  className={`${
                    record.status === 'Present'
                      ? 'text-success'
                      : 'text-warning'
                  }`}
                >
                  {record.status}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AttendanceDetails;
