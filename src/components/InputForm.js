import React, { memo } from 'react';

const InputForm = ({ currentField, setCurrentField, invalidFields, setInvalidFields, lable, keyPayload, value, setValue, type }) => {
    return (
        <div>
            <label
                htmlFor="phone"
                className='text-sm font-medium'
            >
                {lable}
            </label>
            <input
                spellcheck="false"
                type={type || 'text'}
                className={`outline-none px-2 py-1 w-full border-b-[1px] bg-inherit ${currentField === keyPayload ? 'border-blue-600' : 'border-slate-300'}`}
                value={value}
                onChange={(e) => setValue(prev => ({ ...prev, [keyPayload]: e.target.value }))}
                onFocus={() => {
                    setInvalidFields([])
                    setCurrentField(keyPayload)
                }}
            />
            {invalidFields.length > 0 && invalidFields.some(i => i.name === keyPayload) && <small className='text-red-600'> {invalidFields.find(i => i.name === keyPayload)?.message} </small>}
        </div>
    );
}

export default memo(InputForm);