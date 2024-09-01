import React, { useState } from 'react';
import { useAddStudent } from '../hooks/useAddStudent';
import { Student } from '../types/user';
import { toast } from 'sonner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useQueryClient } from '@tanstack/react-query';

interface AddStudentProps {
  show: boolean;
  onClose: () => void;
}

const AddStudent = ({ show, onClose }: AddStudentProps) => {
  // Initialize formData with default values
  const [formData, setFormData] = useState<Student>({
    lrn: '',
    firstName: '',
    middleName: '',
    lastName: '',
    grade: '',
    section: '',
  });
  const mutation = useAddStudent();
  const queryClient = useQueryClient();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message || 'Student added successfully');
        setFormData({
          lrn: '',
          firstName: '',
          middleName: '',
          lastName: '',
          grade: '',
          section: '',
        });
        onClose();
        queryClient.invalidateQueries({
          queryKey: ['students'],
        });
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'An error occurred');
      },
    });
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose();
    setFormData({
      lrn: '',
      firstName: '',
      middleName: '',
      lastName: '',
      grade: '',
      section: '',
    });
  };
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formLRN">
              <Form.Label>LRN No:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter LRN No."
                name="lrn"
                value={formData.lrn}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMiddleName">
              <Form.Label>Middle Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGrade">
              <Form.Label>Grade:</Form.Label>
              <Form.Control
                as="select"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Grade
                </option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSection">
              <Form.Label>Section:</Form.Label>
              <Form.Control
                as="select"
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Section
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Form.Control>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddStudent;
