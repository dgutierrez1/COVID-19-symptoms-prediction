import React from "react";
import { IonButton } from "@ionic/react";
import styled from "styled-components";

const Container = styled.div<{ isPositive: boolean }>`
  padding: 2em;
  background-color: ${({ isPositive }) =>
    isPositive ? "crimson" : "dodgerblue"};
  width: 100%;
  font-size: 1.5em;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

const DismissButton = styled(IonButton)`
  ::part(native) {
    background-color: transparent;
    box-shadow: none;
    border: 1px solid white;
  }
`;
const ResultModal: React.FC<{
  isPositive: boolean;
  onDismiss: () => void;
}> = ({ onDismiss, isPositive }) => (
  <Container isPositive={isPositive}>
    <div style={{ marginTop: "5em" }}>
      {isPositive
        ? "You are IN RISK of presenting COVID-19 symptoms in less than 15 days. Please seek medical assitance."
        : "You have NO RISK of presenting COVID-19 symptoms"}
    </div>
    <DismissButton expand="block" onClick={() => onDismiss()}>
      Close
    </DismissButton>
  </Container>
);

export default ResultModal;
