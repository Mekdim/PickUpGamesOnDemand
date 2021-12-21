import { Card, Divider, ListItemButton } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import ListItemText from "@mui/material/ListItemText";
import Metadata from "../MetaData";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import React from "react";
import styled from "@emotion/styled";
import ListItemIcon from "@mui/material/ListItemIcon";
import usePitchData from "./hooks/usePitchData";
import Loader from "../Loader";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const StyledMetaData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 50px;
  padding-left: 10px;
`;

const StyledCardTitle = styled.h3`
  font-family: "Ubuntu", sans-serif;
  textalign: "center";
`;

const StyledListIcon = styled(ListItemIcon)`
  min-width: 25px;
`;

const styleList = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const PitchMetaData = ({ pitchId }) => {
  const { pitch, isLoading, isError } = usePitchData(pitchId);

  if (isLoading || isError) {
    return (
      <Box sx={{ m: 4 }}>
        <Skeleton
          sx={{ mb: 4 }}
          variant="rectangular"
          width={280}
          height={230}
          animation="wave"
        />
        <Skeleton sx={{ mb: 2 }} width="60%" height={30} animation="wave" />
        <Skeleton sx={{ mb: 2 }} width="60%" height={30} animation="wave" />
      </Box>
    );
  }
  return (
    <StyledMetaData>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={pitch.image_url}
          alt="Stadium Pic"
        />
        <CardContent>
          <StyledCardTitle> {pitch.name} </StyledCardTitle>
          <Divider />
          <List sx={styleList} component="nav" aria-label="meta data" dense>
            <ListItem disableGutters>
              <ListItemButton>
                <StyledListIcon>
                  <EmojiPeopleIcon fontSize={"medium"} />
                </StyledListIcon>
                <ListItemText
                  primary={
                    <Metadata
                      fieldName={"Capacity"}
                      fieldValue={pitch.capacity}
                    />
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disableGutters>
              <ListItemButton>
                <StyledListIcon>
                  <AttachMoneyRoundedIcon fontSize={"medium"} />
                </StyledListIcon>
                <ListItemText
                  primary={
                    <Metadata fieldName={"Price"} fieldValue={pitch.price} />
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </StyledMetaData>
  );
};

export default PitchMetaData;
