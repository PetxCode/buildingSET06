import React from 'react'
import styled from 'styled-components'

const Just = () => {
    return (
        <div>
            <Container>
                <Circle />
            </Container>
        </div>
    )
}

export default Just

const Circle = styled.div`
/* background: #000; */
fill: #78DCDC;
    display: block;
    width: 80px;
    height: 80px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 20px solid red;
    border-radius: 100%;

    border: 20px solid #FF6188;
    border-top: 20px solid #A9DC62;
    border-left: 20px solid #78DCDC;
    border-right: 20px solid #78DCDC; 

    border-left: 20px solid #78DCDC;
    border-bottom: 20px solid #78DCDC;

     /* border-left: 10px solid #FF6188;
    border-right: 10px solid #FF6188; */

`
const Container = styled.div``