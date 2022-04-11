import { FC, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Entry } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'PRENDIENTE: Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      status: 'pending',
      createAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        'IN_-PROGRESS: Sint doloremque autem voluptatum magnam cum iste optio ab similique dolore',
      status: 'in-progress',
      createAt: Date.now() - 100000,
    },
    {
      _id: uuidv4(),
      description:
        'FINISHED: Exercitationem nam consequatur aperiam unde molestias, eaque facere itaque labore consequuntur?',
      status: 'finished',
      createAt: Date.now() - 10000,
    },
  ],
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
