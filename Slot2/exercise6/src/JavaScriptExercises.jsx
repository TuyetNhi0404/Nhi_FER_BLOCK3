import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PeopleArrayExercise = () => {
  const people = [
    { name: 'Jack', age: 50 },
    { name: 'Michael', age: 9 },
    { name: 'John', age: 40 },
    { name: 'Ann', age: 19 },
    { name: 'Elisabeth', age: 16 }
  ];

  const isTeen = p => p.age >= 10 && p.age <= 20;

  const firstTeenager = people.find(isTeen);
  const allTeenagers = people.filter(isTeen);
  const everyPersonIsTeenager = people.every(isTeen);
  const anyPersonIsTeenager = people.some(isTeen);

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">People Array Exercise</h1>

      {/* Original Data */}
      <h3>Original Data</h3>
      <div className="row mb-4">
        {people.map((p, i) => (
          <div key={i} className="col-md-3 mb-2">
            <div className="card text-center">
              <div className="card-body">
                <h5>{p.name}</h5>
                <span className={`badge ${isTeen(p) ? 'bg-success' : 'bg-secondary'}`}>
                  {p.age} years old
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      <h3>Results</h3>
      <ul className="list-group">
        <li className="list-group-item">
          1. First teenager (find):{" "}
          {firstTeenager ? `${firstTeenager.name} (${firstTeenager.age})` : "None"}
        </li>
        <li className="list-group-item">
          2. All teenagers (filter):{" "}
          {allTeenagers.length > 0
            ? allTeenagers.map(p => `${p.name} (${p.age})`).join(", ")
            : "None"}
        </li>
        <li className="list-group-item">
          3. Every person is teenager (every):{" "}
          {everyPersonIsTeenager ? "TRUE" : "FALSE"}
        </li>
        <li className="list-group-item">
          4. Any person is teenager (some):{" "}
          {anyPersonIsTeenager ? "TRUE" : "FALSE"}
        </li>
      </ul>
    </div>
  );
};

export default PeopleArrayExercise;
