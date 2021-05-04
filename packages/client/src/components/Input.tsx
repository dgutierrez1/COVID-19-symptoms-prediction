import { IonLabel } from "@ionic/react";
import styled from "styled-components";
import { Error } from ".";

const SInput = styled.input<{ hasError: boolean }>`
  background-color: var(--ion-color-dark-contrast);
  border-radius: 0.5em;
  padding: 0.3em 0.5em;
  border: 1px solid
    ${({ hasError }) => (hasError ? "red" : "var(--ion-color-medium-shade)")};
  outline: none;
  &:focus {
    border: 1px solid
      ${({ hasError }) => (hasError ? "red" : "var(--ion-color-primary)")};
  }
`;
const Container = styled.div`
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
`;
type Props = {
  label?: string;
  error?: string;
} & React.HTMLAttributes<HTMLIonInputElement> &
  any;
const Input = ({ label, error, ...props }: Props) => {
  return (
    <Container>
      {label && <IonLabel style={{ marginBottom: "0.2em" }}>{label}</IonLabel>}
      <SInput hasError={!!error} {...props} />
      <Error error={error} />
    </Container>
  );
};

export default Input;
