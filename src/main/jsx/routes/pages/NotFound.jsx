import React from "react";
import {NavLink} from "react-router-dom";
const NotFound =()=> {
  return (
    <div>
      <h1>Not Found</h1>
      <p>Sorry...ㅜㅜ</p>

      <NavLink to ="/">Come back Home</NavLink>

    </div>
  );
}

export default NotFound;
