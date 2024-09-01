import { useMutation } from '@tanstack/react-query';
import { updateSection } from '../services/studentService';

export function useUpdateSection() {
  return useMutation({
    mutationFn: updateSection,
  });
}
