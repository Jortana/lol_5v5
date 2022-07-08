import React, { useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import toast, { Toaster } from 'react-hot-toast'

import { login } from '../../../api/user'
import { checkLogin } from '../../../utils'

export default function Login() {
  const [search] = useSearchParams()
  const navigate = useNavigate()

  // 如果已经登录就跳转到 pages 页面
  useEffect(() => {
    const { isLogin } = checkLogin()
    if (isLogin) {
      navigate('/')
    }
  }, [navigate])

  const usernameEl = useRef(null)
  const passwordEl = useRef(null)

  const keyUpHandler = (e) => {
    if (e.key === 'Enter') {
      loginHander()
    }
  }

  const loginHander = () => {
    const user = {
      username: usernameEl.current.value,
      password: passwordEl.current.value
    }
    if (usernameEl.current.value === '' || passwordEl.current.value === '') {
      toast.dismiss()
      toast.error('用户名和密码不能为空')
      return
    }

    login({ user }).then((response) => {
      const { code, data } = response.data
      if (code === 200) {
        toast.dismiss()
        localStorage.setItem('userInfo', JSON.stringify(data))
        const redirect = search.get('redirect')
        if (redirect === null) {
          navigate('/', { replace: true })
        } else {
          navigate(`${redirect}`, { replace: true })
        }
      } else {
        toast.dismiss()
        toast.error('用户名或密码错误')
      }
    })
  }

  return (
    <div className="h-screen w-screen bg-neutral flex justify-center items-center">
      <div>
        <Toaster
          toastOptions={{
            // Define default options
            className: '',
            style: {
              background: '#363636',
              color: '#fff'
            }
          }}
        />
      </div>
      <div className="card w-80 md:w-96 mx-auto bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">登录</h2>
          <div className="text-center">
            <div className="my-5" onKeyUp={keyUpHandler}>
              <div className="form-control mb-5 relative w-full min-w-[200px] h-11">
                <input
                  className="peer w-full h-full bg-transparent font-sans font-normal outline outline-0 focus:outline-0 disabled:border-0 transition-all border-b pt-4 pb-1.5 focus:border-blue-500"
                  ref={usernameEl}
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal leading-tight peer-focus:leading-tight peer-disabled:text-transparent transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] after:content[' '] after:block after:w-full after:absolute after:-bottom-1.5 left-0 after:border-b-2 after:scale-x-0 peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-blue-grey-500 peer-focus:text-blue-500 after:border-blue-500 peer-focus:after:border-blue-500">
                  用户名
                </label>
              </div>
              <div className="form-control mb-5 relative w-full min-w-[200px] h-11">
                <input
                  className="peer w-full h-full bg-transparent font-sans font-normal outline outline-0 focus:outline-0 disabled:border-0 transition-all border-b pt-4 pb-1.5 border-blue-grey-200 focus:border-blue-500"
                  type="password"
                  ref={passwordEl}
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal leading-tight peer-focus:leading-tight peer-disabled:text-transparent transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] after:content[' '] after:block after:w-full after:absolute after:-bottom-1.5 left-0 after:border-b-2 after:scale-x-0 peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-blue-grey-500 peer-focus:text-blue-500 after:border-blue-500 peer-focus:after:border-blue-500">
                  密码
                </label>
              </div>
            </div>
            <div className="form-control my-3" onClick={loginHander}>
              <button className="btn btn-primary btn-md">登录</button>
            </div>
          </div>

          <div className="card-actions justify-end">
            <div>Administor Only</div>
          </div>
        </div>
      </div>
    </div>
  )
}
