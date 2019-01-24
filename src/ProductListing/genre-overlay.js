import React from "react"
import "./genre-overlay.scss"
import  Icon from "Components/icon"
import GenreItem from "Components/GenreItem"

function GenreOverlay({ shouldMountGenres, closeGenres }) {
  return (
    <div className={`overlay animated ${shouldMountGenres ? "active fadeIn" : "inactive fadeOut"}`}>
      <div className={`genre--container animated ${shouldMountGenres ? "fadeInUp" : "fadeOutDown"}`}>
        <div className="header">
          <p className="os s2">Select favourite drink</p>
          <span onClick={closeGenres}>
            <Icon name="crossBlack" />
          </span>
        </div>

        <div className="flex-grid">
          {
            [1, 2, 3, 4, 5, 6, 7].map((item, i) => (
              <div className="col" key={i}>
                <GenreItem />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default GenreOverlay