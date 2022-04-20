import { FC, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Entry } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createAt: Date.now(),
      status: 'pending',
    }
    dispatch({
      type: '[Entry] - Add',
      payload: newEntry,
    })
  }

  const updateEntry = (entry: Entry) => {
    dispatch({
      type: '[Entry] - Update',
      payload: entry,
    })
  }

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // method
        addNewEntry,
        updateEntry,
      }}>
      {children}
    </EntriesContext.Provider>
  )
}
