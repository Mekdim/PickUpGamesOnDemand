import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import "../css/Pulse.css";
import LazyLoad from 'react-lazy-load';

const CardActionsStyled = styled(CardActions)`
  justify-content: flex-end;
`;

const StyledJoinButton = styled(Button)`
  min-width: 150px;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
    0px 1px 3px 1px rgb(60 64 67 / 15%);
  box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
    0px 1px 3px 1px rgb(60 64 67 / 15%);
  :focus,
  :hover {
    transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-box-shadow: 0px 4px 4px 0px rgb(60 64 67 / 30%),
      0px 8px 12px 6px rgb(60 64 67 / 15%);
    box-shadow: 0px 4px 4px 0px rgb(60 64 67 / 30%),
      0px 8px 12px 6px rgb(60 64 67 / 15%);
  }
`;

const CardContentStyled = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const CardStyled = styled(Card)`
  border-radius: 10px;
`;

const PitchCard = ({ src, name, description, path }) => {
  const history = useHistory();
  return (
   
    <CardStyled>
      <CardActionArea onClick={() => history.push(path)}>
        <CardMedia
          className="pitch__image"
          component="img"
          height="240"
          image={src}
          alt="Pitch"
          sx={{ "object-fit": "cover", width: "100%" }}
        />
        <CardContentStyled>
          <Typography
            sx={{ color: "black" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          <Typography
            sx={{ color: "secondary" }}
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>
        </CardContentStyled>
      </CardActionArea>
      <CardActionsStyled>
        <StyledJoinButton
          color={"success"}
          variant="contained"
          onClick={() => history.push(path)}
        >
          Join Games!
        </StyledJoinButton>
      </CardActionsStyled>
    </CardStyled>
    
  );
};

export default PitchCard;
