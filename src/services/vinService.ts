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

export const convert = (_res: VinCheckResponse): CarInfo => null

export const apiCheck = async (_vin: string): Promise<CarInfo> => null
