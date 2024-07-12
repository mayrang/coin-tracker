import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { themeState } from "../atom/theme";

const CheckBox = styled.input`
  &:checked + label {
    background-color: #e67e22;
  }
  &:checked + label > span {
    left: calc(100% - 27px);
  }
`;

const Label = styled.label`
  position: relative;
  width: 60px;
  height: 30px;
  display: block;
  border-radius: 9999px;
  background-color: #7f8c8d;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const Toggle = styled.span`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 3px;
  border-radius: inherit;
  overflow: auto;
  background: white;
  transition: all 0.3s ease;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

const SmallSpan = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.textColor};
`;
export default function ThemeToggle() {
  const [theme, setTheme] = useRecoilState(themeState);
  const changeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <Container>
      <CheckBox id="check" type="checkbox" onChange={changeToggle} hidden />
      <Label htmlFor="check">
        <Toggle></Toggle>
      </Label>
      <SmallSpan>{theme}</SmallSpan>
    </Container>
  );
}
