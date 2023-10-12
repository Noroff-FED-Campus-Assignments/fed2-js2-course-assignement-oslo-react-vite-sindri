const API_BASE_URL = "https://api.noroff.dev/api/v1";

export async function registerUser() {
  const registrationData = {
    name: "my_username68687554635",
    email: "mik@hotmail.com",
    password: "UzI1NiIsInR5cCI",
  };

  try {
    const response = await fetch(`${API_BASE_URL}/social/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    if (response.ok) {
      const userData = await response.json();
      console.log("User registered successfully:", userData);
    } else {
      console.error("Registration failed. Please try again later.");
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
}
