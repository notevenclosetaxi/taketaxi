import React, { useMemo } from 'react';
import { Step } from '../../../../../../interface/route.interface';
import { ModeEnum } from '../../../../../../enums';
import { BusMode, TaxiMode, WalkMode } from './components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/store';
import { SubwayMode } from './components/SubwayMode';

interface DetailStepProps {
  step: Step;
  taxiFare: number;
}

const DetailStep: React.FC<DetailStepProps> = ({ step, taxiFare }) => {
  const { startQuery } = useSelector((state: RootState) => state.query);

  const renderStep = useMemo(() => {
    switch (step.mode) {
      case ModeEnum.TAXI: {
        return <TaxiMode station={startQuery} taxiInfo={taxiFare} />;
      }
      case ModeEnum.BUS: {
        return <BusMode station={step.startName} busInfo={step.route} />;
      }

      case ModeEnum.WALK: {
        return <WalkMode station={step.startName} destinationInfo={step.endName} />;
      }
      case ModeEnum.SUBWAY: {
        return <SubwayMode station={step.startName} subwayInfo={step.route} />;
      }
    }
  }, [step, taxiFare]);

  return renderStep;
};

export default DetailStep;
