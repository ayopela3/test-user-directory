import React from "react";
import { Grid, Typography } from "@mui/material";
import { FC } from "react";

interface UserCardProps {
  name: string;
  email: string;
  address: Address;
}

export const UserCard: FC<UserCardProps> = ({
  name = "",
  email = "",
  address = { street: "", suite: "", city: "", zipcode: "" },
}) => {
  return (
    <Grid
      border={1}
      p={2}
      borderRadius={1}
      borderColor={"lightgray"}
      boxShadow={"0 0 8px rgba(0, 0, 0, 0.1)"}
      size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
    >
      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {email}
      </Typography>
      <Typography variant="body2">
        {address.street}, {address.suite},<br />
        {address.city}, {address.zipcode}
      </Typography>
    </Grid>
  );
};
