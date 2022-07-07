import React, { useEffect, useState } from 'react'
import { formatNum } from '../../../utils'

import sortNormal from './sortNormal.svg'
import sortUp from './sortUp.svg'
import sortDown from './sortDown.svg'

export default function Table(props) {
  const { unsortedPlayers, tableKeys, defaultSort } = props
  // reverse 指在排序时是否需要反过来（排序默认从大到小排序）
  const dataMap = {
    summonerName: { label: '召唤师', suffix: '', reverse: false },
    gameTotal: { label: '总场数', suffix: '', reverse: false },
    win: { label: '胜场', suffix: '', reverse: false },
    winRate: { label: '胜率', suffix: '%', reverse: false },
    goldEarnedDiff: { label: '对位经济差', suffix: '', reverse: false },
    kda: { label: 'KDA', suffix: '', reverse: false },
    kills: { label: '击杀数', suffix: '', reverse: false },
    deaths: { label: '死亡数', suffix: '', reverse: false },
    assistants: { label: '助攻数', suffix: '', reverse: false },
    conversion: { label: '伤害转换率', suffix: '%', reverse: false },
    visionScore: { label: '视野得分', suffix: '', reverse: false },
    dragonRate: { label: '小龙控制率', suffix: '%', reverse: false },
    riftHeraldRate: { label: '先锋控制率', suffix: '%', reverse: false },
    csDiffPerMinDeltas1020: {
      label: '对位补刀差 10-20min',
      suffix: '',
      reverse: false
    },
    avgRate: { label: '排名均值', suffix: '', reverse: true },
    standardScore: { label: '标准分之和', suffix: '', reverse: false }
  }

  // 根据哪个标签排序
  const [sort, setSort] = useState(defaultSort)
  const [players, setPlayers] = useState(unsortedPlayers)

  /**
   * 根据标签给 players 进行排序的回调
   */
  const sortHandler = (key) => {
    return () => {
      const unsorted = [...players]
      let finalSort
      if (sort.tableKey === key) {
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

      if (dataMap[key].reverse === true) {
        unsorted.reverse()
      }

      setSort({ tableKey: key, sort: finalSort })
      setPlayers([...unsorted])
    }
  }

  // useEffect(() => {
  //   const sortPlayers = () => {
  //     const key = sort.tableKey
  //     players.sort((a, b) => {
  //       return b[key] - a[key]
  //     })
  //     setPlayers(players)
  //   }
  // }, [])
  useEffect(() => {
    setPlayers([...unsortedPlayers])
  }, [unsortedPlayers])

  return (
    <div className="container mx-auto text-bright-text">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-800">
            <tr className="font-semibold text-stone-400">
              <th title="排名" className="px-3 py-6 cursor-default">
                排名
              </th>
              <th title="召唤师" className="px-3 py-6 cursor-default">
                召唤师
              </th>
              {/* 生成标签 */}
              {tableKeys.map((tableKey, index) => {
                const length = dataMap[tableKey].label.length
                return length <= 6 ? (
                  <th
                    title={dataMap[tableKey].label}
                    className="px-3 py-6"
                    key={index}
                  >
                    <div
                      className="flex justify-center items-center cursor-pointer"
                      onClick={sortHandler(tableKey)}
                    >
                      {dataMap[tableKey].label}
                      <img
                        className="ml-1"
                        src={
                          tableKey === sort.tableKey
                            ? sort.sort === 'up'
                              ? sortUp
                              : sortDown
                            : sortNormal
                        }
                        alt="sort"
                      />
                    </div>
                  </th>
                ) : (
                  <th
                    title={dataMap[tableKey].label}
                    className="px-3 py-6"
                    key={index}
                  >
                    <div
                      className="flex justify-center items-center cursor-pointer"
                      onClick={sortHandler(tableKey)}
                    >
                      <div>
                        <span className="block">
                          {dataMap[tableKey].label.split(' ')[0]}
                        </span>
                        <span className="block">
                          {dataMap[tableKey].label.split(' ')[1]}
                        </span>
                      </div>
                      <img
                        className="ml-1"
                        src={
                          tableKey === sort.tableKey
                            ? sort.sort === 'up'
                              ? sortUp
                              : sortDown
                            : sortNormal
                        }
                        alt="sort"
                      />
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => {
              return (
                <tr
                  className={
                    index % 2 === 0
                      ? 'text-center bg-slate-900'
                      : 'text-center bg-slate-800'
                  }
                  key={player._id}
                >
                  <td className="px-3 py-6">
                    <span>{index + 1}</span>
                  </td>
                  <td className="px-3 py-6">
                    <span>{player.summonerName}</span>
                  </td>
                  {tableKeys.map((tableKey) => {
                    const { suffix } = dataMap[tableKey]
                    let value =
                      suffix === '%'
                        ? formatNum(player[tableKey] * 100)
                        : formatNum(player[tableKey])
                    return (
                      <td className="px-3 py-6" key={tableKey}>
                        <span>{value + suffix}</span>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
