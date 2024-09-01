import { useMutation } from '@tanstack/react-query';
import { updateGradeLevel } from '../services/studentService';

export function useUpdateGrade() {
  return useMutation({
    mutationFn: updateGradeLevel,
  });
}
