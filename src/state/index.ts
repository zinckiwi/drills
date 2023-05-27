import { hookstate } from '@hookstate/core'

export type AdditiveSettings = {
  enabled: boolean
  smallIntegers: boolean
  mediumIntegers: boolean
  bigIntegers: boolean
  singleDigitDecimals: boolean
  doubleDigitDecimals: boolean
  negativeAllowed: boolean
}

export type MultiplicativeSettings = {
  enabled: boolean
  singleDigitDecimals: boolean
  doubleDigitDecimals: boolean
  2: boolean
  3: boolean
  4: boolean
  5: boolean
  6: boolean
  7: boolean
  8: boolean
  9: boolean
  10: boolean
  11: boolean
  12: boolean
}

export type GlobalState = {
  version: number
  settings: {
    add: AdditiveSettings
    subtract: AdditiveSettings
    multiply: MultiplicativeSettings
    divide: MultiplicativeSettings
  }
}

export default hookstate<GlobalState>(loadState())

function loadState(): GlobalState {
  const state = localStorage.getItem('state')

  if (state) {
    try {
      return JSON.parse(state)
    } catch {
      // fallback to initialisation
    }
  }

  return {
    version: 1,
    settings: {
      add: {
        enabled: true,
        smallIntegers: true,
        mediumIntegers: true,
        bigIntegers: false,
        singleDigitDecimals: false,
        doubleDigitDecimals: false,
        negativeAllowed: false,
      },
      subtract: {
        enabled: false,
        smallIntegers: true,
        mediumIntegers: true,
        bigIntegers: false,
        singleDigitDecimals: false,
        doubleDigitDecimals: false,
        negativeAllowed: false,
      },
      multiply: {
        enabled: false,
        singleDigitDecimals: false,
        doubleDigitDecimals: false,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
        11: true,
        12: true,
      },
      divide: {
        enabled: false,
        singleDigitDecimals: false,
        doubleDigitDecimals: false,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
        11: true,
        12: true,
      },
    },
  }
}
