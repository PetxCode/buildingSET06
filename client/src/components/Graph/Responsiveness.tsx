import React from 'react'
import { useMediaQuery } from 'react-responsive'

export const Responsiveness = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1000px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })

    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    return <div>
        <h1>Device Test!</h1>
        <br />
        {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
        <br />

        {isBigScreen && <p>You  have a huge screen</p>}
        <br />

        <br />
        {isTabletOrMobile && <p>You are a tablet or mobile phone</p>}

        <p>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</p>
        {isRetina && <p>You are retina</p>}
    </div>
}