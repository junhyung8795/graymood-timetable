import Head from "next/head";

export default function Seo({ title }) {
    const fullTitle = `${title} | Graymood Timetable`;
    return (
        <>
            <Head>
                <title>{fullTitle}</title>
            </Head>
        </>
    );
}
