import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import cloudinary from 'cloudinary'
import config from '../config/cloudinary.private.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const staticDir = `${__dirname}/../static`

cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecret,
})

fs.readdir(staticDir, (err, files) => {
  if (err) {
    console.error(err)
  } else {
    files.forEach((file) => {
      if (
        file.endsWith('.jpg') ||
        file.endsWith('.png') ||
        file.endsWith('.webp')
      ) {
        cloudinary.v2.uploader.upload(
          `${staticDir}/${file}`,
          {
            use_filename: true,
            folder: 'blog',
            unique_filename: false,
          },
          function (error, result) {
            console.log(result, error)
          }
        )
      }
    })
  }
})
