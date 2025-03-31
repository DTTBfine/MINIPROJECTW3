import React, { useContext, useState } from 'react';
import icons from '../ultils/icons'
import Button from '../components/Button';
import { CalendarContext } from './Homepage';
import { formatTime } from '../ultils/format'
import { apiDeleteEvent } from '../services';

const { FiPlus, HiOutlineDotsVertical } = icons

const EventToday = () => {
    const { currentDate, addEvent, setAddEvent, eventsInDate, loading, currentEvent, setCurrentEvent } = useContext(CalendarContext)

    console.log('event in date ' + JSON.stringify(eventsInDate))

    return (
        <div className='flex flex-col flex-1 h-full rounded-xl items-center justify-between p-2'>
            <div className='w-full flex flex-col gap-4'>
                <div>
                    <div className='uppercase font-medium text-lg'>
                        Lịch trình hôm nay
                    </div>
                    <p className='text-sm text-blue-700'>
                        Ngày {currentDate.getDate()} tháng {currentDate.getMonth() + 1} năm {currentDate.getFullYear()}
                    </p>
                </div>

                <div className='w-full min-h-[450px]  rounded-md my-4 p-3 '>
                    {loading && <p>Loading...</p>}
                    {/* {error && <p className='text-xs text-red-900'>Có lỗi xảy ra, vui lòng reload lại trang...</p>} */}
                    {eventsInDate.length === 0 ? <p className='text-gray-400 text-sm'>
                        Lịch trình trống!
                    </p> : eventsInDate.map((item, index) => {
                        return (
                            <div key={index} className='py-1'>
                                <EventItem event={item} />
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div className='w-full'>
                <Button
                    text='Thêm sự kiện'
                    textColor='white'
                    bgColor={!addEvent ? 'bg-blue-600' : currentEvent ? 'bg-blue-600' : 'bg-slate-300'}
                    IcBefore={FiPlus}
                    fullWidth
                    onClick={() => {
                        setCurrentEvent(null)
                        setAddEvent(true)
                    }}
                    rounded='rounded-2xl'
                    fontSize='20'
                    border='border-none shadow-lg'
                />
            </div>
        </div>
    );
}

const EventItem = ({ event }) => {
    const { setLoading, setError, setAddEvent, setCurrentEvent, updateData, setUpdateData } = useContext(CalendarContext)
    const [showHandle, setShowHandle] = useState(false)

    const handleUpdate = () => {
        console.log('Xử lý chỉnh sửa thông tin lịch trình: ' + event.id)
        setCurrentEvent(event)
        setAddEvent(true)
        //Mở form chỉnh sửa
    }

    const handleDelete = () => {
        console.log('Xử lý xóa lịch trình: ' + event.id)

        const fetchDeleteEvent = async () => {
            setLoading(true);
            try {
                const response = await apiDeleteEvent({
                    id: event.id
                });
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchDeleteEvent()

        setUpdateData(!updateData)
    }

    return (
        <div>
            <div className={`opacity-70 shadow-md border min-h-[60px] rounded-xl p-2 flex items-center justify-between ${event.completed ? 'bg-blue-300' : 'bg-white'}`}>
                <div className='flex flex-col w-[90%]'>
                    <p className='font-medium'>{event.e_name}</p>
                    {event.e_describe.length < 55 ?
                        <p className={`whitespace-nowrap w-full text-sm ${event.completed ? 'text-blue-600' : 'text-gray-500'} `}>{event.e_describe || 'Chưa có mô tả'}</p>
                        : <marquee direction="left" scrollamount="3" className={`whitespace-nowrap w-full text-sm ${event.completed ? 'text-blue-600' : 'text-gray-500'} `}>{event.e_describe || 'Chưa có mô tả'}</marquee>
                    }
                    <p className={`text-sm ${event.completed ? 'text-blue-600' : 'text-gray-500'} `}>{formatTime(event.e_start_time).formatString} - {formatTime(event.e_end_time).formatString}</p>
                </div>
                <HiOutlineDotsVertical color='blue' size={24} className='cursor-pointer'
                    onClick={() => {
                        setShowHandle(!showHandle)
                    }}
                />
            </div>

            {showHandle && <div className='flex justify-end items-center gap-4 py-[8px] px-[12px]'>
                <div className='text-center cursor-pointer items-center font-medium bg-gradient-to-br from-pink-600 to-blue-800 bg-clip-text text-transparent hover:bg-gradient-to-br hover:from-blue-600 hover:to-pink-500 '
                    onClick={handleUpdate}>
                    Chỉnh sửa
                </div>
                <div className='text-center cursor-pointer font-medium bg-gradient-to-br from-pink-600 to-blue-800 bg-clip-text text-transparent hover:bg-gradient-to-br hover:from-blue-600 hover:to-pink-500 ' onClick={handleDelete}>
                    Xóa
                </div>
            </div>}
        </div>
    )
}

export default EventToday;