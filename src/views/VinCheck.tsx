import * as React from "react"
import { connect } from "react-redux"

import { VinInput } from "../components/VinInput"
import { CarInfoPreview } from "../components/CarInfoPreview"
import { actions, MapState, MapDispatch } from "../store"
import "./VinCheck.scss"
type Props = Pick<RootState, "vin" | "vinCheckResult" | "vinValidationError">
type Actions = Pick<typeof actions, "setVin" | "checkVin">

const VinCheck: React.SFC<Props & Actions> = props => (
    <div className="VinCheck">
        <div className="Logo" />
        <h3>Decode Your Vehicle Identification Number</h3>
        <VinInput value={props.vin} onChange={props.setVin} error={props.vinValidationError} />
        <button disabled={props.vinCheckResult === "Loading"} onClick={props.checkVin}>
            Decode
        </button>
        <CarInfoPreview carInfo={props.vinCheckResult} />
    </div>
)

const mapState: MapState<Props> = s => s
const mapDispatch: MapDispatch<Actions> = dispatch => ({
    setVin: vin => dispatch(actions.setVin(vin)),
    checkVin: () => dispatch(actions.checkVin())
})

export const VinCheckView = connect(mapState, mapDispatch)(VinCheck)
