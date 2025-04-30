import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch('https://cuddly-eureka-69rj99vvgqpf5r5j-8000.app.github.dev/api/workouts/')
      .then(res => res.json())
      .then(data => setWorkouts(data))
      .catch(() => setWorkouts([]));
  }, []);

  return (
    <div>
      <h2 className="mb-4 display-6">Workouts</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length > 0 ? workouts.map((workout, idx) => (
                  <tr key={idx}>
                    <td>{workout.name}</td>
                    <td>{workout.description}</td>
                  </tr>
                )) : (
                  <tr><td colSpan="2" className="text-center">No workouts found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
