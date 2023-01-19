import Seo from "../components/Seo";
import Item from "../db/schema/item";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MemberAccessCode from "../db/schema/memberAccessCode";
import ManagerAccessCode from "../db/schema/managerAccessCode";
import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function About({ items, memberAccessCode, managerAccessCode }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    useEffect(() => {}, []);
    console.log(session);
    const handleLogout = (e) => {
        signOut({ callbackUrl: "/" });
    };
    return (
        <div>
            <Seo title="About" />
            <h1>About</h1>
            <ul>
                {items.map((item, index) => {
                    return (
                        <li key={index}>
                            <h1>{item.name}</h1>
                        </li>
                    );
                })}
            </ul>
            {session?.user.name === "manager" ? (
                <div>
                    <div>
                        <Link href="/manager/changeAccessCode">
                            관리자 접속코드 변경
                        </Link>
                    </div>
                    <div>
                        <Link href="/member/changeAccessCode">
                            동아리원 접속코드 변경
                        </Link>
                    </div>
                </div>
            ) : (
                <div>memeber session</div>
            )}
            {session?.user.name === "member" ? (
                <div>membersession</div>
            ) : (
                <div>manager session</div>
            )}
            <button
                type="button"
                className="btn btn-secondary"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const itemArray = await Item.find({});
    const items = itemArray.map((doc) => {
        const item = doc.toObject();
        item._id = item._id.toString();
        return item;
    });
    const memberAccessCodeArray = await MemberAccessCode.find({});
    const memberAccessCode = memberAccessCodeArray.map((doc) => {
        const item = doc.toObject();
        item._id = item._id.toString();
        return item;
    });
    const managerAccessCodeArray = await ManagerAccessCode.find({});
    const managerAccessCode = managerAccessCodeArray.map((doc) => {
        const item = doc.toObject();
        item._id = item._id.toString();
        return item;
    });

    return { props: { items, memberAccessCode, managerAccessCode } };
}
