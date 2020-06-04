import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ImageForm from './ImageForm';

export const Images = props => {
  const {user, images} = props

  return (
    <div>
      <h3>Images</h3>
    { !!user.id && <ImageForm /> }
      <ul>
        {images.map(image => {
          return (
            <li key={image.id}>
              <a href={image.URL}>{image.id}</a>
              <br />
              uploaded by {image.user.email}
              <h2>Todo X</h2>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    images: state.images,
    user: state.user
  }
}

export default connect(mapState)(Images)
