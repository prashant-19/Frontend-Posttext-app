const BASE_URL = "http://localhost:5000";

export const GET = async (endpoint) => {
  const token = localStorage.getItem("token");
  const res = await fetch(BASE_URL + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw { status: res.status, ...error };
  }

  return res.json();
};

export const POST = async (endpoint, data) => {
  const token = localStorage.getItem("token");
  const res = await fetch(BASE_URL + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw { status: res.status, ...error };
  }

  return res.json();
};

export const PUT = async (endpoint, data) => {
  const token = localStorage.getItem("token");
  const res = await fetch(BASE_URL + endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw { status: res.status, ...error };
  }

  return res.json();
};

export const DELETE = async (endpoint) => {
  const token = localStorage.getItem("token");
  const res = await fetch(BASE_URL + endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw { status: res.status, ...error };
  }

  return res.json();
};
