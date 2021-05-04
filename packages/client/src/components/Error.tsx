import { IonLabel } from "@ionic/react";
import styled from "styled-components";

const Label = styled(IonLabel)`
  color: red;
`;
type Props = { error?: string };
const Input = ({ error }: Props) => <>{error && <Label>{error}</Label>}</>;

export default Input;
