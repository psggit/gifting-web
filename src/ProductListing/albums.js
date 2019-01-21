import React from 'react';
import moment from 'moment';
import LazyLoad from 'react-lazyload';


import './albums.scss'

export default (props) => {
console.log(props)
    function formatDate(date, format) {
        return moment(date).format(format);
    }

    function handleImageLoad(e) {
        e.target.setAttribute("class", "img-loaded")
    }

    return (
        <ul className="album">

            <li className="album-item">
                <a href={props.link} target="blank" className="link">
                    {/* <LazyLoad height={200} > */}
                        <div className="album-img">
                            <div className="placeholder-img"></div>
                            <img onLoad={handleImageLoad} src={props.image} alt={'itunes' + Math.random()} />
                        </div>
                        <h2>{props.id}</h2>
                    {/* </LazyLoad> */}
                </a>
            </li>

            <li className="title album-item">
                {/* <a href={props.link} target="blank" className="link">
                    {props.title.slice(0, 20)}..</a> */}
            </li>
            <li className="price album-item">Price:{props.price}</li>

            <li className="date album-item">Released:{formatDate(props.date, "MMM Do YY")}</li>
        </ul>
    )

}