import styled from '@emotion/styled';
import ListItem from '@mui/material/ListItem';

export const StyledListItem = styled(ListItem)`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border: 0;
  :hover {
    background-color: #e5e7ed;
    :before {
      content: '';
      width: 30px;
      height: 30px;
      position: absolute;
      right: 0;
      top: -30px;
      border-radius: 50%;
      box-shadow: 35px 30px 0 20px #e5e7ed;
    }

    :after {
      content: '';
      width: 30px;
      height: 30px;
      position: absolute;
      right: 0;
      bottom: -30px;
      border-radius: 50%;
      box-shadow: 35px -30px 0 20px #e5e7ed;
    }
  }
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 4px;
`;
