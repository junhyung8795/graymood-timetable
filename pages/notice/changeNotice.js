// import Seo from "../../components/Seo";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useEffect } from "react";
// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";

// export default function MemberChangeAccessCode() {
//     const router = useRouter();
//     const { data: session, status } = useSession();
//     const [userCode, setUserCode] = useState("");
//     useEffect(() => {
//         require("bootstrap/dist/js/bootstrap.bundle.min.js");
//         if (session?.user?.name !== "manager") {
//             router.push("/");
//         }
//     }, []);

//     const handleChangeNotice = async (e) => {
//         e.preventDefault();
//         const response = await fetch("/api/notice/changeNotice", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ userCode }),
//         });
//         console.log(response);
//         if (response.status === 200) {
//             router.push("/");
//         } else {
//             router.push("/member/changeAccessCode");
//         }
//     };
//     return (
//         <div className="p-3 mb-2 bg-black text-white">
//             <Seo title="ManagerChangeCode" />
//             <div className="title">
//                 <h1>Graymood Timetable</h1>
//             </div>
//             <h1>동아리원 접속코드 변경페이지</h1>
//             <form
//                 method="GET"
//                 className="input-group mb-3"
//                 onSubmit={handleChangeCode}
//                 id="login"
//             >
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="write the code"
//                     aria-label="Username"
//                     aria-describedby="basic-addon1"
//                     onChange={({ target }) => setUserCode(target.value)}
//                 />
//                 <div className="col-12">
//                     <button className="btn btn-primary" type="submit">
//                         Login
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }
