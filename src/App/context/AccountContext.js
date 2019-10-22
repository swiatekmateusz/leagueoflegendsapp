import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'
export const AccountContext = createContext()

const AccountContextProvider = props => {
  const [accountInfo, setAcInfo] = useState({})
  const [version, setVersion] = useState("")
  const [loaded, setLoaded] = useState(false)
  const [params,setParams] = useState({})
  
  const getVersion = () => {
    axios.get('https://cors-anywhere.herokuapp.com/https://ddragon.leagueoflegends.com/api/versions.json', { headers: { "origin": "x-requested-with" } })
      .then(res => {
        setVersion(res.data[0])
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
    axios.post('https://cors-anywhere.herokuapp.com/https://leagueoflegendsapp.netlify.com/.netlify/functions/getriotapi', data, { headers: { "origin": "x-requested-with", "Content-Type": "application/json" } })
      .then(res => {
        setAcInfo(res.data)
        setLoaded(true)
      })
  }

  useEffect(() => {
    setParams({nickname: props.params.nickname, region: props.params.region})
  }, []);

  
  useEffect(() => {
    getVersion()
    getAccountInfo()
  }, [params]);

  return (
    <AccountContext.Provider value={{ accountInfo, version, loaded, params }}>
      {props.children}
    </AccountContext.Provider>
  )
}

export default AccountContextProvider