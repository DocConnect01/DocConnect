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
  Box,
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
    <Box
      sx={{
        padding: "60px 30px",
        background: "linear-gradient(135deg, #f4f6f8, #e0f7fa)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#1976d2",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        Services We Provide
      </Typography>
      <Typography
        variant="body1"
        paragraph
        align="center"
        sx={{
          marginBottom: "50px",
          color: "#607d8b",
          maxWidth: "800px",
          margin: "0 auto",
          lineHeight: 1.7,
        }}
      >
        We offer a wide range of medical services to meet all your healthcare
        needs. Our professional and experienced staff ensure that you get the
        best care possible. Here are some of the services we provide:
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card
              sx={{
                maxWidth: 345,
                margin: "auto",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
                background: "#fff",
                borderRadius: "15px",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={imageMap[service.title as keyof typeof imageMap]}
                alt={service.title}
                sx={{
                  objectFit: "cover",
                  borderRadius: "15px 15px 0 0",
                }}
              />
              <CardContent sx={{ padding: "24px" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    textAlign: "center",
                    marginBottom: "12px",
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                >
                  {service.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "16px",
                }}
              >
                <Button
                  size="small"
                  sx={{
                    background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                    color: "#fff",
                    fontWeight: "bold",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    transition: "background 0.3s ease-in-out",
                    "&:hover": {
                      background: "linear-gradient(45deg, #1565c0, #1e88e5)",
                    },
                  }}
                >
                  Learn more
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
