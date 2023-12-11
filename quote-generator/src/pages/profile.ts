import { useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0/client';

const Profile = () => {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !error && user) {
      const userSub = user.sub;

      
      axios.post('/api/collection', { userSub })
        .then(response => {
          console.log('Response from backend:', response.data); 
        })
        .catch(error => {
          console.error('Error sending user sub to backend:', error);
        });
    }
  }, [user, isLoading, error]);

  return null; 
};

export default Profile;                                                                                  