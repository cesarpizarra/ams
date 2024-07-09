import axios from "axios";
import { getToken } from "../utils/getToken";

export const getAllStudents = async () => {
  try {
    const response = await axios.get("/student/all/students", {
      headers: {
        Authorization: getToken,
      },
    });

    const students = response.data;
    const length = students.length;

    return { students, length };
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get("/api/auth/users", {
      headers: {
        Authorization: getToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getStudentByTeacher = async () => {
  try {
    const response = await axios.get("/student/students", {
      headers: {
        Authorization: getToken,
      },
    });

    const students = response.data.students;
    const length = students.length;
    return { students, length };
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getStudentAttendance = async (studentId) => {
  try {
    const response = await axios.get(`/api/attendance/student/${studentId}`, {
      headers: {
        Authorization: getToken,
      },
    });
    return response.data.attendanceRecords;
  } catch (error) {
    console.error("Error:", error);
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
    console.error("Error:", error);
  }
};

export const deleteAttendance = async (studentId) => {
  try {
    const response = await axios.delete(`/api/attendance/delete/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateStudent = async (studentId, updatedData) => {
  try {
    const response = await axios.put(
      `/student/update/${studentId}`,
      {
        studentId,
        updatedData,
      },
      {
        headers: {
          Authorization: getToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
