const SaveUserForm = async (formData) => {
  //I use dummy database which I have in Fire Base for testing purposes.
  try {
    const response = await fetch(
      "https://react-http-d79c3-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    //off course I could do better error handling, but that was not the purpose.
    if (!response.status === "ok") throw new Error("something wend wrong");

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export default SaveUserForm;
