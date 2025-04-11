import React, { memo } from 'react';

const Button = ({ disabled, text, textColor, bgColor, IcBefore, fullWidth, onClick, rounded, fontSize, border }) => {
    const text_color = 'text-' + textColor
    return (
        <div>
            <button
                type='button'
                disabled={disabled}
                className={`
                    py-2 px-4
                    ${bgColor ? bgColor : ' hover:text-white hover: font-semibold bg-gradient-to-br from-pink-400 to-blue-500 hover:from-blue-500 hover:to-pink-400 '}
                    ${fullWidth ? 'w-full' : ''}
                    ${border}
                    ${rounded}
                    ${fontSize}
                    outline-none
                    flex items-center justify-center gap-1.5
                  `}
                onClick={onClick}
            >
                {IcBefore && <span> <IcBefore color={textColor} /> </span>}
                <span className={text_color}>
                    {text} {disabled}
                </span>
            </button>

        </div>
    );
}

export default memo(Button);