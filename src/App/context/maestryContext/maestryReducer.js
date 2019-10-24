export const maestryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TAG_DISPLAY':
      return { ...state, tagDisplay: action.data }
    case 'SET_MAESTRY_DISPLAY':
      return { ...state, maestryDisplay: action.data }
    case 'SET_MAESTRY_INFO':
      return { ...state, maestryInfo: action.data }
    default:
      return { ...state }
  }
}