import { useContext, useMemo } from 'react'
import { List, Paper } from '@mui/material'
import { EntryStatus } from '../../interfaces'

import { EntryCard } from './EntryCard'
import { EntriesContext } from '../../context/entries'

interface Props {
  status: EntryStatus
}

export const EntryList = ({ status }: Props) => {
  const { entries } = useContext(EntriesContext)

  const entriesByStatus = useMemo(() => {
    return entries.filter((entry) => entry.status === status)
  }, [entries])

  return (
    <div>
      <Paper
        sx={{
          height: 'calc(100vh - 250px)',
          overflow: 'scroll',
          backgroundColor: 'transparent',
          padding: '5px',
        }}>
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  )
}
