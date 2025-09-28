import { useState } from 'react';

// 新しい引き継ぎを作成
function Newitem() {
    const [form, setForm] = useState({ eventID:"", createdAt:"", title:"", content:"" });

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

    return(
        <div>
            <p>新しいカテゴリを追加するには内容を記載し追加ボタンを押してください。ページに反映されるのはリロード後です。</p>
           

            <h3>カテゴリ名を入力してください</h3>
            <p>合宿、歓迎会、GPUサーバメンテナンス など</p>
            <input 
                type="text"
                value={form.eventID}
                placeholder="カテゴリ名"
                onChange={(e) => setForm({ ...form, eventID: e.target.value })}
            />
            <h3>カテゴリ名を入力してください</h3>
            <p>合宿、歓迎会、GPUサーバメンテナンス など</p>
            <textarea
                value={form.title}
                placeholder="引き継ぎ内容のタイトル 例) 2025年度"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                rows={2}          // 高さを指定
                style={{ width: "100%", marginBottom: "10px" }} // 横幅と間隔
            />
            <h3>カテゴリ名を入力してください</h3>
            <p>合宿、歓迎会、GPUサーバメンテナンス など</p>
            <input 
                type="text"
                value={form.content}
                placeholder="引き継ぎ内容詳細"
                onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            <p></p>
            <button onClick={addItem}>追加</button>
        </div>
    );
}

export default Newitem;
