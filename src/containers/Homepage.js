import React, { createContext, useContext, useEffect, useState } from 'react';
import Header from './Header';
import VisionBoard from './VisionBoard';
import Explore from './Explore';
import EventToday from './EventToday';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions'
import { useNavigate } from 'react-router-dom';
import AddEvent from './AddEvent';
import { apiGetEventInDate, apiGetEventInMonth } from '../services';
import { formatDate } from '../ultils/format';

export const CalendarContext = createContext()
const initDate = new Date()

const Homepage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector(state => state.auth)
    const { currentData } = useSelector(state => state.user)

    const [updateData, setUpdateData] = useState(false)

    useEffect(() => {
        !isLoggedIn && navigate('/login')
    }, [])


    const [currentDate, setCurrentDate] = useState(initDate)
    const [theme, setTheme] = useState('round')
    const [addEvent, setAddEvent] = useState(false)
    const [currentEvent, setCurrentEvent] = useState(null)

    const [events, setEvents] = useState([]);
    const [eventsInDate, setEventsInDate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const start_date = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))
    const end_date = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0))

    const fetchEventsInDate = async () => {
        setLoading(true);
        try {
            const response = await apiGetEventInDate({ date: formatDate(currentDate) });
            setEventsInDate(response.data.result);  // Giả sử API trả về data là danh sách sự kiện
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    const fetchEventsInMonth = async () => {
        setLoading(true);
        try {
            const payload = { start_date, end_date };  // Tạo payload từ currentDate
            const response = await apiGetEventInMonth(payload);
            setEvents(response.data.result);  // Giả sử API trả về data là danh sách sự kiện
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            isLoggedIn && dispatch(actions.getCurrent())
        }, 1000)

        setTimeout(() => {
            isLoggedIn && fetchEventsInDate()
            isLoggedIn && fetchEventsInMonth()
        }, 1000)
    }, [isLoggedIn, updateData])

    console.log('islogin: ' + isLoggedIn)

    useEffect(() => {
        fetchEventsInDate()
    }, [currentDate, updateData])

    useEffect(() => {
        fetchEventsInMonth()
    }, [currentDate.getMonth(), updateData])

    useEffect(() => {
        error && setUpdateData(!updateData)
    }, [])

    return (
        <CalendarContext.Provider value={{ initDate, currentDate, setCurrentDate, theme, setTheme, addEvent, setAddEvent, eventsInDate, setEventsInDate, events, error, setError, loading, setLoading, updateData, setUpdateData, currentEvent, setCurrentEvent }}>
            <div className='w-full m-auto h-full flex flex-col items-center justify-start'>
                <Header />
                <Container />
            </div>
        </CalendarContext.Provider>
    );
}


const Container = () => {
    const { addEvent } = useContext(CalendarContext)
    return (
        <div className='w-full h-[640px] flex gap-4 p-4 bg-inherit relative' style={{ zIndex: 50 }}>
            <div className={`w-1/3 h-full transition-transform duration-300 ease-in-out ${addEvent ? 'transform  translate-x-[-110%]' : ''}`}>
                <Explore />
            </div>
            <div className={`w-1/3 h-full transition-transform duration-300 ease-in-out ${addEvent ? 'transform  translate-x-[-100%]' : ''}`}>
                <VisionBoard />
            </div>
            {
                addEvent && <div className='absolute left-1/3 top-0 w-1/3 h-full'>
                    <AddEvent />
                </div>
            }
            <div className='w-1/3 h-full'>
                <EventToday />
            </div>
        </div>
    )
}

export default Homepage;