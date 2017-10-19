import React from 'react';

export default function AddStudent (props) {
  return (
    <div className="container">
      <form id="add-campus" onSubmit={props.addStudent}>
        <div className="form-group row">
          <label className="col-xs-2">Student Name:</label>
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
          <label className="col-xs-2">Email:</label>
          <div className="col-xs-5">
            <input name="email" type="text"></input>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-2">Campus:</label>
          <div className="col-xs-5">
            <select name="campusId">
              <option>Choose a Campus</option>
              {
                props.campuses.map(campus => {
                  return (
                    <option key={campus.id} value={campus.id}>{campus.name}</option>
                  )
                })
              }
            </select>
          </div>
        </div>

        <div className="form-group row col-xs-offset-1">
          <button className="btn btn-submit">Submit Your Student</button>
        </div>
      </form>
    </div>
  )
}