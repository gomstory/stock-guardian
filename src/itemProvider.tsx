import { createContext, useReducer, useContext, ReactNode } from "react";
import { ItemProps, ItemStatus } from "./components/NewItem";

// Define State Type
export interface ItemState extends ItemProps {};

// Define Action Types
export type ItemAction = 
  | { type: "ADD", payload: ItemProps }
  | { type: "MOVE", payload: ItemProps };

// Reducer function
const itemReducer = (state: ItemState[], action: ItemAction): ItemState[] => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
      case "MOVE":
        return state.map(it =>
          it.id === action.payload.id
            ? { ...it, status: it.status === ItemStatus.Active ? ItemStatus.Deactive : ItemStatus.Active }
            : it
        );
    default:
      return state;
  }
};

// Define Context Type
interface ItemContextType extends ItemState {}

interface ItemDispatchContextType extends React.Dispatch<ItemAction> {}


// Create Context with default values
export const ItemContext = createContext<ItemContextType[] | null>(null);
export const ItemDispatchContext = createContext<ItemDispatchContextType | null>(null);

// Context Provider Props Type
interface ItemProviderProps {
  children: ReactNode;
}

// Context Provider
export const ItemProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const [items, dispatch] = useReducer(itemReducer, []);

  return (
    <ItemContext.Provider value={items}>
      <ItemDispatchContext.Provider value={dispatch}>
        {children}
      </ItemDispatchContext.Provider>
    </ItemContext.Provider>
  );
};

// Custom Hook for using Counter Context
export const useItem = (): ItemContextType[] => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};


export const useItemDispatch = (): ItemDispatchContextType => {
  const context = useContext(ItemDispatchContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
}
