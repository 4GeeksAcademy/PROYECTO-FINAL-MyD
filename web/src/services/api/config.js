export const baseUrl =
  'https://turbo-telegram-pj99w4rj5xvxfv54-5000.app.github.dev/';

export const usersUrl = 'users/';

export const fetchWrapper = async (input, init = {}) => {
  const fetchConfig = {
    method: init.method || 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': sessionStorage.getItem('csrf_access_token') || '',
    },
  };

  if (init.body) {
    fetchConfig.body = init.body;
  }

  return await fetch(input, fetchConfig).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
};
