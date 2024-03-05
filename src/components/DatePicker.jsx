// components
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

// hooks
import {useTheme} from '@contexts/themeContext';
import {useWindowSize} from 'react-use';

// utils
import dayjs from 'dayjs';

const DatePicker = ({value, onChange, id}) => {
    const {theme} = useTheme();
    const {width} = useWindowSize();
    const Picker = width < 768 ? MobileDateTimePicker : DesktopDateTimePicker;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Picker value={value}
                            onChange={(newValue) => onChange(newValue)}
                            minDate={dayjs()}
                            slotProps={{
                                textField: {
                                    id: id
                                },
                                dialog: {
                                    className: 'datePicker'
                                }
                            }}
                            views={['day', 'month', 'hours', 'minutes']}
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: '50px',
                                    borderRadius: '10px',
                                    backgroundColor: 'var(--input-bg)',
                                    fontFamily: 'Manrope, sans-serif',
                                    fontSize: '14px',
                                    color: 'var(--header)',
                                    paddingRight: '16px',

                                    '&.Mui-focused': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: '1px solid var(--input-focus-border)',
                                        },
                                    },

                                    '&:hover': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'var(--border) !important'
                                        }
                                    },

                                    '& .MuiInputBase-input': {
                                        padding: '0 16px',

                                        '&::placeholder': {
                                            color: 'var(--label)'
                                        }
                                    },

                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: '1px solid var(--border)',
                                        transition: 'border-color var(--transition)',

                                        '&:hover': {
                                            borderColor: 'var(--border) !important'
                                        },
                                    },

                                    '& .MuiButtonBase-root': {
                                        color: theme === 'light' ? '#DEE4DF' : 'var(--label)',
                                        backgroundColor: 'transparent !important',
                                        transition: 'color var(--transition)',

                                        '&:hover': {
                                            color: theme === 'light' ? 'var(--sidebar)' : '#fff',
                                        },

                                        '& .MuiTouchRipple-root': {
                                            display: 'none'
                                        }
                                    }
                                }
                            }}
            />
        </LocalizationProvider>
    )
}

export default DatePicker