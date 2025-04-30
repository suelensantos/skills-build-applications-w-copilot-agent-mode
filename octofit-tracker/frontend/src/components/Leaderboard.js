import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch('https://cuddly-eureka-69rj99vvgqpf5r5j-8000.app.github.dev/api/leaderboard/')
      .then(res => res.json())
      .then(data => setEntries(data))
      .catch(() => setEntries([]));
  }, []);

  return (
    <div>
      <h2 className="mb-4 display-6">Leaderboard</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Team</th>
                  <th>Points</th>
                  <th>Month</th>
                </tr>
              </thead>
              <tbody>
                {entries.length > 0 ? entries.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.team}</td>
                    <td>{entry.total_points}</td>
                    <td>{entry.month}</td>
                  </tr>
                )) : (
                  <tr><td colSpan="3" className="text-center">No leaderboard entries found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
