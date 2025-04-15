"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { UserCard } from "@/components/user-card";
import { fetchUsers } from "./actions";

const UserDirectoryPage: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Memoized filtered users
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    const lower = search.trim().toLowerCase();
    if (!lower) return users;
    return users.filter((u) => u.name.toLowerCase().includes(lower));
  }, [users, search]);

  // Memoized userCards
  const userCards = useMemo(
    () =>
      filteredUsers.map((user) => (
        <UserCard
          key={user.id}
          name={user.name}
          email={user.email}
          address={user.address}
        />
      )),
    [filteredUsers]
  );

  // Memoized search handler
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Container maxWidth="md">
        <Box mt={4} textAlign="center">
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        User Directory
      </Typography>
      <Box mb={3} display="flex" justifyContent="center">
        <TextField
          variant="outlined"
          placeholder="Search by name"
          value={search}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          onChange={handleSearch}
          sx={{ width: { xs: "100%", sm: 400 } }}
        />
      </Box>
      <Grid container spacing={3}>
        {userCards}
      </Grid>
    </Container>
  );
};

export default UserDirectoryPage;
