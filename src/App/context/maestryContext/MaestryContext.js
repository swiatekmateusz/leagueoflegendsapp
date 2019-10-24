import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios'
import { maestryReducer } from './maestryReducer.js'

import { AccountContext } from '../accountContext/AccountContext'
export const MaestryContext = createContext()

const MaestryContextProvider = props => {
  const { params, accountInfo, version } = useContext(AccountContext)
  const initialState = {
    maestryInfo: "",
    maestryDisplay: "",
    tagDisplay: "All"
  }

  const [state, dispatch] = useReducer(maestryReducer, initialState)

  const tags = [
    "All",
    "Assassin",
    "Fighter",
    "Mage",
    "Marksman",
    "Support",
    "Tank",
  ]

  const handleTagClick = tagName => {
    dispatch({ type: "SET_TAG_DISPLAY", data: tagName })
    setMestryDisplay(tagName)
  }

  const setMestryDisplay = tagname => {
    if (tagname === "All") {
      dispatch({ type: "SET_MAESTRY_DISPLAY", data: state.maestryInfo.slice(0, 5) })
    } else {
      dispatch({ type: "SET_MAESTRY_DISPLAY", data: state.maestryInfo.filter(item => item.tags[0] === tagname || item.tags[1] === tagname).slice(0, 5) })
    }
  }

  useEffect(() => {
    const changeMaestryInfo = allMaestry => {
      let championsInfo = ""
      axios.get(`https://cors-anywhere.herokuapp.com/http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`, { headers: { "origin": "x-requested-with" } })
        .then(res => {
          const championsObj = res.data.data
          championsInfo = new Array(Object.keys(championsObj).map(i => championsObj[i]))[0]
          allMaestry.forEach(item => {
            for (let i = 0; i < championsInfo.length; i++) {
              if (`${item.championId}` === championsInfo[i].key) {
                item.championId = championsInfo[i].id
                item.tags = championsInfo[i].tags
                break
              }
            }
          })
          dispatch({ type: "SET_MAESTRY_INFO", data: allMaestry })
          setMestryDisplay("All")
        })
    }

    const getData = () => {
      const data = {
        "type": "maestry",
        "region": params.region,
        "summonerID": accountInfo.id
      }
      axios.post('https://cors-anywhere.herokuapp.com/https://leagueoflegendsapp.netlify.com/.netlify/functions/getriotapi', data, { headers: { "origin": "x-requested-with" } })
        .then(res => {
          changeMaestryInfo(res.data)
        })
    }

    getData()
  }, []);


  return (
    <MaestryContext.Provider value={{ ...state, tags, handleTagClick }}>
      {props.children}
    </MaestryContext.Provider>
  )
}

export default MaestryContextProvider