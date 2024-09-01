import { useQuery } from '@tanstack/react-query';
import { getStudentAttendance } from '../services/student';
import { Attendance } from '../types/attendance';

export function useAttendanceDetails(lrn?: string) {
  return useQuery<Attendance[], Error>({
    queryKey: ['attendanceDetails', lrn],
    queryFn: () => {
      if (!lrn) {
        return Promise.resolve([]); // Return an empty array if lrn is not provided
      }
      return getStudentAttendance(lrn);
    },
    enabled: !!lrn,
  });
}
