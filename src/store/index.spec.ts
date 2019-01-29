import { reducer, initialState, setVin, checkVin, checkVinSuccess, checkVinFail } from "."

describe("Vin state", () => {
    describe("reducer", () => {
        describe("when sending check vin fail action", () => {
            it("returns check result as not loaded", () => {
                const action = { type: checkVinFail, payload: new Error("error message") }

                const result = reducer(initialState, action)

                expect(result).toEqual({ ...initialState, vinCheckResult: "NotLoaded" })
            })
        })

        describe("when sending check vin success action", () => {
            it("returns check vin result from payload", () => {
                const vinApiResult: CarInfo = { make: null, model: null, year: null, trim: null, vechicleType: null }
                const action = { type: checkVinSuccess, payload: vinApiResult }

                const result = reducer(initialState, action)

                expect(result).toEqual({ ...initialState, vinCheckResult: vinApiResult })
            })
        })

        describe("when sending check vin action", () => {
            it("returns initial state with found validation error", () => {
                const vin = "123"
                const state = { ...initialState, vin }
                const action = { type: checkVin }
                const vinValidationError = "17 chars expected"

                const result = reducer(state, action)

                expect(result).toEqual({ ...state, vinValidationError })
            })

            it("returns an array with loading state and cmd type", () => {
                const vin = "SHHFN23607U002758"
                const state = { ...initialState, vin }
                const action = { type: checkVin }

                const result = reducer(state, action)

                // TODO validate better cmd type
                expect(result).toEqual([{ ...state, vinCheckResult: "Loading" }, expect.any(Object)])
            })
        })

        describe("when sending set vin action", () => {
            it("returns check vin result and filtered vin", () => {
                const vin = "SHHFN23607U002758"
                const action = { type: setVin, payload: vin }

                const result = reducer(initialState, action)

                expect(result).toEqual({
                    vin,
                    vinCheckResult: initialState.vinCheckResult,
                    vinValidationError: null
                })
            })

            it("returns empty vin and null check vin result", () => {
                const vin = ""
                const action = { type: setVin, payload: vin }

                const result = reducer(initialState, action)

                expect(result).toEqual({
                    vin,
                    vinCheckResult: null,
                    vinValidationError: null
                })
            })
        })

        it("returns same state when unknown action is given", () => {
            const action = { type: "fake" }

            const result = reducer(initialState, action)

            expect(result).toEqual(initialState)
        })
    })
})
