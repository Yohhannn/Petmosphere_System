    import React, { useEffect, useState } from 'react';
    import Inner_Header from '../../components/inner_header';
    import ScrollToTopButton from '../utility/util_scroll_up';
    import { Link } from 'react-router-dom'; // Import Link for navigation
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faStar as faStarSolid, faCalendarAlt, faUserCircle, faPlusCircle, faStar as faStarRegular } from '@fortawesome/free-solid-svg-icons';
    import { faCheckDouble, faCheckToSlot, faPaw } from '@fortawesome/free-solid-svg-icons';
    import * as fetch from '../fetchRequest/fetch.js';
    import * as send from '../postRequest/send.js';
    import Cookies from 'js-cookie';

    const request_tab = () => {
      const [activeTab, setActiveTab] = useState('Approved');
      const [adoptionRequests, setAdoptionRequests] = useState([]);
      const [types, setTypes] = useState([]);
      const [approvalRequests, setApprovalRequests] = useState([]);
      const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
      const [newReviewRating, setNewReviewRating] = useState(1);
      const [newReviewDesc, setNewReviewDesc] = useState('');
      const [req, setReq] = useState(null);
      const userCookie = Cookies.get('userCredentials');
      const user = userCookie ? JSON.parse(userCookie) : null;
      const alertPetApproval = {
          alert_type: "adoption_approved",
          admin_id : null,
          alert_title : "Adoption Approval",
      }

        const fetchRequests = async () => {
            if (!user) return;

            const response = await fetch.getAdoptionRequestByUserId(user.user.user_id);
            const filter = ["Cancelled", "Rejected"];

            // Use map + await for async calls
            const filteredRequests = await Promise.all(
                response.data.map(async (req) => {
                    const checkReview = await fetch.getReviewByPetId(req.pet_id);
                    return (!filter.includes(req.req_status) && !checkReview.data) ? req : null;
                })
            );

            // Remove null entries (i.e., rejected or reviewed)
            const validRequests = filteredRequests.filter(Boolean);

            setAdoptionRequests(validRequests);
        };
        useEffect(() => {
            fetchRequests();
        }, []);

      useEffect(() => {
        const fetchTypes = async () => {
          const response = await fetch.getType();
          setTypes(response.data || []);
        };
        fetchTypes();
      }, []);
        const handleCloseAddReview = () => {
            setIsAddReviewOpen(false);
            setNewReviewRating(1);
            setNewReviewDesc('');
        };

        const handleRatingChange = (rating) => {
            setNewReviewRating(rating);
        };

        const handleDescChange = (event) => {
            setNewReviewDesc(event.target.value);
        };
        const handleOpenAddReview = () => {
            setIsAddReviewOpen(true);
        };
        const handleSubmitReview = async() => {
            const reviewObject = {
                "rev_rating" : newReviewRating,
                "rev_date" : new Date().toISOString().slice(0, 10),
                "rev_description" : newReviewDesc,
                "rev_rated_by" : user.user.user_id,
                "user_id" : req.pet.user_id,
                "pet_id" : req.pet_id
            }
            try{
                const response = await send.sendReview(reviewObject);
                console.log(response.message);
            }catch (error){
                console.log("Something went wrong! Error "+error);
            }
            handleCloseAddReview();
            fetchRequests();
        };

        const renderStarRating = () => {
            const stars = [];
            for (let i = 1; i <= 5; i++) {
                stars.push(
                    <FontAwesomeIcon
                        key={i}
                        icon={i <= newReviewRating ? faStarSolid : faStarRegular}
                        className={`cursor-pointer text-xl ${i <= newReviewRating ? 'text-yellow-500' : 'text-gray-300'}`}
                        onClick={() => handleRatingChange(i)}
                    />
                );
            }
            return stars;
        };
        const fetchApprovalRequests = async () => {
            if (!user) return;
            const petRes = await fetch.getPet();
            if (petRes.data) {
                // Get all pets owned by the user
                const userPets = petRes.data
                    .filter(item => item.pet && item.pet.user_id === user.user.user_id)
                    .map(item => item.pet);
                if (userPets.length === 0) {
                    setApprovalRequests([]); // User owns no pets
                    return;
                }
                // Now check for adoption requests for these pets
                const adoptionReqRes = await fetch.getAdoptionRequest();
                if (adoptionReqRes.data) {
                    // Map pets by pet_id for quick lookup
                    const petMap = {};
                    userPets.forEach(pet => {
                        petMap[pet.pet_id] = pet;
                    });
                    // Only include requests with allowed statuses
                    const allowedStatuses = ['Pending', 'Approved'];
                    const requestsNeedingApproval = adoptionReqRes.data
                        .filter(req => petMap[req.pet_id] && allowedStatuses.includes(req.req_status))
                        .map(req => ({
                            ...req,
                            pet: petMap[req.pet_id], // Attach pet details for display
                        }));
                    setApprovalRequests(requestsNeedingApproval);
                } else {
                    setApprovalRequests([]);
                }
            } else {
                setApprovalRequests([]);
            }
        };
      useEffect(() => {
        // First, check if the user owns any pets, then check for adoption requests for those pets
        fetchApprovalRequests();
      }, []);

      // Helper to get type name from type_id
      const getTypeName = (type_id) => {
        const type = types.find(t => t.type_id === type_id);
        return type ? type.type_name : '-';
      };

      return (
        <div>
          {/* Sticky Header */}
          <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeIn">
            <Inner_Header />
          </div>
          <ScrollToTopButton />
          <div className="bg-white mt-20 min-h-screen animate__animated animate__fadeIn">
            <section
              className="mt-20 bg-gradient-to-t from-purple-600 to-orange-400 text-white py-24 text-center bg-cover bg-center animate__animated animate__fadeIn"
              style={{ backgroundImage: "url('../main_assets/images/image_main_banner4.png')" }}
            >
              <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold mb-4 animate__animated animate__bounceIn">Request Approval</h1>
                <p className="text-lg max-w-2xl mx-auto">
                  View and manage your adoption requests.
                </p>
              </div>
            </section>
            {/* Tabs container below the section */}
            <div className="container mx-auto px-6 py-10">
              <div className="bg-white shadow-md border rounded-lg p-6 max-w-3xl mx-auto animate__animated animate__fadeInUp">
                <div className="border-b border-gray-200 mb-6">
                  <nav className="-mb-px flex space-x-4">
                    <button
                      onClick={() => setActiveTab('Approved')}
                      className={`${activeTab === 'Approved'
                        ? 'border-purple-600 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                    >
                      <FontAwesomeIcon icon={faCheckDouble} className="text-lg text-green-600" />
                      Approval
                    </button>
                    <button
                      onClick={() => setActiveTab('Requested')}
                      className={`${activeTab === 'Requested'
                        ? 'border-purple-600 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-purple-600 hover:border-purple-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                    >
                      <FontAwesomeIcon icon={faCheckToSlot} className="text-lg text-orange-500" />
                      Requested
                    </button>
                  </nav>
                </div>
                {/* Icons and details for Approved tab */}
                {activeTab === 'Approved' && (
                  <>
                    {approvalRequests.length === 0 ? (
                      <p className="text-center text-gray-500">No pets need approval.</p>
                    ) : (
                      approvalRequests.map((req) => (
                        <div key={req.req_id} className="flex flex-col md:flex-row mb-6 border-b pb-6 last:border-b-0 last:pb-0">
                          <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                            <div className="flex flex-row md:flex-col items-center gap-8 md:gap-0">
                              <div className="flex flex-col items-center">
                                <div className="flex items-center justify-center w-16 h-16 border-2 border-purple-500 rounded-full">
                                  <FontAwesomeIcon icon={faPaw} className="text-3xl text-black" />
                                </div>
                                <span className="mt-2 text-sm font-medium text-gray-600">{req.req_status}</span>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center ml-0 md:ml-6 flex-1 mt-4 md:mt-0">
                              <span className="text-lg font-semibold text-gray-700">Pet name: <span className="font-normal">{req.pet?.pet_name || '-'}</span></span>
                                <span className="text-base text-gray-700">Requested by: <Link to={`/account/${req.user_id}`}><span className="font-normal"><b>{req.user?.user_name}</b></span></Link></span>
                                <span className="text-base text-gray-700">Request Message: <span className="font-normal">{req.req_message}</span></span>
                                <span className="text-base text-gray-700">Status: <span className="font-normal">{req.req_status}</span></span>
                            </div>
                            <div className="flex flex-col gap-2 ml-0 md:ml-4 mt-4 md:mt-0">
                              <button
                                className={`px-3 py-1 rounded text-xs font-semibold border ${req.req_status === 'Pending' ? 'bg-yellow-400 text-white' : 'bg-white text-yellow-600 border-yellow-400'}`}
                                onClick={async () => {
                                  await send.updateAdoptionRequestStatus(req.req_id, { req_status: 'Pending' });
                                  fetchApprovalRequests();
                                }}
                              >Pending</button>
                              <button
                                className={`px-3 py-1 rounded text-xs font-semibold border ${req.req_status === 'Approved' ? 'bg-green-500 text-white' : 'bg-white text-green-600 border-green-400'}`}
                                onClick={async () => {
                                  await send.updateAdoptionRequestStatus(req.req_id, { req_status: 'Approved' });
                                  fetchApprovalRequests();
                                  alertPetApproval["user_id"] = req.user_id;
                                  alertPetApproval["alert_message"] = "Adoption approval for "+req.pet.pet_name;
                                  await send.sendAlert(alertPetApproval);
                                }}
                              >Approved</button>
                              <button
                                className={`px-3 py-1 rounded text-xs font-semibold border ${req.req_status === 'Completed' ? 'bg-blue-500 text-white' : 'bg-white text-blue-600 border-blue-400'}`}
                                onClick={async () => {
                                  await send.updateAdoptionRequestStatus(req.req_id, { req_status: 'Completed' });
                                  await send.updatePostStatus(req.pet_id, { post_status: 'Unavailable' });
                                  await send.updatePetStatus(req.pet_id, { pet_status: 'Adopted' });
                                  await send.updateRequestRejectStatus(req.user_id,{req_status: 'Rejected',pet_id: req.pet_id});
                                  fetchApprovalRequests();
                                }}
                              >Completed</button>
                              <button
                                className={`px-3 py-1 rounded text-xs font-semibold border ${req.req_status === 'Rejected' ? 'bg-red-500 text-white' : 'bg-white text-red-600 border-red-400'}`}
                                onClick={async () => {
                                  await send.updateAdoptionRequestStatus(req.req_id, { req_status: 'Rejected' });
                                    alertPetApproval["alert_type"] = "adoption_rejected";
                                    alertPetApproval["user_id"] = req.user_id;
                                    alertPetApproval["alert_message"] = "Adoption Rejected for "+req.pet.pet_name;
                                    await send.sendAlert(alertPetApproval);
                                  fetchApprovalRequests();
                                }}
                              >Reject</button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}
                {/* Content for the Requested tab */}
                {activeTab === 'Requested' && (
                  <>
                    {adoptionRequests.length === 0 ? (
                      <p className="text-center text-gray-500">No requested approvals yet.</p>
                    ) : (
                      adoptionRequests.map((req) => (
                        <div key={req.req_id}  className="flex flex-col md:flex-row mb-6 border-b pb-6 last:border-b-0 last:pb-0">
                          <div className="flex flex-col md:flex-row w-full">
                            {/* Icons on the left */}
                            <div className="flex flex-row md:flex-col gap-8 md:gap-0 items-center">
                              <div className="flex flex-col items-center w-full">
                                <div className="flex items-center justify-center w-16 h-16 border-2 border-green-500 rounded-full">
                                  <FontAwesomeIcon icon={faPaw} className="text-3xl text-black" />
                                </div>
                                <span className="mt-2 text-sm font-medium text-gray-600">requested</span>
                                  {req.req_status !== "Completed"  ? (req.req_status !=="Cancelled" &&
                                      (<button
                                  className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-orange-400 transition-colors w-full"
                                  onClick={async () => {
                                    await send.updateAdoptionRequestStatus(req.req_id, { req_status: 'Cancelled' });
                                    fetchRequests();
                                  }}
                                >
                                  Cancel Request
                                </button>)) :  (
                                      <button
                                          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-orange-400 transition-colors w-full"
                                          onClick={()=>{setReq(req); handleOpenAddReview();}}
                                      >
                                          Add Review
                                      </button>
                                  )}
                              </div>
                            </div>
                            {/* Label on the right, take up remaining space and align center vertically */}
                            <div className="flex flex-col justify-center ml-0 md:ml-6 flex-1 mt-4 md:mt-0">
                              <span className="text-lg font-semibold text-gray-700">Status: {req.req_status}</span>
                            </div>
                          </div>
                          {/* Info below the icons */}
                          <div className="mb-4 mt-6">
                            <p className="text-base text-gray-700 font-semibold">Pet name: <span className="font-normal">{req.pet?.pet_name || '-'}</span></p>
                            <p className="text-base text-gray-700 font-semibold">Pet type: <span className="font-normal">{getTypeName(req.pet?.type_id)}</span></p>
                            <p className="text-base text-gray-700 font-semibold">Owner name: <span className="font-normal">{req?.pet.user.user_name || '-'}</span></p>
                          </div>
                        </div>
                      ))
                    )}
                      {isAddReviewOpen && (
                          <div className="fixed inset-0 bg-orange-300 bg-opacity-50 flex justify-center items-center animate__animated animate__fadeIn">
                              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                                  <h2 className="text-xl font-bold mb-4 text-gray-800">Add a Review</h2>
                                  <div className="mb-4">
                                      <h3 className="font-semibold text-gray-700 mb-2">Rating:</h3>
                                      <div className="flex items-center">
                                          {renderStarRating()}
                                      </div>
                                  </div>
                                  <div className="mb-4">
                                      <h3 className="font-semibold text-gray-700 mb-2">Your Review:</h3>
                                      <textarea
                                          value={newReviewDesc}
                                          onChange={handleDescChange}
                                          className="w-full h-32 px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"  // Added bg-white here
                                          placeholder="Write your review here..."
                                      />
                                  </div>
                                  <div className="flex justify-end space-x-4">
                                      <button
                                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition-colors"
                                          onClick={handleCloseAddReview}
                                      >
                                          Cancel
                                      </button>
                                      <button
                                          className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-orange-400 transition-colors"
                                          onClick={handleSubmitReview}
                                      >
                                          Submit Review
                                      </button>
                                  </div>
                              </div>
                          </div>
                      )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }

    export default request_tab
