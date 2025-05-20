import React, { useState } from 'react';
import Admin_Header from '../../components/admin_header';
import ScrollToTopButton from '../utility/util_scroll_up';

const AdminControls = () => {
  const [animalTypes, setAnimalTypes] = useState(['Dog', 'Cat', 'Bird', 'Fish', 'Hamster']);
  const [breeds, setBreeds] = useState([
    { id: 1, type: 'Dog', name: 'Golden Retriever' },
    { id: 2, type: 'Cat', name: 'Persian' },
    { id: 3, type: 'Dog', name: 'German Shepherd' },
    { id: 4, type: 'Cat', name: 'Siamese' },
    { id: 5, type: 'Bird', name: 'Parrot' },
    { id: 6, type: 'Fish', name: 'Goldfish' },
    { id: 7, type: 'Hamster', name: 'Syrian' }
  ]);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalInput, setModalInput] = useState('');
  const [modalType, setModalType] = useState(''); // 'type', 'breed'
  const [selectedType, setSelectedType] = useState(''); // for breeds

  // Edit/Delete modal states
  const [editMode, setEditMode] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Open Add modal
  const openAddModal = (type) => {
    setModalTitle(`Add ${type === 'type' ? 'Animal Type' : 'Breed'}`);
    setModalType(type);
    setModalInput('');
    setSelectedType('');
    setEditMode(false);
    setItemToEdit(null);
    setShowModal(true);
  };

  // Open Edit modal
  const openEditModal = (type, item) => {
    setModalTitle(`Edit ${type === 'type' ? 'Animal Type' : 'Breed'}`);
    setModalType(type);
    setEditMode(true);
    setItemToEdit(item);

    if (type === 'type') {
      setModalInput(item);
    } else if (type === 'breed') {
      setModalInput(item.name);
      setSelectedType(item.type);
    }

    setShowModal(true);
  };

  // Open Delete modal
  const openDeleteModal = (type, item) => {
    setModalType(type);
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  // Save changes from Add/Edit modal
  const handleSave = () => {
    if (!modalInput.trim()) {
      alert('Input cannot be empty.');
      return;
    }
    if (modalType === 'type') {
      if (editMode) {
        // Edit animal type
        setAnimalTypes(animalTypes.map((t) => (t === itemToEdit ? modalInput.trim() : t)));
      } else {
        // Add animal type
        if (animalTypes.includes(modalInput.trim())) {
          alert('Animal type already exists.');
          return;
        }
        setAnimalTypes([...animalTypes, modalInput.trim()]);
      }
    } else if (modalType === 'breed') {
      if (!selectedType) {
        alert('Please select an animal type.');
        return;
      }
      if (editMode) {
        // Edit breed
        setBreeds(
          breeds.map((b) =>
            b.id === itemToEdit.id ? { ...b, name: modalInput.trim(), type: selectedType } : b
          )
        );
      } else {
        // Add breed
        if (breeds.some((b) => b.name.toLowerCase() === modalInput.trim().toLowerCase() && b.type === selectedType)) {
          alert('Breed already exists for this animal type.');
          return;
        }
        setBreeds([...breeds, { id: Date.now(), name: modalInput.trim(), type: selectedType }]);
      }
    }

    setShowModal(false);
    setModalInput('');
    setSelectedType('');
    setItemToEdit(null);
    setEditMode(false);
  };

  // Confirm delete
  const handleDelete = () => {
    if (modalType === 'type') {
      setAnimalTypes(animalTypes.filter((t) => t !== itemToDelete));
      // Also remove breeds of that type to keep consistent
      setBreeds(breeds.filter((b) => b.type !== itemToDelete));
    } else if (modalType === 'breed') {
      setBreeds(breeds.filter((b) => b.id !== itemToDelete.id));
    }

    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  return (
    <>
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeIn">
        <Admin_Header />
      </div>

      <ScrollToTopButton />

      <section
        className="mt-20 bg-gradient-to-t from-purple-600 to-orange-400 text-white py-24 text-center bg-cover bg-center animate__animated animate__fadeIn"
        style={{ backgroundImage: "url('../main_assets/images/image_main_banner4.png')" }}
      >
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4 animate__animated animate__bounceIn">Admin Controls</h1>
          <p className="text-lg max-w-2xl mx-auto">
            View the Overview of the System.
          </p>
        </div>
      </section>

      <div className="bg-gray-100 min-h-screen px-10 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Modifications</h2>

        {/* Animal Types and Breeds Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Animal Types Section */}
          <section className="bg-white p-6 rounded shadow-md md:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-black">🐾 Animal Types</h3>
            <ul className="mb-4 space-y-2 max-h-48 overflow-y-auto">
              {animalTypes.map((type) => (
                <li
                  key={type}
                  className="flex justify-between items-center border-b border-gray-200 py-1 text-black"
                >
                  <span>{type}</span>
                  <div>
                    <button
                      className="text-blue-600 mr-3 hover:underline"
                      onClick={() => openEditModal('type', type)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => openDeleteModal('type', type)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="bg-[#955CA4] text-[#F9B233] px-4 py-2 rounded hover:bg-yellow-700"
              onClick={() => openAddModal('type')}
            >
              + Add Animal Type
            </button>
          </section>

          {/* Breeds Section */}
          <section className="bg-white p-6 rounded shadow-md md:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-black">🧬 Breeds</h3>
            <ul className="mb-4 space-y-2 max-h-48 overflow-y-auto">
              {breeds.map((breed) => (
                <li
                  key={breed.id}
                  className="flex justify-between items-center border-b border-gray-200 py-1 text-black"
                >
                  <span>
                    <strong>{breed.type}:</strong> {breed.name}
                  </span>
                  <div>
                    <button
                      className="text-blue-600 mr-3 hover:underline"
                      onClick={() => openEditModal('breed', breed)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => openDeleteModal('breed', breed)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="bg-[#955CA4] text-[#F9B233] px-4 py-2 rounded hover:bg-yellow-700"
              onClick={() => openAddModal('breed')}
            >
              + Add Breed
            </button>
          </section>
        </div>

        {/* Add/Edit Modal ni diri*/}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold text-[#955CA4] mb-4">{modalTitle}</h2>

              {modalType === 'breed' && (
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#955CA4] bg-white text-black"
                >
                  <option value="" disabled>
                    Select animal type
                  </option>
                  {animalTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              )}

              <input
                type="text"
                value={modalInput}
                onChange={(e) => setModalInput(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#955CA4] bg-white text-black"
                placeholder="Enter here..."
              />

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded bg-[#955CA4] text-[#F9B233] hover:bg-yellow-700"
                >
                  {editMode ? 'Save Changes' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
              <h2 className="text-xl font-bold text-red-600 mb-4">Confirm Delete</h2>
              <p className="mb-6 text-gray-800">
                Are you sure you want to delete{' '}
                <strong>
                  {modalType === 'breed'
                    ? itemToDelete.name
                    : itemToDelete}
                </strong>
                ?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminControls;
