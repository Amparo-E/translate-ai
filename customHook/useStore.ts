import { useReducer } from "react"
import { reducer } from "./reducer"
import { initialState } from "./initialState"
import { isPartiallyEmittedExpression } from "typescript"
import { FromLanguage, Language } from "@/types"

export function useStore () { 
    const [{
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading
      }, dispatch] = useReducer(reducer, initialState)

      const interchnageLanguages = () =>  {
        dispatch({ type: 'INTERCHANGE_LANGUAGE' })
      }

      const setFromLanguage = (payload: FromLanguage) => {
        dispatch({ type: 'SET_FROM_LANGUAGES', payload})
      }

      const setToLanguage = (payload: Language) => {
        dispatch({ type: 'SET_TO_LANGUAGE', payload})
      }

      const setFromText = (payload: string) => {
        dispatch({ type: 'SET_FROM_TEXT', payload})
      }

      const setResult = (payload: string) => {
        dispatch({ type: 'SET_RESULT', payload})
      }
    
      return {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        interchnageLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult,
      }

}