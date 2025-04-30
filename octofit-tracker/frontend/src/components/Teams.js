import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch('https://cuddly-eureka-69rj99vvgqpf5r5j-8000.app.github.dev/api/teams/')
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(() => setTeams([]));
  }, []);

  return (
    <div>
      <h2 className="mb-4 display-6">Teams</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {teams.length > 0 ? teams.map((team, idx) => (
                  <tr key={idx}>
                    <td>{team.name}</td>
                  </tr>
                )) : (
                  <tr><td className="text-center">No teams found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teams;
