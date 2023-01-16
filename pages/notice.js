import Seo from "../components/Seo";
import dbConnect from "../db/dbConnect";
import Item from "../db/schema/item";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserAccessCode from "../db/schema/userAccessCode";
import ManagerAccessCode from "../db/schema/managerAccessCode";

export default function About({ items, userAccessCode, managerAccessCode }) {
    const router = useRouter();
    const [userLoggedIn, setUserLoggedIn] = useState(Boolean);
    const [managerLoggedIn, setManagerLoggedIn] = useState(Boolean);
    useEffect(() => {
        const alreadyAccessed = localStorage.getItem("accessCode");
        if (!alreadyAccessed) {
            router.push("/");
        } else if (
            localStorage.getItem("accessCode") ===
            userAccessCode[0].userAccessCode
        ) {
            setUserLoggedIn(!userLoggedIn);
        } else if (
            localStorage.getItem("accessCode") ===
            managerAccessCode[0].managerAccessCode
        ) {
            setManagerLoggedIn(!managerLoggedIn);
        }
    }, []);

    const handleLogout = (e) => {
        localStorage.clear();
        setUserLoggedIn((current) => !current);
        setManagerLoggedIn((current) => !current);
        router.push("/");
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
            {userLoggedIn ? <div>true</div> : <div>false</div>}
            {managerLoggedIn ? <div>true</div> : <div>false</div>}
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

export async function getServerSideProps() {
    const itemArray = await Item.find({}).exec();
    const items = itemArray.map((doc) => {
        const item = doc.toObject();
        item._id = item._id.toString();
        return item;
    });
    const userAccessCodeArray = await UserAccessCode.find({});
    const userAccessCode = userAccessCodeArray.map((doc) => {
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

    return { props: { items, userAccessCode, managerAccessCode } };
}
