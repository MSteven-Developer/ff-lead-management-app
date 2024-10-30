const RecordsPerPageSelector = ({ recordsPerPage, handleRecordsChange }) => {
    return (
        <div className="form-group mb-0">
            <label htmlFor="recordsPerPage" className="mr-2">Records per page:</label>
            <select
                id="recordsPerPage"
                className="form-control"
                value={recordsPerPage}
                onChange={handleRecordsChange}
                style={{ display: 'inline-block', width: 'auto' }}
            >
                {[10, 20, 30, 40, 50].map(num => (
                    <option key={num} value={num}>{num}</option>
                ))}
            </select>
        </div>
    );
};

export default RecordsPerPageSelector;