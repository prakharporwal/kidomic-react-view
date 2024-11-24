export type HomeRecommendationResponse = {
  id: string;
  title: string;
  documentId: string;
  viewType?: string;
  stories?: StoryReponse[];
};

export type StoryReponse = {
  id: string;
  title: string;
  documentId: string;
  description?: string;
  thumbnail_url: string;
  thumbnail?: ImageModel;
  videos?: VideoResponse[];
  author?: string;
};

export type VideoResponse = {
  id: string;
  title: string;
  documentId: string;
  description: string;
  cover_image?: ImageModel;
  video_uri?: {
    url: string;
    previewUrl?: string;
    mime: string;
    documentId: string;
    alternativeText?: string;
  };
  thumbnail_url: string;
};

export type HomeCarouselResponse = {
  id: number;
  documentId: string;
  title: string;
  redirectUrl: string;
  image: ImageModel;
};

export type ImageModel = {
  id: number;
  documentId: string;
  name: string;
  width: number;
  height: number;
  mime: string;
  ext: string;
  url?: string;
  formats: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    thumbnail: { url: string };
  };
};
