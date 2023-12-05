import { AUTO_LANGUAGE } from "@/constants";
import { type State } from "@/types.d";
import { Action } from "@/types.d";

export const reducer = (state: State, action: Action) => {
  const { type } = action;

  if (type === "INTERCHANGE_LANGUAGE") {
    if (state.fromLanguage === AUTO_LANGUAGE) return state;
    const loading = state.fromText !== "";

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      fromText: state.result,
      result: state.fromText,
      loading,
    };
  }

  if (type === "SET_FROM_LANGUAGES") {
    if (state.fromLanguage === action.payload) return state;
    const loading = state.fromText !== "";

    return {
      ...state,
      fromLanguage: action.payload,
      result: "",
      loading,
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    if (state.toLanguage === action.payload) return state;
    const loading = state.fromText !== "";

    return {
      ...state,
      toLanguage: action.payload,
      result: "",
      loading,
    };
  }

  if (type === "SET_FROM_TEXT") {
    const loading = action.payload !== "";

    return {
      ...state,
      fromText: action.payload,
      result: "",
      loading,
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      result: action.payload,
      loading: false,
    };
  }

  return state;
};
