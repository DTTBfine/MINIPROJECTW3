import React, { memo } from 'react';

const Button = ({ text, textColor, bgColor, IcBefore, fullWidth, onClick, rounded, fontSize, border }) => {
    const text_color = 'text-' + textColor
    return (
        <div>
            <button
                type='button'
                className={`py-2 px-4 ${textColor} ${bgColor} ${fullWidth && 'w-full'} ${border} ${rounded} ${fontSize} ouline-none hover:text-blue-900 flex items-center justify-center gap-1.5`}
                onClick={onClick}
            >
                {IcBefore && <span> <IcBefore color={textColor} /> </span>}
                <span className={text_color}>
                    {text}
                </span>
            </button>

        </div>
    );
}

export default memo(Button);