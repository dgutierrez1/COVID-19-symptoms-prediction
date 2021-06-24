import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import styled from "styled-components";
import { Formik } from "formik";
import "./Home.css";
import {
  UserEntry,
  entryFormInitialValues,
  entryFormValidationSchema,
  testEntry,
  ageRangeOptions,
  genderOptions,
  timeOfDayOptions,
  testNegativeData,
  testPositiveData,
} from "./Home.utils";
import axios from "axios";
import { useState } from "react";
import { warningOutline } from "ionicons/icons";
import { Input, ResultModal, Select } from "../components";

const MessagesContainer = styled.section`
  display: flex;
  flex-direction: column;
`;
const Error = styled(IonLabel)`
  padding: 0.5em 1em;
  background-color: red;
  margin-bottom: 0.5em;
  border-radius: 0.5em;
  width: auto;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
`;

const Container = styled(IonContent)`
  ::part(scroll) {
    margin-top: 3em;
    padding: 1em 1.2em;
  }
`;
const Disclaimer = styled.div`
  padding: 1em;
  background-color: var(--ion-color-light-shade);
  margin-bottom: 0.5em;
  border-radius: 0.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled(IonIcon)`
  margin-right: 0.5em;
  font-size: 30px;
  width: 30px;
  height: 30px;
`;

const SendButton = styled(IonButton)`
  margin-bottom: 1em;
`;

const TestOptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LabelButton = styled(IonLabel)`
  padding: 0.5em;
`;

const BackButton = styled.button`
  width: 7em;
  margin-bottom: 1em;
  padding: 0.5em;
  border-radius: 0.5em;
  background-color: transparent;
  border: 1px solid var(--ion-color-light-tint);
  color: white;
`;

const Home: React.FC = () => {
  const [section, setSection] = useState(0);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<any>();
  const isPositive = result === "1";

  const handleModalDismiss = () => dismiss();

  const [present, dismiss] = useIonModal(ResultModal, {
    onDismiss: handleModalDismiss,
    isPositive,
  });

  const submit = async (values: UserEntry) => {
    setError("");
    try {
      console.log({ values });
      const response = await axios.post(
        "http://0.0.0.0:8080/api/v1/ml",
        values
      );
      setResult(response?.data?.result);
      present();
    } catch (error) {
      setError(error.toString());
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>COVID-19 Symptoms Prediction</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Container fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">COVID-19 Symptoms Prediction</IonTitle>
          </IonToolbar>
        </IonHeader>
        <MessagesContainer>
          <Disclaimer>
            <Icon icon={warningOutline} />
            <span style={{ width: "80%" }}>
              <b>Disclaimer:</b> This software is currently in BETA version.
              None of the information displayed here is meant to be used as
              medical advice. Please reach out to a medical physician if in
              doubt of any of the findings.
            </span>
          </Disclaimer>
          {error && <Error>Request failure: {error}</Error>}
        </MessagesContainer>
        <Formik
          initialValues={testEntry}
          onSubmit={submit}
          validationSchema={entryFormValidationSchema}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            setValues,
            touched,
          }) => {
            const handleTestData = (dataType?: "negative" | "positive") => {
              return () => {
                if (dataType === "negative") {
                  setValues(testNegativeData, true);
                } else if (dataType === "positive") {
                  setValues(testPositiveData, true);
                } else {
                  setValues(entryFormInitialValues);
                }
              };
            };
            return (
              <FormContainer>
                {section === 0 && (
                  <>
                    <Select
                      value={values.age_range}
                      onChange={handleChange("age_range")}
                      label="Age range"
                      error={touched.age_range && errors.age_range}
                      options={ageRangeOptions}
                    />
                    <Select
                      value={values.gender}
                      onChange={handleChange("gender")}
                      label="Sex"
                      error={touched.gender && errors.gender}
                      options={genderOptions}
                    />
                    <Input
                      type="number"
                      value={values.weight}
                      onChange={handleChange("weight")}
                      label="Weight"
                      error={touched.weight && errors.weight}
                    />
                    <Input
                      type="number"
                      value={values.height}
                      onChange={handleChange("height")}
                      label="Height"
                      error={touched.height && errors.height}
                    />
                    <Select
                      value={values.time_of_day}
                      onChange={handleChange("time_of_day")}
                      label="Time of Day"
                      error={touched.time_of_day && errors.time_of_day}
                      options={timeOfDayOptions}
                    />
                    <SendButton onClick={() => setSection(1)}>Next</SendButton>
                  </>
                )}
                {section === 1 && (
                  <>
                    <BackButton onClick={() => setSection(0)}>Back</BackButton>
                    <Input
                      type="number"
                      value={values.bpm}
                      onChange={handleChange("bpm")}
                      label="BPM - Heart rate during measurement (beats / minute)"
                      error={touched.bpm && errors.bpm}
                    />
                    <Input
                      type="number"
                      value={values.amo}
                      onChange={handleChange("amo")}
                      label="Amo - Mode width (% / 50 milliseconds)"
                      error={touched.amo && errors.amo}
                    />

                    <Input
                      type="number"
                      value={values.hf}
                      onChange={handleChange("hf")}
                      label="HF - Power of high frequency waves (milliseconds ^ 2)"
                      error={touched.hf && errors.hf}
                    />
                    <Input
                      type="number"
                      value={values.lf}
                      onChange={handleChange("lf")}
                      label="LF - Power of low frequency waves (milliseconds ^ 2)"
                      error={touched.lf && errors.lf}
                    />
                    <Input
                      type="number"
                      value={values.lfhf}
                      onChange={handleChange("lfhf")}
                      label="LFHF - Low to high frequency wave ratio (lf / hf)"
                      error={touched.lfhf && errors.lfhf}
                    />
                    <Input
                      type="number"
                      value={values.meanrr}
                      onChange={handleChange("meanrr")}
                      label="Mean RR - Mean time between each beat (milliseconds)"
                      error={touched.meanrr && errors.meanrr}
                    />
                    <Input
                      type="number"
                      value={values.mode}
                      onChange={handleChange("mode")}
                      label="Mode - Length of the most common cardiovascular interval (milliseconds)"
                      error={touched.mode && errors.mode}
                    />
                    <Input
                      type="number"
                      value={values.mxdmn}
                      onChange={handleChange("mxdmn")}
                      label="Mxdmn - Difference between highest and lowest cardio values (seconds)"
                      error={touched.mxdmn && errors.mxdmn}
                    />
                    <Input
                      type="number"
                      value={values.pnn50}
                      onChange={handleChange("pnn50")}
                      label="PNN50 - % of RR intervals that fall outside a range of 50 ms from the average"
                      error={touched.pnn50 && errors.pnn50}
                    />
                    <Input
                      type="number"
                      value={values.sdnn}
                      onChange={handleChange("sdnn")}
                      label="Sdnn - Standard deviation of normal heartbeat intervals (milliseconds)"
                      error={touched.sdnn && errors.sdnn}
                    />

                    <Input
                      type="number"
                      value={values.total_power}
                      onChange={handleChange("total_power")}
                      label="Total Power - Total power of hf, lf and vlf waves produced by the heart (milliseconds ^ 2) hf + lf + vlf"
                      error={touched.total_power && errors.total_power}
                    />
                    <Input
                      type="number"
                      value={values.vlf}
                      onChange={handleChange("vlf")}
                      label="VLF - Very low frequency wave power (milliseconds ^ 2)"
                      error={touched.vlf && errors.vlf}
                    />
                    <SendButton
                      color="primary"
                      type="submit"
                      onClick={() => handleSubmit()}
                    >
                      Send
                    </SendButton>
                    <TestOptionsContainer>
                      <LabelButton
                        color="primary"
                        onClick={handleTestData("positive")}
                      >
                        Set Positive Test Data
                      </LabelButton>
                      <LabelButton
                        color="primary"
                        onClick={handleTestData("negative")}
                      >
                        Set Negative Test Data
                      </LabelButton>
                      <LabelButton color="primary" onClick={handleTestData()}>
                        Reset
                      </LabelButton>
                    </TestOptionsContainer>
                  </>
                )}
              </FormContainer>
            );
          }}
        </Formik>
      </Container>
    </IonPage>
  );
};

export default Home;
