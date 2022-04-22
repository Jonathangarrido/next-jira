import { FC, useEffect, useReducer } from 'react'
import entriesApi from '../../apis/entriesApi'

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

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description })
    dispatch({
      type: '[Entry] - Add',
      payload: data,
    })
  }

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })

      dispatch({
        type: '[Entry] - Update',
        payload: data,
      })
    } catch (error) {
      console.log({ error })
    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: '[Entry] - Refresh', payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [])

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
