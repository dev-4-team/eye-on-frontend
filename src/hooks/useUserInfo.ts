import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface userInfoType {
    accessToken: string;
}

interface UserInfoState {
    userInfo: userInfoType;
}

interface UserInfoActions {
    setUserInfo: (userInfo: userInfoType) => void;
    deleteUserInfo: () => void;
}

const defaultState = { accessToken: '' };

const useUserInfo = create<UserInfoState & UserInfoActions>()(
    persist(
        (set) => ({
            userInfo: defaultState,
            setUserInfo: (userInfo: userInfoType) => {
                set({ userInfo });
            },
            deleteUserInfo: () => {
                set({ userInfo: defaultState });
            },
        }),
        {
            name: 'accessToken',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useUserInfo;
