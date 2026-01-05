import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { Edit, Delete, PersonOutline } from '@mui/icons-material';

const EmployeeTable = ({ employees, onEdit, onDelete, onToggleStatus }) => {
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      onDelete(id);
    }
  };

  if (employees.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          color: 'text.secondary',
        }}
      >
        <PersonOutline sx={{ fontSize: 80, opacity: 0.2, mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          No employees found
        </Typography>
        <Typography variant="body2">
          Try adjusting your filters or add a new employee
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Profile</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center" className="no-print">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} hover>
              <TableCell>#{employee.id}</TableCell>
              <TableCell>
                <Avatar src={employee.profileImage} alt={employee.fullName} />
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="500">
                  {employee.fullName}
                </Typography>
              </TableCell>
              <TableCell>{employee.gender}</TableCell>
              <TableCell>{employee.dob}</TableCell>
              <TableCell>{employee.state}</TableCell>
              <TableCell>
                <Chip
                  label={employee.isActive ? 'Active' : 'Inactive'}
                  color={employee.isActive ? 'success' : 'error'}
                  size="small"
                  onClick={() => onToggleStatus(employee.id)}
                  sx={{ cursor: 'pointer' }}
                />
              </TableCell>
              <TableCell align="center" className="no-print">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => onEdit(employee)}
                  sx={{ mr: 1 }}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => handleDelete(employee.id, employee.fullName)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;