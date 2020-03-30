import React from 'react'

export default function Hero({children,hero}) {
    return (
        <header className={hero}>
            {children}
        </header>
    )
}


// if parents pass data to prop hero, it will overwite defaultprop
Hero.defaultProps={
    hero: "defaultHero",
};