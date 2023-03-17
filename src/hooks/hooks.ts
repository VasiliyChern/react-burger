import { TypedUseSelectorHook, useDispatch as useDispatchRedux, useSelector as useSelectorRedux } from "react-redux";
import { AppDispatch, RootState } from "../services/types/types-store";

export const useDispatch = () => useDispatchRedux<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;