import React, { useState } from 'react';
import Admin_Header from '../../components/admin_header';

const AdminControls = () => {
  const [animalTypes, setAnimalTypes] = useState(['Dog', 'Cat', 'Bird']);
  const [breeds, setBreeds] = useState([
    { id: 1, type: 'Dog', name: 'Golden Retriever' },
    { id: 2, type: 'Cat', name: 'Persian' },
  ]);
  const [locations, setLocations] = useState(['Cebu City', 'Madridejos']);
  const [postRequirements, setPostRequirements] = useState(
    'Must upload at least one clear pet photo.'
  );

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalInput, setModalInput] = useState('');
  const [modalType, setModalType] = useState(''); // 'type', 'breed', 'location'
  const [selectedType, setSelectedType] = useState(''); // for breeds

  // Edit/Delete modal states
  const [editMode, setEditMode] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Open Add modal
  const openAddModal = (type) => {
    setModalTitle(`Add ${type === 'type' ? 'Animal Type' : type === 'breed' ? 'Breed' : 'Location'}`);
    setModalType(type);
    setModalInput('');
    setSelectedType('');
    setEditMode(false);
    setItemToEdit(null);
    setShowModal(true);
  };

  // Open Edit modal
  const openEditModal = (type, item) => {
    setModalTitle(`Edit ${type === 'type' ? 'Animal Type' : type === 'breed' ? 'Breed' : 'Location'}`);
    setModalType(type);
    setEditMode(true);
    setItemToEdit(item);

    if (type === 'type') {
      setModalInput(item);
    } else if (type === 'breed') {
      setModalInput(item.name);
      setSelectedType(item.type);
    } else if (type === 'location') {
      setModalInput(item);
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
    } else if (modalType === 'location') {
      if (editMode) {
        // Edit location
        setLocations(locations.map((loc) => (loc === itemToEdit ? modalInput.trim() : loc)));
      } else {
        // Add location
        if (locations.includes(modalInput.trim())) {
          alert('Location already exists.');
          return;
        }
        setLocations([...locations, modalInput.trim()]);
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
    } else if (modalType === 'location') {
      setLocations(locations.filter((loc) => loc !== itemToDelete));
    }

    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  // OPTIONAL RA
  const handlePostRequirementsChange = (e) => setPostRequirements(e.target.value);
  const handleSavePostRequirements = () => alert('Save post requirements:\n' + postRequirements);

  return (
    <>
      <Admin_Header />
      <div className="bg-gray-100 min-h-screen px-10 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Controls</h2>

        {/* Animal Types Section */}
        <section className="mb-10 bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-black">🐾 Animal Types</h3>
          <ul className="mb-4 space-y-2">
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
        <section className="mb-10 bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-black">🧬 Breeds</h3>
          <ul className="mb-4 space-y-2 max-h-48 overflow-y-auto rounded p-2">
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

        {/* Locations Section */}
        <section className="mb-10 bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-black">📍 Locations</h3>
          <ul className="mb-4 space-y-2">
            {locations.map((loc) => (
              <li
                key={loc}
                className="flex justify-between items-center border-b border-gray-200 py-1 text-black"
              >
                <span>{loc}</span>
                <div>
                  <button
                    className="text-blue-600 mr-3 hover:underline"
                    onClick={() => openEditModal('location', loc)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => openDeleteModal('location', loc)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="bg-[#955CA4] text-[#F9B233] px-4 py-2 rounded hover:bg-yellow-700"
            onClick={() => openAddModal('location')}
          >
            + Add Location
          </button>
        </section>

        {/* OPTIONAL - Post Requirements Section */}
        <section className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-black">Post Requirements</h3>
          <textarea
            value={postRequirements}
            onChange={handlePostRequirementsChange}
            rows={5}
            className="w-full border border-gray-300 rounded p-2 mb-4 resize-none bg-gradient-to-b from-white to-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Set the posting rules or guidelines here..."
          />
          <button
            className="bg-[#955CA4] text-[#F9B233] px-4 py-2 rounded hover:bg-yellow-700"
            onClick={handleSavePostRequirements}
          >
            Save Requirements
          </button>
        </section>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold text-[#955CA4] mb-4">{modalTitle}</h2>

              {modalType === 'breed' && (
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#955CA4]"
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
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#955CA4]"
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
