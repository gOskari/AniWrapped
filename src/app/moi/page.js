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
    return data;
    // Handle the data as needed
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    // Handle errors
  }
}

// Call the fetchUserByName function with the desired user's name

/*
const responsee = fetch(process.env.URL + `/api/getUserData`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id:user.id }),
});
*/

export default async function Page() {
  const user = await fetchUserByName("Ok");

  /*
  const response = await fetch(
    process.env.URL + `/api/deleteUserData?name=${encodeURIComponent('moi')}`, { cache:'no-store'}
  );
  */

  const res = await fetch(process.env.URL + `/api/deleteUserData`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: 'moi' }),
    cache: 'no-store',
  });
  
  if (res.ok) {
    const responseData = await res.json();
    console.log('res:', responseData);
  } else {
    console.log(`Error: ${res.status} - ${res.statusText}`);
  }
  return <div>{JSON.stringify(user)}</div>;
}
