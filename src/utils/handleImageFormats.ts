import Placeholder from '../assets/user-alt.png';

interface handleImageFormatsParams {
  image?: string | File;
}

export function handleImageFormats({
  image,
}: handleImageFormatsParams): string {
  // handle falsy
  if (!image) {
    return Placeholder;
  }

  // handleUrl
  if (
    typeof image === 'string' &&
    (image.includes('http://') || image.includes('https://'))
  ) {
    return image;
  }

  // handle base64
  if (typeof image === 'string') {
    return `data:image/png;base64,${image}`;
  }

  // handle file
  return URL.createObjectURL(image);
}
