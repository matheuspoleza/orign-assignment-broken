// import { get } from "../utils/https"

const invalidCharsRegex = new RegExp(/[IOQ]/, "g")
const maxVinLength = 17

export const filter = (vin: string) => {
    return vin
        .toUpperCase()
        .replace(invalidCharsRegex, "")
        .substring(0, maxVinLength)
}

export const validate = (_vin: string): string => null

export const convert = (_res: VinCheckResponse): CarInfo => null

export const apiCheck = async (_vin: string): Promise<CarInfo> => null
