import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

const Services = () => {
  const services = useSelector((state: RootState) => state.services.services);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Services we provide
      </Typography>
      <Typography variant="body1" paragraph align="center">
        Lorem ipsum dolor sit amet consectetur adipiscing elit semper.
      </Typography>
      <Grid container spacing={4}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={service.image}
                alt={service.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
              <Button size="small">Learn more</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Services;
