// import { get } from "../utils/https"

const invalidCharsRegex = new RegExp(/[IOQ]/, "g")
const VIN_LENGTH = 17
const INVALID_LENGTH_ERROR_MESSAGE = `${VIN_LENGTH} chars expected`

export const filter = (vin: string) => {
    return vin
        .toUpperCase()
        .replace(invalidCharsRegex, "")
        .substring(0, VIN_LENGTH)
}

export const validate = (_vin: string): string => (_vin.length !== VIN_LENGTH ? INVALID_LENGTH_ERROR_MESSAGE : null)

const getVariableMapper: { [key: string]: (val: string) => any } = {
    Make: (val: string): object => ({ make: val }),
    Model: (val: string) => ({ model: val }),
    "Model Year": (val: string) => ({ year: parseInt(val, 10) }),
    Trim: (val: string) => ({ trim: val }),
    "Vehicle Type": (val: string) => ({ vechicleType: val })
}

const isVinResultValid = (_res: VinCheckResponse): Boolean => {
    return _res && _res.Results && _res.Results.length > 0
}

export const convert = (_res: VinCheckResponse): CarInfo => {
    if (!isVinResultValid(_res)) {
        return null
    }

    const carInfo: CarInfo = { make: null, model: null, year: null, trim: null, vechicleType: null }

    return _res.Results.filter(result => getVariableMapper[result.Variable] != null)
        .map(result => getVariableMapper[result.Variable](result.Value))
        .reduce((newCarInfo, result) => ({ ...newCarInfo, ...result }), carInfo)
}

export const apiCheck = async (_vin: string): Promise<CarInfo> => null
