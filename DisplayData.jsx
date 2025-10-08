
import React from "react";

const DisplayData = ({ records }) => {
  let recordsArray = Array.isArray(records) ? records : [];

  return (
    <div className="table-responsive">
      <h4 className="mb-3">Saved Records</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>User Type</th>
            <th>Is Student</th>
          </tr>
        </thead>
        <tbody>
          {recordsArray.length > 0 ? (
            recordsArray.map((record, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{record.userType}</td>
                <td>{record.is_student === 1 ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayData;
