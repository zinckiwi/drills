import React, { useRef, useState } from 'react'

const operations = {
  add: (a: number, b: number) => a + b,
  subtract: (a: number, b: number) => a - b,
  multiply: (a: number, b: number) => a * b,
  divide: (a: number, b: number) => a / b,
}

const Board: React.FunctionComponent<{
  first: number
  second: number
  operator: 'add' | 'subtract' | 'multiply' | 'divide'
  onSolved: () => void
  onPassed: () => void
}> = ({ first, second, operator, onSolved, onPassed }) => {
  const [showResult, setShowResult] = useState<null | 'solved' | 'passed'>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='w-[26rem] font-brand text-8xl leading-none text-gray-500'>
      <div className='flex justify-end'>
        <div className='px-4'>{first}</div>
      </div>
      <div className='flex justify-between'>
        <div className='mb-[-0.1em] mt-[-0.1em] px-4 text-[1.25em]'>
          {operator === 'add' && '+'}
          {operator === 'subtract' && '-'}
          {operator === 'multiply' && '×'}
          {operator === 'divide' && '÷'}
        </div>
        <div className='px-4'>{second}</div>
      </div>

      <div className='my-4 flex h-3 rounded-md bg-gray-400 leading-none' />

      <div className='flex leading-none'>
        <input
          ref={inputRef}
          type='text'
          className='w-full rounded-md px-4 py-0 text-right leading-none text-primary outline-none'
          onChange={checkAnswer}
        />
      </div>
      {showResult === 'solved' && (
        <div className='mt-4 flex justify-center text-5xl uppercase text-green-600'>
          <div>Correct!</div>
        </div>
      )}
      {showResult === 'passed' && (
        <div className='mt-4 flex justify-center text-5xl uppercase text-red-600'>
          <div>Skipped</div>
        </div>
      )}
      {showResult === null && (
        <div className='mt-4 flex justify-center'>
          <button
            className='text-5xl uppercase text-primary hover:text-primary-focus'
            onClick={pass}
          >
            Skip
          </button>
        </div>
      )}
    </div>
  )

  function checkAnswer(e: React.ChangeEvent<HTMLInputElement>) {
    const isCorrect =
      operations[operator](first, second).toFixed(2) ===
      parseFloat(e.target.value.trim()).toFixed(2)

    if (isCorrect) {
      setShowResult('solved')
      setTimeout(() => {
        onSolved()
        reset()
      }, 1000)
    }
  }

  function pass() {
    setShowResult('passed')
    setTimeout(() => {
      onPassed()
      reset()
    }, 1000)
  }

  function reset() {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
    setShowResult(null)
  }
}

export default Board
