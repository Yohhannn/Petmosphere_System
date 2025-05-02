import accountDatas from './accountsData'; // Assuming accountsData.jsx is in the same directory

const reviewsData = [
  {
    ReviewTo: accountDatas[0].accountID, // Reviews for John Doe
    reviews: [
      {
        ReviewID: 101,
        Reviewer: accountDatas[1].accountFullName, // Review by Alice Smith
        ReviewRatings: 4.5,
        ReviewDesc: "John is a very reliable and helpful person. Highly recommended!",
        ReviewDate: "2025-04-20",
      },
      {
        ReviewID: 102,
        Reviewer: accountDatas[2].accountFullName, // Review by Robert Brown
        ReviewRatings: 4.3,
        ReviewDesc: "Good communication and a pleasure to work with.",
        ReviewDate: "2025-04-25",
      },
    ],
  },
  {
    ReviewTo: accountDatas[1].accountID, // Reviews for Alice Smith
    reviews: [
      {
        ReviewID: 201,
        Reviewer: accountDatas[0].accountFullName, // Review by John Doe
        ReviewRatings: 4.8,
        ReviewDesc: "Alice is incredibly dedicated and caring. A wonderful individual.",
        ReviewDate: "2025-03-25",
      },
      {
        ReviewID: 202,
        Reviewer: accountDatas[3].accountFullName, // Review by Emily White
        ReviewRatings: 4.6,
        ReviewDesc: "Very helpful and goes above and beyond.",
        ReviewDate: "2025-04-01",
      },
      {
        ReviewID: 203,
        Reviewer: accountDatas[2].accountFullName, // Review by Robert Brown
        ReviewRatings: 4.0,
        ReviewDesc: "A solid and dependable person.",
        ReviewDate: "2025-04-15",
      },
    ],
  },
  {
    ReviewTo: accountDatas[2].accountID, // Reviews for Robert Brown
    reviews: [
      {
        ReviewID: 301,
        Reviewer: accountDatas[3].accountFullName, // Review by Emily White
        ReviewRatings: 4.9,
        ReviewDesc: "Robert's expertise is evident. Highly skilled!",
        ReviewDate: "2025-05-01",
      },
      {
        ReviewID: 302,
        Reviewer: accountDatas[0].accountFullName, // Review by John Doe
        ReviewRatings: 4.7,
        ReviewDesc: "Excellent advice and a great resource.",
        ReviewDate: "2025-04-10",
      },
    ],
  },
  {
    ReviewTo: accountDatas[3].accountID, // Reviews for Emily White
    reviews: [
      {
        ReviewID: 401,
        Reviewer: accountDatas[1].accountFullName, // Review by Alice Smith
        ReviewRatings: 5.0,
        ReviewDesc: "Emily is an amazing advocate! Her passion is truly inspiring.",
        ReviewDate: "2025-03-30",
      },
    ],
  },
];

export default reviewsData;