import { LoadingManager, DefaultLoadingManager } from 'three'

export type OnLoad = (response: any) => void
export type OnProgress = (request: ProgressEvent) => void
export type OnError = (error: any) => void

export abstract class AbstractLoader {
  public path = ''

  constructor (public manager: LoadingManager = DefaultLoadingManager) { }

  public abstract load (url: string, onLoad?: OnLoad, onProgress?: OnProgress, onError?: OnError): any

  public setPath (value: string) {
    this.path = value
    return this
  }
}
