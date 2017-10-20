import React from 'react';
import {Link} from 'react-router-dom';

export default function AllStudents (props) {
  let campusNames = {};
  props.campuses.map(campus => {
    campusNames[campus.id] = campus.name
  });
  let sortedStudents = props.students.sort((a,b) => +a.id - +b.id)
  return (
    <div className="container">
      <div className="col-xs-offset-11">
        <Link to="/students/add" className="btn"><span className="glyphicon glyphicon-plus"></span> Add Student</Link>
      </div>
      <h3 className="text-center">Student Directory</h3>
      <table className="table">
        <thead className="table-header">
          <tr>
            <td className="col-xs-1">#</td>
            <td className="col-xs-6">Name</td>
            <td className="col-xs-4">Campus</td>
            <td className="col-xs-1"> </td>
          </tr>
        </thead>
        <tbody>
        {
          sortedStudents.map(student => {
            return(
              <tr key={student.id}>
                <td>{student.id}</td>
                <td><Link to={`/students/${student.id}`}>{student.name}</Link></td>
                <td><Link to={`/campuses/${student.campusId}`}>{campusNames[student.campusId]}</Link></td>
                <td><button className="remove-student" id={student.id} onClick={props.deleteStudent}>X</button></td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}