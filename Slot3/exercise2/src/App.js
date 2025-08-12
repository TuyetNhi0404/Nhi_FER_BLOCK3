import React, { useState, useMemo } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
const persons = [
  { id: 1, firstName: 'Linh', lastName: 'Nguyen', age: 28, city: 'Ha Noi', skills: ['React', 'Node'], isActive: true },
  { id: 2, firstName: 'Minh', lastName: 'Tran', age: 22, city: 'Da Nang', skills: ['Vue', 'CSS'], isActive: false },
  { id: 3, firstName: 'Anh', lastName: 'Le', age: 35, city: 'HCM', skills: ['React', 'Go'], isActive: true },
  { id: 4, firstName: 'Ha', lastName: 'Pham', age: 29, city: 'Ha Noi', skills: ['Angular', 'RxJS'], isActive: true },
  { id: 5, firstName: 'Tuan', lastName: 'Do', age: 41, city: 'HCM', skills: ['Node', 'SQL'], isActive: false },
];

const PersonManagement = () => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

 
  const allSkills = useMemo(() => {
    const skills = persons.reduce((acc, person) => [...acc, ...person.skills], []);
    return [...new Set(skills)].sort();
  }, []);

 
  const sortedPersons = useMemo(() => {
    return [...persons].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.firstName.localeCompare(b.firstName);
      }
      return b.firstName.localeCompare(a.firstName);
    });
  }, [sortOrder]);


  const filteredByAgeAndSkill = useMemo(() => {
    return persons.filter(person => {
      const { age, skills } = person;
      
    
      const min = minAge ? parseInt(minAge) : 0;
      const max = maxAge ? parseInt(maxAge) : 999;
      const ageMatch = age >= min && age <= max;
      
    
      const skillMatch = selectedSkill ? skills.includes(selectedSkill) : true;
      
      return ageMatch && skillMatch;
    });
  }, [minAge, maxAge, selectedSkill]);


  const skillRanking = useMemo(() => {
    const skillCount = persons.reduce((acc, person) => {
      person.skills.forEach(skill => {
        acc[skill] = (acc[skill] || 0) + 1;
      });
      return acc;
    }, {});

    return Object.entries(skillCount)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count);
  }, []);


  const searchAndSortedPersons = useMemo(() => {
 
    const filtered = persons.filter(person => {
      const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });

    
    return filtered.sort((a, b) => {
      
      if (a.isActive !== b.isActive) {
        return b.isActive - a.isActive;
      }
      
      
      if (a.age !== b.age) {
        return a.age - b.age;
      }
      
    
      return a.lastName.localeCompare(b.lastName);
    });
  }, [searchTerm]);

 
  const statistics = useMemo(() => {
    return searchAndSortedPersons.reduce(
      (acc, person) => {
        const { age, isActive } = person;
        return {
          total: acc.total + 1,
          totalAge: acc.totalAge + age,
          activeCount: acc.activeCount + (isActive ? 1 : 0)
        };
      },
      { total: 0, totalAge: 0, activeCount: 0 }
    );
  }, [searchAndSortedPersons]);

  const averageAge = statistics.total > 0 ? (statistics.totalAge / statistics.total).toFixed(1) : 0;

  return (
    <>
   
  
      <div className="container-fluid py-4" style={{backgroundColor: '#f0f8f0'}}>
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <h1 className="text-center mb-5" style={{color: '#2e7d32'}}>Person Management System</h1>
        
            <div className="card mb-4 shadow">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="card-title mb-0">1. Person List</h2>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="btn"
                    style={{backgroundColor: '#4caf50', color: 'white', border: 'none'}}
                  >
                    Sort First Name: {sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
                    <i className={`ms-2 bi bi-chevron-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                  </button>
                </div>
                
                <div className="row g-3">
                  {sortedPersons.map(({ id, firstName, lastName, age, city, skills }) => (
                    <div key={id} className="col-12">
                      <div className="card border-start border-3 h-100" style={{borderLeftColor: '#66bb6a !important'}}>
                        <div className="card-body">
                          <h5 className="card-title">{firstName} {lastName}</h5>
                          <p className="card-text text-muted mb-0">
                            <span className="me-3"><strong>Age:</strong> {age}</span>
                            <span className="me-3"><strong>City:</strong> {city}</span>
                            <span><strong>Skills:</strong> {skills.join(', ')}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

         
            <div className="card mb-4 shadow">
              <div className="card-body">
                <h2 className="card-title mb-4">2. Filter by Age Range & Skill</h2>
                
                <div className="row mb-4">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Min Age</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min age"
                      value={minAge}
                      onChange={(e) => setMinAge(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Max Age</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Max age"
                      value={maxAge}
                      onChange={(e) => setMaxAge(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Skill</label>
                    <select
                      className="form-select"
                      value={selectedSkill}
                      onChange={(e) => setSelectedSkill(e.target.value)}
                    >
                      <option value="">All Skills</option>
                      {allSkills.map(skill => (
                        <option key={skill} value={skill}>{skill}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border rounded p-3 bg-light">
                  {filteredByAgeAndSkill.length > 0 ? (
                    <div className="list-group list-group-flush">
                      {filteredByAgeAndSkill.map(({ id, firstName, lastName, skills }) => (
                        <div key={id} className="list-group-item border-0 bg-transparent border-start border-3 ps-3" style={{borderLeftColor: '#81c784 !important'}}>
                          <strong>{firstName}</strong> - <strong>{lastName}</strong> - {skills.join(', ')}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted text-center py-3">
                      <em>No found.</em>
                    </div>
                  )}
                </div>
              </div>
            </div>

        
            <div className="card mb-4 shadow">
              <div className="card-body">
                <h2 className="card-title mb-4">3. Skill Ranking</h2>
                
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead style={{backgroundColor: '#388e3c', color: 'white'}}>
                      <tr>
                        <th scope="col">Skill</th>
                        <th scope="col">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skillRanking.map(({ skill, count }, index) => (
                        <tr key={skill} style={{backgroundColor: index === 0 ? '#c8e6c9' : 'transparent'}}>
                          <td className={index === 0 ? 'fw-bold' : ''} style={{color: index === 0 ? '#2e7d32' : 'inherit'}}>{skill}</td>
                          <td className={index === 0 ? 'fw-bold' : ''} style={{color: index === 0 ? '#2e7d32' : 'inherit'}}>{count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card mb-4 shadow">
              <div className="card-body">
                <h2 className="card-title mb-4">4. Search & Multi-criteria Sort</h2>
                
             
                <div className="mb-4">
                  <label className="form-label">Search by Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card text-white" style={{background: 'linear-gradient(135deg, #4caf50, #66bb6a)'}}>
                      <div className="card-body">
                        <h5 className="card-title">
                          <i className="bi bi-graph-up me-2"></i>
                          Statistics
                        </h5>
                        <div className="row text-center">
                          <div className="col-md-4 mb-3 mb-md-0">
                            <div className="d-flex align-items-center justify-content-center">
                              <i className="bi bi-people fs-1 me-3"></i>
                              <div>
                                <div className="fs-2 fw-bold">{statistics.total}</div>
                                <small>Total People</small>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 mb-3 mb-md-0">
                            <div className="d-flex align-items-center justify-content-center">
                              <i className="bi bi-calendar3 fs-1 me-3"></i>
                              <div>
                                <div className="fs-2 fw-bold">{averageAge}</div>
                                <small>Average Age</small>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="d-flex align-items-center justify-content-center">
                              <i className="bi bi-person-check fs-1 me-3"></i>
                              <div>
                                <div className="fs-2 fw-bold">{statistics.activeCount}</div>
                                <small>Active People</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              
                <div>
                  <h5 className="mb-3">Results (sorted by: Active → Age → Last Name)</h5>
                  <div className="row g-3">
                    {searchAndSortedPersons.map(({ id, firstName, lastName, age, city, skills, isActive }) => (
                      <div key={id} className="col-12">
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="d-flex align-items-center mb-2">
                              <h6 className="card-title mb-0 me-3">{firstName} {lastName}</h6>
                              <span className={`badge ${isActive ? 'text-white' : 'bg-secondary'}`} 
                                    style={{backgroundColor: isActive ? '#4caf50' : undefined}}>
                                {isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <p className="card-text text-muted mb-0">
                              <span className="me-3"><strong>Age:</strong> {age}</span>
                              <span className="me-3"><strong>City:</strong> {city}</span>
                              <span><strong>Skills:</strong> {skills.join(', ')}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {searchAndSortedPersons.length === 0 && searchTerm && (
                      <div className="col-12">
                        <div className="text-center text-muted py-5">
                          <i className="bi bi-search fs-1 mb-3 d-block"></i>
                          <p className="mb-0">No results found for "{searchTerm}"</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default PersonManagement;