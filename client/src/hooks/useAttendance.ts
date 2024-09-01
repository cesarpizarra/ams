import { useQuery } from '@tanstack/react-query';
import { getAllAttendance } from '../services/attendanceService';
import { getStudentAttendanceByTeacher } from '../services/teacherService';

interface AttendanceStats {
  timeInCount: number;
  timeOutCount: number;
}

export function useAttendance(userRole: string) {
  return useQuery({
    queryKey: ['attendance', userRole],
    queryFn: async () => {
      // Fetch data concurrently
      const [attendanceData, studentAttendanceData] = await Promise.all([
        getAllAttendance(),
        getStudentAttendanceByTeacher(),
      ]);

      const currentDate = new Date().toLocaleDateString('en-US', {
        timeZone: 'Asia/Manila',
      });

      // Function to process attendance data
      const processAttendanceData = (data: any[]): AttendanceStats => {
        const timeInCount = data.filter(
          (record) =>
            new Date(record.timeIn).toLocaleDateString('en-US', {
              timeZone: 'Asia/Manila',
            }) === currentDate
        ).length;

        const timeOutCount = data.filter(
          (record) =>
            new Date(record.timeOut).toLocaleDateString('en-US', {
              timeZone: 'Asia/Manila',
            }) === currentDate
        ).length;

        return { timeInCount, timeOutCount };
      };

      // Process both data sets
      const attendanceStats = processAttendanceData(attendanceData);
      const studentAttendanceStats = processAttendanceData(
        studentAttendanceData
      );

      // Return the processed data based on role
      return {
        admin: attendanceStats,
        teacher: studentAttendanceStats,
      };
    },
    enabled: !!userRole,
  });
}
