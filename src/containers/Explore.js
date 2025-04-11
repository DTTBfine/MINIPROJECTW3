import React from 'react';

const Explore = () => {
    return (
        <div className='flex flex-1 flex-col bg-white bg-opacity-60 shadow-lg h-full rounded-lg p-2 gap-6 border pb-[35px]'>
            <div>
                <div className='uppercase font-medium text-lg'>
                    Thống kê
                </div>
                <p className=' text-blue-800 mt-3'>
                    Thống kê số hoạt động bạn đã hoàn thành trong tuần, trong tháng, hoặc trong năm vừa qua.
                </p>
                <p className='text-gray-400 text-sm'>
                    Tính năng này chưa được hỗ trợ !
                </p>
                <div className='flex justify-end items-center pr-[15px]'>
                    <p className='font-medium bg-gradient-to-br from-pink-600 to-blue-800 bg-clip-text text-transparent '>Theo tháng</p>
                </div>
                <div className='mt-4 p-4'>
                    <img src="https://exceljet.net/sites/default/files/styles/original_with_watermark/public/images/charttypes/column%20chart.png" alt="Description of image" />
                </div>
            </div>
            <div>
                <div className='uppercase font-medium text-lg'>
                    Gợi ý cho bạn:
                </div>
                <p className=' text-blue-800 mt-3'>
                    Một số hoạt động bổ ích có thể bạn sẽ quan tâm.
                </p>
                <p className='text-gray-400 text-sm'>
                    Tính năng này chưa được hỗ trợ !
                </p>
            </div>
        </div>
    );
}

export default Explore;