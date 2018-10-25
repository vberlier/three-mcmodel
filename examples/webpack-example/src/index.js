import {
  Scene, PerspectiveCamera, WebGLRenderer,
  CubeGeometry, EdgesGeometry, LineBasicMaterial, LineSegments
} from 'three'
import OrbitControls from 'three-orbitcontrols'
import { MinecraftModelLoader, MinecraftTextureLoader } from 'three-mcmodel'

// Create the scene and the camera
const scene = new Scene()
const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.set(16, 16, 64)

// Create a mesh from the json model and add it to the scene
new MinecraftModelLoader().load(require('./assets/cake.json'), mesh => {
  const textureLoader = new MinecraftTextureLoader()
  mesh.resolveTextures(path => textureLoader.load(require(`./assets/${path.substr(6)}.png`)))
  scene.add(mesh)
})

// Create cube indicator
const wireframe = new LineSegments(
  new EdgesGeometry(new CubeGeometry(16, 16, 16)),
  new LineBasicMaterial({ color: 0x1111cc, linewidth: 3 })
)
scene.add(wireframe)

// Create the renderer and append it to the document body
const renderer = new WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Create the controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableKeys = false
controls.screenSpacePanning = true

// Update the dimensions of the viewport when the window gets resized
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// Start animation
function animate () {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()
