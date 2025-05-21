import React, { useEffect, useState } from 'react';
import Admin_Header from '../../components/admin_header';
import ScrollToTopButton from '../utility/util_scroll_up';
import * as fetch from '../fetchRequest/fetch.js';
import * as send from '../postRequest/send.js';

const AdminControls = () => {
    const [animalTypes, setAnimalTypes] = useState([]);
    const [breeds, setBreeds] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalInput, setModalInput] = useState('');
    const [modalType, setModalType] = useState('');
    const [selectedType, setSelectedType] = useState(0);

    const [editMode, setEditMode] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const petData = async () => {
        const type = await fetch.getType();
        const breed = await fetch.getBreed();
        setBreeds(breed.data);
        setAnimalTypes(type.data);
    };

    useEffect(() => {
        petData();
    }, []);

    const openAddModal = (type) => {
        setModalTitle(`Add ${type === 'type' ? 'Animal Type' : 'Breed'}`);
        setModalType(type);
        setModalInput('');
        setSelectedType('');
        setEditMode(false);
        setItemToEdit(null);
        setShowModal(true);
    };

    const openEditModal = (type, item) => {
        setModalTitle(`Edit ${type === 'type' ? 'Animal Type' : 'Breed'}`);
        setModalType(type);
        setEditMode(true);
        setItemToEdit(item);

        if (type === 'type') {
            setModalInput(item.type_name);
        } else if (type === 'breed') {
            setModalInput(item.breed_name);
            const matchedType = animalTypes.find(t => t.type_id === item.type.type_id);
            setSelectedType(matchedType);
        }

        setShowModal(true);
    };

    const openDeleteModal = (type, item) => {
        setModalType(type);
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const handleSave = async() => {
        if (!modalInput.trim()) {
            alert('Input cannot be empty.');
            return;
        }

        if (modalType === 'type') {
            if (editMode) {
                await send.updateType(itemToEdit.type_id,{type_name : modalInput.trim()});

            } else {
                if (animalTypes.some((t) => t.type_name.toLowerCase() === modalInput.trim().toLowerCase())) {
                    alert('Animal type already exists.');
                    return;
                }
                await send.sendType({type_name:modalInput.trim()});
            }
        } else if (modalType === 'breed') {
            if (!selectedType) {
                alert('Please select an animal type.');
                return;
            }
            if (editMode) {
                await send.updateBreed(itemToEdit.breed_id,{type_id:selectedType.type_id,breed_name:modalInput.trim()});
            } else {
                if (
                    breeds.some(
                        (b) =>
                            b.breed_name.toLowerCase() === modalInput.trim().toLowerCase() &&
                            b.type.type_id === selectedType
                    )
                ) {
                    alert('Breed already exists for this animal type.');
                    return;
                }
                await send.sendBreed({type_id:selectedType.type_id,breed_name:modalInput.trim()});
            }
        }

        setShowModal(false);
        setModalInput('');
        setSelectedType('');
        setItemToEdit(null);
        setEditMode(false);
        petData();
    };

    const handleDelete = async() => {
        if (modalType === 'type') {
            await send.deleteType(itemToDelete.type_id);
        } else if (modalType === 'breed') {
            await send.deleteBreed(itemToDelete.breed_id);
        }

        setShowDeleteModal(false);
        setItemToDelete(null);
        petData();
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeIn">
                <Admin_Header />
            </div>

            <ScrollToTopButton />

            <section
                className="mt-20 bg-gradient-to-t from-purple-600 to-orange-400 text-white py-24 text-center bg-cover bg-center animate__animated animate__fadeIn"
                style={{ backgroundImage: "url('../main_assets/images/image_main_banner4.png')" }}
            >
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-bold mb-4 animate__animated animate__bounceIn">
                        Admin Controls
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto">View the Overview of the System.</p>
                </div>
            </section>

            <div className="bg-gray-100 min-h-screen px-10 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Modifications</h2>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Animal Types */}
                    <section className="bg-white p-6 rounded shadow-md md:w-1/2">
                        <h3 className="text-xl font-semibold mb-4 text-black">🐾 Animal Types</h3>
                        <ul className="mb-4 space-y-2 max-h-48 overflow-y-auto">
                            {animalTypes.map((type) => (
                                <li
                                    key={type.type_id}
                                    className="flex justify-between items-center border-b border-gray-200 py-1 text-black"
                                >
                                    <span>{type.type_name}</span>
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

                    {/* Breeds */}
                    <section className="bg-white p-6 rounded shadow-md md:w-1/2">
                        <h3 className="text-xl font-semibold mb-4 text-black">🧬 Breeds</h3>
                        <ul className="mb-4 space-y-2 max-h-48 overflow-y-auto">
                            {breeds.map((breed) => (
                                <li
                                    key={breed.breed_id}
                                    className="flex justify-between items-center border-b border-gray-200 py-1 text-black"
                                >
                  <span>
                    <strong>{breed.type.type_name}:</strong> {breed.breed_name}
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

                {/* Add/Edit Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                            <h2 className="text-xl font-bold text-[#955CA4] mb-4">{modalTitle}</h2>

                            {modalType === 'breed' && (
                                <select
                                    value={selectedType?.type_id || ''}
                                    onChange={(e) => {
                                        const selected = animalTypes.find(
                                            (t) => t.type_id === parseInt(e.target.value)
                                        );
                                        setSelectedType(selected);
                                    }}
                                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#955CA4] bg-white text-black"
                                >
                                    <option value="" disabled>
                                        Select animal type
                                    </option>
                                    {animalTypes.map((type) => (
                                        <option key={type.type_id} value={type.type_id}>
                                            {type.type_name}
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
                        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full text-black">
                            <h2 className="text-xl font-bold mb-4 text-[#955CA4]">Confirm Delete</h2>
                            <p className="mb-4">
                                Are you sure you want to delete this {modalType === 'type' ? 'animal type' : 'breed'}?
                            </p>
                            <div className="flex justify-end space-x-2">
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
