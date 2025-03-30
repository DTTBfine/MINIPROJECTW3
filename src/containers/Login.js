import React, { useState, useEffect } from 'react';
import { InputForm, Button } from '../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const Login = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn, msg, update } = useSelector(state => state.auth)
    const [isRegister, setIsRegister] = useState(location.state?.flag)
    const [invalidFields, setInvalidFields] = useState([]) //mảng chứa những trường không hợp lệ
    const [currentField, setCurrentField] = useState('')
    const [payload, setPayload] = useState({
        sdt: '',
        password: '',
        username: '',
        email: '',
        repeatPassword: '',
    })
    useEffect(() => {
        setIsRegister(location.state?.flag)
    }, [location.state?.flag])

    useEffect(() => {
        isLoggedIn && navigate('/')
    }, [isLoggedIn])

    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error')
    }, [msg, update])

    const handleSubmit = async () => {
        //console.log(payload)
        let finalPayload = isRegister ? payload : {
            sdt: payload.sdt,
            password: payload.password
        }
        let invalids = validate(finalPayload)
        console.log('ấn submit nài + ' + invalids)
        console.log('invalidFields ' + JSON.stringify(invalidFields))
        if (invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
    }

    const validateEmail = (email) => {
        var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
    }

    const validate = (payload) => {
        let invalids = 0 //đếm số trường không hợp lệ
        let fields = Object.entries(payload) //hàm chuyển 1 object thành mảng

        const pattern = /^\d{10}$/;

        fields.forEach(item => {
            if (item[1] === '') {
                setInvalidFields(prev => [...prev, {
                    name: item[0],
                    message: 'Không được bỏ trống !'
                }])
                invalids++
            }
        })
        fields.forEach(item => {
            switch (item[0]) {
                case 'password':
                    if (item[1].length < 6) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Mật khẩu phải có tối thiểu 6 ký tự !'
                        }])
                        invalids++
                    }
                    break
                case 'repeatPassword':
                    if (item[1] !== payload.password) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Mật khẩu nhập lại chưa khớp !'
                        }])
                        invalids++
                    }
                    break
                case 'sdt':
                    if (!+item[1]) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Số điện thoại không hợp lệ !'
                        }])
                        invalids++
                    }
                    else if (!pattern.test(item[1])) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Số điện thoại phải bao gồm 10 chữ số !'
                        }])
                        invalids++
                    }
                    break
                case 'email':
                    if (!validateEmail(item[1])) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Email không hợp lệ !'
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

    return (
        <div className='bg-slate-100 bg-opacity-30 w-[600px] p-[30px] pb-[100px] my-[100px] rounded-xl shadow-lg '>
            <div className='w-full mb-[20px]'>
                <div className='uppercase font-semibold text-2xl text-blue-800 flex items-center justify-center' >{isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}</div>
            </div>
            <div>
                <div className='w-full flex flex-col gap-3 pb-5'>
                    {isRegister && <InputForm currentField={currentField} setCurrentField={setCurrentField} setInvalidFields={setInvalidFields} invalidFields={invalidFields} lable={'Tên đăng nhập: '} value={payload.username} setValue={setPayload} keyPayload={'username'} />}
                    <InputForm currentField={currentField} setCurrentField={setCurrentField} setInvalidFields={setInvalidFields} invalidFields={invalidFields} lable={'Số điện thoại: '} value={payload.sdt} setValue={setPayload} keyPayload={'sdt'} />
                    <div className='w-full flex gap-4'>
                        <div className='flex-1'>
                            <InputForm currentField={currentField} setCurrentField={setCurrentField} setInvalidFields={setInvalidFields} invalidFields={invalidFields} lable={'Mật khẩu: '} value={payload.password} setValue={setPayload} keyPayload={'password'} type='password' />
                        </div>
                        {isRegister && <div className='flex-1'>
                            <InputForm currentField={currentField} setCurrentField={setCurrentField} setInvalidFields={setInvalidFields} invalidFields={invalidFields} lable={'Nhập lại mật khẩu: '} value={payload.repeatPassword} setValue={setPayload} keyPayload={'repeatPassword'} type='password' />
                        </div>}
                    </div>
                    {isRegister && <InputForm currentField={currentField} setCurrentField={setCurrentField} setInvalidFields={setInvalidFields} invalidFields={invalidFields} lable={'Email: '} value={payload.email} setValue={setPayload} keyPayload={'email'} />}
                </div>
                <Button
                    text={isRegister ? 'Đăng ký' : 'Đăng nhập'}
                    bgColor='bg-blue-800 rounded-full hover:bg-blue-400'
                    textColor='text-white font-medium'
                    fullWidth
                    onClick={handleSubmit}
                />
            </div>
            <div >
                {isRegister ?
                    <div className='mt-7 flex items-center justify-center'>
                        <small className='flex gap-1'>
                            <p>Bạn đã có tài khoản? </p>
                            <span
                                onClick={() => {
                                    setIsRegister(false)
                                    setPayload({
                                        sdt: '',
                                        password: '',
                                        username: '',
                                        email: '',
                                        repeatPassword: ''
                                    })
                                }}
                                className='text-blue-800 hover:text-blue-900 hover:font-semibold cursor-pointer'
                            >
                                Đăng nhập ngay
                            </span>
                        </small>
                    </div>
                    : <div className='mt-7 flex items-center justify-between'>
                        <small className='text-blue-800 hover:text-blue-900 hover:font-semibold cursor-pointer'>Bạn quên mật khẩu</small>
                        <small
                            onClick={() => {
                                setIsRegister(true)
                                setPayload({
                                    sdt: '',
                                    password: '',
                                    username: '',
                                    email: '',
                                    repeatPassword: ''
                                })
                            }}
                            className='text-blue-800 hover:text-blue-900 hover:font-semibold cursor-pointer'
                        >
                            Tạo tài khoản mới
                        </small>
                    </div>}
            </div>
        </div>
    );
}

export default Login;