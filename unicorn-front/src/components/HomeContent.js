import React, { useState } from "react";
import "../css/HomeContent.css";
import SearchDateComponent from "./SearchDateComponent";
import { useStateValue } from "../StateProvider";
import TextField from "@mui/material/TextField";
import PitchCard from "./PitchCard";
import PhotoCard from "./PhotoCard";
import { Container, Grid, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import { useHistory, Link as NavLink } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SearchBar from "./search/SearchBar";
const ContainerStyled = styled(Container)`
  padding-top: 24px;
  padding-bottom: 24px;
`;

const GridStyled = styled(Grid)`
  align-items: center;
  justify-content: center;
`;

const GridStyledItem = styled(Grid)`
  display: flex;
  flex-direction: column;
`;

function HomeContent() {
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <div className="homeSection">
      {!medium && <SearchBar />}
      <div className="homeSection__landingImage">
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
          {" "}
          Are you ready to play the beautiful game?
        </p>
      </div>
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
