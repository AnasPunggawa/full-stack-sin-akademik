import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function useAuthUser() {
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = localStorage.getItem('accessToken');
    if (getAccessToken) {
      const decodeAccessToken = jwtDecode(getAccessToken);
      setAccessToken(getAccessToken);
      setUser(decodeAccessToken);
    }
    navigate('/login');
    return;
  }, []);

  return { accessToken, user };
}

export default useAuthUser;
