import axios from 'axios';
import { getToken } from '../utils/getToken';
import { Student, Teacher } from '../types/user';
import { Attendance } from '../types/attendance';

export const getAllStudents = async (): Promise<Student[]> => {
  try {
    const response = await axios.get('/student/all/students', {
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
export const getStudentAttendance = async (lrn: string) => {
  try {
    const response = await axios.get(`/api/attendance/student/${lrn}`, {
      headers: {
        Authorization: getToken,
      },
    });
    return response.data.attendanceRecords;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getStudentData = async (studentId: string) => {
  try {
    const response = await axios.get(`/student/${studentId}`, {
      headers: {
        Authorization: getToken,
      },
    });
    return response.data.student;
  } catch (error) {
    console.error('Error:', error);
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

export const updateStudent = async (studentId: string, updatedData: any) => {
  try {
    const response = await axios.put(
      `/student/update/${studentId}`,
      updatedData,
      {
        headers: {
          Authorization: getToken,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    throw new Error(errorMessage);
  }
};

export const updateGrades = async (
  currentGrade: string,
  targetGrade: string
) => {
  try {
    const response = await axios.put(
      '/student/update-grades',
      {
        currentGrade,
        targetGrade,
      },
      {
        headers: {
          Authorization: getToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateSection = async (
  studentIds: string,
  targetSection: string
) => {
  try {
    const response = await axios.put(
      '/student/update-section',
      {
        studentIds,
        targetSection,
      },
      {
        headers: {
          Authorization: getToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteStudent = async (studentId: string) => {
  try {
    const response = await axios.delete(`/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
