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

  const database = new sdk.Databases(client);
  const teams = new sdk.Teams(client);

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

  const teamId = JSON.parse(
    req.variables["APPWRITE_FUNCTION_EVENT_DATA"]
  ).teamId;

  const { memberships } = await teams.listMemberships(teamId);
  const userIds = memberships.map((membership) => membership.userId);

  await Promise.allSettled(
    userIds.flatMap((userId) => {
      return memberships.map((membership) => {
        if (membership.userId === userId) return Promise.resolve();

        return database.createDocument(
          "whatsapp",
          "contacts",
          sdk.ID.unique(),
          {
            user_id: userId,
            contact_id: membership.userId,
            email: membership.userEmail,
          },
          [sdk.Permission.read(sdk.Role.user(userId))]
        );
      });
    })
  );

  res.json({
    success: true,
  });
};
