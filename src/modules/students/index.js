import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStudents, getCollege, getStudentById, updateStudent,createStudent,deleteStudent } from "./studentSlice";
import "./index.css";

export function Student() {
  const dispatch = useDispatch();
  const { students, colleges, student, isLoading, errorMessage } = useSelector(
    (state) => state.studentReducer
  );
  const [inputs, setInputs] = useState({});
  const [mode, setMode] = useState('view');
  const [popupState, setPopupState] = useState(false);

  useEffect(() => {
    console.log("<><><>Students");
    dispatch(getStudents());
  }, [dispatch]);
  useEffect(() => {
    setInputs(student);
  }, [student]);
  const loadStudent = (selVal, mode) => {
    console.log("--------",mode)
    setMode(mode);
    setPopupState(true);
    if(mode!=='new'){
        dispatch(getStudentById(selVal));
    }
  };
  const delteStudentById =(id)=>{
    dispatch(deleteStudent(id));
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("================= ",name, value)
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("--------------->", inputs);
    if(mode==='edit'){
        dispatch(updateStudent(inputs));
    } else if(mode==='new'){
        dispatch(createStudent(inputs));
    }
    setPopupState(false);
  };
  return (
    <div className="comp-container">
      <div className="container-style">
        <div className="main-heading">College List:</div> 
        <ul>
          {colleges &&
            colleges.map((coll) => {
              return <li key={coll.id}>{coll.name}</li>;
            })}
        </ul>
      </div>
      {isLoading && (
        <div className="overlay">
          <div className="loader-container align-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      {errorMessage && (
        <span className="main-heading">Failed to load Students</span>
      )}
      <div className="container-style">
        {!isLoading && <div style={{display:"flex",justifyContent: "space-between"}}><div className="main-heading">Student List</div> <div className="main-heading"><button className="click-element" onClick={()=>{loadStudent('','new')}}>Add Student</button></div></div>}
        <div>
          <table className="container-table">
            <thead>
              {students && (
                <tr key="0">
                  <th>Action</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>College</th>
                </tr>
              )}
            </thead>
            <tbody>
              {students &&
                students.map((stu) => {
                  return (
                    <tr key={stu.id}>
                      <td>
                        <span
                          className="click-element"
                          onClick={() => loadStudent(stu.id, 'view')}
                        >
                          View
                        </span>
                         / 
                        <span
                          className="click-element"
                          onClick={() => loadStudent(stu.id, 'edit')}
                        >
                          Edit
                        </span>
                         / 
                        <span
                          className="click-element"
                          onClick={() => delteStudentById(stu.id)}
                        >
                          Del
                        </span>
                      </td>
                      <td>{stu.firstName}</td>
                      <td>{stu.lastName}</td>
                      <td>{stu.email}</td>
                      <td>{stu.password}</td>
                      <td>{stu.collegeId}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
     
      {popupState && (
        <div className="popup-container">
          {((student && student.id) || mode ==='new') && (
            <div className="container-style">
              <div
                className="popup-close-button"
                onClick={()=>{setPopupState(false)}}
              >
                X
              </div>
              <div className="main-heading">Student Details</div>
              <form onSubmit={handleSubmit}>
                <label>
                  Enter your name:
                  <br />
                  <input
                    type="text"
                    name="firstName"
                    value={inputs.firstName || ""}
                    onChange={handleChange}
                    readOnly={mode==='view'?true:false}
                  />
                </label>
                <br />
                <br />
                <label>
                  Enter your last name:
                  <br />
                  <input
                    type="text"
                    name="lastName"
                    value={inputs.lastName || ""}
                    onChange={handleChange}
                    readOnly={mode==='view'?true:false}
                  />
                </label>
                <br />
                <br />
                <label>
                  Enter your email:
                  <br />
                  <input
                    type="email"
                    name="email"
                    value={inputs.email || ""}
                    onChange={handleChange}
                    readOnly={mode==='view'?true:false}
                  />
                </label>
                <br />
                <br />
                <label>
                  Enter your password:
                  <br />
                  <input
                    type="password"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                    readOnly={mode==='view'?true:false}
                  />
                </label>
                <br />
                <br />
                <label>
                  Select College:
                  <br />
                  <select
                    value={inputs.collegeId || ""}
                    name="collegeId"
                    onChange={handleChange}
                  >
                    {colleges &&
                      colleges.map((coll) => {
                        return (
                          <option key={"option_" + coll.id} value={coll.id}>
                            {coll.name}
                          </option>
                        );
                      })}
                  </select>
                </label>
                <br />
                <br />
                {mode!=='view' && <input type="submit" />}
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
