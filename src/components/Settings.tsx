import React, { Fragment, PropsWithChildren } from 'react'
import cx from 'classnames'
import { State, useHookstate } from '@hookstate/core'
// import { localstored } from '@hookstate/localstored'

import globalState from '../state'

// type Drawer = 'add' | 'subtract' | 'multiply' | 'divide'

const Settings: React.FunctionComponent = () => {
  const state = useHookstate(globalState)

  const addState = state.settings.add
  const subtractState = state.settings.subtract
  const multiplyState = state.settings.multiply
  const divideState = state.settings.divide

  return (
    <div>
      <div className='card mb-4 bg-white px-3 py-3 pb-2 shadow-md'>
        <div className='mb-1 text-sm font-semibold uppercase'>
          <SwitchToggle state={addState.enabled} label='Add' />
        </div>
        {addState.enabled.value && (
          <Fragment>
            <Section heading='Integers'>
              <div className='flex flex-wrap'>
                <ButtonToggle state={addState.smallIntegers} label='1-10' />
                <ButtonToggle state={addState.mediumIntegers} label='11-20' />
                <ButtonToggle state={addState.bigIntegers} label='21-99' />
              </div>
            </Section>
            <Section heading='Decimals'>
              <div className='flex flex-wrap'>
                <ButtonToggle
                  state={addState.singleDigitDecimals}
                  label='1 DP'
                />
                <ButtonToggle
                  state={addState.doubleDigitDecimals}
                  label='2 DP'
                />
              </div>
            </Section>
            <Section heading='Options'>
              <div className='flex flex-wrap'>
                <ButtonToggle state={addState.negativeAllowed} label='Neg?' />
              </div>
            </Section>
          </Fragment>
        )}
      </div>

      <div className='card mb-4 bg-white px-3 py-3 pb-2 shadow-md'>
        <div className='mb-1 text-sm font-semibold uppercase'>
          <SwitchToggle state={subtractState.enabled} label='Subtract' />
        </div>
        {subtractState.enabled.value && (
          <Fragment>
            <Section heading='Integers'>
              <div className='flex flex-wrap'>
                <ButtonToggle
                  state={subtractState.smallIntegers}
                  label='1-10'
                />
                <ButtonToggle
                  state={subtractState.mediumIntegers}
                  label='11-20'
                />
                <ButtonToggle state={subtractState.bigIntegers} label='21-99' />
              </div>
            </Section>
            <Section heading='Decimals'>
              <div className='flex flex-wrap'>
                <ButtonToggle
                  state={subtractState.singleDigitDecimals}
                  label='1 DP'
                />
                <ButtonToggle
                  state={subtractState.doubleDigitDecimals}
                  label='2 DP'
                />
              </div>
            </Section>
            <Section heading='Options'>
              <div className='flex flex-wrap'>
                <ButtonToggle
                  state={subtractState.negativeAllowed}
                  label='Neg?'
                />
              </div>
            </Section>
          </Fragment>
        )}
      </div>

      <div className='card mb-4 bg-white px-3 pb-2 shadow-md'>
        <div className='mb-1 mt-3 text-sm font-semibold uppercase'>
          <SwitchToggle state={multiplyState.enabled} label='Multiply' />
        </div>
        {multiplyState.enabled.value && (
          <Fragment>
            <Section heading='Integers'>
              <div className='flex flex-wrap'>
                <div className='btn-outline btn-disabled btn-xs btn mb-1 mr-1 min-w-[3em] bg-white'>
                  1
                </div>
                {([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const).map((i) => (
                  <ButtonToggle
                    key={i}
                    state={multiplyState[i]}
                    label={i.toString()}
                  />
                ))}
              </div>
            </Section>
            <Section heading='Decimals'>
              <div className='flex flex-wrap'>
                <ButtonToggle
                  state={multiplyState.singleDigitDecimals}
                  label='1 dp'
                />
                <ButtonToggle
                  state={multiplyState.doubleDigitDecimals}
                  label='2 dp'
                />
              </div>
            </Section>
          </Fragment>
        )}
      </div>

      <div className='card mb-4 bg-white px-3 pb-2 shadow-md'>
        <div className='mb-1 mt-3 text-sm font-semibold uppercase'>
          <SwitchToggle state={divideState.enabled} label='Divide' />
        </div>
        {divideState.enabled.value && (
          <Fragment>
            <Section heading='Integers'>
              <div className='flex flex-wrap'>
                <div className='btn-outline btn-disabled btn-xs btn mb-1 mr-1 min-w-[3em] bg-white'>
                  1
                </div>
                {([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const).map((i) => (
                  <ButtonToggle
                    key={i}
                    state={divideState[i]}
                    label={i.toString()}
                  />
                ))}
              </div>
            </Section>
            <Section heading='Decimals'>
              <div className='flex flex-wrap'>
                <ButtonToggle
                  state={divideState.singleDigitDecimals}
                  label='1 dp'
                />
                <ButtonToggle
                  state={divideState.doubleDigitDecimals}
                  label='2 dp'
                />
              </div>
            </Section>
          </Fragment>
        )}
      </div>
    </div>
  )
}

const Section: React.FunctionComponent<
  PropsWithChildren<{ heading: string }>
> = ({ heading, children }) => (
  <div className='mt-2 flex items-baseline'>
    <div className='flex-0 w-20'>
      <h2 className='text-sm font-semibold text-gray-500'>{heading}</h2>
    </div>
    <div className='flex-1'>{children}</div>
  </div>
)

const ButtonToggle: React.FunctionComponent<{
  state: State<boolean>
  label: string
}> = ({ state, label }) => {
  const classes = {
    'mb-1 mr-1 min-w-[3em] btn btn-xs hover:text-black': true,
    'btn-outline hover:bg-white text-gray-400': !state.value,
    'btn-primary hover:btn-primary text-white': state.value,
  }

  return (
    <button className={cx(classes)} onClick={() => state.set((x) => !x)}>
      {label}
    </button>
  )
}

const SwitchToggle: React.FunctionComponent<{
  state: State<boolean>
  label: string
}> = ({ state, label }) => {
  return (
    <label className='flex cursor-pointer items-center text-gray-600 hover:text-black'>
      <input
        type='checkbox'
        className='toggle-primary toggle toggle-sm mr-2'
        checked={state.value}
        onChange={() => state.set((x) => !x)}
      />
      <span className='text-sm font-semibold uppercase'>{label}</span>
    </label>
  )
}

export default Settings
