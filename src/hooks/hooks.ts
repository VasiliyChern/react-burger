import { TypedUseSelectorHook, useDispatch as useDispatchRedux, useSelector as useSelectorRedux } from "react-redux";
import { TDispatch, RootState } from "../services/utils/types";

export const useDispatch = () => useDispatchRedux<TDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;