import { useMutation } from '@tanstack/react-query';
import { addStudent } from '../services/studentService';

export function useAddStudent() {
  return useMutation({
    mutationFn: addStudent,
  });
}
