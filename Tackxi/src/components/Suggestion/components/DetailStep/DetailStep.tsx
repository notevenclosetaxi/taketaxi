import React, {useMemo} from 'react';
import {BusMode, TaxiMode, WalkMode} from './components';
import {ModeEnum} from '../../../../enums';
import {Step} from '../../../../interface/route.interface';

interface DetailStepProps {
  step: Step;
  taxiFare: number;
}

const DetailStep: React.FC<DetailStepProps> = ({step, taxiFare}) => {
  const renderStep = useMemo(() => {
    switch (step.mode) {
      case ModeEnum.BUS: {
        return <BusMode station={step.stationList[0]} busInfo={step.route} />;
      }
      case ModeEnum.TAXI: {
        return <TaxiMode station={step.stationList[0]} taxiInfo={taxiFare} />;
      }
      case ModeEnum.WALK: {
        return (
          <WalkMode
            station={step.stationList[0]}
            destinationInfo={step.stationList[1]}
          />
        );
      }
    }
  }, [step, taxiFare]);

  return renderStep;
};

export default DetailStep;
