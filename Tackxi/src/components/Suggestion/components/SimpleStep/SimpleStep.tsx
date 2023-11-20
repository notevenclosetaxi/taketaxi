import React, {useMemo} from 'react';
import {BusMode, TaxiMode, WalkMode} from './components';
import {Step} from '../../../../interface/route.interface';
import {ModeEnum} from '../../../../enums';

interface SimpleStepProps {
  step: Step;
  wastedTime: number;
}

const SimpleStep: React.FC<SimpleStepProps> = ({step}) => {
  const renderStep = useMemo(() => {
    // const percent = Math.floor((step.sectionTime / wastedTime) * 100);

    switch (step.mode) {
      case ModeEnum.BUS: {
        return <BusMode percent={20} sectionTime={step.sectionTime} />;
      }
      case ModeEnum.TAXI: {
        return <TaxiMode percent={50} sectionTime={step.sectionTime} />;
      }
      case ModeEnum.WALK: {
        return <WalkMode percent={30} sectionTime={step.sectionTime} />;
      }
    }
  }, [step]);

  return renderStep;
};

export default SimpleStep;
