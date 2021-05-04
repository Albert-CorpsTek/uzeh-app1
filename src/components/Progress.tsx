import { colors } from 'src/theme';
import { View } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import React from 'react';
import PropTypes from 'prop-types';

const progressStepsProps = {
  activeStepIconBorderColor: colors.white,
  labelColor: colors.white,
  activeLabelColor: colors.white,
  activeStepNumColor: colors.white,
  disabledStepNumColor: colors.background,
  completedProgressBarColor: colors.white,
  completedStepIconColor: colors.white,
  completedCheckColor: colors.orange,
  labelFontFamily: 'Majari-Regular',
};

const progressStepProps = {
  nextBtnTextStyle: {
    display: 'none',
  },
  previousBtnTextStyle: {
    display: 'none',
  },
};

interface Props {
  step: number;
}

const Progress: React.FC<Props> = ({ step, stepTitles }) => (
  <View
    style={{
      marginBottom: -100,
      scaleX: 0.95,
      scaleY: 0.95,
      marginLeft: 5,
      marginRight: 5,
    }}
  >
    <ProgressSteps {...progressStepsProps} activeStep={step}>
      {stepTitles.map((stepTitle, index) => (
        <ProgressStep {...progressStepProps} label={stepTitle} key={index} />
      ))}
      {/* <ProgressStep {...progressStepProps} label={'Dados\npessoais'} /> */}
      {/* <ProgressStep {...progressStepProps} label={'Categoria\nde\ntrabalho'} /> */}
      {/* <ProgressStep {...progressStepProps} label="Endereço" /> */}
      {/* <ProgressStep {...progressStepProps} label={'Dados\nde\nPagamento'} /> */}
      {/* <ProgressStep {...progressStepProps} label="Anexos" /> */}
    </ProgressSteps>
  </View>
);

Progress.propTypes = {
  step: PropTypes.number.isRequired,
};

export default Progress;
