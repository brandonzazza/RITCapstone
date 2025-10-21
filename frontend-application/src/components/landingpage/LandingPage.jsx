import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import Header from "../Header/Header.jsx";
import heroImage from "../../assets/hero.jpg";
import feature1Image from "../../assets/feature1.jpg";
import feature2Image from "../../assets/feature2.jpg";
import feature3Image from "../../assets/feature3.jpg";

function LandingPage() {
  const features = [
    {
      title: "RSVP & Task Management",
      description:
        "Easily track event attendees, manage tasks, and keep everything organized in one place.",
      image: feature1Image,
    },
    {
      title: "Data-Driven Insights",
      description:
        "Monitor live metrics, generate reports, and make informed decisions to improve your events.",
      image: feature2Image,
    },
    {
      title: "Intuitive Design",
      description:
        "User-friendly interface designed to reduce learning curve and integrate seamlessly with other tools.",
      image: feature3Image,
    },
  ];

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <Box
          sx={{
            position: "relative", // needed for overlay
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            py: { xs: 8, md: 16 },
            textAlign: "center",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.6)",
              zIndex: 1,
            }}
          />

          {/* Text content */}
          <Box
            sx={{ position: "relative", zIndex: 2, maxWidth: 800, margin: 10 }}
          >
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              TaskPro
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              The ultimate solution to simplify your event planning workflow,
              boost productivity, and keep your team on track.
            </Typography>
          </Box>
        </Box>

        {/* Features Section */}
        <Container sx={{ py: { xs: 6, md: 12 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 6,
            }}
          >
            Key Features
          </Typography>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="stretch"
          >
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: 3,
                    boxShadow: 4,
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  {/* Consistent, centered image box */}
                  <Box
                    sx={{
                      width: 220,
                      height: 220,
                      borderRadius: 2,
                      overflow: "hidden",
                      mt: 3,
                      border: 2,
                      borderColor: "grey.400",
                    }}
                  >
                    <Box
                      component="img"
                      src={feature.image}
                      alt={feature.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      textAlign: "center",
                      p: 3,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ maxWidth: 260 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Call-to-Action Section */}
        <Box
          sx={{
            py: { xs: 6, md: 12 },
            backgroundColor: "var(--secondary)",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
            Ready to take control of your events?
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            Sign up now and experience the power of TaskPro to manage attendees,
            tasks, and metrics seamlessly.
          </Typography>
          <Button
            variant="contained"
            sx={{ px: 5, py: 1.5, fontSize: "1rem", borderRadius: 2 }}
          >
            Sign Up Now
          </Button>
        </Box>
      </main>
    </>
  );
}

export default LandingPage;
