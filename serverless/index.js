exports.handler = async (event) => {
  console.log({ event });
  let response = {};
  if (event.key1 === "error") {
    response = {
      statusCode: 500,
      body: JSON.stringify("Oh No something is wrong."),
    };
  } else if (event.key1 === "success") {
    response = {
      statusCode: 200,
      body: JSON.stringify("Everything is kosher and groovy."),
    };
  } else {
    response = {
      statusCode: 400,
      body: JSON.stringify(
        "Not sure what you want. Unauthorized Access Attempt logged."
      ),
    };
  }
  return response;
};
