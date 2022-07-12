import React, { useEffect, useState } from 'react'

import sortNormal from '../../svgs/sortNormal.svg'
import sortUp from '../../svgs/sortUp.svg'
import sortDown from '../../svgs/sortDown.svg'

import { formatNum } from '../../../utils'

export default function MatchTable(props) {
  const { changeSort } = props
  // 根据哪个标签排序
  const [sort, setSort] = useState({})
  const [matches, setMatches] = useState([])
  const [offset, setOffset] = useState(0)

  const avatarUrl = `https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/usericon`

  useEffect(() => {
    setMatches([...props.matches])
    setOffset(props.offset)
    setSort(props.sort)
  }, [props])

  /**
   * 根据标签给 players 进行排序的回调
   */
  const sortHandler = (key) => {
    return () => {
      const unsorted = [...matches]
      let finalSort
      if (sort.key === key) {
        // 如果排序的 key 就是传入的 key 则需要反着排序
        finalSort = sort.sort === 'up' ? 'down' : 'up'
      } else {
        // 如果不是，则默认升序排列
        finalSort = 'up'
      }

      if (finalSort === 'up') {
        unsorted.sort((a, b) => b[key] - a[key])
      } else {
        unsorted.sort((a, b) => a[key] - b[key])
      }

      changeSort(key, finalSort)
      setSort({ key, sort: finalSort })
    }
  }

  return (
    <div className="container mx-auto text-bright-text shadow-2xl min-h-[704px]">
      <div className="overflow-x-auto h-full overflow-hidden">
        <table className="w-full table table-zebra text-center">
          <thead>
            <tr className="font-semibold text-stone-400 text-base">
              <th title="排名" className="px-6 py-5 cursor-default text-base">
                排名
              </th>
              <th
                title="召唤师组合"
                className="px-6 py-5 cursor-default text-base"
              >
                召唤师组合
              </th>
              <th title="总场数" className="px-6 py-5 cursor-default text-base">
                <div
                  className="flex justify-center items-center cursor-pointer"
                  onClick={sortHandler('total')}
                >
                  总场数
                  <img
                    className="ml-1"
                    src={
                      sort.key === 'total'
                        ? sort.sort === 'up'
                          ? sortDown
                          : sortUp
                        : sortNormal
                    }
                    alt="sort"
                  />
                </div>
              </th>
              <th title="胜场" className="px-6 py-5 cursor-default text-base">
                <div
                  className="flex justify-center items-center cursor-pointer"
                  onClick={sortHandler('win')}
                >
                  胜场
                  <img
                    className="ml-1"
                    src={
                      sort.key === 'win'
                        ? sort.sort === 'up'
                          ? sortDown
                          : sortUp
                        : sortNormal
                    }
                    alt="sort"
                  />
                </div>
              </th>
              <th title="胜率" className="px-6 py-5 cursor-default text-base">
                <div
                  className="flex justify-center items-center cursor-pointer"
                  onClick={sortHandler('winRate')}
                >
                  胜率
                  <img
                    className="ml-1"
                    src={
                      sort.key === 'winRate'
                        ? sort.sort === 'up'
                          ? sortDown
                          : sortUp
                        : sortNormal
                    }
                    alt="sort"
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => {
              return (
                <tr key={match._id}>
                  <td className="px-6 py-5">
                    <span>{offset + index + 1}</span>
                  </td>
                  <td className="px-6 py-5 flex flex-col justify-center items-center">
                    <div className="flex justify-center items-center min-w-[500px]">
                      {match.playersInfo.map((player, index) => {
                        return (
                          <div
                            className="avatar flex-col justify-center mr-4"
                            key={index}
                          >
                            <div className="w-10 rounded-full mx-auto">
                              <img
                                src={`${avatarUrl}/${player.profileIconId}.png`}
                                alt="召唤师头像"
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex justify-center items-center flex-grow mt-1">
                      {match.playersInfo.map((player, index) => {
                        return (
                          <div
                            className="flex justify-center items-center"
                            key={index}
                          >
                            <div className="flex-col justify-center">
                              {player.summonerName}
                            </div>
                            {index + 1 !== match.playersInfo.length ? (
                              <div className="mx-2 text-neutral-focus"> | </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span>{match.total}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span>{match.win}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span>{formatNum(match.winRate * 100)}%</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
