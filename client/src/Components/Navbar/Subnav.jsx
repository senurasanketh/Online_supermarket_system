import React from "react";
import "../../Css/subnav.css";

function Subnav() {
  return (
    <div className="snavbar">
      <ul>
        <li>
          <a className="snav" href="/">
            Home
          </a>
        </li>
        <li>
          <a className="snav" href="/Baby Products">
            Baby Product
          </a>
        </li>
        <li>
          <a className="snav" href="/Diary">
            Diary
          </a>
        </li>
        <li>
          <a className="snav" href="/Beverages">
            Beverages
          </a>
        </li>
        <li>
          <a className="snav" href="/Food Cupboard">
            Food Cupboard
          </a>
        </li>
        <li>
          <a className="snav" href="/House Hold">
            House Hold
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Subnav;
