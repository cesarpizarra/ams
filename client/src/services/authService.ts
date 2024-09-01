import axios from 'axios';
import { getToken } from '../utils/getToken';

interface ChangePassword {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = async (passwordData: ChangePassword) => {
  try {
    const response = await axios.post(
      '/api/auth/update-password',
      passwordData,
      {
        headers: {
          Authorization: getToken,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error changing password:', error);
    throw error;
  }
};
