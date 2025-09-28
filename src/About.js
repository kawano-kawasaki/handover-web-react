import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function About() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("https://r8lqaz2b13.execute-api.ap-northeast-1.amazonaws.com/dev/events")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log("取得データ:", data); // デバッグ用
                setEvents(data);
            })
            .catch(err => {
                console.error("Fetchエラー:", err);
            });
    }, []);

    if (events.length === 0) return <div>読み込み中…</div>;

    // eventID の重複を除外
    const uniqueEventIDs = Array.from(new Set(events.map(e => e.eventID)));

    return (
        <div>
            <h1>イベント一覧</h1>
            <ul>
                {uniqueEventIDs.map(eventID => (
                    <li key={eventID}>
                        <Link to={`/event/${eventID}`}>{eventID}</Link>
                    </li>
                ))}
            </ul>
            <h1>このサイトについて</h1>
            <h2>概要</h2>
            <h2>使い方</h2>
        </div>
    );
}

export default About;
