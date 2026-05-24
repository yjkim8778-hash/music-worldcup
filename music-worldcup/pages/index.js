import { useState } from "react"

export default function Home() {
  const [url, setUrl] = useState("")
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)

  const loadPlaylist = async () => {
    const playlistId = url.split("list=")[1]

    if (!playlistId) {
      alert("플레이리스트 링크를 넣어주세요")
      return
    }

    setLoading(true)

    const res = await fetch(`/api/playlist?id=${playlistId}`)
    const data = await res.json()

    setSongs(data)
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#111",
      color: "white",
      padding: 40,
      fontFamily: "sans-serif"
    }}>
      <h1>🎵 유튜브뮤직 이상형 월드컵</h1>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="유튜브뮤직 플레이리스트 링크"
        style={{
          width: "100%",
          padding: 16,
          marginTop: 20,
          borderRadius: 10,
          border: "none"
        }}
      />

      <button
        onClick={loadPlaylist}
        style={{
          marginTop: 20,
          padding: 16,
          borderRadius: 10,
          border: "none",
          cursor: "pointer"
        }}
      >
        플레이리스트 불러오기
      </button>

      {loading && <p>불러오는 중...</p>}

      <div style={{ marginTop: 40 }}>
        {songs.map((song, index) => (
          <div
            key={index}
            style={{
              background: "#222",
              padding: 20,
              borderRadius: 10,
              marginBottom: 10
            }}
          >
            <img
              src={song.thumbnail}
              width="120"
              style={{ borderRadius: 10 }}
            />

            <h3>{song.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}