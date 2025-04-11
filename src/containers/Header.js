import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../store/actions'
import { path } from '../ultils/constant'
import { hideUuid } from '../ultils/format'
import icons from '../ultils/icons'
import { CalendarContext } from './Homepage';

const { MdManageHistory, IoIosLogOut, AiTwotoneSetting } = icons

const fonts = [
    {
        name: 'Arial',
        className: 'font-sans'
    },
    {
        name: 'Times New Roman',
        className: 'font-serif'
    },
    {
        name: 'Courier New',
        className: 'font-mono'
    },
]

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showDetail, setShowDetail] = useState(false)
    const [showSetting, setShowSetting] = useState(false)
    const { font, setFont } = useContext(CalendarContext)

    const { currentData, msg } = useSelector(state => state.user)

    // useEffect(() => {
    //     if (msg) {
    //         dispatch(actions.logout())
    //         navigate(path.LOGIN)
    //     }
    // }, [])

    console.log('msg: ' + msg)

    console.log(JSON.stringify(currentData))

    console.log('font: ' + font)

    return (
        <div className='w-full h-[100px] flex justify-between p-[20px]'>
            <div className='flex items-start gap-2'>
                <div className='text-6xl font-bold bg-gradient-to-r from-pink-600 via-blue-800 to-pink-600 bg-clip-text text-transparent'>
                    SMARTLIFE
                </div>
                <MdManageHistory size={40} color='purple' className='pl-[8px] pt-[8px]' />
                <div className='font-semibold text-gray-600 pt-[8px]'>Lập lịch và quản lý thông minh</div>
            </div>
            <div className=''>
                <div className='flex fixed right-[-50px] gap-4'>
                    <div onClick={() => {
                        setShowDetail(!showDetail)
                        setShowSetting(false)
                    }}
                        className={`fixed right-[20px] cursor-pointer transition-transform duration-300 ease-in-out ${showDetail ? 'transform  translate-x-[-80%]' : ''}`}
                        style={{
                            zIndex: 100
                        }}
                    >
                        <p className='font-medium bg-gradient-to-br from-pink-800 to-blue-800 bg-clip-text text-transparent '>Xin chào {currentData?.username} ! </p>
                        <p className='text-xs text-gray-500'>ID: {hideUuid(currentData?.id)} </p>
                    </div>
                    <div className={`flex items-center gap-2 transition-opacity duration-5000 ${showDetail ? 'opacity-100' : 'opacity-0'}`}>
                        <div className='cursor-pointer'>
                            <AiTwotoneSetting size={26} color='purple' onClick={() => { setShowSetting(!showSetting) }} />
                        </div>
                        <button
                            type='button'
                            className='w-[200px] bg-gradient-to-br from-pink-500 to-blue-700 hover:from-blue-700 hover:to-pink-500 p-2 pl-6 rounded-full ouline-none flex items-center gap-1.5 text-white  hover:text-pink-300'
                            onClick={() => {
                                dispatch(actions.logout())
                                navigate(path.LOGIN)
                            }}
                        >
                            <span> <IoIosLogOut color='white' className='font-bold' /> </span>
                            <span className='uppercase font-medium'>
                                Đăng xuất
                            </span>
                        </button>
                    </div>
                </div>
                {showSetting && <div
                    className={`text-sm fixed right-[-25px] top-[65px] rounded-lg p-2 transition-opacity duration-5000 ${showSetting ? 'opacity-100' : 'opacity-0'}`}
                    style={{ zIndex: 100 }}>
                    <div className='font-semibold p-1'>Kiểu chữ:</div>
                    <div className='p-1 flex flex-col gap-2'>
                        {fonts.length > 0 && fonts.map((item, index) => {
                            return (
                                <div key={index} className={`cursor-pointer hover:font-semibold py-1 px-2 bg-slate-200 rounded-2xl w-[160px] ${item.className}`}

                                    onClick={() => {
                                        setFont(item.className)
                                        setShowSetting(false)
                                    }}
                                >
                                    {item.name}
                                </div>
                            )
                        })}
                    </div>
                </div>}
            </div>
        </div >
    );
}

export default Header;