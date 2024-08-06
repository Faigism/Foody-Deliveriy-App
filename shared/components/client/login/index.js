import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import Button from '../button'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { clientLogin, clientRegister } from '../../../services/axios'

const ClientLogin = () => {
  const [showLoginForm, setShowLoginForm] = useState(true)
  const { t } = useTranslation()
  const navigate = useRouter()

  const fullNameRef = useRef(null)
  const userNameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  let date = new Date()

  let tokenObj = JSON.parse(
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('tokenObj') ?? '{}'
      : '{}'
  )

  //Register
  const handleRegister = async (e) => {
    e.preventDefault()
    const fullName = fullNameRef.current?.value
    const userName = userNameRef.current?.value
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    const form = {
      fullName,
      userName,
      email,
      password,
    }

    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/

    if (!email || !password) {
      toast.warning('Please fill in all inputs!')
      return
    } else if (!emailRegex.test(email)) {
      toast.warning('Please enter a valid email address!')
      return
    }

    const res = await clientRegister(form)
    console.log(res)

    if (fullNameRef.current) fullNameRef.current.value = ''
    if (userNameRef.current) userNameRef.current.value = ''
    if (emailRef.current) emailRef.current.value = ''
    if (passwordRef.current) passwordRef.current.value = ''

    setShowLoginForm(true)
  }

  //Login
  const handleLogin = async (e) => {
    e.preventDefault()
    const fullName = fullNameRef.current?.value
    const userName = userNameRef.current?.value
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    const form = {
      fullName,
      userName,
      email,
      password,
    }

    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/

    if (!email || !password) {
      toast.warning('Please fill in all inputs!')
      return
    } else if (!emailRegex.test(email)) {
      toast.warning('Please enter a valid email address!')
      return
    }

    const res = await clientLogin(form)

    if (res?.status === 200) {
      localStorage.setItem('loginDate', date.getTime())
      toast.success('Logged in successfully!')
      tokenObj = {
        access_token: res.data.user.access_token,
        refresh_token: res.data.user.refresh_token,
      }
      localStorage.setItem('tokenObj', JSON.stringify(tokenObj))
      localStorage.setItem('userInfo', JSON.stringify(res?.data.user))
      setTimeout(() => {
        navigate.push('/')
      }, 700)
    } else {
      toast.dismiss()
      toast.warning('Username or login is incorrect')
    }
  }

  const switchForm = () => {
    setShowLoginForm(!showLoginForm)
  }

  return (
    <section className="flex flex-col mt-5 sm:mt-0 sm:flex-row justify-center bg-white sm:bg-lightRed mx-8 mb-8 ">
      <ToastContainer />
      <div className="bg-lightRed m-auto w-full sm:w-1/2">
        <Image
          className="w-4/5 m-auto"
          width={0}
          height={0}
          src={showLoginForm ? 'loginClient.svg' : 'registerClient.svg'}
          alt={showLoginForm ? 'loginClient.svg' : 'registerClient.svg'}
        />
      </div>
      <div className="w-full sm:w-1/2 flex flex-col gap-20 bg-white py-12 mx-auto">
        <div className="flex gap-16 mx-auto w-max">
          <button
            className={`text-3xl ${
              showLoginForm ? 'text-lightRed border-b-4' : 'text-grayText1'
            } font-medium`}
            onClick={() => switchForm()}
          >
            {t('login')}
          </button>
          <button
            className={`text-3xl ${
              showLoginForm ? 'text-grayText1' : 'text-lightRed border-b-4'
            } font-medium`}
            onClick={() => switchForm()}
          >
            {t('register')}
          </button>
        </div>

        {showLoginForm ? (
          <form className="flex flex-col w-full sm:w-4/5 mx-auto gap-8 items-center">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-xl font-medium text-grayText2">
                Email
              </label>
              <input
                className="p-4 rounded-md outline-none bg-[#ffe6e6]"
                type="email"
                ref={emailRef}
              />
            </div>

            <div className="flex flex-col gap-2 w-full mb-8">
              <label className="text-xl font-medium text-grayText2">
                {t('password')}
              </label>
              <input
                className=" p-4 rounded-md outline-none bg-[#ffe6e6]"
                type="password"
                ref={passwordRef}
              />
            </div>

            <Button
              onClick={handleLogin}
              className="w-full bg-lightRed text-xl font-medium p-4 rounded-md text-white hover:scale-95 hover:bg-mainRed transition-all duration-500"
              innerText={t('login')}
            />
          </form>
        ) : (
          <form className="flex flex-col w-full sm:w-4/5 mx-auto gap-8 items-center">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-xl font-medium text-grayText2">
                {t('fullname')}
              </label>
              <input
                ref={fullNameRef}
                className="p-4 rounded-md outline-none bg-[#ffe6e6]"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-xl font-medium text-grayText2">
                {t('username')}
              </label>
              <input
                ref={userNameRef}
                className=" p-4 rounded-md outline-none bg-[#ffe6e6]"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-xl font-medium text-grayText2">
                Email
              </label>
              <input
                ref={emailRef}
                className=" p-4 rounded-md outline-none bg-[#ffe6e6]"
                type="e-mail"
              />
            </div>

            <div className="flex flex-col gap-2 w-full mb-8">
              <label className="text-xl font-medium text-grayText2">
                {t('password')}
              </label>
              <input
                ref={passwordRef}
                className=" p-4 rounded-md outline-none bg-[#ffe6e6]"
                type="password"
              />
            </div>

            <Button
              onClick={handleRegister}
              className="w-full bg-lightRed text-xl font-medium p-4 rounded-md text-white hover:scale-95 hover:bg-mainRed transition-all duration-500"
              innerText={t('register')}
            />
          </form>
        )}
      </div>
    </section>
  )
}
export default ClientLogin
