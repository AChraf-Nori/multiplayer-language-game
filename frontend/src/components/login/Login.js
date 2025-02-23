import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { fetchLogin } from "../../redux/AuthReducer"


const Login = () => {

    const [playerInfo, setPlayerInfo] = useState({
        email: '', password: ''
    })
    const [isLoginDisabled, setIsLoginDisabled] = useState(true)
    const [errorMsg, setErrorMsg] = useState({errorNo: 0, msg: ''})
    const [isLogin, setIsLogin] = useState(false)

  

    const handleChange = (e) => {
        setPlayerInfo({...playerInfo, [e.target.name]: e.target.value})
    }  

    const handleLoginClick = async (e) => {
        e.preventDefault()
        if(!/^(?=.{8,20}@)[a-zA-Z][a-zA-Z0-9]*(_[a-zA-Z0-9]+)?[a-zA-Z0-9]*@[a-zA-Z]{3,8}(?:-[a-zA-Z]+)?\.[a-zA-Z]{2,5}$/.test(playerInfo.email)) {
            setErrorMsg({errorNo: 1, msg: 'invalid email.'})
        }  else if(!/^[\W\w]{8,20}$/.test(playerInfo.password)) {
            if(playerInfo.password.length < 8) {
                setErrorMsg({errorNo: 2, msg: 'at least 8 letters.'})
            } else if(playerInfo.password.length > 20) {
                setErrorMsg({errorNo: 2, msg: 'at most 20 letters.'})
            }
        } else {
            setIsLoginDisabled(true)
            setErrorMsg({errorNo: 0, msg: ''})
            setIsLogin(true)
            await dispatch(fetchLogin(playerInfo))
            
        }
    }

    const resp = useSelector(i => i.auth.resp)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(playerInfo.email != '' && playerInfo.password != '') {
            setIsLoginDisabled(false)
        }
    }, [playerInfo])

    useEffect(() => {
        if(isLogin) {
            if(resp.status === 422) {
                if(resp.error.email) {
                    setErrorMsg({errorNo: 1, msg: resp.error.email})
                } else if (resp.status.password) {
                    setErrorMsg({errorNo: 2, msg: resp.error.password})
                } else {
                    console.log('something went wrong!! try again')
                }
                setIsLoginDisabled(false)
                setIsLogin(false)
            }
            if(resp.status === 401) {
                setErrorMsg({errorNo: 3, msg: 'Invalid Credentials'})
            }
        }

        
    }, [resp])


    return (
        <section className="bg-[#1e1e1e] min-h-screen flex items-center justify-center">
            {/* <!-- login container --> */}
            <div className="bg-[#252526] flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                {/* <!-- form --> */}
                <div className="md:w-1/2 px-8 md:px-16">
                <h2 className="text-gray-200 font-bold text-2xl text-[#002D74]">Login</h2>
                <p className="text-xs mt-4 text-gray-200">If you are already a member, easily log in</p>
                { errorMsg.errorNo === 3 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }


                <form action="" className="flex flex-col">
                    <div className="mt-8 mb-2">
                        <input onChange={handleChange} className="bg-[#3e3e42] text-white p-2 rounded-xl border outline-none" type="email" name="email" placeholder="Email" />
                        <br />
                        { errorMsg.errorNo === 1 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }
                    </div>
                    <div className="">
                        <div className="relative">
                            <input onChange={handleChange} className="bg-[#3e3e42] text-white p-2 rounded-xl border w-full outline-none" type="password" name="password" placeholder="Password" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                        </div>
                        <br />
                        { errorMsg.errorNo === 2 && <span className='text-2xs text-red-500'>*{errorMsg.msg}</span> }

                    </div>
                    
                    <button onClick={handleLoginClick} className="bg-[#007acc] rounded-xl text-white py-2 hover:scale-105 duration-300">
                        Login
                    </button>
                </form>

                <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                    <hr className="border-gray-400" />
                    <p className="text-center text-sm">OR</p>
                    <hr className="border-gray-400" />
                </div>

                <button className="text-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
                    <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    Login with Google
                </button>

                <div className="mt-5 text-xs border-b border-gray-400 py-4 ">
                    <a className="text-gray-300 hover:text-white" href="#">Forgot your password?</a>
                </div>

                <div className="mt-3 text-xs flex justify-between items-center ">
                    <p className="text-gray-300">Don't have an account?</p>
                    <Link to='/register'>
                        <button className="text-white py-2 px-5 border rounded-xl hover:scale-110 duration-300">
                            Register
                        </button>
                    </Link>
                </div>
                </div>

                {/* <!-- image --> */}
                <div className="md:block hidden w-1/2">
                <img className="rounded-2xl" src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" />
                </div>
            </div>
        </section>
    )
}

export default Login