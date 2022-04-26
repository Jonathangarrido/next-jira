import { useState, ChangeEvent, useMemo, FC, useContext } from 'react'
import { GetServerSideProps } from 'next'
import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import DeleteIcon from '@mui/icons-material/Delete'
import { isValidObjectId } from 'mongoose'

import { Layout } from '../../components/layouts/Layout'
import { EntryStatus, Entry } from '../../interfaces/'
import { dbEntries } from '../../database'
import { EntriesContext } from '../../context/entries'
import { dateFunctions } from '../../utils'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface props {
  entry: Entry
}

export const EntryPage: FC<props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext)
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const isNotValid = useMemo(() => inputValue.length === 0 && touched, [inputValue, touched])

  const onSetInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSetStatus = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus)
  }

  const onSave = () => {
    if (inputValue.trim().length === 0) return

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    }
    updateEntry(updatedEntry, true)
  }

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada:`}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
            />
            <CardContent>
              <TextField
                fullWidth
                autoFocus
                multiline
                label="Nueva entrada"
                placeholder="Nueva entrada"
                sx={{ mt: 2, mb: 1 }}
                value={inputValue}
                onChange={onSetInputValue}
                onBlur={() => setTouched(true)}
                helperText={isNotValid && 'Ingrese Valor'}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onSetStatus}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      label={capitalize(option)}
                      control={<Radio />}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveAsIcon />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length === 0}>
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark',
        }}>
        <DeleteIcon />
      </IconButton>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }

  const entry = await dbEntries.getEntryById(id)

  if (!isValidObjectId(id)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      entry,
    },
  }
}

export default EntryPage
