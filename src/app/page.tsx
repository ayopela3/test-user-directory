"use client";

import React, { ChangeEvent, FC, useCallback, useMemo } from "react";
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
import { UserProvider, useUsers } from "@/context/UserContext";

const UserDirectory = () => {
  const { loading, error, filteredUsers, search, setSearch } = useUsers();

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

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

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
      <Typography variant="h5" gutterBottom align="center" component="h1">
        User Directory
      </Typography>
      {/* Search bar */}
      <Box mb={3} display="flex" justifyContent="center">
        <TextField
          variant="outlined"
          placeholder="Search by name"
          value={search}
          id="user-search"
          aria-label="Search users by name"
          slotProps={{
            htmlInput: {
              "aria-label": "Search users by name",
            },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon aria-hidden="true" />
                </InputAdornment>
              ),
            },
          }}
          onChange={handleSearch}
          sx={{ width: { xs: "100%", sm: 400 } }}
        />
      </Box>
      <Grid container spacing={3} role="list" aria-label="User directory list">
        {userCards}
      </Grid>
    </Container>
  );
};

const UserDirectoryPage: FC = () => {
  return (
    <UserProvider>
      <UserDirectory />
    </UserProvider>
  );
};

export default UserDirectoryPage;
