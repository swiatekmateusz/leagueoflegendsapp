export const accountReducer = (state,action)=>{
  switch (action.type) {
    case 'SET_PARAMS':
      return {...state,params: action.data}
    case 'SET_VERSION':
      return {...state,version: action.data}
    case 'SET_ACINFO':
        return {...state,accountInfo: action.data}
    case 'SET_LOADED':
      return {...state,loaded: action.data}
    default:
      return {...state}
  }
}