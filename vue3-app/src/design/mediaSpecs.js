export const MEDIA_UPLOAD_SPECS = Object.freeze({
  'game-card': Object.freeze({
    assetKey: 'game',
    label: 'Game artwork',
    width: 720,
    height: 720,
    ratio: '1:1',
    formats: 'WEBP / JPG / PNG',
    maxSize: '2 MB',
    note: 'Keep the main subject inside the center 80% safe area.',
  }),
  'promotion-card': Object.freeze({
    assetKey: 'promo',
    label: 'Promotion artwork',
    width: 1600,
    height: 400,
    ratio: '4:1',
    formats: 'WEBP / JPG / PNG',
    maxSize: '3 MB',
    note: 'Keep the focal object inside the center 70%; the card displays the complete panorama.',
  }),
  banner: Object.freeze({
    assetKey: 'hero',
    label: 'Hero banner',
    actionLabel: 'Add banner',
    width: 2400,
    height: 525,
    ratio: '32:7',
    formats: 'WEBP / JPG / PNG',
    maxSize: '4 MB',
    note: 'Reserve the left 50% for copy and keep key subjects inside the right 35% safe area.',
  }),
  profile: Object.freeze({
    assetKey: 'avatar',
    label: 'Profile avatar',
    width: 512,
    height: 512,
    ratio: '1:1',
    formats: 'WEBP / JPG / PNG',
    maxSize: '1 MB',
    note: 'Use a centered portrait with comfortable space around the face.',
  }),
  navigation: Object.freeze({
    assetKey: 'logo',
    label: 'Brand logo',
    width: 640,
    height: 160,
    ratio: '4:1',
    formats: 'Transparent WEBP / PNG',
    maxSize: '1 MB',
    note: 'Use transparent artwork with no built-in background or shadow.',
  }),
});

export function formatRecommendedSize(spec) {
  return `${spec.width} × ${spec.height} px`;
}
