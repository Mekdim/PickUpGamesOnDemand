import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '../../../components/icons/Edit';
import TodayIcon from '@mui/icons-material/Today';

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
  max-width: 310px;
`;

const CardHeaderStyled = styled(CardHeader)`
  padding: 4px 16px;
`;

export const PitchCard = ({ src, name, description, path, pitchId }) => {
  const history = useHistory();
  return (
    <CardStyled>
      <CardHeaderStyled
        action={
          <Tooltip title="Edit Pitch" placement={'left'} arrow>
            <IconButton
              aria-label="edit pitch"
              onClick={() => history.push(`/edit/pitch/${pitchId}/details`)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <CardActionArea onClick={() => history.push(path)}>
        <CardMedia
          className="pitch__image"
          component="img"
          height="240"
          image={src}
          alt="Pitch"
          sx={{ objectFit: 'cover', width: '100%' }}
        />
        <CardContentStyled>
          <Typography
            sx={{ color: 'black' }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          <Typography
            sx={{ color: 'secondary', textOverflow: 'ellipsis' }}
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>
        </CardContentStyled>
      </CardActionArea>
      <CardActionsStyled>
        <StyledJoinButton
          color={'success'}
          variant="contained"
          onClick={() => history.push(`/calendar/${pitchId}`)}
          endIcon={<TodayIcon />}
        >
          Calendar
        </StyledJoinButton>
      </CardActionsStyled>
    </CardStyled>
  );
};

export default PitchCard;
