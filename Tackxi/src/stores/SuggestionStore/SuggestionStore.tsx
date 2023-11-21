import {create} from 'zustand';

interface SuggestionStoreState {
  infoId: number;
  setInfoId: (infoId: number) => void;
}

const TransportationStore = create<SuggestionStoreState>(set => ({
  infoId: -1,
  setInfoId: infoId =>
    set(prev => ({
      infoId: (prev.infoId = infoId),
    })),
}));

export default TransportationStore;
