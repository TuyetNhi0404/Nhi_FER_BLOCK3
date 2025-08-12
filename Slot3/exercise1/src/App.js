import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];

const categories = [...new Set(companies.map(c => c.category))];

function App() {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("asc");
  const [category, setCategory] = useState("");
  const [startRange, setStartRange] = useState("");
  const [endRange, setEndRange] = useState("");
  const [result, setResult] = useState(companies);

  useEffect(() => {
    let filtered = companies;
    
    if (search.trim()) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase().trim())
      );
    }
    
    if (category) {
      filtered = filtered.filter(c => c.category === category);
    }
    
    if (startRange && endRange) {
      const start = parseInt(startRange);
      const end = parseInt(endRange);
      filtered = filtered.filter(c => c.start >= start && c.end <= end);
    }
    
    if (sortType === "asc") {
      filtered = filtered.sort((a, b) => a.start - b.start);
    } else if (sortType === "desc") {
      filtered = filtered.sort((a, b) => b.start - a.start);
    }
    
    setResult(filtered);
  }, [search, sortType, category, startRange, endRange]);

  const clearFilters = () => {
    setSearch("");
    setSortType("asc");
    setCategory("");
    setStartRange("");
    setEndRange("");
  };



  return (
    <>
     
      <div className="container-fluid py-4" style={{ minHeight: "100vh", backgroundColor: "#f8fff8" }}>
        
        <div className="mb-4">
          <h2 className="text-center text-success">Company List</h2>
          <hr className="border-success" />
        </div>

       
        <div className="row g-2 mb-4 p-3 rounded" style={{ backgroundColor: "#e8f5e8", border: "1px solid #28a745" }}>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control border-success"
              placeholder="Search companies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ borderColor: "#28a745" }}
            />
          </div>
          
          <div className="col-md-2">
            <select 
              className="form-select border-success" 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              style={{ borderColor: "#28a745" }}
            >
              <option value="">All categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="col-md-2">
            <input 
              type="number" 
              className="form-control border-success" 
              placeholder="From year"
              value={startRange} 
              onChange={e => setStartRange(e.target.value)}
              style={{ borderColor: "#28a745" }}
            />
          </div>
          
          <div className="col-md-2">
            <input 
              type="number" 
              className="form-control border-success" 
              placeholder="To year"
              value={endRange} 
              onChange={e => setEndRange(e.target.value)}
              style={{ borderColor: "#28a745" }}
            />
          </div>
          
          <div className="col-md-2">
            <select 
              className="form-select border-success" 
              value={sortType} 
              onChange={e => setSortType(e.target.value)}
              style={{ borderColor: "#28a745" }}
            >
              <option value="asc">Year ascending</option>
              <option value="desc">Year descending</option>
            </select>
          </div>
          
          <div className="col-md-1">
            <button 
              className="btn btn-outline-success w-100" 
              onClick={clearFilters}
              title="Clear filters"
            >
              ✕
            </button>
          </div>
        </div>

        
        <div className="mb-3">
          <small className="text-success fw-semibold">
            Showing {result.length} / {companies.length} companies
          </small>
        </div>

     
        <div className="table-responsive">
          <style>
            {`
              .custom-header th {
                background-color: #155724 !important;
                color: white !important;
                border-color: #155724 !important;
              }
              .table tbody tr {
                background-color: white !important;
              }
              .table tbody tr:hover {
                background-color: #f8fff8 !important;
              }
            `}
          </style>
          <table className="table table-bordered table-hover">
            <thead className="custom-header">
              <tr>
                <th className="fw-bold">Company Name</th>
                <th className="fw-bold">Category</th>
                <th className="fw-bold">Start Year</th>
                <th className="fw-bold">End Year</th>
              </tr>
            </thead>
            <tbody>
              {result.length > 0 ? (
                result.map((company, idx) => (
                  <tr key={idx}>
                    <td className="fw-medium">{company.name}</td>
                    <td>
                      <span className="badge bg-success">
                        {company.category}
                      </span>
                    </td>
                    <td>{company.start}</td>
                    <td>{company.end}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-success">
                    <div>
                      <strong>No results found</strong>
                      <br />
                      <small>Try adjusting your filters</small>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;