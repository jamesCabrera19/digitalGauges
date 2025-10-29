import createDataContext from './index';

export const ROUTES = {
    coolantTemperature: '/coolant_temperature',
    boostPressure: '/boost_pressure',
    oilPressure: '/oil_pressure',
    brakeTemperature: '/brake_temperature',
} as const;

type Route = (typeof ROUTES)[keyof typeof ROUTES];

type Telemetry = {
    name: string;
    id: number;
    value: number;
    route: Route;
    status: boolean;
};
type Action =
    | { type: 'ADD_SENSOR'; payload: Telemetry }
    | { type: 'DELETE_SENSOR'; payload: number }
    | {
          type: 'UPDATE_SENSOR';
          payload: { id: number; changes: Partial<Telemetry> };
      };

const state: Telemetry[] = [
    {
        name: 'Coolant Temp',
        id: 123,
        value: 180,
        route: ROUTES.coolantTemperature,
        status: true,
    },
    {
        name: 'Boost',
        id: 1234,
        value: 10.4,
        route: ROUTES.boostPressure,
        status: false,
    },
    {
        name: 'Oil Pressure',
        id: 123456,
        value: 42,
        route: ROUTES.oilPressure,
        status: false,
    },
    {
        name: 'Brake Temp',
        id: 123455556,
        value: 250,
        route: ROUTES.brakeTemperature,
        status: true,
    },
];

type Dispatch = (action: Action) => void;

const dataReducer = (state: Telemetry[], action: Action) => {
    switch (action.type) {
        case 'ADD_SENSOR':
            return [...state, action.payload];
        case 'DELETE_SENSOR':
            return state.filter((el) => el.id != action.payload);
        case 'UPDATE_SENSOR':
            return state.map((el) =>
                el.id === action.payload.id
                    ? { ...el, ...action.payload.changes }
                    : el
            );
        default:
            return state;
    }
};

const updateSensor =
    (dispatch: Dispatch) => (id: number, changes: Partial<Telemetry>) => {
        dispatch({ type: 'UPDATE_SENSOR', payload: { id, changes } });
    };

const addSensor = (dispatch: Dispatch) => (sensor: Telemetry) => {
    dispatch({ type: 'ADD_SENSOR', payload: sensor });
};
const deleteSensor = (dispatch: Dispatch) => (id: number) => {
    dispatch({ type: 'DELETE_SENSOR', payload: id });
};

export const { Context, Provider } = createDataContext(
    dataReducer,
    { updateSensor, addSensor, deleteSensor }, // action Functions
    state // init STATE
);
