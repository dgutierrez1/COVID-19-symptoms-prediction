import { IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import styled from "styled-components";
import Error from "./Error";

const SSelect = styled(IonSelect)`
  background-color: var(--ion-color-dark-contrast);
  margin-bottom: 1em;
  border-radius: 0.5em;
  padding: 0.3em 0.5em;
  border: 1px solid var(--ion-color-medium-shade);
`;
type Props = {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
  value: any;
  onChange: (val: any) => void;
};
const Select = ({ label, error, options, onChange, ...props }: Props) => {
  return (
    <>
      {label && <IonLabel style={{ marginBottom: "0.2em" }}>{label}</IonLabel>}
      <SSelect {...props} onIonChange={(e) => onChange(e.detail.value)}>
        {options.map((opt) => (
          <IonSelectOption value={opt.value}>{opt.label}</IonSelectOption>
        ))}
      </SSelect>
      <Error error={error} />
    </>
  );
};

export default Select;
