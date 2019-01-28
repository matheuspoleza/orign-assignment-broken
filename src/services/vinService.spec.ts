import { convert, validate, filter } from "./vinService"
import { vinCheckResponseFixture, vinResultEntryFixture } from "../test/fixtures"

const entry = (Variable: string, Value: string) => vinResultEntryFixture({ Variable, Value })

describe("Vin Service", () => {
    describe("when converting vin", () => {
        it("returns null when no data is given", () => expect(convert(null)).toEqual(null))
        it("returns null when invalid data is given", () => expect(convert({} as any)).toEqual(null))
        it("returns null when response contains no data", () =>
            expect(convert(vinCheckResponseFixture({ Results: [] }))).toEqual(null))

        it("takes make from results array", () =>
            expect(convert(vinCheckResponseFixture({ Results: [entry("Make", "HONDA")] })).make).toEqual("HONDA"))

        it("takes year from results array", () =>
            expect(convert(vinCheckResponseFixture({ Results: [entry("Model Year", "2007")] })).year).toEqual(2007))

        it("takes type from results array", () =>
            expect(
                convert(vinCheckResponseFixture({ Results: [entry("Vehicle Type", "PASSENGER CAR")] })).vechicleType
            ).toEqual("PASSENGER CAR"))

        it("takes trim from results array", () =>
            expect(convert(vinCheckResponseFixture({ Results: [entry("Trim", "FN2")] })).trim).toEqual("FN2"))

        it("takes all values from results", () =>
            expect(
                convert(
                    vinCheckResponseFixture({
                        Results: [
                            entry("Make", "MAZDA"),
                            entry("Model Year", "2010"),
                            entry("Model", "rx8"),
                            entry("Vehicle Type", "CAR"),
                            entry("Trim", "RX8")
                        ]
                    })
                )
            ).toEqual({
                make: "MAZDA",
                year: 2010,
                model: "rx8",
                vechicleType: "CAR",
                trim: "RX8"
            }))
    })

    describe("when validating vin", () => {
        it("returns null when vin has 17 chars", () => expect(validate("SHHFN23607U002758")).toBeNull())
        it("returns invalid length error when vin has less than 17 chars", () =>
            expect(validate("SHHFN23607U00275")).toEqual("17 chars expected"))
        it("returns invalid length error when vi has more than 17 chars", () =>
            expect(validate("SHHFN23607U0027589")).toEqual("17 chars expected"))
    })

    describe("when filtering vin", () => {
        it("uppercases given string", () => expect(filter("abc")).toEqual("ABC"))
        it("disallows IOQ", () => expect(filter("IOQabc")).toEqual("ABC"))
        it("disallows ioq", () => expect(filter("ioqabc")).toEqual("ABC"))
        it("trims to first 17 chars", () => expect(filter("SHHFN23607U002758abc")).toEqual("SHHFN23607U002758"))
    })
})
