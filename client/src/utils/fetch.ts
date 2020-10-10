export async function get(url: string): Promise<any> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "get",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.json();
  } catch (err) {
    return Promise.reject(new Error(err));
  }
}

export async function post(url: string, payload: {}): Promise<any> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "post",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    return response.json();
  } catch (err) {
    return Promise.reject(new Error(err));
  }
}

export async function put(url: string, payload: {}): Promise<any> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "put",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    return response.json();
  } catch (err) {
    return Promise.reject(new Error(err));
  }
}

export async function remove(url: string, payload: {}): Promise<any> {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "delete",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    return response.json();
  } catch (err) {
    return Promise.reject(new Error(err));
  }
}
