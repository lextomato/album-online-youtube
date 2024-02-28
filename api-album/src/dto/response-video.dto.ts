export class ResponseVideoDto {
  videoId: string;
  title: string;
  description: string;
  img: string;
  duration: string;

  constructor(partial: Partial<ResponseVideoDto>) {
    Object.assign(this, {
      videoId: partial.videoId,
      title: partial.title,
      description: partial.description,
      img: partial.img,
      duration: partial.duration,
    });
  }
}
