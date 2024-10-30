import { getPageParam } from "../../../Utilis/utilis";

const Pagination = ({ links, decodeHtml, fetchLeads, setCurrentPage }) => {
  return (
    <div className="pagination">
      {links.map((link, index) => (
        <span key={index}>
          {link.url ? (
            <a
              className={link.active ? "active" : ""}
              style={{
                padding: "8px 12px",
                margin: "0 4px",
                border: "1px solid #007bff",
                borderRadius: "4px",
                color: link.active ? "#fff" : "#007bff",
                backgroundColor: link.active ? "#007bff" : "#fff",
                textDecoration: "none",
                transition: "background-color 0.3s, color 0.3s",
              }}
              onClick={() => {
                setCurrentPage(getPageParam(link.url));
                fetchLeads(link.url);
              }}
            >
              {decodeHtml(link.label)}
            </a>
          ) : (
            <span className="disabled">{decodeHtml(link.label)}</span>
          )}
        </span>
      ))}
    </div>
  );
};
export default Pagination;
