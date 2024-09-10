export const userGetUserInfo = () => {
    const {userId,name,profilePhoto,isAuth} = JSON.parse(localStorage.getItem("auth"))
    return { userId,name,profilePhoto,isAuth };
} 