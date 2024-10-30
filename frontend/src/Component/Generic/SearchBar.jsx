import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(searchQuery); 
    };

    const handleClearClick = () => {
        setSearchQuery('');
        onSearch(''); 
    };

    return (
        <div className="form-group d-flex">
            <div style={{ position: 'relative', width: '100%' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    style={{ paddingRight: '30px' }} 
                />
                {searchQuery && (
                    <button
                        type="button"
                        onClick={handleClearClick}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            color: '#ccc',
                        }}
                    >
                        &#x2715;
                    </button>
                )}
            </div>
            <button 
                type="button" 
                className="btn btn-primary ml-2" 
                onClick={handleSearchClick}
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;