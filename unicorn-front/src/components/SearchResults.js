import React from "react";
import "../css/HomeContent.css";
import { useStateValue } from "../StateProvider";
import PitchCard from "./PitchCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import SearchBar from "./search/SearchBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ContainerStyled = styled(Container)`
  padding-top: 24px;
  padding-bottom: 24px;
`;

function SearchResults() {
  const [{ homeFields }] = useStateValue();
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  console.log("Home fields ", homeFields);

  return (
    <div className="homeSection">
      {!medium && <SearchBar />}
      <h1>Search Results</h1>
      <ContainerStyled maxWidth={"xl"}>
        <Grid container spacing={3}>
          {homeFields ? (
            homeFields.fields.map((field) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={field.pitch_id}>
                <PitchCard
                  path={
                    "/pitch" + "/" + field.pitch_id + "/" + field.dateSearched
                  }
                  key={field.pitch_id}
                  src={field.src}
                  name={field.name}
                  description={field.description}
                />
              </Grid>
            ))
          ) : (
            <p
              style={{
                width: "100vw",
                paddingLeft: "30px",
                "text-align": "center",
              }}
            >
              No results! To get more results, try adjusting your search by
              changing your dates
            </p>
          )}
        </Grid>
      </ContainerStyled>
    </div>
  );
}

export default SearchResults;
