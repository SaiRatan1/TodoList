import React from 'react'
import PropTypes from 'prop-types'

export default function header(props) {
    return (    
        <div>
            Enter name here
        </div>
    )
}

header.defaultProps = {
    name: "Rohan",
    // phone:
}

header.propTypes = {
    name: PropTypes.string,
    phone: PropTypes.number
}
