import { create } from 'zustand';

interface userInfoType {
    accessToken: string;
}

interface UserInfoState {
    userInfo: userInfoType;
}

interface UserInfoActions {
    setUserInfo: (userinfo: userInfoType) => void;
    deleteUserInfo: () => void;
}

const defaultState = { accessToken: '' };

const useUserInfo = create<UserInfoState & UserInfoActions>((set) => ({
    userInfo: defaultState,
    setUserInfo: (userInfo: userInfoType) => {
        set({ userInfo });
    },
    deleteUserInfo: () => {
        set({ userInfo: defaultState });
    },
}));

export default useUserInfo;
