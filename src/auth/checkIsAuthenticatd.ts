import api from "@/functions/api";

export async function CheckUserValidated() {
    try {
        const response = await api.get('/user/checkauth');
        if(response && response.status === 200) {
            return true; // User is authenticated
        }
        return false;
    } catch (error) {
        return false;
    }
}