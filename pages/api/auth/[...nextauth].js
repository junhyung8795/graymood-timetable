import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const client = await MongoClient.connect(
                    process.env.NEXT_PUBLIC_MONGODB_URL,
                    { useNewUrlParser: true, useUnifiedTopology: true }
                );
                const MemberAccessCode = await client
                    .db()
                    .collection("memberaccesscodes");
                const memberAccessed = await MemberAccessCode.findOne({
                    memberAccessCode: credentials.password,
                });
                const ManagerAccessCode = await client
                    .db()
                    .collection("manageraccesscodes");
                const managerAccessed = await ManagerAccessCode.findOne({
                    managerAccessCode: credentials.password,
                });
                if (memberAccessed) {
                    client.close();
                    const user = {
                        name: "member",
                    };
                    return user;
                } else if (managerAccessed) {
                    client.close();
                    const user = {
                        name: "manager",
                    };
                    return user;
                }
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});

export const config = {
    runtime: "experimental-edge",
};
