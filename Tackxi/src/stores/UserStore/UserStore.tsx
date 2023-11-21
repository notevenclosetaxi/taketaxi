import {create} from 'zustand';
import {User} from '../../interface';

interface UserStoreState {
  user: User | null;
  setUser: (user: User) => void;
  deleteUser: () => void;
}

const UserStore = create<UserStoreState>(set => ({
  user: null,
  setUser: user =>
    set(prev => ({
      user: (prev.user = user),
    })),
  deleteUser: () =>
    set(prev => ({
      user: (prev.user = null),
    })),
}));

export default UserStore;
