import seedrandom from "seedrandom"


const alphabet = 'abcdefghijklmnopqrstuvwxyz'

enum ErrorType {
  DELETE,
  ADD,
  SWAP,
}

const getErrorType = (randomNumber: number, str: string): ErrorType => {
  if (randomNumber < 1 && str.length > 1) {
    return ErrorType.DELETE
  } else if (randomNumber < 2) {
    return ErrorType.ADD
  } else if (randomNumber < 3 && str.length > 1) {
    return ErrorType.SWAP
  }
  return ErrorType.DELETE
}

export const applyErrors = (input: string, rng: seedrandom.PRNG, errorCount: number): string => {
  let output = input

  const applyError = (str: string): string => {
    const errorType = getErrorType(rng() * 3, str)
    const pos = Math.floor(rng() * str.length)

    if (errorType === ErrorType.DELETE) {
      return str.slice(0, pos) + str.slice(pos + 1)
    } else if (errorType === ErrorType.ADD) {
      const randomChar = alphabet[Math.floor(rng() * alphabet.length)]
      return str.slice(0, pos) + randomChar + str.slice(pos)
    } else if (errorType === ErrorType.SWAP) {
      return str.slice(0, pos) + str[pos + 1] + str[pos] + str.slice(pos + 2)
    }
    return str
  }

  for (let i = 0; i < errorCount; i++) {
    output = applyError(output);
  }

  return output
}

export const getRemainingErrors = (errorCount: number, fields: string[]): number => {
  return errorCount < fields.join('').length ? errorCount : fields.join('').length
}
