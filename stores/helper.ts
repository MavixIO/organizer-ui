import { defineStore } from 'pinia'
import imageCompression from 'browser-image-compression'

export const useHelperStore = defineStore('helper', {
  getters: {
    compressionOptions: () => ({
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1440,
      useWebWorker: true,
      fileType: 'image/webp',
    }),
  },
  actions: {
    compressImage({ file, ...options }: { file: File }) {
      return imageCompression(file, {
        ...this.compressionOptions,
        ...options,
      })
    },
    async blobToBase64(blob: Blob) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
      })
    },
  },
})
