import { useState } from 'react';
import { toast } from 'sonner';
import { useChangePassword } from '../hooks/useChangePassword';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

interface ChangePasswordProps {
  show: boolean;
  onClose: () => void;
}
const ChangePassword = ({ onClose, show }: ChangePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const mutation = useChangePassword();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { currentPassword, newPassword },
      {
        onSuccess: (data) => {
          toast.success(data.message || 'Password changed successfully');
          handleClose();
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message);
        },
      }
    );
  };

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formCurrentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePassword;
