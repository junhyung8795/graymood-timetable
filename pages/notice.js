import Seo from "../components/Seo";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Notice from "../db/schema/notice";

export default function NoticePage({ session, notice }) {
    const router = useRouter();
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    console.log(session);
    const handleLogout = (e) => {
        signOut({ callbackUrl: "/" });
    };
    return (
        <div>
            <Seo title="Notice" />
            <h1>동방 사용 필독 사항</h1>
            <ul>
                {notice.map((item, index) => {
                    return (
                        <li key={index}>
                            <h1>{item.title}</h1>
                            <h1>{item.detail}</h1>
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

            <button
                type="button"
                className="btn btn-secondary"
                onClick={handleLogout}
            >
                Logout
            </button>
            <div>
                <Link href="/timeTable">동방일지</Link>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    // const itemArray = await Item.find({});
    // const items = itemArray.map((doc) => {
    //     const item = doc.toObject();
    //     item._id = item._id.toString();
    //     return item;
    // });
    // const memberAccessCodeArray = await MemberAccessCode.find({});
    // const memberAccessCode = memberAccessCodeArray.map((doc) => {
    //     const item = doc.toObject();
    //     item._id = item._id.toString();
    //     return item;
    // });
    // const managerAccessCodeArray = await ManagerAccessCode.find({});
    // const managerAccessCode = managerAccessCodeArray.map((doc) => {
    //     const item = doc.toObject();
    //     item._id = item._id.toString();
    //     return item;
    // });
    const noticeArray = await Notice.find({});
    const notice = noticeArray.map((doc) => {
        const item = doc.toObject();
        item._id = item._id.toString();
        return item;
    });
    const session = await getSession(context);
    console.log(session);
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return { props: { session, notice } };
}
