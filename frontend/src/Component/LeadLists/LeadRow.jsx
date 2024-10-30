export const LeadRow = ({ lead, onEdit, onDelete }) => {
  return (
    <tr key={lead.id}>
      <td>{lead.id}</td>
      <td>{lead.name}</td>
      <td>{lead.email}</td>
      <td>{lead.phone}</td>
      <td>{lead.status.name}</td>
      <td>
        <button
          className="btn btn-warning btn-sm"
          onClick={() => onEdit(lead.id)}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(lead.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};