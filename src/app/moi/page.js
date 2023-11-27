
// Your JavaScript file or component

// Your JavaScript file or component

async function fetchUserByName(userName) {
  try {
    if (typeof userName !== "string" || userName.trim() === "") {
      throw new Error("Invalid userName parameter");
    }

    const response = await fetch(
      process.env.URL + `/api/getUserData?name=${encodeURIComponent(userName)}`
    );

    if (!response.ok) {
        console.log(response.statusText);
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("User Data:", data);
    return data;
    // Handle the data as needed
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    // Handle errors
  }
}

// Call the fetchUserByName function with the desired user's name
const user = await fetchUserByName("Ok");

console.log('user', user);

export default function Page() {
  return <div>{JSON.stringify(user)}</div>;
}
