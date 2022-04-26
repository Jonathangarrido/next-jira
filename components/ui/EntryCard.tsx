import { DragEvent, FC, useContext } from 'react'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'

import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui'
import { useRouter } from 'next/router'
import { dateFunctions } from '../../utils'

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext)
  const router = useRouter()

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', entry._id)
    startDragging()
  }

  const onDragEnd = () => endDragging()

  const onClick = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card
      sx={{
        marginBottom: 1,
      }}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onClick={onClick}
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
          <Typography variant="body2">
            {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActionArea>
      </CardActionArea>
    </Card>
  )
}
