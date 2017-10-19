import React from 'react';

export default function AddCampus (props) {
  return (
    <div className="container">
      <form id="add-campus" onSubmit={props.addCampus}>
        <div className="form-group row">
          <label className="col-xs-2">Campus Name:</label>
          <div className="col-xs-5">
            <input name="name" type="text"></input>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-2">Picture:</label>
          <div className="col-xs-5">
            <input name="pictureUrl" type="text"></input>
          </div>
        </div>
        
        <div className="form-group row">
          <label className="col-xs-2">Address:</label>
          <div className="col-xs-5">
            <input name="address" type="text"></input>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-2">Contact Email:</label>
          <div className="col-xs-5">
            <input name="email" type="text"></input>
          </div>
        </div>

        <div className="form-group row col-xs-offset-1">
          <button className="btn btn-submit">Submit Your Campus</button>
        </div>
      </form>
    </div>
  )
}