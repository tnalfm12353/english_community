import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
const Home = () =>{
    return(
        <>
        <h1>
            Home
        </h1>
        <Link to={"/Profile/"+2}>ggg</Link>
        </>
    );
}

export default Home;