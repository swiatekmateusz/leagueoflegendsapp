import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios'
import { accountReducer } from './accountReducer.js'
export const AccountContext = createContext()

const AccountContextProvider = props => {

  const initialState = {
    accountInfo: {},
    version: "",
    loaded: false,
    params: {}
  }
  const [state, dispatch] = useReducer(accountReducer, initialState)

  useEffect(() => {
    dispatch({ type: 'SET_PARAMS', data: { nickname: props.params.nickname, region: props.params.region } })

    const getVersion = () => {
      axios.get('https://cors-anywhere.herokuapp.com/https://ddragon.leagueoflegends.com/api/versions.json', { headers: { "origin": "x-requested-with" } })
        .then(res => {
          dispatch({ type: 'SET_VERSION', data: res.data[0] })
        })
    }
    const getAccountInfo = () => {
      const { nickname, region } = props.params
      document.title = `${nickname.toUpperCase()} | ${region}`;
      const data = {
        "type": "summoner",
        "nickname": nickname,
        "region": region
      }

      axios.post('https://cors-anywhere.herokuapp.com/https://leagueoflegendsapp.netlify.com/.netlify/functions/getriotapi', data, { headers: { "origin": "x-requested-with", "Content-Type": "application/json", "Host": "localhost:3000" } })
        .then(res => {
          dispatch({ type: 'SET_ACINFO', data: res.data })
          dispatch({ type: 'SET_LOADED', data: true })
        })
    }
    getVersion()
    getAccountInfo()
  }, [props.params]);

  return (
    <AccountContext.Provider value={{ ...state }}>
      {props.children}
    </AccountContext.Provider>
  )
}

export default AccountContextProvider