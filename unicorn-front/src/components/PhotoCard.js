import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import '../css/Pulse.css';

const CardContentStyled = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const CardStyled = styled(Card)`
  border-radius: 10px;
`;

const PhotoCard = ({ src, name, description }) => {
  return (
    <CardStyled>
      <CardActionArea>
        <CardMedia
          className="pitch__image"
          component="img"
          height="150"
          image={src}
          alt="Pitch"
          sx={{ objectFit: 'cover', width: '100%' }}
        />
        <CardContentStyled>
          <Typography
            sx={{ color: 'primary', font: 'bold', fontSize: '15px' }}
            gutterBottom
            variant="body"
            component="div"
          >
            {description}
          </Typography>
        </CardContentStyled>
      </CardActionArea>
    </CardStyled>
  );
};

export default PhotoCard;
