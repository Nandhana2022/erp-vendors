import api from './axios';

// Mock data for contact persons
const mockContacts = [
  { id: 1, vendorId: 1, name: 'John Doe', designation: 'Manager', email: 'john@vendor1.com', phone: '1111111111' },
  { id: 2, vendorId: 1, name: 'Jane Smith', designation: 'Sales', email: 'jane@vendor1.com', phone: '2222222222' },
  { id: 3, vendorId: 2, name: 'Bob Johnson', designation: 'CEO', email: 'bob@vendor2.com', phone: '3333333333' },
];

const USE_MOCK_DATA = true;

export const contactsAPI = {
  getContacts: (vendorId) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const vendorContacts = mockContacts.filter(contact => contact.vendorId === parseInt(vendorId));
          resolve({ data: vendorContacts });
        }, 500);
      });
    }
    
    return api.get(`/ContactPersons/GetContactPersonList/${vendorId}`);
  },
  
  getContact: (id) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const contact = mockContacts.find(c => c.id === parseInt(id));
          resolve({ data: contact });
        }, 500);
      });
    }
    
    return api.get(`/ContactPersons/${id}`);
  },
  
  createContact: (data) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newContact = {
            id: Math.max(...mockContacts.map(c => c.id)) + 1,
            ...data
          };
          mockContacts.push(newContact);
          resolve({ data: newContact });
        }, 500);
      });
    }
    
    return api.post('/ContactPersons', data);
  },
  
  updateContact: (id, data) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockContacts.findIndex(c => c.id === parseInt(id));
          if (index !== -1) {
            mockContacts[index] = { ...mockContacts[index], ...data };
          }
          resolve({ data: mockContacts[index] });
        }, 500);
      });
    }
    
    return api.put(`/ContactPersons/${id}`, data);
  },
  
  deleteContact: (id) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockContacts.findIndex(c => c.id === parseInt(id));
          if (index !== -1) {
            mockContacts.splice(index, 1);
          }
          resolve({ data: { success: true } });
        }, 500);
      });
    }
    
    return api.delete(`/ContactPersons/DeleteContactPerson/${id}`);
  }
};