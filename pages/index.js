import Seo from "../components/Seo";

export default function Home() {
    return (
        <div>
            <Seo title="Home" />
            <div className="title">
                <h1>Graymood Timetable</h1>
            </div>
            <form>
                <button></button>
            </form>
            <style jsx>{`
                .title {
                    display: flex;
                    justify-content: center;
                }
            `}</style>
        </div>
    );
}
