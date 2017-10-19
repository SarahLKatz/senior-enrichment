// WORK ON VISIBILITY OF DROPDOWN - SEE BOOTSTRAP NAVBAR

import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar (props) {
  return (
    <nav className ="navbar navbar-default">
      <div className="container-fluid">
          <div className="navbar-brand">
            Margaret Hamilton Interplanetary Academy of JavaScript
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          {/*<div className="nav navbar-nav">
            <form id="campus-dropdown" name="select-campus" className="dropdown">
              <select name="campuses" onChange={props.chooseCampus}>
                <option>Select A Campus</option>
                {
                  props.campuses.map(campus => {
                    return (
                      <option key={campus.id} value={campus.id}>{campus.name}</option>
                    )
                  })
                }
              </select>
            </form>
          </div> */}
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/campuses">Campuses</Link></li>
              <li><Link to="/students">Students</Link></li>
            </ul>
          </div>
        </div>
    </nav>
  )
}