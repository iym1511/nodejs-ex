import { createWithEqualityFn } from "zustand/traditional";

interface StateType {
    errorMsg: string;
    status: number;
}

interface StateFnType {
    setErrMsg(msg: string): void;
}

type ErrMsgType = StateType & StateFnType;

const initState: StateType = {
    errorMsg: "",
    status: 0,
};

export const useErrMsg = createWithEqualityFn<ErrMsgType>((set) => ({
    ...initState,
    setErrMsg: (msg: string) => {
        set({ errorMsg: msg });
    },
}));
