import * as React from "react";
import { useAutocomplete } from "@mui/core/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Soccer from "../icons/Soccer";
import UserLine from "../session/UserLine";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
`
);

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 350px;
  min-height: 40px;
  text-align: left;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 40px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

const StyledChip = styled(Chip)`
  min-height: 28px !important;
  margin-bottom: 2px;
  margin-right: 2px;
`;

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <StyledChip
      variant={"outlined"}
      color={"success"}
      icon={<Soccer />}
      label={label}
      onDelete={onDelete}
    />
  );
}

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 90%;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
  & li {
    padding: 0px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

const StyledLi = styled("li")`
  border-bottom: 1px solid #b1b1b1;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #ebf8f8;
  }
`;

const StyledCheckIcon = styled("div")`
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  width: 41px;
  cursor: pointer;
`;

export default function AutoComplete({ players, setPlayers }) {
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "auto-complete",
    multiple: true,
    freeSolo: true,
    limitTags: 4,
    options: players,
    getOptionLabel: (option) => option.first_name,
  });

  useEffect(() => {
    setPlayers(value);
  }, [value]);

  return (
    <Root>
      <div {...getRootProps()}>
        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {value.map((option, index) => (
            <Tag
              label={option.first_name ? option.first_name : option}
              {...getTagProps({ index })}
            />
          ))}
          <input placeholder="Invite friends!" {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            return (
              <StyledLi key={index} {...getOptionProps({ option, index })}>
                <UserLine name={option.first_name} />
                <StyledCheckIcon>
                  <Checkbox defaultChecked color="default" />
                </StyledCheckIcon>
              </StyledLi>
            );
          })}
        </Listbox>
      ) : null}
    </Root>
  );
}
