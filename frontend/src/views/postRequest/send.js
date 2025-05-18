const base_url = "http://localhost:8000/api";
const cloud_name = "dqkyngbew";
const preset = "Petmosphere";

export async function uploadImage(file){
    const formData = new FormData();
    formData.append("file",file);
    formData.append("upload_preset",preset);
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,{
        method: "POST",
        body: formData
    });
    return await response.json();
}
export async function login(data){
    const response = await fetch(base_url+"/login",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
   return await response.json();
}
export async function signUp(data){
    const response = await fetch(base_url+"/User",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    return await response.json();
}
export async function sendReview(data){
    const response = await fetch(base_url+"/Review",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    return await response.json();
}
export async function sendPet(data){
    const response = await fetch(base_url+"/Pet",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
export async function sendPost(data){
    const response = await fetch(base_url+"/Post",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
export async function sendAdoptionRequest(data){
    const response = await fetch(base_url+"/AdoptionRequest",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
export async function updateAdoptionRequestView(id,data){
    const response = await fetch(base_url+`/AdoptionRequest/update/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
export async function updateAdoptionRequestStatus(id,data){
    const response = await fetch(base_url+`/AdoptionRequest/update/status/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
export async function updateRequestRejectStatus(id,data){
    const response = await fetch(base_url+`/AdoptionRequest/update/rejected/status/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
export async function updatePostStatus(id,data){
    const response = await fetch(base_url+`/Post/status/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
export async function updateUserVerification(id,data){
    const response = await fetch(base_url+`/User/verified/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
export async function updateUser(id,data){
    const response = await fetch(base_url+`/User/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
export async function updatePetStatus(id,data){
    const response = await fetch(base_url+`/Pet/status/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
export async function checkAdoption(data){
    const response = await fetch(base_url+"/AdoptionRequest/verify",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}
export async function sendBreed(data){
    const response = await fetch(base_url+"/Breed",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    return await response.json();
}



