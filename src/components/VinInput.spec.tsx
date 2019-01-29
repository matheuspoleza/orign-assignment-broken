import * as React from "react"
import { shallow } from "enzyme"
import { VinInput } from "./VinInput"

describe("<VinInput>", () => {
    it("renders vin input component", () => expect(VinInput).toBeDefined())

    it("renders given value prop", () => {
        const input = shallow(<VinInput value="Invalid VIN" onChange={_ => null} />).find("input")
        expect(input.props().value).toEqual("Invalid VIN")
    })
})
