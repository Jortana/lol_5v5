import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="hero min-h-screen bg-[url('/public/imgs/galio_chicken.jpg')]">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">欢迎来到 ⚣ 数据库</h1>
          <p className="mb-5">
            本项目旨在分析选手的对局数据，帮助大家找到个人和队伍的优劣势，进而提升个人的水平和能力，促进赛区整体水平提升。
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate('/players')
            }}
          >
            开始使用
          </button>
        </div>
      </div>
    </div>
  )
}
