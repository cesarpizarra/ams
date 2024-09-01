import axios from 'axios';
import { getToken } from '../utils/getToken';
import { Attendance } from '../types/attendance';

export const getAllAttendance = async (): Promise<Attendance[]> => {
  try {
    const response = await axios.get('/api/attendance', {
      headers: {
        Authorization: getToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw Error;
  }
};

export const deleteAttendance = async (studentId: string) => {
  try {
    const response = await axios.delete(`/api/attendance/delete/${studentId}`, {
      headers: {
        Authorization: getToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
