import { getSession } from "next-auth/react";

export default async function Handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).send({ message: "Unauthorized please login" });
  }

  res.send({ clientId: process.env.CLIENT_ID || "sb" });
}
