import { getSortIcon } from "../../Utilis/utilis";
import Loading from "../Generic/Loading";
import { LeadRow } from "./LeadRow";

export const LeadTable = ({ loading, leads,onSort, onEdit,onDelete,sortColumn, orderBy}) => {
   
    return (
        <>      
         {loading ? <Loading /> : <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th onClick={() => onSort('id')} style={{ cursor: 'pointer' }}>
                            ID {getSortIcon('id', sortColumn, orderBy)}
                        </th>
                        <th onClick={() => onSort('name')} style={{ cursor: 'pointer' }}>
                            Name {getSortIcon('name', sortColumn, orderBy)}
                        </th>
                        <th onClick={() => onSort('email')} style={{ cursor: 'pointer' }}>
                            Email {getSortIcon('email', sortColumn, orderBy)}
                        </th>
                        <th onClick={() => onSort('phone')} style={{ cursor: 'pointer' }}>
                            Phone {getSortIcon('phone', sortColumn, orderBy)}
                        </th>
                        <th onClick={() => onSort('lead_status_id')} style={{ cursor: 'pointer' }}>
                            Lead Status {getSortIcon('lead_status_id', sortColumn, orderBy)}
                        </th>
                        <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.length > 0 ? (
                        leads.map(lead => (
                            <LeadRow key={lead.id} lead={lead} onEdit={onEdit} onDelete={onDelete} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No leads available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>}
        </>
    );
};
