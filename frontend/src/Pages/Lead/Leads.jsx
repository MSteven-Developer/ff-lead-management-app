import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../Component/Generic/Header";
import SearchBar from "../../Component/Generic/SearchBar";
import { LeadTable } from "../../Component/LeadLists/LeadTable";
import { deleteLead, getLeads } from "../../Services/leadServices";
import FilterAccordion from "../../Component/Generic/Filteration/Filter";
import PaginationControls from "../../Component/Generic/Paginator/PaginationControls";

const Leads = () => {
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [links, setLinks] = useState([]);
  const [mainLeads, setMainLeads] = useState([]);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [orderBy, setOrderBy] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const paramLists = {
        currentPage,
        recordsPerPage,
        sortColumn,
        orderBy,
        searchQuery,
        ...mainLeads,
      };
      const data = await getLeads(paramLists);
      setLeads(data.data);
      setLinks(data.links);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [
    recordsPerPage,
    currentPage,
    sortColumn,
    orderBy,
    searchQuery,
    mainLeads,
  ]);

  const handleRecordsChange = (e) => setRecordsPerPage(e.target.value);
  const handleSort = (column) => {
    const direction =
      sortColumn === column && orderBy === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setOrderBy(direction);
  };
  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
  };
  const handleEdit = (id) => navigate(`/lead/${id}/edit`);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await deleteLead(id);
        fetchLeads();
      } catch (err) {
        setError(err);
      }
    }
  };

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error fetching leads: {error.message}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Header />
      <h2 className="mb-4">
        Leads List
        <Link to="/lead/create">
          <button
            type="button"
            className="btn btn-primary"
            style={{ float: "right" }}
          >
            Add Lead
          </button>
        </Link>
      </h2>
      <div>
        <FilterAccordion onFilterChange={(leads) => setMainLeads(leads)} />
      </div>
      <SearchBar onSearch={(searchQuery) => handleSearch(searchQuery)} />
      <LeadTable
        loading={loading}
        leads={leads}
        onSort={handleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
        sortColumn={sortColumn}
        orderBy={orderBy}
      />

     {!loading && <PaginationControls
        links={links}
        decodeHtml={decodeHtml}
        fetchLeads={fetchLeads}
        setCurrentPage={setCurrentPage}
        recordsPerPage={recordsPerPage}
        handleRecordsChange={handleRecordsChange}
      />}
    </div>
  );
};

export default Leads;
