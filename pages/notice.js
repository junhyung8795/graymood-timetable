import Seo from "../components/Seo";
import dbConnect from "../db/dbConnect";
import Item from "../db/schema/item";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function About({ items }) {
    const router = useRouter();

    useEffect(() => {
        const alreadyAccessed = localStorage.getItem("accessCode");
        if (!alreadyAccessed) {
            router.push("/");
        }
    }, []);
    const handleLogout = (e) => {
        localStorage.clear();
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
            <button
                type="button"
                class="btn btn-secondary"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export async function getServerSideProps() {
    await dbConnect();
    await Item.insertMany({ name: "newone!" });
    const result = await Item.find({}).exec();
    const items = result.map((doc) => {
        const item = doc.toObject();
        item._id = item._id.toString();
        return item;
    });
    return { props: { items } };
}
