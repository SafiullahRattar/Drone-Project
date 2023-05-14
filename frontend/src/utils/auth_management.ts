import Cookies from "js-cookie";

export const getToken = (): string | null => {
  const jwtCookie = Cookies.get("JWT");
  if (jwtCookie) {
    return jwtCookie;
  }
  return null;
};
