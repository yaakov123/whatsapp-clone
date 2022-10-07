const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  const teams = new sdk.Teams(client);

  const { teamId, invitees } = JSON.parse(req.payload);

  if (!teamId || !invitees.length) {
    console.warn("Missing or incorrect parameters: ", teamId, invitees);
    return res.json({ teamId, invitees, payload: req.payload });
  }

  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"]
  ) {
    console.warn(
      "Environment variables are not set. Function cannot use Appwrite SDK."
    );
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);
  }

  await Promise.all(
    invitees.map((email) =>
      teams.createMembership(teamId, email, [], "http://localhost:8080")
    )
  );

  res.json({
    success: true,
  });
};
