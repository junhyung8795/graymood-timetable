import Seo from "../../components/Seo";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Notice from "../../db/schema/notice";

export default function NoticePage({ session, notice }) {
    const router = useRouter();
    useEffect(() => {}, []);

    const handleLogout = (e) => {
        signOut({ callbackUrl: "/" });
    };

    const handleDeleteNotice = async (e) => {
        await fetch("/api/notice/deleteNotice", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: e.target.id }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(typeof data.statusCode);
                if (data.statusCode === "200") {
                    window.location.reload(true);
                } else if (data.statusCode === "500") {
                    window.location.reload(true);
                }
            });

        // const result = response.json();
        // if (result.statusCode === 200) {
        //     console.log(result.message);
        //     window.location.reload();
        // } else if (response.statusCode === 500) {
        //     console.log(response.message);
        //     router.push("/notice");
        // }
    };
    return (
        <div>
            <Seo title="Notice" />
            <h1>동방 사용 필독 사항</h1>
            <ul>
                {notice.map((item) => {
                    return (
                        <li key={item._id}>
                            <div>
                                <h1>{item.title}</h1>
                                <h1>{item.detail}</h1>
                            </div>
                            {session?.user.name === "manager" ? (
                                <div>
                                    <Link
                                        href={`/notice/changeNotice/${item._id}`}
                                    >
                                        공지사항 변경
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleDeleteNotice}
                                        id={item._id}
                                    >
                                        x
                                    </button>
                                </div>
                            ) : (
                                <div></div>
                            )}
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
                    <div>
                        <Link href="/notice/addNotice">
                            동방사용 필독사항 추가
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
    // await Notice.insertMany({ title: "sadasd", detail: "sadas" });
    const noticeArray = await Notice.find({});
    const notice = noticeArray.map((doc) => {
        const item = doc.toObject();
        item._id = item._id.toString();
        return item;
    });
    const session = await getSession(context);
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
