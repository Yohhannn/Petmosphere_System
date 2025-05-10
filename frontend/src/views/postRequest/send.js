const base_url = "http://localhost:8000/api";
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



