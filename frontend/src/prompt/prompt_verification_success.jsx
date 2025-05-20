import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import 'animate.css';

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: 'easeInOut',
            type: 'spring',
            stiffness: 120,
            damping: 20,
        },
    },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
};

const checkCircleVariants = {
    hidden: { pathLength: 0, opacity: 0, scale: 0.5 },
    visible: {
        pathLength: 1,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1.2, // Slightly longer for better effect
            ease: 'easeInOut',
            delay: 0.2,
        },
    },
};

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut', delay: 0.4 },
    },
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
            delay: 0.6,
            type: 'spring',
            stiffness: 100,
        },
    },
    hover: { scale: 1.05, backgroundColor: '#4CAF50' }, // More pronounced hover
    tap: { scale: 0.95 },
};

const PromptVerificationSuccess = () => {
    const handleReturnToAccount = () => {
        window.location.href = '/home?tab=Recent Posts';
    };

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center rounded-lg shadow-2xl p-8 text-center z-50 bg-white/90 backdrop-blur-md animate__animated animate__fadeIn" // Refined container
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="w-full max-w-md">
                <motion.div
                    variants={checkCircleVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-20 h-20 text-green-500 mx-auto mb-6" // Larger icon
                >
                    <CheckCircle className="w-full h-full" />
                </motion.div>
                <motion.h2
                    className="text-3xl font-semibold mb-4 text-gray-900 animate__animated animate__bounceIn" // Darker text
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                >
                    Success!
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-700 mb-6 animate__animated animate__fadeIn" // Improved text color
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                >
                    Your verification request has been sent and will be reviewed by an administrator. Verification takes up to 1-3 days process.
                </motion.p>
                <motion.button
                    onClick={handleReturnToAccount}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 shadow-md animate__animated animate__zoomIn" // Refined button
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                >
                    Return to Home
                </motion.button>
            </div>
        </motion.div>
    );
};

export default PromptVerificationSuccess;
