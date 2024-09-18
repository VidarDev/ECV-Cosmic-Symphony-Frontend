import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { appSettings } from '../types/appSettings';
import { userSettings } from '../types/userSettings';
import { componentRefs } from '../types/componentRefs';
import {
  APP_SETTINGS_DEFAULT,
  USER_SETTINGS_DEFAULT,
} from '../constants/stores';

type StoreState = {
  // Constants
  applicationSettings: appSettings;
  userSettings: userSettings;
  componentRefs: componentRefs;
  // Functions
  updateAppSetting: <K extends keyof appSettings>(
    key: K,
    value: appSettings[K]
  ) => void;
  updateUserSetting: <K extends keyof userSettings>(
    key: K,
    value: userSettings[K]
  ) => void;
  updateRefSetting: <K extends keyof componentRefs>(
    key: K,
    value: componentRefs[K]
  ) => void;
  resetUserSettings: () => void;
};

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      applicationSettings: APP_SETTINGS_DEFAULT,
      userSettings: USER_SETTINGS_DEFAULT,
      componentRefs: {},

      updateAppSetting: <K extends keyof appSettings>(
        key: K,
        value: appSettings[K]
      ) =>
        set((state) => ({
          applicationSettings: { ...state.applicationSettings, [key]: value },
        })),

      updateUserSetting: <K extends keyof userSettings>(
        key: K,
        value: userSettings[K]
      ) =>
        set((state) => ({
          userSettings: { ...state.userSettings, [key]: value },
        })),

      updateRefSetting: <K extends keyof componentRefs>(
        key: K,
        value: componentRefs[K]
      ) =>
        set((state) => ({
          componentRefs: { ...state.componentRefs, [key]: value },
        })),

      resetUserSettings: () =>
        set((state) => ({
          appSettings: { ...state.applicationSettings, focusingBody: true },
          userSettings: USER_SETTINGS_DEFAULT,
        })),
    }),
    {
      name: 'solar-system-storage', // LocalStorage Key
      partialize: (state) => ({ userSettings: state.userSettings }),
    }
  )
);

export default useStore;
