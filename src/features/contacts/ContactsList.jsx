import { useState, useEffect } from 'react';
import { contactsAPI } from '../../api/contacts';
import Table from '../../components/Table';
import ContactForm from './ContactForm';

const ContactsList = ({ vendorId, vendorName }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await contactsAPI.getContacts(vendorId);
      setContacts(response.data);
    } catch (err) {
      setError('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [vendorId]);

  const handleAddContact = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      await contactsAPI.deleteContact(id);
      fetchContacts();
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'designation', header: 'Designation' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditContact(item)}
            className="text-green-600 hover:text-green-900"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteContact(item.id)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Contact Persons for {vendorName}
        </h3>
        <button
          onClick={handleAddContact}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Contact Person
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      <Table
        columns={columns}
        data={contacts}
        loading={loading}
      />

      <ContactForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        vendorId={vendorId}
        contact={editingContact}
        onSuccess={fetchContacts}
      />
    </div>
  );
};

export default ContactsList;