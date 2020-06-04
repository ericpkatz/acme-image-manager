import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_IMAGES = 'SET_IMAGES'
const ADD_IMAGE = 'ADD_IMAGE'
const DESTROY_IMAGE = 'DESTROY_IMAGE'

const setImages = images => ({type: SET_IMAGES, images})
const addImage = image => ({type: ADD_IMAGE, image})
const _destroyImage = image => ({type: DESTROY_IMAGE, image})

/**
 * THUNK CREATORS
 */
export const getImages = () => async dispatch => {
  const res = await axios.get('/api/images')
  dispatch(setImages(res.data))
}

export const createImage = (image) => async (dispatch, getState) => {

  const res = await axios.post('/api/images', {...image, userId: getState().user.id })
  dispatch(addImage(res.data))
}

export const destroyImage = (image) => async (dispatch) => {

  //const res = await axios.delete(`/api/images/${image.id}`)
  dispatch(_destroyImage(image))
}


/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case SET_IMAGES:
      return action.images
    case ADD_IMAGE:
      return [...state, action.image]
    case DESTROY_IMAGE:
      return state.filter( image => image.id !== action.image.id) 
    default:
      return state
  }
}
