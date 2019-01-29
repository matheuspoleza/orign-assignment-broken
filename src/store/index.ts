import { Store, compose, createStore, Dispatch } from "redux"
import { LoopReducer, install, Cmd } from "redux-loop"

import { extend, extendWCommand } from "./utils"
import * as vinService from "../services/vinService"
import { createAction } from "../utils/typedActions"

export const setVin = "setVin"
export const checkVin = "checkVin"
export const checkVinSuccess = "checkVinSuccess"
export const checkVinFail = "checkVinFail"

export const actions = {
    [setVin]: (vin: string) => createAction(setVin, vin),
    [checkVin]: () => createAction(checkVin),
    [checkVinSuccess]: (payload: CarInfo) => createAction(checkVinSuccess, payload),
    [checkVinFail]: (payload: Error) => createAction(checkVinFail, payload)
}

export type Actions = ReturnType<typeof actions[keyof typeof actions]>

export const initialState: RootState = {
    vin: "",
    vinCheckResult: "NotLoaded",
    vinValidationError: null
}

export const checkVinCmd = (_vin: string) =>
    Cmd.run(vinService.apiCheck, {
        successActionCreator: (carInfo: CarInfo) => actions[checkVinSuccess](carInfo),
        failActionCreator: (error: Error) => actions[checkVinFail](error),
        args: [_vin]
    })

export const reducer: LoopReducer<RootState, Actions> = (state, action: Actions) => {
    const ext = extend(state)
    const extCmd = extendWCommand(state)

    switch (action.type) {
        case setVin:
            const vin = vinService.filter(action.payload)
            const vinCheckResult = vin === "" ? null : state.vinCheckResult
            return ext({ vin, vinValidationError: null, vinCheckResult })

        case checkVin:
            const vinValidationError = vinService.validate(state.vin)
            return vinValidationError
                ? ext({ vinValidationError })
                : extCmd({ vinCheckResult: "Loading" }, checkVinCmd(state.vin) as any)

        case checkVinSuccess:
            return ext({ vinCheckResult: action.payload })

        case checkVinFail:
            return ext({ vinCheckResult: "NotLoaded" })

        default:
            return state
    }
}

export type MapState<TS, TO = any> = (state: RootState, props: TO) => TS
export type MapDispatch<TA, TO = any> = (dispatch: Dispatch<any>, props: TO) => TA
export type TStore = Store<RootState>

let store: TStore = null
export const getStore = () => {
    if (!store) {
        const { devToolsExtension } = window as any

        store = createStore(
            reducer,
            initialState,
            devToolsExtension ? compose(install(), devToolsExtension()) : install()
        ) as TStore
    }
    return store
}
