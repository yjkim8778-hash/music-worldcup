export default async function handler(req, res) {
  const { id } = req.query

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${process.env.YT_API_KEY}`
  )

  const data = await response.json()

  const songs = data.items.map((item) => ({
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.high.url
  }))

  res.status(200).json(songs)
}