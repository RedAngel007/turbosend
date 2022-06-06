
class UserService{
    getCurrentUser(){
        const user = localStorage.getItem("user");

        if(user != null)
        {
            return JSON.parse(user)
        }

        return null;
    }
}

export default new UserService();