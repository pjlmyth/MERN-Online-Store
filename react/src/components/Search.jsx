import React, { useState } from 'react';

const Search = ({ onSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting search with searchTerm:', searchTerm);
    
        fetch(`http://localhost:3000/products/search`, {
            method: "POST",
            body: JSON.stringify({ searchTerm }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then((data) => {
            console.log('Search results:', data);
            if (typeof onSearchResults === 'function') {
                onSearchResults(data);
            } else {
                console.error('onSearchResults is not a function');
            }
        })
        .catch((error) => {
            console.error('Error searching:', error);
        });
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input 
                className="form-control me-2" 
                type="search"
                placeholder="Search by name or category" 
                aria-label="Search"
                value={searchTerm} 
                onChange={handleChange} 
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    );
};

export default Search;