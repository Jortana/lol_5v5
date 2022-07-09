import React, { useEffect, useState, useRef } from 'react'

import toast, { Toaster } from 'react-hot-toast'

import { getLastTime, updateGames, getStatus, analyzeGames } from '../../../api'
// import galio from './galio.jpg'

export default function Update() {
  // 代表当前的 tab 是哪一个，0 代表更新数据页，1 代表数据详情页
  const [tab, setTab] = useState(0)
  // 存储库中最近游戏的时间
  const [lastTime, setLastTime] = useState(0)
  // 存储数据分析的情况
  const [status, setStatus] = useState(null)
  // 存储 loading 的情况
  const [loading, setLoading] = useState(false)
  const cookieEl = useRef(null)

  // 获取最近游戏时间
  const updateLastTime = () => {
    getLastTime()
      .then((response) => {
        const { code, data } = response.data
        if (code === 200) {
          setLastTime(data.lastTime)
        }
      })
      .catch()
  }

  // 获取分析情况
  const updateStatus = () => {
    getStatus()
      .then((response) => {
        const { code, data } = response.data
        if (code === 200) {
          setStatus({ ...data })
        }
      })
      .catch()
  }

  const updateData = () => {
    // 获取最近游戏时间
    updateLastTime()
    // 获取分析情况
    updateStatus()
  }

  useEffect(() => {
    // 获取最近游戏时间
    updateLastTime()
    // 获取分析情况
    updateStatus()
  }, [])

  // 处理更新数据的点击事件
  const updateHandler = () => {
    const cookie = cookieEl.current.value
    if (cookie.length === 0) {
      return
    }
    setLoading(true)
    updateGames({ cookie })
      .then((response) => {
        const { code, data } = response.data
        if (code === 200) {
          toast.dismiss()
          toast.success(data.message)
        } else {
          toast.dismiss()
          toast.error('服务器错误')
        }
        setLoading(false)
        // 更新数据
        updateData()
      })
      .catch()
  }

  // 处理分析数据的点击事件
  const analyzeHandler = () => {
    setLoading(true)
    analyzeGames()
      .then((response) => {
        const { code, data } = response.data
        if (code === 200) {
          toast.dismiss()
          toast.success(data.message)
        } else {
          toast.dismiss()
          toast.error('服务器错误')
        }
        setLoading(false)
        updateStatus()
      })
      .catch()
  }

  // 根据当前 tab 的值返回不同的 dom
  const showTab = () => {
    switch (tab) {
      case 0:
        return (
          <div>
            <div className="py-6 h-32">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Cookie</span>
                </label>
                <input
                  type="text"
                  placeholder="Cookie"
                  className="input input-bordered"
                  ref={cookieEl}
                />
              </div>
            </div>
            <button
              className={`btn btn-primary w-full mt-2 ${
                loading ? 'loading' : ''
              }`}
              onClick={updateHandler}
            >
              {loading ? '更新中' : '更新'}
            </button>
            <div className="mt-3">
              最近游戏时间：{new Date(lastTime).toDateString()}
            </div>
          </div>
        )
      case 1:
        return (
          <div>
            <div className="flex h-32 py-4 justify-center">
              <div className="flex flex-col justify-center items-center">
                <span className="text-slate-600">总游戏场数</span>
                <span className="text-5xl font-bold text-primary mt-2">
                  {status.total} 场
                </span>
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="flex flex-col justify-center items-center">
                <span className="text-slate-600">已分析场数</span>
                <span className="text-5xl font-bold text-secondary mt-2">
                  {status.analyzed} 场
                </span>
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="flex flex-col justify-center items-center">
                <span className="text-slate-600">待分析场数</span>
                <span className="text-5xl font-bold text-neutral-content mt-2">
                  {status.others} 场
                </span>
              </div>
            </div>
            <button
              className={`btn btn-primary w-full mt-2 ${
                loading ? 'loading' : ''
              }`}
              onClick={analyzeHandler}
            >
              {loading ? '分析中' : '分析'}
            </button>
            <div className="mt-3">
              最近游戏时间：{new Date(lastTime).toDateString()}
            </div>
          </div>
        )
      default:
        return
    }
  }

  // 切换 tab
  const changeTab = (change) => {
    if (change === tab) {
      return
    }

    if (loading) {
      toast.dismiss()
      toast.loading('请等待数据处理完成')
      return
    }

    setTab(change)
  }

  return (
    <div className="hero min-h-screen w-9/12 mx-auto">
      <Toaster
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff'
          },
          duration: 1500
        }}
      />
      <div className="hero-content flex-col lg:flex-row w-full">
        <div className="h-96 w-96 bg-[url('/public/imgs/galio_update.jpg')] bg-cover rounded-lg shadow-2xl"></div>
        {/* <img
          src={galio}
          alt="hero-img"
          className="h-[500px] rounded-lg shadow-2xl"
        /> */}
        <div className="ml-2 card shadow-2xl bg-base-100 w-full">
          <div className="card-body h-[330px] flex justify-between">
            <div className="flex">
              <h1
                className={`text-5xl font-bold cursor-pointer transition-all ${
                  tab !== 0 ? 'text-neutral' : ''
                }`}
                onClick={() => {
                  changeTab(0)
                }}
              >
                更新数据
              </h1>
              <div className="divider divider-horizontal"></div>
              <h1
                className={`text-5xl font-bold cursor-pointer transition-all ${
                  tab !== 1 ? 'text-neutral' : ''
                }`}
                onClick={() => {
                  changeTab(1)
                }}
              >
                数据分析
              </h1>
            </div>
            {showTab()}
          </div>
        </div>
      </div>
    </div>
  )
}
