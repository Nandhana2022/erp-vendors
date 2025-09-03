import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { contactsAPI } from '../../api/contacts';
import FormInput from '../../components/FormInput';
import Modal from '../../components/Modal';

const ContactForm = ({ isOpen, onClose, vendorId, contact, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isEdit = Boolean(contact?.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await contactsAPI.updateContact(contact.id, data);
      } else {
        await contactsAPI.createContact({ ...data, vendorId });
      }
      onSuccess();
      onClose();
      reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save contact');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEdit ? 'Edit Contact Person' : 'Add Contact Person'}
    >
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Name"
          name="name"
          register={register}
          errors={errors}
          rules={{ required: 'Name is required' }}
          defaultValue={contact?.name}
        />
        
        <FormInput
          label="Designation"
          name="designation"
          register={register}
          errors={errors}
          rules={{ required: 'Designation is required' }}
          defaultValue={contact?.designation}
        />
        
        <FormInput
          label="Email"
          type="email"
          name="email"
          register={register}
          errors={errors}
          rules={{ 
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address'
            }
          }}
          defaultValue={contact?.email}
        />
        
        <FormInput
          label="Phone"
          name="phone"
          register={register}
          errors={errors}
          rules={{ 
            required: 'Phone is required',
            minLength: {
              value: 10,
              message: 'Phone must be at least 10 digits'
            }
          }}
          defaultValue={contact?.phone}
        />

        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Contact'}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ContactForm;