import { State } from '@hookstate/core'

import { AdditiveSettings, GlobalState, MultiplicativeSettings } from '../state'
import { isInteger, random, sample } from 'lodash'

type Operator = 'add' | 'subtract' | 'multiply' | 'divide'
type AdditiveType =
  | 'smallIntegers'
  | 'mediumIntegers'
  | 'bigIntegers'
  | 'singleDigitDecimals'
  | 'doubleDigitDecimals'
type MultiplicativeType =
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 'singleDigitDecimals'
  | 'doubleDigitDecimals'

const operations: Operator[] = ['add', 'subtract', 'multiply', 'divide']
const additiveIntegerTypes: AdditiveType[] = [
  'smallIntegers',
  'mediumIntegers',
  'bigIntegers',
]
const additiveDecimalTypes: AdditiveType[] = [
  'singleDigitDecimals',
  'doubleDigitDecimals',
]
const additiveTypes = [...additiveIntegerTypes, ...additiveDecimalTypes]
const multiplicativeIntegerTypes: MultiplicativeType[] = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
]
const multiplicativeDecimalTypes: MultiplicativeType[] = [
  'singleDigitDecimals',
  'doubleDigitDecimals',
]
const multiplicativeTypes = [
  ...multiplicativeIntegerTypes,
  ...multiplicativeDecimalTypes,
]

export default function makeQuestion(
  allSettings: State<GlobalState['settings']>
): { first: number; second: number; operator: Operator } {
  // pick operator
  const operator =
    sample(operations.filter((x) => allSettings[x].enabled.value)) || 'add' // sanity

  const settings = allSettings[operator]

  if (isAdditive(operator, settings)) {
    const enabled = additiveTypes.filter((x) => settings[x].value)

    const integersEnabled = enabled.filter((x) =>
      additiveIntegerTypes.includes(x)
    )
    const decimalsEnabled = enabled.filter((x) =>
      additiveDecimalTypes.includes(x)
    )

    const aSet = pickSet(integersEnabled, decimalsEnabled)
    const bSet = pickSet(integersEnabled, decimalsEnabled)

    const aType = sample(aSet)
    const bType = sample(bSet)

    const [first, second] =
      operator === 'add'
        ? [
            makeAdditiveNumber(aType, settings.negativeAllowed.value),
            makeAdditiveNumber(bType),
          ]
        : orderSubtractiveNumbers(
            makeAdditiveNumber(aType),
            makeAdditiveNumber(bType),
            settings.negativeAllowed.value
          )

    return { first, second, operator }
  }

  const enabled = multiplicativeTypes.filter((x) => settings[x].value)

  const integersEnabled = enabled.filter((x) =>
    multiplicativeIntegerTypes.includes(x)
  )
  const decimalsEnabled = enabled.filter((x) =>
    multiplicativeDecimalTypes.includes(x)
  )

  if (operator === 'multiply') {
    // B is always the full set of integers because otherwise we can't do times-tables.
    const aSet = pickSet(integersEnabled, decimalsEnabled)
    const bSet = multiplicativeIntegerTypes

    const aType = sample(aSet)
    const bType = sample(bSet)

    return {
      first: makeMultiplicativeNumber(aType),
      second: makeMultiplicativeNumber(bType),
      operator,
    }
  }

  // Work backwards from division to ensure we have a rational answer.
  const answerSet = pickSet(
    integersEnabled.length ? multiplicativeIntegerTypes : [],
    decimalsEnabled
  )
  const answerType = sample(answerSet)
  const answer = makeMultiplicativeNumber(answerType)

  // Go easy on the decimals.
  const bSet = isInteger(answer)
    ? integersEnabled.length
      ? integersEnabled
      : multiplicativeIntegerTypes
    : <MultiplicativeType[]>[2, 3, 4, 5, 10]
  const bType = sample(bSet)

  const second = makeMultiplicativeNumber(bType)
  const first = parseFloat((answer * second).toFixed(2))

  return {
    first,
    second,
    operator,
  }
}

function makeAdditiveNumber(
  type: (typeof additiveTypes)[number] | undefined,
  negativeAllowed?: boolean
): number {
  switch (type) {
    case 'smallIntegers':
      return maybeNegate(random(1, 10), negativeAllowed)
    case 'mediumIntegers':
      return maybeNegate(random(11, 20), negativeAllowed)
    case 'bigIntegers':
      return maybeNegate(random(21, 99), negativeAllowed)
    case 'singleDigitDecimals':
      return maybeNegate(
        parseFloat(random(0, 9.9, true).toFixed(1)),
        negativeAllowed
      )
    case 'doubleDigitDecimals':
      return maybeNegate(
        parseFloat(random(0, 9.99, true).toFixed(2)),
        negativeAllowed
      )
    default:
      return maybeNegate(1, false) // sanity
  }
}

function makeMultiplicativeNumber(
  type: (typeof multiplicativeTypes)[number] | undefined
): number {
  switch (type) {
    case 'singleDigitDecimals':
      return parseFloat(random(0, 9.9, true).toFixed(1))
    case 'doubleDigitDecimals':
      return parseFloat(random(0, 9.99, true).toFixed(2))
    default:
      return type || 1 // sanity
  }
}

function orderSubtractiveNumbers(
  a: number,
  b: number,
  negativeAllowed?: boolean
) {
  // Don't care about order if negatives are allowed; otherwise ensure larger number is first.
  return negativeAllowed ? [a, b] : a > b ? [a, b] : [b, a]
}

function isAdditive(
  operator: Operator,
  settings: State<AdditiveSettings> | State<MultiplicativeSettings>
): settings is State<AdditiveSettings> {
  return operator === 'add' || operator === 'subtract'
}

/**
 * Given integer and decimal colletions, picks which to use, randomly if both are populated.
 */
function pickSet<TIntegerTypes, TDecimalTypes>(
  integersEnabled: TIntegerTypes[],
  decimalsEnabled: TDecimalTypes[]
) {
  return integersEnabled.length && decimalsEnabled.length
    ? sample([integersEnabled, decimalsEnabled])
    : decimalsEnabled.length
    ? decimalsEnabled
    : integersEnabled.length
    ? integersEnabled
    : [] // sanity
}

function maybeNegate(n: number, negativeAllowed: boolean | undefined) {
  return negativeAllowed && Math.random() < 0.5 ? -n : n
}
