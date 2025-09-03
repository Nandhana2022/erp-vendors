import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { vendorsAPI } from '../../api/vendors';

const VendorsList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await vendorsAPI.getVendors({
        search: searchTerm,
        sortBy,
        sortOrder,
        page: currentPage,
        limit: 10
      });
      setVendors(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, [searchTerm, sortBy, sortOrder, currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleView = (id) => {
    navigate(`/vendors/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/vendors/edit/${id}`);
  };

  const handleAddNew = () => {
    navigate('/vendors/new');
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Vendor Management</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage your vendors and their contact information</p>
        </div>
        <button
          onClick={handleAddNew}
          className="btn-primary flex items-center mt-4 sm:mt-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Vendor
        </button>
      </div>

      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={handleSearch}
              className="form-input pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="form-input text-sm py-1.5"
            >
              <option value="name">Name</option>
              <option value="code">Code</option>
              <option value="email">Email</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="card flex items-center justify-center h-64">
          <div className="text-center">
            <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-slate-600 dark:text-slate-400">Loading vendors...</p>
          </div>
        </div>
      ) : vendors.length === 0 ? (
        <div className="card flex items-center justify-center h-64">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">No vendors found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {searchTerm ? 'Try adjusting your search query' : 'Get started by adding your first vendor'}
            </p>
            {!searchTerm && (
              <button onClick={handleAddNew} className="btn-primary">
                Add New Vendor
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="table-container overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead>
                <tr>
                  <th className="table-header px-6 py-3 cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center">
                      Name
                      <SortIcon column="name" />
                    </div>
                  </th>
                  <th className="table-header px-6 py-3 cursor-pointer" onClick={() => handleSort('code')}>
                    <div className="flex items-center">
                      Code
                      <SortIcon column="code" />
                    </div>
                  </th>
                  <th className="table-header px-6 py-3">Email</th>
                  <th className="table-header px-6 py-3">Phone</th>
                  <th className="table-header px-6 py-3 cursor-pointer" onClick={() => handleSort('status')}>
                    <div className="flex items-center">
                      Status
                      <SortIcon column="status" />
                    </div>
                  </th>
                  <th className="table-header px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="table-cell font-medium">{vendor.name}</td>
                    <td className="table-cell">{vendor.code}</td>
                    <td className="table-cell">{vendor.email}</td>
                    <td className="table-cell">{vendor.phone}</td>
                    <td className="table-cell">
                      <span className={vendor.status === 'active' ? 'badge-success' : 'badge-danger'}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleView(vendor.id)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                          title="View details"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEdit(vendor.id)}
                          className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
                          title="Edit vendor"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="card mt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Showing page <span className="font-medium">{currentPage}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn-ghost text-sm py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="btn-ghost text-sm py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VendorsList;