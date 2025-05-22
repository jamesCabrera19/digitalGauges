import React, { useReducer, ReactNode, Dispatch } from "react";
// types
type Reducer<S, A> = (state: S, action: A) => S;
type ActionFunc<S, A> = (dispatch: Dispatch<A>) => (...args: any[]) => void;
type ActionFuncs<S, A> = {
    [key: string]: ActionFunc<S, A>;
};
export default function createDataContext<S, A>(
    reducer: Reducer<S, A>,
    actions: ActionFuncs<S, A>,
    initialState: S
) {
    // * USE ONLY TO CREATE DIFFERENT CONTEXT/PROVIDERS

    const Context = React.createContext<any>(null);

    const Provider = ({ children }: { children: ReactNode }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        const boundActions: { [key: string]: (...args: any[]) => void } = {};
        // we loop over all action function and then these are called with dispatch
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    };

    return { Context, Provider };
}
