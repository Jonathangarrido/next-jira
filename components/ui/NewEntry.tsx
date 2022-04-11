import { ChangeEvent, useState, useContext } from 'react'
import { Box, Button, TextField } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SaveIcon from '@mui/icons-material/Save'

import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui/'

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)

  const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const onSave = () => {
    if (value.length === 0) return

    addNewEntry(value)
    setIsAddingEntry(false)
    setTouched(false)
    setValue('')
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            autoFocus
            error={value.length <= 0 && touched}
            fullWidth
            helperText={value.length <= 0 && touched && 'Ingresa un valor'}
            label="Nueva entrada"
            multiline
            onBlur={() => setTouched(true)}
            onChange={onTextFieldChanges}
            placeholder="Nueva entrada"
            sx={{ marginTop: 2, marginBottom: 1 }}
            value={value}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={() => setIsAddingEntry(false)}>
              Cancelar
            </Button>
            <Button variant="outlined" color="secondary" endIcon={<SaveIcon />} onClick={onSave}>
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          fullWidth
          onClick={() => setIsAddingEntry(true)}
          startIcon={<AddCircleOutlineIcon />}
          variant="outlined">
          Agregar tarea
        </Button>
      )}
    </Box>
  )
}
