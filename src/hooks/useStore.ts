import { create } from 'zustand';
import {
  applicationSettingsProps,
  APPLICATION_SETTINGS_DEFAULT,
} from '../constants/applicationSettingsProps';
import {
  userSettingsProps,
  USER_SETTINGS_DEFAULT,
} from '../constants/userSettingsProps';
import { componentRefProps } from '../constants/componentRefProps';
import { persist } from 'zustand/middleware';

type StoreProps = {
  applicationSettings: applicationSettingsProps;
  userSettings: userSettingsProps;
  componentRefs: componentRefProps;
  updateAppSetting: <K extends keyof applicationSettingsProps>(
    key: K,
    value: applicationSettingsProps[K]
  ) => void;
  updateUserSetting: <K extends keyof userSettingsProps>(
    key: K,
    value: userSettingsProps[K]
  ) => void;
  updateRefSetting: <K extends keyof componentRefProps>(
    key: K,
    value: componentRefProps[K]
  ) => void;
  resetUserSettings: () => void;
};

const useStore = create<StoreProps>()(
  persist(
    (set) => ({
      applicationSettings: APPLICATION_SETTINGS_DEFAULT,
      userSettings: USER_SETTINGS_DEFAULT,
      componentRefs: {},

      updateAppSetting: <K extends keyof applicationSettingsProps>(
        key: K,
        value: applicationSettingsProps[K]
      ) =>
        set((state) => ({
          applicationSettings: { ...state.applicationSettings, [key]: value },
        })),

      updateUserSetting: <K extends keyof userSettingsProps>(
        key: K,
        value: userSettingsProps[K]
      ) =>
        set((state) => ({
          userSettings: { ...state.userSettings, [key]: value },
        })),

      updateRefSetting: <K extends keyof componentRefProps>(
        key: K,
        value: componentRefProps[K]
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
      name: 'solar-system-storage',
      partialize: (state) => ({ userSettings: state.userSettings }),
    }
  )
);

export default useStore;
