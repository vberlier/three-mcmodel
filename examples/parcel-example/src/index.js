import {
  Scene, PerspectiveCamera, WebGLRenderer,
  CubeGeometry, EdgesGeometry, LineBasicMaterial, LineSegments
} from 'three'
import OrbitControls from 'three-orbitcontrols'
import { MinecraftModelLoader, MinecraftTextureLoader } from 'three-mcmodel'

let scene
let camera
let controls
let renderer

function init () {
  scene = new Scene()
  camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000)
  camera.position.set(16, 16, 64)

  renderer = new WebGLRenderer({ antialias: true, alpha: true })
  document.body.appendChild(renderer.domElement)
  renderer.setSize(window.innerWidth, window.innerHeight)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableKeys = false
  controls.screenSpacePanning = true

  scene.add(new LineSegments(
    new EdgesGeometry(new CubeGeometry(16, 16, 16)),
    new LineBasicMaterial({ color: 0x1111cc, linewidth: 3 })
  ))

  loadModel()

  animate()
}

function loadModel () {
  const modelUrl = require('./assets/cake.json')
  const textureUrls = {
    'block/cake_bottom': require('./assets/cake_bottom.png'),
    'block/cake_side': require('./assets/cake_side.png'),
    'block/cake_top': require('./assets/cake_top.png')
  }

  new MinecraftModelLoader().load(modelUrl, mesh => {
    const textureLoader = new MinecraftTextureLoader()
    mesh.resolveTextures(path => textureLoader.load(textureUrls[path]))
    scene.add(mesh)
  })
}

function animate () {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

init()
