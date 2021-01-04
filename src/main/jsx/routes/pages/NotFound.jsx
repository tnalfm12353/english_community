import React from "react";
import {Link} from "react-router-dom";
const NotFound =()=> {
  return (
    <div>
      <h1>Not Found</h1>
      <p>Sorry...ㅜㅜ</p>

      <Link to ="/">Come back Home</Link>

    </div>
  );
}

export default NotFound;
