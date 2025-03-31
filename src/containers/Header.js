import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../store/actions'
import { path } from '../ultils/constant'
import { hideUuid } from '../ultils/format'
import icons from '../ultils/icons'

const { MdOutlineAccessTime, IoIosLogOut } = icons

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showDetail, setShowDetail] = useState(false)

    const { currentData } = useSelector(state => state.user)

    console.log(JSON.stringify(currentData))

    return (
        <div className='w-full h-[100px] flex justify-between p-[20px]'>
            <div className='flex items-start gap-2'>
                <div className='text-6xl font-bold  bg-gradient-to-r from-pink-600 via-blue-800 to-pink-600 bg-clip-text text-transparent'>
                    SMARTLIFE
                </div>
                <MdOutlineAccessTime size={40} className='text-gray-600 pl-[8px] pt-[8px]' />
                <div className='font-semibold text-gray-600 pt-[8px]'>Lập lịch và quản lý thông minh</div>
            </div>
            <div className='flex fixed right-[-30px] gap-4'>
                <div onClick={() => setShowDetail(!showDetail)}
                    className='cursor-pointer'
                    style={{
                        zIndex: 100
                    }}
                >
                    <p className='font-medium bg-gradient-to-br from-pink-800 to-blue-800 bg-clip-text text-transparent '>Xin chào {currentData?.username} ! </p>
                    <p className='text-xs text-gray-500'>ID: {hideUuid(currentData?.id)} </p>
                </div>
                {showDetail ? <div className=''>
                    <button
                        type='button'
                        className='w-[200px] bg-gradient-to-br from-pink-500 to-blue-700 hover:from-blue-700 hover:to-pink-500 p-2 pl-6 rounded-xl ouline-none flex items-center gap-1.5 text-white  hover:text-pink-300'
                        onClick={() => {
                            dispatch(actions.logout())
                            navigate(path.LOGIN)
                        }}
                    >
                        <span> <IoIosLogOut color='white' className='font-bold' /> </span>
                        <span className=''>
                            Đăng xuất
                        </span>
                    </button>
                </div> : <div className='w-[50px]'></div>
                }
            </div>
        </div >
    );
}

export default Header;