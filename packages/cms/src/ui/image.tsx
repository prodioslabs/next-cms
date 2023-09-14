import NextImage from 'next/image'

// TODO: Remove once `next/image` is fixed.
/**
 * This is a workaround for a bug in `next/image` that causes it to have named `default` export.
 * @see https://github.com/vercel/next.js/issues/52216
 */
export const Image = 'default' in NextImage ? (NextImage.default as typeof NextImage) : NextImage
