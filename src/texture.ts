import { NearestFilter, Texture, ImageLoader } from 'three'

import { AbstractLoader, OnProgress, OnError } from './loader'

export class MinecraftTexture extends Texture {
  constructor (image?: HTMLImageElement) {
    super(image)
    this.magFilter = NearestFilter
  }
}

type OnLoad = (texture: MinecraftTexture) => void

export class MinecraftTextureLoader extends AbstractLoader {
  public crossOrigin = 'anonymous'

  public load (url: string, onLoad?: OnLoad, onProgress?: OnProgress, onError?: OnError) {
    const texture = new MinecraftTexture()

    const loader = new ImageLoader(this.manager)
    loader.setCrossOrigin(this.crossOrigin)
    loader.setPath(this.path)

    const handleLoad = (image: HTMLImageElement) => {
      texture.image = image
      texture.needsUpdate = true

      if (onLoad) {
        onLoad(texture)
      }
    }

    loader.load(url, handleLoad, onProgress, onError)

    return texture
  }

  public setCrossOrigin (value: string) {
    this.crossOrigin = value
    return this
  }
}

export const MISSING_TEXTURE = new MinecraftTextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4goSFSEEtucn/QAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAkSURBVCjPY2TAAX4w/MAqzsRAIhjVQAxgxBXeHAwco6FEPw0A+iAED8NWwMQAAAAASUVORK5CYII=')
