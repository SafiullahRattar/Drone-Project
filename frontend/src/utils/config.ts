import Cookies from "js-cookie";

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