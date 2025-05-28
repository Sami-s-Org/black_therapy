import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export default function BasicSelect() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          slotProps={{
            popper: {
              placement: 'top',
            },
          }}
          sx={{
            width: '100%',
            '& .MuiStack-root': {
              overflow: 'visible',
              textAlign: 'left',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              width: '100%',
              borderTop: 'none',
              borderRight: 'none',
              borderLeft: 'none',
              borderRadius: '0px',
              borderBottom: '1px solid rgb(159, 159, 159)',
              padding: '0px 0px',
              fontSize: '14px',
              fontFamily: '"Poppins", sans-serif',
            },
            '& .MuiIconButton-root': {
              padding: '0px',
            },
            '& .MuiOutlinedInput-input': {
              fontFamily: '"Poppins", sans-serif',
              fontSize: '14px',
              padding: '0px 0px 4px 0px',
            },
            '& .MuiInputLabel-root': {
              fontSize: '14px',
              fontStyle: 'italic',
              fontFamily: '"Poppins", sans-serif',
              color: '#00276d',
              position: 'absolute',
              left: '-13px',
            },
            '& .MuiSvgIcon-root': {
              fill: '#2fafb6',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '0px',
              fontSize: '14px',
              '&:hover': {
                borderBottom: '1.5px solid black !important',
              },
            },
            '& .MuiDateCalendar-root': {
              maxHeight: '250px !important',
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}
