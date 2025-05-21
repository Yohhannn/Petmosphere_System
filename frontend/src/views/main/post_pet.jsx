import React, {useCallback, useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {ImagePlus, Loader2, PlusCircle, XCircle} from 'lucide-react';
import * as fetch from '../fetchRequest/fetch.js';
import * as send from '../postRequest/send.js';
// Import the success component
import PromptPostSuccess from '../../prompt/prompt_post_success';
import Cookies from "js-cookie";
// Define pet types and breeds (you can expand these lists)

const fetchAll = async() => {
    const response1 = fetch.getType();
    const response2 = fetch.getBreed();
    return await Promise.all([response1, response2]);
}

// Animation Variant
const formContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
};

const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
};

// Simple classname utility (replacement for cn)
const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

const PostPetForm = () => {
    // State for form fields
    const [petName, setPetName] = useState('');
    const [petType, setPetType] = useState([]);
    const [Type, setType] = useState('');
    const [petBreed, setPetBreed] = useState([]);
    const [breed, setBreed] = useState('');
    const [petTags, setPetTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petDescription, setPetDescription] = useState('');
    const [reason, setReason] = useState('');
    const [health, setHealth] = useState('');
    const [petImages, setPetImages] = useState(null);
    const [postDescription, setPostDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    // Function to handle image selection
    const handleImageChange = useCallback((event) => {
        const files = event.target.files[0];
        setPetImages(files);
    }, []);
    useEffect(() => {
        const fetchPet = async() => {
            const [types,breeds] = await fetchAll();
            const petType = types.data;
            const petBreed = breeds.data.filter((x) => x.type_id === parseInt(Type));
            setPetType(petType);
            setPetBreed(petBreed);
        }
       fetchPet();
    }, [Type]);

    // Function to handle tag addition
    const handleAddTag = useCallback(() => {
        if (newTag.trim() && !petTags.includes(newTag.trim())) {
            setPetTags(prevTags => [...prevTags, newTag.trim()]);
            setNewTag('');
        }
    }, [newTag, petTags]);

    // Function to handle tag removal
    const removeTag = useCallback((tagToRemove) => {
        setPetTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
    }, []);

    // Function to handle form submission
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmissionError(null);
        setSubmissionSuccess(false);

        // Basic validation (you can add more robust validation)
        if (!petName || !petType || !breed || !petDescription || !reason) {
            setSubmissionError('Please fill in all required fields.');
            setIsSubmitting(false);
            return;
        }

        if (petImages === null) {
            setSubmissionError('Please upload  one image.');
            setIsSubmitting(false);
            return;
        }

        // Simulate an API call (replace with your actual API endpoint)
        try {
            // Convert images to base64 strings (for demonstration purposes)
            const image = await send.uploadImage(petImages);
            const userCookie =  Cookies.get('userCredentials');
            const user = userCookie ? JSON.parse(userCookie) : null;
            // Construct the data object to send
            const postObject = {
                post_descrip: postDescription,
                post_status: 'Pending',
                user_id: user.user.user_id,
                post_img: image.secure_url,
                post_date: new Date().toISOString().split('T')[0],
                post_reason : reason
            };
            const petObject = {
                pet_name: petName,
                type_id: parseInt(Type),
                breed_id: parseInt(breed),
                pet_tag: petTags.join(','),
                pet_age: petAge,
                pet_description: petDescription,
                pet_medical: health,
                pet_status: 'Available',
                user_id: user.user.user_id,
                pet_location : user.user.user_location
            }
            const pet = await send.sendPet(petObject);
            postObject['pet_id'] = pet.data.pet_id;
            const post = await send.sendPost(postObject);
            await new Promise(resolve => setTimeout(resolve, 2000));
            const alertPost = {
                alert_type: "post_created",
                user_id : user.user.user_id,
                admin_id : null,
                alert_title : "New post request approval",
                alert_message : "New Post by " +user.user.user_name
            }
            if(post.message.includes('successfully')){
                await send.sendAlert(alertPost);
                setSubmissionSuccess(true);
                setPetName('');
                setType('');
                setBreed('');
                setPetTags([]);
                setNewTag('');
                setPetAge('');
                setPetDescription('');
                setReason('');
                setHealth('');
                setPetImages(null);
                setPostDescription('');
            }
        } catch (error) {
            setSubmissionError(error.message || 'An error occurred while submitting the form.');
        } finally {
            setIsSubmitting(false);
        }
    }, [petName, Type, breed, petTags, petAge, petDescription, reason, health, petImages, postDescription]);

    // Get breed options based on selected pet type


    return (
        <>
            <AnimatePresence>
                {!submissionSuccess ? (
                    <motion.div
                        className="min-h-screen bg-gradient-to-br from-gray-200 to-orange-300 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
                        variants={formContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-lg space-y-8 p-8">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray-900 animate__animated animate__wobble">Post a Pet</h1>
                                <p className="mt-2 text-gray-600">
                                    Fill out the form below to list a pet for adoption.
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <AnimatePresence>
                                    {/* Pet Name */}
                                    <motion.div variants={inputVariants} className="space-y-1">
                                        <label htmlFor="petName" className="block text-sm font-semibold text-gray-700">Pet Name <span className="text-red-500">*</span></label>
                                        <input
                                            id="petName"
                                            value={petName}
                                            onChange={(e) => setPetName(e.target.value)}
                                            placeholder="Enter pet name"
                                            required
                                            className="w-full px-4 py-2 border border-[#8E57B2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white text-black"
                                        />
                                    </motion.div>

                                    {/* Pet Type and Breed */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <motion.div variants={inputVariants} className="space-y-1">
                                            <label htmlFor="petType" className="block text-sm font-semibold text-gray-700">Pet Type <span className="text-red-500">*</span></label>
                                            <select
                                                value={Type}
                                                onChange={(e) => setType(e.target.value)}
                                                required
                                                className="w-full px-4 py-2 border border-[#8E57B2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white text-black"
                                            >
                                                <option value="">Select pet type</option>
                                                {petType.map(type => (
                                                    <option  value={type.type_id}>{type.type_name}</option>
                                                ))}
                                            </select>
                                        </motion.div>

                                        <motion.div variants={inputVariants} className="space-y-1">
                                            <label htmlFor="breed" className="block text-sm font-semibold text-gray-700">Breed <span className="text-red-500">*</span></label>
                                            <select
                                                value={breed}
                                                onChange={(e) => setBreed(e.target.value)}
                                                required
                                                disabled={!Type}
                                                className="w-full px-4 py-2 border border-[#8E57B2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white text-black"
                                            >
                                                <option value="">Select breed</option>
                                                {Type && petBreed.map(breedOption => (
                                                    <option value={breedOption.breed_id}>{breedOption.breed_name}</option>
                                                ))}
                                            </select>
                                        </motion.div>
                                    </div>

                                    {/* Pet Tags */}
                                    <motion.div variants={inputVariants} className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">Pet Tags</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                value={newTag}
                                                onChange={(e) => setNewTag(e.target.value)}
                                                placeholder="Add tag (e.g., playful)"
                                                className="flex-1 px-4 py-2 border border-[#8E57B2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white text-black"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddTag}
                                                className="bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300 rounded p-2"
                                                disabled={!newTag.trim()}
                                            >
                                                <PlusCircle className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {petTags.map(tag => (
                                                <div
                                                    className={classNames(
                                                        "inline-flex items-center px-2 py-1 rounded-full",
                                                        "bg-purple-500/20 text-purple-300 text-xs font-medium",
                                                        "cursor-pointer transition-colors hover:bg-purple-500/30 hover:text-purple-200 animate__animated animate__fadeIn"
                                                    )}
                                                    onClick={() => removeTag(tag)}
                                                >
                                                    {tag}
                                                    <XCircle className="w-4 h-4 ml-1" />
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Pet Age */}
                                    <motion.div variants={inputVariants} className="space-y-1">
                                        <label htmlFor="petAge" className="block text-sm font-semibold text-gray-700">Pet Age</label>
                                        <input
                                            id="petAge"
                                            value={petAge}
                                            onChange={(e) => setPetAge(e.target.value)}
                                            placeholder="Enter pet age (e.g., 1 year, 3 months)"
                                            className="w-full px-4 py-2 border border-[#8E57B2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white text-black"
                                        />
                                    </motion.div>

                                    {/* Pet Description */}
                                    <motion.div variants={inputVariants} className="space-y-1">
                                        <label htmlFor="petDescription" className="block text-sm font-semibold text-gray-700">Pet Description <span className="text-red-500">*</span></label>
                                        <textarea
                                            id="petDescription"
                                            value={petDescription}
                                            onChange={(e) => setPetDescription(e.target.value)}
                                            placeholder="Describe the pet's personality and traits"
                                            required
                                            className="w-full px-4 py-2 border border-[#8E57B2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white text-black"
                                            rows={4}
                                        />
                                    </motion.div>

                                    {/* Reason for Adoption */}
                                    <motion.div variants={inputVariants} className="space-y-1">
                                        <label htmlFor="reason" className="block text-sm font-semibold text-gray-700">Reason for Adoption <span className="text-red-500">*</span></label>
                                        <textarea
                                            id="reason"
                                            value={reason}
                                            maxLength={100}
                                            onChange={(e) => setReason(e.target.value)}
                                            placeholder="Explain why the pet is being put up for adoption"
                                            required
                                            className="w-full px-4 py-2 border border-[#8E57B2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white text-black"
                                            rows={3}
                                        />
                                    </motion.div>

                                    {/* Pet Health */}
                                    <motion.div variants={inputVariants} className="space-y-1">
                                        <label htmlFor="health" className="block text-sm font-semibold text-gray-700">Pet Health</label>
                                        <textarea
                                            id="health"
                                            value={health}
                                            onChange={(e) => setHealth(e.target.value)}
                                            placeholder="Provide information about the pet's health condition"
                                            className="w-full px-4 py-2 border border-[#8E57B2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white text-black"
                                            rows={3}
                                        />
                                    </motion.div>

                                    {/* Pet Images */}
                                    <motion.div variants={inputVariants} className="space-y-1">
                                        <label className="block text-sm font-semibold text-gray-700">Pet Images <span className="text-red-500">*</span> (Max 1)</label>
                                        <input
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="bg-white"
                                            id="petImages"
                                            aria-describedby="petImages-help"

                                        />
                                        <p id="petImages-help" className="mt-1 text-sm text-gray-500">
                                            Upload only 1 image of the pet.
                                        </p>
                                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            <AnimatePresence>
                                                    return (
                                                        <motion.div
                                                            variants={imageVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            className="relative rounded-md overflow-hidden border border-gray-300"
                                                        >
                                                            <img
                                                                src={petImages ? URL.createObjectURL(petImages) : "#"}
                                                                alt={`Pet Preview`}
                                                                className="w-full h-24 object-cover"
                                                            />
                                                        </motion.div>
                                                    );
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>

                                    {/* Post Description */}
                                    <motion.div variants={inputVariants} className="space-y-1">
                                        <label htmlFor="postDescription" className="block text-sm font-semibold text-gray-700">Post Description</label>
                                        <textarea
                                            id="postDescription"
                                            value={postDescription}
                                            maxLength={100}
                                            onChange={(e) => setPostDescription(e.target.value)}
                                            placeholder="Optional description for the post (e.g., adoption event details)"
                                            className="w-full px-4 py-2 border border-[#8E57B2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F69332] animate__animated animate__slideInRight bg-white text-black"
                                            rows={3}
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#8E57B2] text-white py-3 rounded-md hover:bg-[#F69332] transition duration-300 animate__animated animate__zoomIn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        'Post Pet for Adoption'
                                    )}
                                </button>

                                {/* Error and Success Messages */}
                                <AnimatePresence>
                                    {submissionError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate__animated animate__shakeX"
                                            role="alert"
                                        >
                                            <strong className="font-bold">Error!</strong>
                                            <span className="block sm:inline">{submissionError}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </motion.div>
                ) : (
                    <PromptPostSuccess />
                )}
            </AnimatePresence>
        </>
    );
};

export default PostPetForm;
