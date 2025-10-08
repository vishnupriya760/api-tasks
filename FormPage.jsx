
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayData from "./DisplayData";

const FormPage = () => {
  const defaultUserTypes = [
    { userType: "Admin" },
    { userType: "Manager" },
    { userType: "Employee" },
    { userType: "Guest" },
    { userType: "Student" }
  ];

  let [userTypes, setUserTypes] = useState(defaultUserTypes);
  let [selectedUserType, setSelectedUserType] = useState("");
  let [isStudent, setIsStudent] = useState(1);
  let [savedRecords, setSavedRecords] = useState([]);

  useEffect(() => {
    axios.get("http://92.205.109.210:8031/Test/GetUserType")
      .then(res => {
        if (res.data && Array.isArray(res.data.list) && res.data.list.length > 0) {
          setUserTypes(res.data.list);
        }
      })
      .catch(err => console.error(err));
  }, []);

  
  const fetchSavedRecords = async () => {
    try {
      const res = await axios.get("http://92.205.109.210:8031/Test/GetSavedRecord");
      let recordsArray = [];

      
      if (Array.isArray(res.data)) {
        recordsArray = res.data;
      } else if (res.data && Array.isArray(res.data.list)) {
        recordsArray = res.data.list;
      }

      setSavedRecords(recordsArray);
    } catch (err) {
      console.error(err);
      setSavedRecords([]);
    }
  };

  useEffect(() => {
    fetchSavedRecords();
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUserType) {
      Swal.fire({
        title: 'Warning!',
        text: 'Please select a user type!',
        icon: 'warning'
      });
      return;
    }

    try {
      await axios.post("http://92.205.109.210:8031/Test/InsertTestDtls", {
        userType: selectedUserType,
        is_student: isStudent
      });

      Swal.fire({
        title: 'Success!',
        text: 'Data inserted successfully!',
        icon: 'success'
      });

      setSelectedUserType("");
      setIsStudent(1);
      fetchSavedRecords();
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong!',
        icon: 'error'
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">API Form + Data Handling</h2>

 <form onSubmit={handleSubmit} className="p-4 border rounded mb-5">
  <div className="mb-3">
   <label className="form-label">Select User Type</label>
  <select className="form-select" value={selectedUserType} onChange={(e) => setSelectedUserType(e.target.value)} >
            <option value="">Select User Type</option>
          {userTypes.map((type, index) => (
              <option key={index} value={type.userType}>{type.userType}</option>
            ))}
          </select>
        </div>

  <div className="mb-3">
   <label className="form-label">Are you a student?</label>
   <div>
      <input type="radio" name="student" value="1" checked={isStudent===1} onChange={() => setIsStudent(1)} />
      <label className="ms-2 me-4">Yes</label>

        <input type="radio" name="student" value="0" checked={isStudent===0} onChange={() => setIsStudent(0)} />
         <label className="ms-2">No</label>
          </div>
        </div>

        <button className="btn btn-primary w-100" type="submit">Submit</button>
      </form>

      <DisplayData records={savedRecords} />
    </div>
  );
};

export default FormPage;
