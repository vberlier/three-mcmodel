import { NearestFilter, Texture, ImageLoader } from 'three'

import { AbstractLoader, OnProgress, OnError } from './loader'

export const CHECKERBOARD_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4goSFSEEtucn/QAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAkSURBVCjPY2TAAX4w/MAqzsRAIhjVQAxgxBXeHAwco6FEPw0A+iAED8NWwMQAAAAASUVORK5CYII='

export class MinecraftTexture extends Texture {
  private _image?: HTMLImageElement

  constructor (image?: HTMLImageElement) {
    super()
    this.image = image
    this.magFilter = NearestFilter
  }

  get image () {
    return this._image
  }

  set image (value) {
    this._image = value && value.width === value.height ? value : new ImageLoader().load(CHECKERBOARD_IMAGE)
    this.needsUpdate = true
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
