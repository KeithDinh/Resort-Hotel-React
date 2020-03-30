import React from 'react'
import {Link} from 'react-router-dom'
import defaultImg from '../images/room-1.jpeg'
import PropTypes from 'prop-types'

export default function Room({room}) {
    // console.log(room) //3 objects
    const {name, slug, images, price} = room;

    return (
        <article className="room">
            <div className="img-container">

                {/* if the 1st image is null, use default image */}
                <img src={images[0] || defaultImg} alt="single room"/>
                <div className="price-top">
                    <h6>${price}</h6>
                    <p>per night</p>
                </div>

                {/* backstick and dollar sign: template literals */}
                <Link to={`/rooms/${slug}`} className="btn-primary room-link"> 
                    Features
                </Link>
            </div>
            <p className="room-info">{name}</p>
        </article>
    )
}

// like a try catch to ensure the type of data in props
Room.propTypes = 
{
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired,
    })
}