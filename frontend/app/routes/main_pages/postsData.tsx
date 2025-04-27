// postsData.tsx
import React from 'react';

export const posts = [
    {
        id: 1,
        owner: 'John Doe',
        contact: 'john@example.com',
        petName: 'Charlie Mi',
        breed: 'Golden Retriever',
        img: '',
        description: 'A playful and friendly Golden Retriever looking for a loving family.',
        render: () => (
            <div>
                <h3>Charlie</h3>
                <p>Owner: John Doe</p>
                <p>Contact: john@example.com</p>
                <img src="" alt="Charlie" />
                <p>
                    A playful and friendly Golden Retriever looking for a loving family.
                </p>
            </div>
        ),
    },
    {
        id: 2,
        owner: 'Jane Smith',
        contact: 'jane@example.com',
        petName: 'Whiskers',
        breed: 'Siamese Cat',
        img: '',
        description: 'A curious and affectionate Siamese cat, great for families or individuals.',
        render: () => (
            <div>
                <h3>Whiskers</h3>
                <p>Owner: Jane Smith</p>
                <p>Contact: jane@example.com</p>
                <img src="" alt="Whiskers" />
                <p>
                    A curious and affectionate Siamese cat, great for families or individuals.
                </p>
            </div>
        ),
    },
    {
        id: 3,
        owner: 'David Brown',
        contact: 'david@example.com',
        petName: 'Rocky',
        breed: 'Beagle',
        img: '',
        description: 'Energetic and loyal Beagle who loves long walks and playing fetch.',
        render: () => (
            <div>
                <h3>Rocky</h3>
                <p>Owner: David Brown</p>
                <p>Contact: david@example.com</p>
                <img src="" alt="Rocky" />
                <p>
                    Energetic and loyal Beagle who loves long walks and playing fetch.
                </p>
            </div>
        ),
    },
    {
        id: 4,
        owner: 'Emily Johnson',
        contact: 'emily@example.com',
        petName: 'Bella',
        breed: 'Persian Cat',
        img: '',
        description: 'A calm and regal Persian cat, perfect for a quiet home.',
        render: () => (
            <div>
                <h3>Bella</h3>
                <p>Owner: Emily Johnson</p>
                <p>Contact: emily@example.com</p>
                <img src="" alt="Bella" />
                <p>
                    A calm and regal Persian cat, perfect for a quiet home.
                </p>
            </div>
        ),
    },
    {
        id: 5,
        owner: 'Michael Lee',
        contact: 'michael@example.com',
        petName: 'Buddy',
        breed: 'Labrador Retriever',
        img: 'main_assets/posts/post_buddy.png',
        description: 'Friendly and intelligent Labrador Retriever who loves kids.',
        render: () => (
            <div>
                <h3>Buddy</h3>
                <p>Owner: Michael Lee</p>
                <p>Contact: michael@example.com</p>
                <img src="" alt="Buddy" />
                <p>
                    Friendly and intelligent Labrador Retriever who loves kids.
                </p>
            </div>
        ),
    },
    {
        id: 6,
        owner: 'Sophia Green',
        contact: 'sophia@example.com',
        petName: 'Luna',
        breed: 'Husky',
        img: 'main_assets/posts/post_luna.png',
        description: 'An adventurous Husky with a beautiful coat and a lot of energy.',
        render: () => (
            <div>
                <h3>Luna</h3>
                <p>Owner: Sophia Green</p>
                <p>Contact: sophia@example.com</p>
                <img src="" alt="Luna" />
                <p>
                    An adventurous Husky with a beautiful coat and a lot of energy.
                </p>
            </div>
        ),
    },
    {
        id: 7,
        owner: 'Robert Martinez',
        contact: 'robert@example.com',
        petName: 'Max',
        breed: 'German Shepherd',
        img: 'main_assets/posts/post_max.png',
        description: 'Loyal and protective German Shepherd who needs an active owner.',
        render: () => (
            <div>
                <h3>Max</h3>
                <p>Owner: Robert Martinez</p>
                <p>Contact: robert@example.com</p>
                <img src="" alt="Max" />
                <p>
                    Loyal and protective German Shepherd who needs an active owner.
                </p>
            </div>
        ),
    },
    {
        id: 8,
        owner: 'Olivia Parker',
        contact: 'olivia@example.com',
        petName: 'Milo',
        breed: 'Pug',
        img: 'main_assets/posts/post_milo.png',
        description: 'Adorable Pug who loves to snuggle and enjoys lazy afternoons.',
        render: () => (
            <div>
                <h3>Milo</h3>
                <p>Owner: Olivia Parker</p>
                <p>Contact: olivia@example.com</p>
                <img src="" alt="Milo" />
                <p>
                    Adorable Pug who loves to snuggle and enjoys lazy afternoons.
                </p>
            </div>
        ),
    },
    {
        id: 9,
        owner: 'Liam Wilson',
        contact: 'liam@example.com',
        petName: 'Coco',
        breed: 'Cockatoo',
        img: 'main_assets/posts/post_coco.png',
        description: 'A friendly and talkative Cockatoo who loves attention.',
        render: () => (
            <div>
                <h3>Coco</h3>
                <p>Owner: Liam Wilson</p>
                <p>Contact: liam@example.com</p>
                <img src="" alt="Coco" />
                <p>
                    A friendly and talkative Cockatoo who loves attention.
                </p>
            </div>
        ),
    },
    {
        id: 10,
        owner: 'Ella Davis',
        contact: 'ella@example.com',
        petName: 'Shadow',
        breed: 'Black Cat',
        img: 'main_assets/posts/post_shadow.png',
        description: 'A mysterious black cat with a calm demeanor and piercing eyes.',
        render: () => (
            <div>
                <h3>Shadow</h3>
                <p>Owner: Ella Davis</p>
                <p>Contact: ella@example.com</p>
                <img src="" alt="Shadow" />
                <p>
                    A mysterious black cat with a calm demeanor and piercing eyes.
                </p>
            </div>
        ),
    },
];
