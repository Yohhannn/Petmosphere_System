const base_url = "http://127.0.0.1:8000/api";

export async function getPet(){
    const response = await fetch(base_url+"/Pet");
    return await response.json();
}
export async function getCountPet(){
    const response = await fetch(base_url+"/Pets/count");
    return await response.json();
}
export async function getCountPost(){
    const response = await fetch(base_url+"/Posts/count");
    return await response.json();
}
export async function getCountUser(){
    const response = await fetch(base_url+"/Users/count");
    return await response.json();
}
export async function getUsers(){
    const response = await fetch(base_url+"/User");
    return await response.json();
}
export async function getPosts(){
    const response = await fetch(base_url+'/Post');
    return await  response.json();
}
export async function getPostsBy(id){
    const response = await fetch(base_url+`/Post/${id}`);
    return await response.json();
}
export async function getPetByUserId(id){
    const response = await fetch(base_url+`/Pet/user/${id}`);
    return await response.json();
}
export async function getPostsByPet(id){
    const response = await fetch(base_url+`/Post/pet/${id}`);
    return await response.json();
}
export async function getUserBy(id){
    const response = await fetch(base_url+`/User/${id}`);
    return await response.json();
}
export  async function getReviewByUserId(id){
    const response = await fetch(base_url+`/Review/User/${id}`);
    return await response.json();
}
export  async function getReviewByPetId(id){
    const response = await fetch(base_url+`/Review/Pet/${id}`);
    return await response.json();
}
export  async function getPostByUserId(id){
    const response = await fetch(base_url+`/Post/User/${id}`);
    return await response.json();
}
export  async function getType(){
    const response = await fetch(base_url+"/Type");
    return await response.json();
}
export  async function getBreed(){
    const response = await fetch(base_url+"/Breed");
    return await response.json();
}
export  async function getCountAlert(id){
    const response = await fetch(base_url+`/Alert/userCount/${id}`);
    return await response.json();
}
export  async function getAlertByUser(id){
    const response = await fetch(base_url+`/Alert/user/${id}`);
    return await response.json();
}
export  async function getAlerts(){
    const response = await fetch(base_url+"/Alert");
    return await response.json();
}
export  async function getAdoptionRequestByUserId(id){
    const response = await fetch(base_url+`/AdoptionRequest/user/${id}`);
    return await response.json();
}
export  async function getAdoptionRequest(){
    const response = await fetch(base_url+`/AdoptionRequest`);
    return await response.json();
}

