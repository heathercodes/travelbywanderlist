export async function loginUser(credentials: any) {
  return fetch(`${process.env.REACT_APP_API_URL}user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export async function signupUser(credentials: any) {
  return fetch(`${process.env.REACT_APP_API_URL}user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
