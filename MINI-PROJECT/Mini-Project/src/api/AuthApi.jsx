export const loginUser = async (credentials) => {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid credentials");
    }

    return {
      user: data,
      token: data.token,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};
