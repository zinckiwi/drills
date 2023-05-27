import React from 'react'

import '../state'
import Settings from './Settings'
import QuestionSetter from './QuestionSetter'

const App: React.FunctionComponent = () => {
  return (
    <div className='flex h-screen w-screen'>
      <div className='flex-0 w-96 px-4'>
        <h1 className='my-2 text-center font-brand text-2xl uppercase'>
          Drills
        </h1>
        <Settings />
      </div>
      <div className='mt-8 flex flex-1 flex-wrap items-start justify-center'>
        <QuestionSetter />
      </div>
    </div>
  )
}

export default App
