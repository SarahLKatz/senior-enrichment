import React from 'react';
import {Link} from 'react-router-dom';

export default function AllCampuses(props) {
  return (
    <div className="container-fluid">
    <div className="col-xs-10">
      {
        props.campuses.map(campus => {
          return(
            <div key={campus.id} className="col-xs-3 campus">
              <h3><Link to={`/campuses/${campus.id}`}>{campus.name}</Link></h3>
              <img src={campus.pictureUrl} />
            </div>
          )
        })
      }
    </div>
    <div>
      <Link to="/campuses/add" className="btn"><span className="glyphicon glyphicon-plus"></span> Add Campus</Link>
    </div>
    </div>
  )
}