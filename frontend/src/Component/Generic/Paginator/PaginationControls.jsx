import Pagination from "./Pagination"
import RecordsPerPageSelector from "./RecordPerPageSelector";

const PaginationControls = ({ links, decodeHtml, fetchLeads, setCurrentPage, recordsPerPage, handleRecordsChange }) => {
    return (
        <div className="d-flex justify-content-between mb-3">
            <nav>
                <ul className="pagination justify-content-center">
                    {links && <Pagination links={links} decodeHtml={decodeHtml} fetchLeads={fetchLeads} setCurrentPage={setCurrentPage} />}
                </ul>
            </nav>
            <RecordsPerPageSelector 
                recordsPerPage={recordsPerPage} 
                handleRecordsChange={handleRecordsChange} 
            />
        </div>
    );
};

export default PaginationControls;