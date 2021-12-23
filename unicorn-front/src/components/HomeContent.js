import React from "react";
import "../css/HomeContent.css";
import PitchCard from "./PitchCard";
import PhotoCard from "./PhotoCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import SearchBar from "./search/SearchBar";
import landingImage from "../images/Landing.avif";

const ContainerStyled = styled(Container)`
  padding-top: 24px;
  padding-bottom: 24px;
`;

const GridStyled = styled(Grid)`
  align-items: center;
  justify-content: center;
`;

const LandingPage = styled.div`
  background-image: url(${landingImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  /*margin-top: 2px;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
`;

function HomeContent() {
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <div className="homeSection">
      {!medium && <SearchBar />}
      <LandingPage>
        <h1
          style={{
            color: "white",
            "font-size": "90px",
            "margin-top": "-100px",
          }}
        >
          Stay Active and Healthy
        </h1>
        <p style={{ color: "white", "margin-top": "8px", "font-size": "30px" }}>
          Are you ready to play the beautiful game?
        </p>
      </LandingPage>
      <h1>Featured Gaming Grounds</h1>
      <ContainerStyled maxWidth={"xl"}>
        <GridStyled container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <PitchCard
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSgvoeyX-SFdedVUkb8HK8G68JHzR2m4S3Eg&usqp=CAU"
              name="Bole"
              description="A nice futsal Pitch in Bole"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <PitchCard
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbLkhs7L1GXLLhxwGJsQJDVRuUbeZnvQt4BQ&usqp=CAU"
              name="A.A Stadium"
              description="Football field in Addis Ababa Stadium"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <PitchCard
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbLkhs7L1GXLLhxwGJsQJDVRuUbeZnvQt4BQ&usqp=CAU"
              name="A.A Stadium"
              description="Football field  some lvery long text is in here lets seein Addis Ababa Stadium"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <PitchCard
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbLkhs7L1GXLLhxwGJsQJDVRuUbeZnvQt4BQ&usqp=CAU"
              name="A.A Stadium"
              description="Football field  some lvery long text is in here lets seein Addis Ababa Stadium"
            />
          </Grid>
        </GridStyled>
      </ContainerStyled>
      <div className="homeSection__photoGalaries">
        <h1>Photo Galleries</h1>
        <ContainerStyled maxWidth={"xl"}>
          <GridStyled container spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <PhotoCard
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO8y5KaqAOsMLe1tUI5B4tbm1CAt2oxIeQuA&usqp=CAU"
                description="Ball is life"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <PhotoCard
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiHvK_-J0E3jlriXMITj9SzZB0_Tjh2_xGwA&usqp=CAU"
                description="Boys playing Futsal in the morning"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <PhotoCard
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgKOOscz3tBcFRcf33OxaC654dQ-kfZlvkeQ&usqp=CAU"
                description="Play the beautiful game anywhere"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <PhotoCard
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRU0Kxz1urO4U-2j7D6mExyb0pyBT4L_a7NQ&usqp=CAU"
                description="Play the beautiful game anytime"
              />
            </Grid>
          </GridStyled>
        </ContainerStyled>
      </div>
    </div>
  );
}

export default HomeContent;
