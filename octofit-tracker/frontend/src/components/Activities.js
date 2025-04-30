import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('https://cuddly-eureka-69rj99vvgqpf5r5j-8000.app.github.dev/api/activities/')
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(() => setActivities([]));
  }, []);

  return (
    <div>
      <h2 className="mb-4 display-6">Activities</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Type</th>
                  <th>Duration (min)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length > 0 ? activities.map((activity, idx) => (
                  <tr key={idx}>
                    <td>{activity.activity_type}</td>
                    <td>{activity.duration}</td>
                    <td>{activity.date}</td>
                  </tr>
                )) : (
                  <tr><td colSpan="3" className="text-center">No activities found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
