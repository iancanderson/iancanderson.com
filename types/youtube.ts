type YoutubeThumbnail = {
  url: string;
  width?: number;
  height?: number;
};

type YoutubeVideo = {
  id: string;
  title: string;
  description?: string;
  publishedAt: string; // ISO date
  url: string; // https://www.youtube.com/watch?v=ID
  thumbnails?: {
    default?: YoutubeThumbnail;
    medium?: YoutubeThumbnail;
    high?: YoutubeThumbnail;
  };
};

export default YoutubeVideo;

