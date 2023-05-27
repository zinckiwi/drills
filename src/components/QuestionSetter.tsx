import React, { useState } from 'react'
import { useHookstate } from '@hookstate/core'

import globalState from '../state'
import makeQuestion from '../lib/makeQuestion'

import Board from './Board'

const QuestionSetter: React.FunctionComponent = () => {
  const state = useHookstate(globalState)
  const [question, setQuestion] = useState(makeQuestion(state.settings))

  return (
    <Board
      {...question}
      onSolved={() => setQuestion(makeQuestion(state.settings))}
      onPassed={() => setQuestion(makeQuestion(state.settings))}
    />
  )
}

export default QuestionSetter
