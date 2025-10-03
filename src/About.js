import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import "./About.css";
import config from "./config";

function About() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(`${config.API_GET_URL}`)
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

    if (events.length === 0) return <div className="loading">読み込み中…</div>;

    // eventID の重複を除外
    const uniqueEventIDs = Array.from(new Set(events.map(e => e.eventID)));

    return (
        <div className="container">
            <h1>イベント一覧</h1>
            <ul>
                {uniqueEventIDs.map(eventID => (
                    <li key={eventID}>
                        <Link to={`/event/${eventID}`}>{eventID}</Link>
                    </li>
                ))}
            </ul>

            <hr />

            <h1>このサイトについて</h1>
            <h2>概要</h2>
            <p>このサイトは、研究室でのイベント内容やその企画過程を記録し、引き継ぎを行うためのものです。合宿の幹事がスケジュールを共有するのはもちろん、センサのセットアップ方法の記録・共有などにも使用できます。</p>
            <h2>使い方</h2>
            <h3>閲覧したい場合</h3>
            <p>1. イベント一覧を確認し、気になるイベント名をクリックしてください</p>
            <h3>記録したい場合</h3>
            <p>1. イベント一覧を確認し、該当するイベントやタイトルがあるか確認してください</p>
            <p>2. 該当するタイトルがある場合、そのページへ移り入力欄から内容を記載後、追加ボタンをクリックしてください</p>
            <p>3. 該当するイベントがない場合、画面上部の「カテゴリ追加」をクリックし各内容を入力、追加ボタンをクリックしてください</p>
        </div>
    );
}

export default About;
