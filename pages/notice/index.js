import Seo from "../../components/Seo";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import Notice from "../../db/schema/notice";

export default function NoticePage({ session, notice }) {
    const router = useRouter();

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
                backgroundColor: "#111827",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                padding: "10px 10px",
                overflow: "scroll",
                color: "white",
            }}
        >
            <Seo title="Notice" />
            <div>
                <h1>동방 사용 필독 사항</h1>
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
                        backgroundColor: "1F2937",
                    }}
                >
                    {notice.map((item) => {
                        return (
                            <li key={item._id}>
                                <div
                                    style={{
                                        backgroundColor: "#1F2937",
                                        color: "white",
                                        padding: "10px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        borderRadius: "10px",
                                        width: "80vw",
                                        marginBottom: "30px",
                                    }}
                                >
                                    <div>{item.title}</div>
                                    <div
                                        style={{ whiteSpace: "pre-line" }}
                                        className="mb-3"
                                    >
                                        <h1 style={{ fontSize: "30px" }}>
                                            {item.detail}
                                        </h1>
                                    </div>
                                    {session?.user.name === "manager" ? (
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            <button
                                                type="button"
                                                className="btn btn-warning"
                                                style={{
                                                    marginRight: "10px",
                                                }}
                                            >
                                                <Link
                                                    href={`/notice/updateNotice/${item._id}`}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "black",
                                                    }}
                                                >
                                                    공지사항 변경
                                                </Link>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={handleDeleteNotice}
                                                id={item._id}
                                            >
                                                x
                                            </button>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
                {session?.user.name === "manager" ? (
                    <div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-warning"
                                style={{ marginBottom: "10px" }}
                            >
                                <Link
                                    href="/manager/changeAccessCode"
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                >
                                    관리자 접속코드 변경
                                </Link>
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-warning"
                                style={{ marginBottom: "10px" }}
                            >
                                <Link
                                    href="/member/changeAccessCode"
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                >
                                    동아리원 접속코드 변경
                                </Link>
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-warning"
                                style={{ marginBottom: "10px" }}
                            >
                                <Link
                                    href="/notice/addNotice"
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                >
                                    동방사용 필독사항 추가
                                </Link>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
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
