import {create} from 'zustand';
import {Transportation} from '../../interface';

interface TransportationStoreState {
  transportationList: Transportation[];
  addTransportation: (newTransportation: Transportation) => void;
  deleteTransportation: (deleteTransportation: Transportation) => void;
}

const TransportationStore = create<TransportationStoreState>(set => ({
  transportationList: [],
  addTransportation: newTransportation =>
    set(prev => ({
      transportationList: [...prev.transportationList, newTransportation],
    })),
  deleteTransportation: deleteTransportation =>
    set(prev => ({
      transportationList: prev.transportationList.filter(
        transportation => transportation.name !== deleteTransportation.name,
      ),
    })),
}));

export default TransportationStore;
