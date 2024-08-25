import axios from 'axios';
import { getToken } from '../utils/getToken';
export const getAllStudents = async () => {
  try {
    const response = await axios.get('/student/all/students', {
      headers: {
        Authorization: getToken,
      },
    });

    const students = response.data || [];
    const length = students.length;

    return { students, length };
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getAllAttendance = async () => {
  try {
    const response = await axios.get('/api/attendance', {
      headers: {
        Authorization: getToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get('/api/auth/users', {
      headers: {
        Authorization: getToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getStudentByTeacher = async () => {
  try {
    const response = await axios.get('/student/students', {
      headers: {
        Authorization: getToken,
      },
    });

    const students = response.data.students;
    const length = students.length;
    return { students, length };
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getStudentAttendanceByTeacher = async () => {
  try {
    const response = await axios.get('/api/attendance/student', {
      headers: {
        Authorization: getToken,
      },
    });

    return response.data.studentAttendances;
  } catch (error) {
    console.error('Error:', error);
  }
};
export const getStudentAttendance = async (lrn) => {
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

export const getStudentData = async (studentId) => {
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

export const deleteAttendance = async (studentId) => {
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

export const updateStudent = async (studentId, updatedData) => {
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
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    throw new Error(errorMessage);
  }
};

export const updateGrades = async (currentGrade, targetGrade) => {
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

export const updateSection = async (studentIds, targetSection) => {
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

export const deleteStudent = async (studentId) => {
  try {
    const response = await axios.delete(`/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
