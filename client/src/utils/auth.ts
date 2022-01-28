export async function loginUser(credentials: any) {
  return fetch(`${process.env.REACT_APP_API_URL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
