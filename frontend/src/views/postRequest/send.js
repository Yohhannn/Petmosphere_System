const base_url = "http://127.0.0.1:8000/api";
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

