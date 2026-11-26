import React, { createContext, useContext, useState } from 'react';

const DEFAULT_AVATAR_URI =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80';

export interface ProfileData {
  name: string;
  userId: string;
  phone: string;
  email: string;
  avatarUri: string;
}

interface ProfileContextValue {
  profile: ProfileData;
  updateProfile: (patch: Partial<ProfileData>) => void;
  darkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
  toggleDarkTheme: () => void;
}

const INITIAL_PROFILE: ProfileData = {
  name: 'John Smith',
  userId: '25030024',
  phone: '+44 555 5555 55',
  email: 'example@example.com',
  avatarUri: DEFAULT_AVATAR_URI,
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(INITIAL_PROFILE);
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  const updateProfile = (patch: Partial<ProfileData>) => {
    setProfile((prev) => ({
      ...prev,
      ...patch,
      name:
        patch.name !== undefined
          ? patch.name.trim() || prev.name
          : prev.name,
      avatarUri:
        patch.avatarUri !== undefined
          ? patch.avatarUri.trim() || prev.avatarUri
          : prev.avatarUri,
    }));
  };

  const toggleDarkTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        darkTheme,
        setDarkTheme,
        toggleDarkTheme,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error('useProfile must be used inside ProfileProvider');
  }
  return ctx;
}