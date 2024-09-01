import axios from 'axios';
import { getToken } from '../utils/getToken';
import { Student, Teacher } from '../types/user';
import { Attendance } from '../types/attendance';

export const getAllTeachers = async (): Promise<Teacher[]> => {
  try {
    const response = await axios.get('/api/auth/users', {
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

export const getStudentByTeacher = async (): Promise<Student[]> => {
  try {
    const response = await axios.get('/student/students', {
      headers: {
        Authorization: getToken,
      },
    });

    return response.data.students;
  } catch (error) {
    console.error('Error:', error);
    throw Error;
  }
};

export const getStudentAttendanceByTeacher = async (): Promise<
  Attendance[]
> => {
  try {
    const response = await axios.get('/api/attendance/student', {
      headers: {
        Authorization: getToken,
      },
    });

    return response.data.studentAttendances;
  } catch (error) {
    console.error('Error:', error);
    throw Error;
  }
};
