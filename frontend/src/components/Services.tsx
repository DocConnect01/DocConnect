import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import dentalImage from "../assets/images/dental.jpeg";
import bonesImage from "../assets/images/bones.jpg";
import diagnosisImage from "../assets/images/Diagnosis.jpg";
import cardiologyImage from "../assets/images/cardiology.jpg";
import surgeryImage from "../assets/images/heart-surgery.jpg";
import eyeCareImage from "../assets/images/surgical-eye-care-innovations.jpg";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
} from "@mui/material";

const imageMap = {
  "Dental treatments": dentalImage,
  "Bones treatments": bonesImage,
  Diagnosis: diagnosisImage,
  Cardiology: cardiologyImage,
  Surgery: surgeryImage,
  "Eye care": eyeCareImage,
};

const Services = () => {
  const services = useSelector((state: RootState) => state.services.services);

  return (
    <div style={{ padding: "40px 20px", backgroundColor: "#f4f6f8" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Services We Provide
      </Typography>
      <Typography
        variant="body1"
        paragraph
        align="center"
        sx={{ marginBottom: "40px", color: "#607d8b" }}
      >
        We offer a wide range of medical services to meet all your healthcare
        needs.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card
              sx={{
                maxWidth: 345,
                margin: "auto",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-10px)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={imageMap[service.title as keyof typeof imageMap]}
                alt={service.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  sx={{ color: "#1976d2", fontWeight: "bold" }}
                >
                  Learn more
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Services;
