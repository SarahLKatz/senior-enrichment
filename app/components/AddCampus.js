import React from 'react';
import { Redirect } from 'react-router-dom';

export default function AddCampus (props) {
  if (props.redirect) {
    return <Redirect from='/campuses/add' to='/campuses' />
  } else {
    return (
      <div className="container">
        <div className="col-xs-6 col-xs-offset-3">
          <h3 className="text-center">Add A New Campus</h3>
          <form id="add-campus" onSubmit={props.addCampus}>
            <div className="form-group row">
              <label className="col-xs-4">Campus Name:</label>
              <div className="col-xs-5">
                <input name="name" type="text"></input>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-xs-4">Picture:</label>
              <div className="col-xs-5">
                <input name="pictureUrl" type="text"></input>
              </div>
            </div>
            
            <div className="form-group row">
              <label className="col-xs-4">Address:</label>
              <div className="col-xs-5">
                <input name="address" type="text"></input>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-xs-4">Contact Email:</label>
              <div className="col-xs-5">
                <input name="email" type="text"></input>
              </div>
            </div>

            <div className="form-group row">
              <button className="col-xs-offset-4 btn btn-submit">Submit Your Campus</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}