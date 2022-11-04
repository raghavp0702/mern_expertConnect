import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Contact() {
  return (
    <Box >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <Box
              sx={{
                width: "100%",
                height: 500,
                marginTop:'150px',
                backgroundColor: "lightGrey",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            />
          </Item>
        </Grid>
        <Grid item xs={4} sx={{
            marginTop:'150px',  
            backgroundColor:'black'
        }}>
          <Item>
            <Box
              sx={{
                width: "100%",
                height: 500,
                marginTop:'150px',
                backgroundColor: "lightGrey",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Box
              sx={{
                width: "100%",
                height: 500,
                marginTop:'150px',
                backgroundColor: "lightGrey",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              
            />
            <h1>Raghavendra Pandey</h1>

          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
