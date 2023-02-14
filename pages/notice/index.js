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
    };
    return (
        <div
            style={{
                backgroundColor: "#343a40",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "160vh",
                width: "100vw",
                padding: "10px 10px",
            }}
        >
            <Seo title="Notice" />
            <div>
                <h1 style={{ color: "white" }}>동방 사용 필독 사항</h1>
                <nav
                    className="navbar bg-body-tertiary"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "90vw",
                    }}
                >
                    <button type="button" className="btn btn-outline-light">
                        <div>
                            <Link
                                href="/timeTable"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}
                            >
                                동방 시간표
                            </Link>
                        </div>
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </nav>
            </div>
            <div>
                <ul
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {notice.map((item) => {
                        return (
                            <li key={item._id}>
                                <div
                                    style={{
                                        backgroundColor: "white",
                                        color: "black",
                                        padding: "10px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        borderRadius: "10px",
                                        width: "80vw",
                                    }}
                                >
                                    <div>
                                        <h1
                                            style={{
                                                fontSize: "20px",
                                                whiteSpace: "pre-line",
                                            }}
                                        >
                                            {item.title}
                                        </h1>
                                    </div>
                                    <div>
                                        <h1>{item.detail}</h1>
                                    </div>
                                </div>
                                {session?.user.name === "manager" ? (
                                    <div>
                                        <Link
                                            href={`/notice/updateNotice/${item._id}`}
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
