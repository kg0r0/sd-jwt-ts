import { SaltGenerator, Hasher } from '../types'
import { SdJwtError } from './error'
import { Base64url } from '../base64url'

export const createDecoys = async (
    count: number,
    saltGenerator: SaltGenerator,
    hasher: Hasher
) => {
    if (count < 0) {
        throw new SdJwtError(`Negative count of ${count} is not allowed.`)
    }

    if (isNaN(count)) {
        throw new SdJwtError(`NaN is not allowed for count.`)
    }

    if (!isFinite(count)) {
        throw new SdJwtError(`Infinite is not allopwed for count.`)
    }

    const decoys: Array<string> = []
    for (let i = 0; i < count; i++) {
        const salt = await saltGenerator()
        const decoy = await hasher(salt)
        const encodedDecoy = Base64url.encode(decoy)
        decoys.push(encodedDecoy)
    }
    return decoys
}
