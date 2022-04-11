import { DragEvent, useContext, useMemo } from 'react'
import { List, Paper } from '@mui/material'
import { EntryStatus } from '../../interfaces'

import { EntryCard } from './EntryCard'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'
import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList = ({ status }: Props) => {
  const { entries, updateEntry } = useContext(EntriesContext)
  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(() => {
    return entries.filter((entry) => entry.status === status)
  }, [entries])

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }
  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text')
    const entry = entries.find((e) => e._id === id)!
    entry.status = status
    updateEntry(entry)
    endDragging()
  }

  return (
    <div onDragOver={onDragOver} onDrop={onDrop} className={isDragging ? styles.dragging : ''}>
      <Paper
        sx={{
          height: 'calc(100vh - 250px)',
          overflow: 'scroll',
          backgroundColor: 'transparent',
          padding: '5px',
        }}>
        <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'opacity .3s' }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  )
}
