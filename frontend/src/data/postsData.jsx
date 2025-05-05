// data/postsData.jsx
import accountsData from './accountsData';

// Helper function to find account details by ID
const getAccountDetails = (accountID) => {
    return accountsData.find(account => account.accountID === accountID);
};

export const posts = [
    {
        PetID: '001',
        PetName: 'Charlie',
        PetType: 'Dog',
        Breed: 'Golden Retriever',
        PetTags: ['friendly', 'playful', 'good with kids'],
        PetAge: '2 years',
        PetDescription: 'A happy and energetic Golden Retriever who loves to fetch and cuddle.',
        Reason: 'Need a new owner due to owner moving to a smaller home.',
        History: 'Buddy has been with his current family since he was a puppy.',
        Health: 'Up-to-date on all vaccinations, neutered, and healthy.',
        PetImages: ['main_assets/images/pets/charlie.jpg'],
        Status: 'Available', // Available or Not
        TimePosted: '2025-05-01T10:00:00Z',
        TimeUpdated: '2025-05-01T10:00:00Z',
        OwnerAccountID: 'AS67890', // Using an existing accountID
        PostStatus: 'Approved', // Added PostStatus
        PostDescription: 'Charlie is looking for a loving family who enjoys outdoor activities. He is great with children and other pets. Serious inquiries only, please.', // Added Post Description
        // The following fields will be populated dynamically based on OwnerAccountID
        CurrentOwnerFullName: getAccountDetails('AS67890')?.accountFullName || 'Unknown',
        CurrentOwnerAccountDisplayName: getAccountDetails('AS67890')?.accountEmail || '@unknown',
        CurrentOwnerProfile: getAccountDetails('AS67890')?.profile || 'https://via.placeholder.com/50/808080/FFFFFF?Text=?',
        ContactNumber: getAccountDetails('AS67890')?.accountContactNumber || 'N/A',
        Email: getAccountDetails('AS67890')?.accountEmail || 'unknown@example.com',
    },
    {
        PetID: '002',
        PetName: 'Whiskers',
        PetType: 'Cat',
        Breed: 'Siamese',
        PetTags: ['calm', 'affectionate', 'blue eyes'],
        PetAge: '1 year',
        PetDescription: 'A beautiful Siamese cat with striking blue eyes, enjoys quiet companionship.',
        Reason: 'Looking for a new loving home as the current owner has developed allergies.',
        History: 'Whiskers was rescued from a local shelter 6 months ago.',
        Health: 'Vaccinated, spayed, and in excellent health.',
        PetImages: ['main_assets/images/pets/siamese.jpg'],
        Status: 'Available',
        TimePosted: '2025-04-30T15:30:00Z',
        TimeUpdated: '2025-04-30T15:30:00Z',
        OwnerAccountID: 'RB54321', // Using an existing accountID
        PostStatus: 'Approved', // Added PostStatus
        PostDescription: 'Whiskers is a sweet and gentle cat who loves to be indoors.',
        CurrentOwnerFullName: getAccountDetails('RB54321')?.accountFullName || 'Unknown',
        CurrentOwnerAccountDisplayName: getAccountDetails('RB54321')?.accountEmail || '@unknown',
        CurrentOwnerProfile: getAccountDetails('RB54321')?.profile || 'https://via.placeholder.com/50/808080/FFFFFF?Text=?',
        ContactNumber: getAccountDetails('RB54321')?.accountContactNumber || 'N/A',
        Email: getAccountDetails('RB54321')?.accountEmail || 'unknown@example.com',
    },
    {
        PetID: '003',
        PetName: 'Sheldon',
        PetType: 'Turtle',
        Breed: 'Red-Eared Slider',
        PetTags: ['aquatic', 'low maintenance'],
        PetAge: '5 years',
        PetDescription: 'A charming Red-Eared Slider turtle, requires a proper aquatic setup.',
        Reason: 'Current owner lacks the space for his large tank.',
        History: 'Sheldon was a class pet but needs a permanent home.',
        Health: 'Healthy and active.',
        PetImages: ['main_assets/images/pets/sheldon.jpg'],
        Status: 'Available',
        TimePosted: '2025-04-29T09:45:00Z',
        TimeUpdated: '2025-04-29T09:45:00Z',
        OwnerAccountID: 'EM09876', // Using an existing accountID
        PostStatus: 'Approved', // Added PostStatus
        PostDescription: 'Sheldon needs a spacious tank with proper lighting and filtration. He is a fascinating pet to observe. Experience with aquatic turtles preferred.', // Added Post Description
        // The following fields will be populated dynamically based on OwnerAccountID
        CurrentOwnerFullName: getAccountDetails('EM09876')?.accountFullName || 'Unknown',
        CurrentOwnerAccountDisplayName: getAccountDetails('EM09876')?.accountEmail || '@unknown',
        CurrentOwnerProfile: getAccountDetails('EM09876')?.profile || 'https://via.placeholder.com/50/808080/FFFFFF?Text=?',
        ContactNumber: getAccountDetails('EM09876')?.accountContactNumber || 'N/A',
        Email: getAccountDetails('EM09876')?.accountEmail || 'unknown@example.com',
    },
];
