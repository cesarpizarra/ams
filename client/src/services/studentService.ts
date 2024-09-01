import axios from 'axios';
import { getToken } from '../utils/getToken';
import { Student } from '../types/user';

interface Grade {
  currentGrade: string;
  targetGrade: string;
}

interface Section {
  studentIds: string;
  targetSection: string;
}
export const addStudent = async (studentData: Student) => {
  try {
    const response = await axios.post('/student/add', studentData, {
      headers: {
        Authorization: getToken,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error changing password:', error);
    throw error;
  }
};

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

export const updateGradeLevel = async (gradeData: Grade) => {
  try {
    const response = await axios.put('/student/update-grades', gradeData, {
      headers: {
        Authorization: getToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateSection = async (sectionData: Section) => {
  try {
    const response = await axios.put('/student/update-section', sectionData, {
      headers: {
        Authorization: getToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const deleteStudent = async (studentId: string) => {
  try {
    const response = await axios.delete(`/student/${studentId}`, {
      headers: {
        Authorization: getToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
