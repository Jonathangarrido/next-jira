import { DragEvent, FC, useContext } from 'react'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'

import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui'

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext)

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', entry._id)
    startDragging()
  }

  const onDragEnd = () => endDragging()

  return (
    <Card
      sx={{
        marginBottom: 1,
      }}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      draggable>
      <CardActionArea>
        <CardContent>
          <Typography
            sx={{
              whiteSpace: 'pre-line',
            }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActionArea
          sx={{
            display: 'flex',
            justifyContent: 'end',
            paddingRight: 2,
          }}>
          <Typography variant="body2">hace 30 minutos</Typography>
        </CardActionArea>
      </CardActionArea>
    </Card>
  )
}
