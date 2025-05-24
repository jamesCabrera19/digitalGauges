import createDataContext from './index';
// types
type Range = {
    min: number;
    max: number;
};
type State = {
    color: string; // delete
    gauge: string;
    other: string;
    backgroundColor: string;
    fontColor: string;
    style: string;

    range: Range;
    needleSize: number;
    gaugeType: string;
    unit: 'C' | 'F';
};

type Action =
    | { type: 'UPDATE_COLORS'; payload: { key: keyof State; color: string } }
    | { type: 'SET_RANGE'; payload: Range }
    | { type: 'SET_NEEDLE'; payload: number }
    | { type: 'SET_TYPE'; payload: string }
    | { type: 'SET_UNIT'; payload: 'C' | 'F' }
    | { type: 'RESET' }
    | { type: 'other_action'; payload?: any };

type Dispatch = (action: Action) => void;

// Initial State
const initialState: State = {
    color: 'red',
    gauge: 'simple',
    other: 'other',
    backgroundColor: 'black',
    fontColor: 'white',
    style: 'normal',
    range: { min: 0, max: 0 },
    needleSize: 3,
    gaugeType: 'SimpleGauge',
    unit: 'F',
};
//Reducer
const dataReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'UPDATE_COLORS':
            const dataDestructured = {
                [action.payload.key]: action.payload.color,
            };
            return { ...state, ...dataDestructured };
        case 'SET_RANGE':
            return { ...state, range: action.payload };
        case 'SET_NEEDLE':
            return { ...state, needleSize: action.payload };
        case 'SET_TYPE':
            return { ...state, gaugeType: action.payload };
        case 'SET_UNIT':
            return { ...state, unit: action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

const sendData = (dispatch: Dispatch) => async () => {
    try {
        const dummyData = {
            color: '',
            gauge: '',
            other: '',
            backgroundColor: '',
            updateData: '',
        };
        dispatch({ type: 'set_data', payload: dummyData });
    } catch (error) {
        console.log('ERROR');
    }
};
const updateData =
    (dispatch: Dispatch) => (data: { key: keyof State; color: string }) => {
        dispatch({ type: 'UPDATE_COLORS', payload: data });
    };
const updateRange = (dispatch: Dispatch) => (range: Range) => {
    dispatch({ type: 'SET_RANGE', payload: range });
};

const updateNeedleSize = (dispatch: Dispatch) => (size: number) =>
    dispatch({ type: 'SET_NEEDLE', payload: size });

const updateGaugeType = (dispatch: Dispatch) => (type: string) =>
    dispatch({ type: 'SET_TYPE', payload: type });

const updateUnitDisplay = (dispatch: Dispatch) => (unit: 'C' | 'F') =>
    dispatch({ type: 'SET_UNIT', payload: unit });

const handleReset = (dispatch: Dispatch) => () => dispatch({ type: 'RESET' });

export const { Context, Provider } = createDataContext(
    dataReducer,
    {
        sendData,
        updateData,
        updateRange,
        updateNeedleSize,
        updateGaugeType,
        updateUnitDisplay,
        handleReset,
    }, // action Functions
    initialState // init STATE
);
