import React from 'react';
import { Redirect } from 'react-router-dom';

export default function AddStudent (props) {
  if (props.redirect) {
    return <Redirect from='/students/add' to='/students' />
  } else {
    return (
      <div className="container">
        <div className="col-xs-6 col-xs-offset-3">
            <h3 className="text-center">Add A New Student</h3>
          <form id="add-student" onSubmit={props.addStudent}>
            <div className="form-group row">
              <label className="col-xs-4">Student Name:</label>
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
              <label className="col-xs-4">Email:</label>
              <div className="col-xs-5">
                <input name="email" type="text"></input>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-xs-4">Campus:</label>
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

            <div className="form-group row">
              <button className="btn btn-submit col-xs-offset-4">Submit Your Student</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}