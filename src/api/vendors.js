import api from './axios';

// Mock data for vendors
const mockVendors = [
  { id: 1, name: 'Vendor One', code: 'V001', email: 'vendor1@example.com', phone: '1234567890', status: 'active' },
  { id: 2, name: 'Vendor Two', code: 'V002', email: 'vendor2@example.com', phone: '0987654321', status: 'inactive' },
  // Add more mock data as needed
];

// Check if we're using mock data (when real API is not available)
const USE_MOCK_DATA = true;

export const vendorsAPI = {
  getVendors: (params = {}) => {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      return new Promise((resolve) => {
        setTimeout(() => {
          let filteredVendors = [...mockVendors];
          
          // Apply search filter
          if (params.search) {
            const searchTerm = params.search.toLowerCase();
            filteredVendors = filteredVendors.filter(
              vendor => 
                vendor.name.toLowerCase().includes(searchTerm) || 
                vendor.code.toLowerCase().includes(searchTerm)
            );
          }
          
          // Apply sorting
          if (params.sortBy) {
            filteredVendors.sort((a, b) => {
              if (a[params.sortBy] < b[params.sortBy]) return params.sortOrder === 'asc' ? -1 : 1;
              if (a[params.sortBy] > b[params.sortBy]) return params.sortOrder === 'asc' ? 1 : -1;
              return 0;
            });
          }
          
          // Apply pagination
          const page = params.page || 1;
          const limit = params.limit || 10;
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedVendors = filteredVendors.slice(startIndex, endIndex);
          
          resolve({
            data: paginatedVendors,
            total: filteredVendors.length,
            page,
            totalPages: Math.ceil(filteredVendors.length / limit)
          });
        }, 500); // Simulate network delay
      });
    }
    
    // Real API implementation would go here
    return api.get('/Vendors', { params });
  },
  
  getVendor: (id) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const vendor = mockVendors.find(v => v.id === parseInt(id));
          resolve({ data: vendor });
        }, 500);
      });
    }
    
    return api.get(`/Vendors/${id}`);
  },
  
  createVendor: (data) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newVendor = {
            id: Math.max(...mockVendors.map(v => v.id)) + 1,
            ...data
          };
          mockVendors.push(newVendor);
          resolve({ data: newVendor });
        }, 500);
      });
    }
    
    return api.post('/Vendors', data);
  },
  
  updateVendor: (id, data) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockVendors.findIndex(v => v.id === parseInt(id));
          if (index !== -1) {
            mockVendors[index] = { ...mockVendors[index], ...data };
          }
          resolve({ data: mockVendors[index] });
        }, 500);
      });
    }
    
    return api.put(`/Vendors/${id}`, data);
  }
};