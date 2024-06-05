/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { useTheme } from '@emotion/react'
import { useState } from 'react'
import { Box } from '@mui/material'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles() {
  return {
    fontWeight: '300'
  }
}

export default function CollectionSelect(props) {
  const theme = useTheme()
	const name = props.collections
  const [personName, setPersonName] = useState([])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  return (
    <div>
      <FormControl sx={{ 
				m: 1, 
				width: 180,
				color: 'white',
				'& .MuiOutlinedInput-notchedOutline': {
					borderColor: 'rgb(225, 225, 225)'
				},
				'& .css-z5em9z-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
					color: 'white'
				},
				'& .css-1ucakbu-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
					borderColor: 'rgb(225, 225, 225)'
				},
				'& .css-14lo706': {
					width: '70px'
				},
				'& .css-1ucakbu-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
					borderColor: 'rgb(180, 180, 180)'
				},
				'& .css-gavykb-MuiChip-root': {
					backgroundColor: 'rgba(125, 125, 125, 0.2)',
					border: '1px solid rgb(200, 200, 200)'
				},
				'& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root.Mui-selected': {
					backgroundColor: 'rgba(150, 150, 150, .2)'
				},
			}}>
        <InputLabel sx={{
					color: 'rgb(200, 200, 200)',
					fontFamily: "Oswald",
					letterSpacing: '1.2px',
					fontSize: '17px',
				}}
				id="demo-multiple-chip-label">Collections</InputLabel>
        <Select sx={{
					color: 'white',
				}}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {name.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}