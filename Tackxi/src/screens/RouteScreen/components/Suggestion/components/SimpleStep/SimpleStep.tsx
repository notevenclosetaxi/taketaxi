import React, { useMemo } from 'react';
import { Step } from '../../../../../../interface/route.interface';
import { ModeEnum } from '../../../../../../enums';
import { BusMode, TaxiMode, WalkMode } from './components';
import { SubwayMode } from './components/SubwayMode';

interface SimpleStepProps {
  step: Step;
  wastedTime: number;
}

const SimpleStep: React.FC<SimpleStepProps> = ({ step }) => {
  const renderStep = useMemo(() => {
    // const percent = Math.floor((step.sectionTime / wastedTime) * 100);

    switch (step.mode) {
      case ModeEnum.TAXI: {
        return <TaxiMode percent={50} sectionTime={step.spendTime} />;
      }
      case ModeEnum.BUS: {
        return <BusMode percent={15} sectionTime={step.spendTime} />;
      }
      case ModeEnum.WALK: {
        return <WalkMode percent={15} sectionTime={step.spendTime} />;
      }
      case ModeEnum.SUBWAY: {
        return <SubwayMode percent={20} sectionTime={step.spendTime} />;
      }
    }
  }, [step]);

  return renderStep;
};

export default SimpleStep;
