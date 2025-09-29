import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";


function EventPage() {

        const addItem = async () => {
        if (!form.eventID || !form.title || !form.content) {
            alert("すべて入力してください");
            return;
        }

        // 現在時刻を createdAt にセット
        const now = new Date().toLocaleString();
        const payload = { ...form, createdAt: now };

        try {
            const response = await fetch("https://08en6jgure.execute-api.ap-northeast-1.amazonaws.com/dev/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (response.ok) {
                alert("登録成功: " + result.message);
            } else {
                alert("登録失敗: " + result.message);
            }
        } catch (err) {
            console.error(err);
            alert("通信エラー");
        }
    };

    
  const { eventID } = useParams(); // URL から eventID を取得
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ eventID: eventID, title: "", content: "作成者：" });


  useEffect(() => {
    fetch(`https://r8lqaz2b13.execute-api.ap-northeast-1.amazonaws.com/dev/events`)
      .then(res => res.json())
      .then(data => {
        // 該当 eventID のデータをすべて取得
        const filtered = data
          .filter(d => d.eventID === eventID)
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // 日付順にソート
        setItems(filtered);
      });
  }, [eventID]);

  if (items.length === 0) return <div>読み込み中…</div>;

  return (
    <div className="container">
      <h1>イベント: {eventID}</h1>

      <h2>新規作成</h2>
      <p>新しいカテゴリを追加するには内容を記載し追加ボタンを押してください。ページに反映されるのはリロード後です。</p>
            <h3>タイトルを入力してください</h3>
            <p>イベントなら...2025年度 ツールの使い方なら...○○の導入方法 など</p>
            <textarea
                value={form.title}
                placeholder="引き継ぎ内容のタイトル 例) 2025年度"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                rows={2}          // 高さを指定
                style={{ width: "100%", marginBottom: "10px" }} // 横幅と間隔
            />
            <h3>本文を入力してください</h3>
            <p>実際に引き継ぎたい内容 など</p>
            <textarea 
                value={form.content}
                placeholder="引き継ぎ内容詳細"
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={4}
                style={{ width: "100%", marginBottom: "10px" }}
            />
            <p></p>
            <button onClick={addItem}>追加</button>
      
      <hr />

      <h2>引き継ぎ内容</h2>

      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            <h3>{item.title}</h3>
            <small>{item.createdAt}</small>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventPage;
