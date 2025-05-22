import createDataContext from "./index";
// types
type Data = {
    color: string; // delete
    gauge: string;
    other: string;
    backgroundColor: string;
    fontColor: string;
};
type State = {
    data: Data;
};
type Action =
    | { type: "set_data"; payload: Data }
    | { type: "update_data"; payload: Data }
    | { type: "other_action"; payload?: any }
    | { type: "clear_data" };

type Dispatch = (action: Action) => void;

//Reducer
const dataReducer = (state: State, action: Action) => {
    switch (action.type) {
        case "update_data":
            return { ...state, color: action.payload };
        default:
            return state;
    }
};

const sendData = (dispatch: Dispatch) => async () => {
    try {
        const dummyData = {
            color: "",
            gauge: "",
            other: "",
        };
        dispatch({ type: "set_data", payload: dummyData });
    } catch (error) {
        console.log("ERROR");
    }
};
const updateData = (dispatch: Dispatch) => (data: Data) => {
    // console.log("data: ", data);
    // dispatch based of data type? fontcolor?
    dispatch({ type: "update_data", payload: data });
};

// Initial State
const initialState: State = {
    data: {
        color: "red",
        gauge: "simple",
        other: "other",
        backgroundColor: "red",
        fontColor: "white",
    },
};
export const { Context, Provider } = createDataContext(
    dataReducer,
    { sendData, updateData }, // action Functions
    initialState // init STATE
);
