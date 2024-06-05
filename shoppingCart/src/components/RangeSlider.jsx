import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { useState } from 'react'

function valuetext(value) {
  return `${value}°C`
}

export default function RangeSlider() {
  const [value, setValue] = useState([20, 37])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Box sx={{ 
			width: '180px',
			'& .MuiSlider-track': {
				backgroundColor: 'rgba(225, 225, 225, .8)',
				border: 'none',
				height: '5px'
			},
			'& .MuiSlider-mark': {
				width: '5px',
				height: '5px',
				backgroundColor: 'rgb(115, 125, 135)',
				borderRadius: '50%'
			},
			'& .css-14gyywz-MuiSlider-valueLabel': {
				width: '10px',
				height: '20px',
				backgroundColor: 'rgba(255, 255, 255, 1)',
				color: 'rgb(119, 138, 153)',
				fontSize: '13px'
			},
			'& .MuiSlider-thumb': {
				backgroundColor: 'rgb(119, 138, 153)',
			},
			'& .css-7o8aqz-MuiSlider-rail': {
				backgroundColor: 'rgb(119, 138, 153)',
				boxShadow: '0px 1px 10px black',
				width: '100%'
			},
			'& .css-188mx6n-MuiSlider-root': {
				color: 'rgba(135, 135, 135, 1)'
			},
			'& .css-hzp7sc-MuiSlider-mark': {
				marginLeft: '0'
			}
			
		}}>
      <Slider
				disableSwap
				valueLabelDisplay="on"
				marks={true}
				min={0}
				max={13}
				step={1}
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
      />
    </Box>
  )
}