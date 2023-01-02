import Seo from "../components/Seo";
import dbConnect from "../db/dbConnect";
import Item from "../db/schema/item";

export default function About({ items }) {
    console.log(items);
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
