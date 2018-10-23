import { TextureLoader, NearestFilter, MeshBasicMaterial } from 'three'

export const missingTexture = new TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH4goSFSEEtucn/QAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAkSURBVCjPY2TAAX4w/MAqzsRAIhjVQAxgxBXeHAwco6FEPw0A+iAED8NWwMQAAAAASUVORK5CYII=')

missingTexture.magFilter = NearestFilter

export const missingTextureMaterial = new MeshBasicMaterial({ map: missingTexture })
