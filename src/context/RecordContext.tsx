import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Record } from "../interfaces/Record";
import db from "../db";

type Action =
  | { type: "SET_INITIAL_RECORDS"; payload: Record[] }
  | { type: "ADD_RECORD"; payload: Record }
  | { type: "EDIT_RECORD"; payload: Record }
  | { type: "DELETE_RECORD"; payload: string };

type Dispatch = (action: Action) => void;
type State = Record[];
type RecordProviderProps = { children: ReactNode };

const RecordContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const recordReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_INITIAL_RECORDS":
      return action.payload;
    case "ADD_RECORD":
      db.records.add(action.payload);
      return [...state, action.payload];
    case "EDIT_RECORD":
      db.records.put(action.payload);
      return state.map((record) =>
        record.id === action.payload.id ? action.payload : record
      );
    case "DELETE_RECORD":
      db.records.delete((action.payload));
      return state.filter((record) => record.id.toString() !== action.payload);
    default:
      throw new Error(`Unhandled action type`);
  }
};

const RecordProvider: React.FC<RecordProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(recordReducer, []);

  useEffect(() => {
    const loadRecords = async () => {
      const allRecords = await db.records.toArray();
      dispatch({ type: "SET_INITIAL_RECORDS", payload: allRecords });
    };

    loadRecords();
  }, []);

  return (
    <RecordContext.Provider value={{ state, dispatch }}>
      {children}
    </RecordContext.Provider>
  );
};

export const useRecords = () => {
  const context = useContext(RecordContext);
  if (context === undefined) {
    throw new Error("useRecords must be used within a RecordProvider");
  }
  return context;
};

export default RecordProvider;
