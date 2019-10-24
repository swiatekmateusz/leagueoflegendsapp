import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios'
import { rankReducer } from './rankReducer.js'

import { AccountContext } from '../accountContext/AccountContext'
export const RankContext = createContext()

const RankContextProvider = props => {
  const { params, accountInfo } = useContext(AccountContext)
  const initialState = {
    data: false,
    solo: {
      queueType: 'Ranked Solo 5vs5',
    },
    tft: {
      queueType: 'Ranked TFT',
    },
    flex: {
      queueType: 'Ranked Flex 5vs5',
    },
    chartOptions: {}
  }

  const [state, dispatch] = useReducer(rankReducer, initialState)

  const setRanks = data => {
    data.forEach(item => {
      if (item.queueType === "RANKED_SOLO_5x5") {
        dispatch({
          type: "SET_RANK_SOLO", data: {
            queueType: 'Ranked Solo 5vs5',
            tier: item.tier,
            rank: item.rank,
            points: item.leaguePoints,
            miniSeries: item.miniSeries,
            wins: item.wins,
            lossess: item.losses
          }
        })
      } else if (item.queueType === "RANKED_TFT") {
        dispatch({
          type: "SET_RANK_TFT", data: {
            queueType: 'Ranked TFT',
            tier: item.tier,
            rank: item.rank,
            points: item.leaguePoints,
            miniSeries: item.miniSeries,
            wins: item.wins,
            lossess: item.losses
          }
        })
      } else if (item.queueType === "RANKED_FLEX_SR") {
        dispatch({
          type: "SET_RANK_FLEX", data: {
            queueType: 'Ranked FLEX',
            tier: item.tier,
            rank: item.rank,
            points: item.leaguePoints,
            miniSeries: item.miniSeries,
            wins: item.wins,
            lossess: item.losses
          }
        })
      }
    })
    dispatch({ type: "SET_DATA", data: true })
  }

  useEffect(() => {
    const getData = () => {
      const data = {
        "type": "rank",
        "region": params.region,
        "summonerID": accountInfo.id
      }
      axios.post('https://cors-anywhere.herokuapp.com/https://leagueoflegendsapp.netlify.com/.netlify/functions/getriotapi', data, { headers: { "origin": "x-requested-with" } })
        .then(res => {
          setRanks(res.data)
        })
    }
    getData()
  }, [params, accountInfo]);

  useEffect(() => {
    const updateSeries = () => {
      dispatch({
        type: "SET_SERIES",
        data: {
          wins: [state.solo.wins, state.tft.wins, state.flex.wins],
          lossess: [state.solo.lossess, state.tft.lossess, state.flex.lossess]
        }
      })
    }
    updateSeries()
  }, [state.solo.wins, state.tft.wins, state.flex.wins, state.solo.lossess, state.tft.lossess, state.flex.lossess]);
  return (
    <RankContext.Provider value={{ ...state }}>
      {props.children}
    </RankContext.Provider>
  )
}

export default RankContextProvider