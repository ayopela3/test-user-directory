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
      component="article"
      role="article"
      aria-label={`User information for ${name}`}
    >
      <Typography variant="h6" gutterBottom component="h2">
        {name}
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        component="p"
        aria-label={`Email: ${email}`}
      >
        {email}
      </Typography>
      <Typography
        variant="body2"
        component="address"
        aria-label={`Address: ${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`}
      >
        {address.street}, {address.suite},<br />
        {address.city}, {address.zipcode}
      </Typography>
    </Grid>
  );
};
