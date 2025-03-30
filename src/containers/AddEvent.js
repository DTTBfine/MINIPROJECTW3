import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, InputForm } from '../components';
import { CalendarContext } from './Homepage';
import { useSelector } from 'react-redux';
import { formatTime } from '../ultils/format';
import icons from '../ultils/icons'
import { apiAddEvent, apiUpdateEvent } from '../services';

const { GrFormNextLink } = icons

function AddEvent() {
    const { currentDate, setAddEvent, updateData, setUpdateData, currentEvent, setCurrentEvent } = useContext(CalendarContext)
    const { currentData } = useSelector(state => state.user)
    const [invalidFields, setInvalidFields] = useState([]) //mảng chứa những trường không hợp lệ
    const [currentField, setCurrentField] = useState('')
    const [payload, setPayload] = useState({
        id: currentEvent?.id || '',
        e_name: currentEvent?.e_name || '',
        e_describe: currentEvent?.e_describe || '',
        created_by: currentData.id,
        e_start_time: currentEvent?.e_start_time || '08:00:00',
        e_end_time: currentEvent?.e_end_time || '09:00:00',
        e_date: currentDate.toLocaleDateString('en-CA'),
        status: 'private'
    })
    const [changeTime, setChangeTime] = useState(false)
    const [time, setTime] = useState('')

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setPayload(prev => ({ ...prev, e_date: currentDate.toLocaleDateString('en-CA') }))
    }, [currentDate])

    // const [currentValue, setCurrentValue] = useState(8); // Mặc định là số 08
    // const numbers = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'));

    console.log('payload: ' + JSON.stringify(payload))

    const isValidTime = (timeString) => {
        // Biểu thức chính quy kiểm tra định dạng HH:MM:SS
        const regex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/;

        return regex.test(timeString);
    }

    const validate = (payload) => {
        let invalids = 0
        let fields = Object.entries(payload)

        fields.forEach(item => {
            switch (item[0]) {
                case 'e_name':
                    if (item[1] === '') {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Không được bỏ trống !'
                        }])
                        invalids++
                    }
                    break
                case 'e_start_time':
                    if (!isValidTime(item[1])) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Không đúng định dạng !'
                        }])
                        invalids++
                    }
                    break
                case 'e_end_time':
                    if (!isValidTime(item[1])) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Không đúng định dạng !'
                        }])
                        invalids++
                    }
                    break
                default:
                    break
            }
        })

        return invalids
    }


    const handleSubmit = () => {
        //Thêm bước validate payload 

        const fetchAddEvent = async () => {
            setLoading(true);
            try {
                const response = await apiAddEvent(payload);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        const fetchUpdateEvent = async () => {
            setLoading(true);
            try {
                const response = await apiUpdateEvent(payload);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        let invalids = validate(payload)
        if (invalids === 0) {
            currentEvent ? fetchUpdateEvent() : fetchAddEvent()

            setCurrentEvent(null)
            setPayload({
                id: '',
                e_name: '',
                e_describe: '',
                created_by: currentData.id,
                e_start_time: '08:00:00',
                e_end_time: '09:00:00',
                e_date: currentDate.toISOString().split('T')[0],
                status: 'private'
            })
            setUpdateData(!updateData)

            setAddEvent(false)
        }

    }

    return (
        <div className='flex flex-1 flex-col p-2 gap-6 mt-4 ml-4 z-5'>
            <div className='uppercase font-medium text-lg border-b-[1px] border-gray-400 justify-center'>
                {currentEvent ? 'Chỉnh sửa thông tin lịch trình' : 'Thêm lịch trình mới !'}
            </div>
            <div className='flex flex-col gap-2 p-4 '>
                <InputForm currentField={currentField} setCurrentField={setCurrentField} setInvalidFields={setInvalidFields} invalidFields={invalidFields} lable={'Tựa đề: '} value={payload.e_name} setValue={setPayload} keyPayload={'e_name'} />
                <InputForm currentField={currentField} setCurrentField={setCurrentField} setInvalidFields={setInvalidFields} invalidFields={invalidFields} lable={'Mô tả / chú thích: '} value={payload.e_describe} setValue={setPayload} keyPayload={'e_describe'} />
                <div className='mt-2'>
                    <div className='flex justify-around items-center'>
                        <div className='flex-col justify-center items-center'>
                            <div className='flex justify-center items-center'>{currentDate.getDay() ? `T.${currentDate.getDay() + 1}` : 'CN'}, {currentDate.getDate()}/{currentDate.getMonth() + 1}</div>
                            <div className='flex justify-center items-center font-semibold cursor-pointer mt-1'
                                onClick={() => {
                                    setTime('start')
                                    time === 'start' ? setChangeTime(!changeTime) : setChangeTime(true)
                                }}
                            >
                                {formatTime(payload.e_start_time).formatString}
                            </div>
                            {invalidFields.length > 0 && invalidFields.some(i => i.name === 'e_start_time') && <small className='text-red-600'> {invalidFields.find(i => i.name === 'e_start_time')?.message} </small>}
                        </div>
                        <div>
                            <GrFormNextLink size={22} />
                        </div>
                        <div className='flex-col justify-center items-center'>
                            <div className='flex justify-center items-center'>{currentDate.getDay() ? `T.${currentDate.getDay() + 1}` : 'CN'}, {currentDate.getDate()}/{currentDate.getMonth() + 1}</div>
                            <div className='flex justify-center items-center font-semibold cursor-pointer mt-1'
                                onClick={() => {
                                    setTime('end')
                                    time === 'end' ? setChangeTime(!changeTime) : setChangeTime(true)
                                }}
                            >
                                {formatTime(payload.e_end_time).formatString}
                            </div>
                            {invalidFields.length > 0 && invalidFields.some(i => i.name === 'e_end_time') && <small className='text-red-600'> {invalidFields.find(i => i.name === 'e_end_time')?.message} </small>}
                        </div>
                    </div>
                    {
                        changeTime && <div className='my-10'>
                            {
                                time === 'start' && <div className='flex justify-center items-center text-5xl font-semibold gap-6'>
                                    <div className=' justify-center items-center text-center'>
                                        <input
                                            type='text'
                                            className='outline-none bg-inherit w-[100px] text-center'
                                            value={formatTime(payload.e_start_time).hours}
                                            onChange={(e) => setPayload(prev => ({ ...prev, e_start_time: `${e.target.value}:${formatTime(payload.e_start_time).minutes}:00` }))}
                                        />
                                    </div>
                                    <div className='justify-center items-center text-center'>
                                        :
                                    </div>
                                    <div className='justify-center items-center text-center'>
                                        <input
                                            type='text'
                                            className='outline-none bg-inherit w-[100px] text-center'
                                            value={formatTime(payload.e_start_time).minutes}
                                            onChange={(e) => setPayload(prev => ({ ...prev, e_start_time: `${formatTime(payload.e_start_time).hours}:${e.target.value}:00` }))}
                                        />
                                    </div>
                                </div>
                            }
                            {
                                time === 'end' && <div className='flex justify-center items-center text-5xl font-semibold gap-6'>
                                    <div className=' justify-center items-center text-center'>
                                        <input
                                            type='text'
                                            className='outline-none bg-inherit w-[100px] text-center'
                                            value={formatTime(payload.e_end_time).hours}
                                            onChange={(e) => setPayload(prev => ({ ...prev, e_end_time: `${e.target.value}:${formatTime(payload.e_end_time).minutes}:00` }))}
                                        />
                                    </div>
                                    <div className='justify-center items-center text-center'>
                                        :
                                    </div>
                                    <div className='justify-center items-center text-center'>
                                        <input
                                            type='text'
                                            className='outline-none bg-inherit w-[100px] text-center'
                                            value={formatTime(payload.e_end_time).minutes}
                                            onChange={(e) => setPayload(prev => ({ ...prev, e_end_time: `${formatTime(payload.e_end_time).hours}:${e.target.value}:00` }))}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
                <div className='w-full'>
                    <Button
                        text='Hủy bỏ'
                        textColor='black'
                        bgColor='bg-blue-200 mt-2 w-full'
                        fullWidth
                        onClick={() => {
                            setCurrentEvent(null)
                            setPayload({
                                e_name: '',
                                e_describe: '',
                                created_by: currentData.id,
                                e_start_time: '08:00:00',
                                e_end_time: '09:00:00',
                                e_date: currentDate.toISOString().split('T')[0],
                                status: 'private'
                            })
                            setAddEvent(false)
                        }}
                        rounded='rounded-2xl'
                        fontSize='20'
                        border='border-none shadow-lg   '
                    />
                    <Button
                        text={loading ? 'Đang xử lý' : 'Lưu'}
                        textColor='white'
                        bgColor={`mt-2 w-full ${loading ? 'bg-gray-400' : 'bg-blue-600 '}`}
                        fullWidth
                        onClick={handleSubmit}
                        rounded='rounded-2xl'
                        fontSize='20'
                        border='border-none shadow-lg'
                    />
                </div>
            </div>
        </div>
    );
}

export default AddEvent;