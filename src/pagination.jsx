import React, {useEffect, useState} from 'react';
import './pagination.css';

const page = 10;
function Pagination(){
    const[data, setData] = useState([]);
    const[currentPage,  setCurrentPage] = useState(1);
    const[error, setError] = useState(null);
    const pageCount = Math.ceil(data.length/page);

    useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch data');
        return response.json();
      })
      .then(json => setData(json))
      .catch(() => {
        alert('failed to fetch data');
        setError('failed to fetch data');
      });
  }, []);

    const startIndex = (currentPage - 1) * page;
    const currentData = data.slice(startIndex, startIndex + page);

    const handlePrev = () => {
        if(currentPage > 1){
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if(currentPage < pageCount){
            setCurrentPage(prev => prev + 1);
        }
    }

    return (
        <div className='container'>
            <h1>Employee Data Table</h1>
            <table className='table'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {currentData.map(user => (
                    <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className='pagination-button'>
                <button onClick={handlePrev} disabled={currentPage===1}>Previous</button>
                <span><span>{currentPage}</span></span>
                <button onClick={handleNext} disabled={currentPage===pageCount}>Next</button>
            </div>
        </div>
    );
}
export default Pagination;