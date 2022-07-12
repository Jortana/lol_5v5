import React, { useEffect, useState } from 'react'
import bgImg from './jinx.jpg'

import { getMatchStatus } from '../../../api'
import MatchTable from '../../components/MatchTable'

export default function Match() {
  const [page, setPage] = useState(1)
  const [limit] = useState(6)
  const [matches, setMatches] = useState([])
  const [total, setTotal] = useState(0)
  const [lastPage, setLastPage] = useState(1)
  const [sort, setSort] = useState({ key: 'winRate', sort: 'up' })
  // 0 代表全部
  const [size, setSize] = useState(0)

  useEffect(() => {
    const reverse = sort.sort === 'up' ? false : true
    getMatchStatus(page, limit, sort.key, reverse, size).then((response) => {
      const { code, data } = response.data
      if (code === 200) {
        setTotal(data.total)
        setMatches([...data.matches])
        setLastPage(Math.ceil(total / limit))
      }
    })
  }, [page, limit, total, sort, size])

  const changeSortHandler = (key, sort) => {
    setSort({ key, sort })
    setPage(1)
  }

  // 切换队伍大小的回调
  const sizeChangeHandler = (size) => {
    return () => {
      setSize(size)
      setPage(1)
      setSort({ key: 'winRate', sort: 'up' })
    }
  }

  // 更改页数的回调
  const pageChangeHandler = (page) => {
    setPage(page)
  }

  return (
    <div className="relative h-screen">
      <div className="absolute left-0 top-0 w-full z-0">
        <img
          className="opacity-40 gradient-mask-b-0"
          src={bgImg}
          alt="background"
        />
      </div>
      <div className="relative px-24 pb-10 pt-12 max-w-screen-2xl h-full mx-auto flex flex-col">
        <h2 className="text-bright-text text-3xl font-bold tracking-wide pb-10">
          匹配数据
        </h2>
        <div className="mb-3">
          <div className="btn-group">
            <input
              type="radio"
              name="options"
              data-title="全部"
              className="btn btn-xs"
              defaultChecked
              onClick={sizeChangeHandler(0)}
            />
            <input
              type="radio"
              name="options"
              data-title="双人"
              className="btn btn-xs"
              onClick={sizeChangeHandler(2)}
            />
            <input
              type="radio"
              name="options"
              data-title="三人"
              className="btn btn-xs"
              onClick={sizeChangeHandler(3)}
            />
            <input
              type="radio"
              name="options"
              data-title="四人"
              className="btn btn-xs"
              onClick={sizeChangeHandler(4)}
            />
            <input
              type="radio"
              name="options"
              data-title="五人"
              className="btn btn-xs"
              disabled
              onClick={sizeChangeHandler(5)}
            />
          </div>
        </div>
        <MatchTable
          matches={matches}
          offset={(page - 1) * limit}
          sort={sort}
          changeSort={changeSortHandler}
        />
        <div className="flex mt-5 flex-1 justify-center items-center">
          <div className="btn-group">
            <button
              className="btn"
              onClick={() => {
                pageChangeHandler(1)
              }}
            >
              1
            </button>
            <button
              className="btn"
              disabled={page === 1}
              onClick={() => {
                pageChangeHandler(page - 1)
              }}
            >
              «
            </button>
            <button className="btn no-animation p-0 border-none">
              <select
                className="select select-ghost border-none bg-neutral outline-none hover:bg-neutral-focus"
                onChange={(e) => {
                  pageChangeHandler(e.target.value)
                }}
                value={page}
              >
                {new Array(lastPage).fill(0).map((number, index) => {
                  return <option key={index}>{index + 1}</option>
                })}
              </select>
            </button>
            <button
              className="btn"
              disabled={page === lastPage}
              onClick={() => {
                pageChangeHandler(page + 1)
              }}
            >
              »
            </button>
            <button
              className="btn"
              onClick={() => {
                pageChangeHandler(lastPage)
              }}
            >
              {lastPage}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
