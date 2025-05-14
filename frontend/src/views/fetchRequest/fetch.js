const base_url = "http://127.0.0.1:8000/api";

export async function getPet(){
    const response = await fetch(base_url+"/Post");
    return await response.json();
}
export async function getTag(){
    const response = await fetch(base_url+"/Post");
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
export async function getUserBy(id){
    const response = await fetch(base_url+`/User/${id}`);
    return await response.json();
}
export  async function getReviewByUserId(id){
    const response = await fetch(base_url+`/Review/User/${id}`);
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
export  async function getAdoptionRequestByUserId(id){
    const response = await fetch(base_url+`/AdoptionRequest/user/${id}`);
    return await response.json();
}
export  async function getAdoptionRequest(){
    const response = await fetch(base_url+`/AdoptionRequest`);
    return await response.json();
}

