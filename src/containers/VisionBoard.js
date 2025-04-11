import React, { useContext, useEffect } from 'react';
import icons from '../ultils/icons'
import { CalendarContext } from './Homepage'

const { GrFormPrevious, GrFormNext,
    IoIosArrowDropdownCircle,
    TbSquareRoundedArrowDownFilled, TbSquareRoundedArrowUpFilled,
    TfiLayoutLineSolid,
    FaCircle,
    BiHeartCircle
} = icons

const VisionBoard = () => {
    const { currentDate } = useContext(CalendarContext)

    useEffect(() => {
        console.log('currentDate: ' + currentDate.getDate() + ' ' + (currentDate.getMonth() + 1))
    }, [currentDate])

    return (
        <div className='flex flex-col flex-1  h-full rounded-xl ' style={{ zIndex: 100 }}>
            <Calendar />
        </div>
    );
}

const Calendar = () => {
    const { initDate, currentDate, setCurrentDate, theme, setTheme } = useContext(CalendarContext)

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()

    const convertMonthToString = (month) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        if (month >= 0 && month <= 11) {
            return months[month]
        } else {
            return "Invalid month"
        }
    }

    const renderCalendar = () => {
        const calendar = [];
        let dayCounter = 1;

        for (let i = 0; i < 6; i++) {
            const row = [];
            for (let j = 0; j < 7; j++) {
                const day = (i * 7) + j - firstDay + 2;
                const isValidDay = dayCounter <= totalDays && day >= 1;
                row.push(
                    <td key={j} className=''>
                        {isValidDay ? <DateItem text={dayCounter++} /> : <DateItem text={''} />}
                    </td>
                );
            }
            calendar.push(<tr key={i}>{row}</tr>);
            if (dayCounter > totalDays) break;
        }

        return calendar;
    }

    const handlePrev = () => {
        if (currentDate.getMonth() - 1 === initDate.getMonth()) {
            setCurrentDate(initDate)
        }
        else if (currentDate.getMonth() === 0) {
            setCurrentDate(new Date(currentDate.getFullYear() - 1, 11, 1))
        }
        else setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const handleNext = () => {
        if (currentDate.getMonth() + 1 === initDate.getMonth()) {
            setCurrentDate(initDate)
        }
        else if (currentDate.getMonth() === 11) {
            setCurrentDate(new Date(currentDate.getFullYear() + 1, 0, 1))
        }
        else setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const handleChangeTheme = () => {
        if (theme === 'round') setTheme('rectangle')
        else setTheme('round')
    }

    return (
        <div className='flex-1 flex flex-col items-center justify-start '>
            <div className='w-full flex items-center justify-end p-[10px]'>
                {theme === 'round' ? <TbSquareRoundedArrowDownFilled size={24} color='gray' onClick={handleChangeTheme} />
                    : <TbSquareRoundedArrowUpFilled size={24} color='gray' onClick={handleChangeTheme} />}
            </div>
            <div className='w-[65%] flex items-center justify-between py-5'>
                <GrFormPrevious size='24' onClick={handlePrev} />
                <p className={currentDate.getMonth() === initDate.getMonth() && currentDate.getFullYear() === initDate.getFullYear() && 'font-medium text-blue-700'}>
                    {convertMonthToString(currentDate.getMonth()) + ' ' + currentDate.getFullYear()}
                </p>
                <GrFormNext size='24' onClick={handleNext} />
            </div>
            <table id="calendar" className='p-[20px] '>
                <thead>
                    <tr className='font-medium'>
                        <th className='font-medium text-gray-100 '>T2</th>
                        <th className='font-medium text-gray-100 '>T3</th>
                        <th className='font-medium text-gray-100 '>T4</th>
                        <th className='font-medium text-gray-100 '>T5</th>
                        <th className='font-medium text-gray-100 '>T6</th>
                        <th className='font-medium text-gray-100 '>T7</th>
                        <th className='font-medium text-gray-100 '>CN</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCalendar()}
                </tbody>
            </table>

        </div>
    );
}

const DateItem = ({ text }) => {
    const { currentDate, setCurrentDate, theme, events } = useContext(CalendarContext)

    const notActive = theme === 'round' ? 'relative w-[46px] h-[46px] rounded-[50%] flex flex-col gap-0 items-center justify-center m-[7px]' : 'w-[58px] h-[90px] flex flex-col gap-0 items-center justify-between border border-gray-200 rounded-md m-[1px]'
    const Active = theme === 'round' ? 'relative w-[46px] h-[46px] rounded-[50%] flex flex-col gap-0 items-center justify-center bg-blue-700 hover:opacity-80 text-white cursor-pointer m-[7px]' : 'w-[58px] h-[90px] bg-blue-500 flex flex-col gap-0 items-center justify-between border-[2px] border-blue-700 rounded-md m-[1px]'

    const handleChangeDate = () => {
        if (!(text === '')) {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), +text))
            //gọi ngày
        }
    }

    return (
        <div
            className={+text === +currentDate.getDate() ? Active : `${notActive} ${text === '' ? 'border-none' : 'hover:bg-gray-50 cursor-pointer'}`}
            onClick={handleChangeDate}
        >
            {/* <div className='absolute bottom-[17px]'>{text} </div> */}
            <div className='top-2'>{text} </div>
            {!events[+text - 1] ? '' : theme === 'round' ? <IoIosArrowDropdownCircle className='text-blue-500 absolute bottom-[2px]' size='12' /> :
                <div className='flex gap-[1px] pb-2'>
                    {events[+text - 1] < 4 ? new Array(events[+text - 1]).fill(null).map((_, index) => (
                        <div key={index}>
                            <BiHeartCircle className={+text === +currentDate.getDate() ? 'text-white' : 'text-blue-500'} size={12} />
                        </div>
                    )) : <div className='text-white text-2xl'> .... </div>
                    }
                </div>
            }
        </div>
    );
}


export default VisionBoard;