import React from 'react'
import { useState, useEffect } from 'react'

import bgImg from './jinx.jpg'
import Table from '../../components/Table'
import { getPlayers } from '../../../api'
import { standardScore } from '../../../utils'

export default function Players() {
  // 选手信息
  const [players, setPlayers] = useState([])
  // 要展示的信息
  const [tableKeys, setTableKeys] = useState([])

  /**
   * 计算综合排名
   */
  const computeOverall = (players, keys) => {
    const scoresMap = new Map()
    // 遍历每一个选手的数据，如果是需要统计的数据则记录
    players.forEach((player) => {
      const eachKeys = Object.keys(player)
      eachKeys.forEach((key) => {
        if (keys.includes(key)) {
          if (!scoresMap.has(key)) {
            scoresMap.set(key, [player[key]])
          } else {
            scoresMap.set(key, [...scoresMap.get(key), player[key]])
          }
        }
      })
    })

    const standardScores = new Array(players.length).fill(0)
    scoresMap.forEach((scores, key) => {
      scores = standardScore(scores)
      scores.forEach((score, index) => {
        standardScores[index] += score
      })
    })

    standardScores.forEach((score, index) => {
      players[index].standardScore = score
    })

    // 默认按照综合排名排序
    players.sort((a, b) => {
      return b.standardScore - a.standardScore
    })

    return players
  }

  /**
   * 初始化选手信息
   */
  const initPlayers = () => {
    // 获取全部选手信息
    getPlayers().then((response) => {
      const { status, data } = response
      if (status === 200) {
        data.players.forEach((player) => {
          // 胜率
          player.winRate = player.win / player.gameTotal
          // 10 - 20 补刀差
          player.csDiffPerMinDeltas1020 = player.csDiffPerMinDeltas['10-20']
        })

        // 设置需要展示的数据的 key 值
        const keys = [
          'winRate',
          'dragonRate',
          'riftHeraldRate',
          'standardScore'
        ]

        // 设置需要计算标准分的 key 值
        const computeKeys = ['dragonRate', 'riftHeraldRate']
        setTableKeys(keys)

        //计算综合排名
        data.players = computeOverall(data.players, computeKeys)

        setPlayers(data.players)
      }
    })
  }

  useEffect(initPlayers, [])

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 w-full z-0">
        <img
          className="opacity-40 gradient-mask-b-0"
          src={bgImg}
          alt="background"
        />
      </div>
      <div className="relative px-24 pb-10 pt-12 max-w-screen-2xl mx-auto">
        <h2 className="text-bright-text text-3xl font-bold tracking-wide pb-10">
          选手数据
        </h2>
        <Table
          unsortedPlayers={players}
          tableKeys={tableKeys}
          defaultSort={{ tableKey: 'standardScore', sort: 'up' }}
        />
      </div>
    </div>
  )
}
