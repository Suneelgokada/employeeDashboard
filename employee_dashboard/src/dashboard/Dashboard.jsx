import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Collapse,
} from "@mui/material";
import {
  Logout,
  PersonOutline,
  Search,
  FilterList,
  Add,
  Print,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import EmployeeTable from "./EmployeeTable";
import EmployeeForm from "./EmployeeForm";

const initialEmployees = [
  {
    id: 1,
    fullName: "Sunil",
    gender: "Male",
    dob: "1990-05-15",
    state: "Andhra Pradesh",
    isActive: true,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sunil",
  },
  {
    id: 2,
    fullName: "Kari Munnisa",
    gender: "Female",
    dob: "1992-08-22",
    state: "Karnataka",
    isActive: true,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Munnisa",
  },
  {
    id: 3,
    fullName: "Sandeep",
    gender: "Male",
    dob: "1988-03-10",
    state: "Gujarat",
    isActive: false,
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sandeep",
  },
];

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

 useEffect(() => {
  const stored = localStorage.getItem("employees");
  
  if (stored && JSON.parse(stored).length > 0) {
    setEmployees(JSON.parse(stored));
  } else {
    setEmployees(initialEmployees);
    localStorage.setItem("employees", JSON.stringify(initialEmployees));
  }
}, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGender =
      genderFilter === "all" || emp.gender === genderFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && emp.isActive) ||
      (statusFilter === "inactive" && !emp.isActive);
    return matchesSearch && matchesGender && matchesStatus;
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

 const handleAddEmployee = (emp) => {
  const nextId = employees.length > 0 
    ? Math.max(...employees.map(e => e.id)) + 1 
    : 1;
  const newEmployee = { 
    ...emp, 
    id: nextId
  };
  setEmployees([...employees, newEmployee]);
  setShowForm(false);
};

  const handleEditEmployee = (emp) => {
    setEmployees(employees.map((e) => (e.id === emp.id ? emp : e)));
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Delete employee?")) {
      setEmployees(employees.filter((e) => e.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setEmployees(
      employees.map((e) =>
        e.id === id ? { ...e, isActive: !e.isActive } : e
      )
    );
  };

  const handlePrint = () => window.print();

  const activeCount = employees.filter((e) => e.isActive).length;
  const inactiveCount = employees.length - activeCount;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* ===== HEADER (NO PRINT) ===== */}
      <AppBar position="static" className="no-print">
        <Toolbar>
          <PersonOutline sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Employee Management System
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* ===== STATS (NO PRINT) ===== */}
        <Grid container spacing={3} sx={{ mb: 4 }} className="no-print">
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography>Total Employees</Typography>
                <Typography variant="h4">{employees.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography>Active</Typography>
                <Typography variant="h4" color="success.main">
                  {activeCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography>Inactive</Typography>
                <Typography variant="h4" color="error.main">
                  {inactiveCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* ===== TABLE SECTION ===== */}
        <Paper sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
            }}
            className="no-print"
          >
            <Typography variant="h5">Employee List</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                startIcon={<FilterList />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
              <Button startIcon={<Print />} onClick={handlePrint}>
                Print
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setShowForm(true)}
              >
                Add Employee
              </Button>
            </Box>
          </Box>

          {/* FILTERS */}
          <Collapse in={showFilters} className="no-print">
            <Paper sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={genderFilter}
                      label="Gender"
                      onChange={(e) => setGenderFilter(e.target.value)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      label="Status"
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>

          {/* ===== PRINT AREA ===== */}
          <Box className="print-area">
            <EmployeeTable
              employees={filteredEmployees}
              onEdit={(emp) => {
                setEditingEmployee(emp);
                setShowForm(true);
              }}
              onDelete={handleDeleteEmployee}
              onToggleStatus={handleToggleStatus}
            />
          </Box>
        </Paper>
      </Container>

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSave={editingEmployee ? handleEditEmployee : handleAddEmployee}
          onCancel={() => {
            setShowForm(false);
            setEditingEmployee(null);
          }}
        />
      )}
    </Box>
  );
};

export default Dashboard;
