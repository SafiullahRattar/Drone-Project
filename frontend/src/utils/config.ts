import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const axios_config = () => {
    const token = Cookies.get('JWT')
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return config

}

export const useCheckJwtCookie = () => {
    const navigate = useNavigate();
    const jwtCookie = Cookies.get('JWT')
    if (!jwtCookie) {
        navigate('/signUp');
    }
};