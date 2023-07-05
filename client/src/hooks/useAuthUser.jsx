import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function useAuthUser() {
  const getAccessToken = localStorage.getItem('accessToken');
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (getAccessToken) {
      const decodeAccessToken = jwtDecode(getAccessToken);
      setAccessToken(getAccessToken);
      setUser(decodeAccessToken);
    }
    if (!getAccessToken) return navigate('/login');
    return;
  }, []);

  return {
    accessToken,
    user,
  };
}

export default useAuthUser;
