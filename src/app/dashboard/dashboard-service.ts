export async function fetchDashboardData(token: string) {
  try {
    const response = await fetch("http://localhost:5000/src/app/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Dashboard fetch error: ", error);
    throw error;
  }
}
