'use server'

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import { redirect } from "next/navigation";

export const signIn = async (data: signInProps) => {
    const { email, password } = data

    try {
        //Mutation / Database / Make fetch
        const { account } = await createAdminClient();
        const res = await account.createEmailPasswordSession(email, password);
        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(res);
    } catch (error) {
        console.error("Error signing in", error);

        return null;
    }
}

export const signUp = async (data: SignUpParams) => {
    const { email, password, firstName, lastName } = data

    try {
        //Crate a user account
        const { account } = await createAdminClient();
        const newUser = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUser);
    } catch (error) {
        console.error("Error signing in", error);

        return null;
    }
}


export const getLoggedInUser = async () => {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();

        return parseStringify(user);
    } catch (error) {
        console.error("Error getting user", error);

        return null;
    }
}

export const signOut = async () => {
    try {
        const { account } = await createSessionClient();

        (await cookies()).delete("appwrite-session");
        await account.deleteSession("current");
    }
    catch (error) {
        console.error("Error signing out", error);

        return null;
    }
}