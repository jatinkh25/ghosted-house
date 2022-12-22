import {
  AmbientLight,
  BoxGeometry,
  Clock,
  ConeGeometry,
  DirectionalLight,
  DirectionalLightHelper,
  Float32BufferAttribute,
  Fog,
  Group,
  Mesh,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  PointLightHelper,
  RepeatWrapping,
  Scene,
  SphereGeometry,
  TextureLoader,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Textures
const textureLoader = new TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclutionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughtnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclutionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclutionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

const gravesColorTexture = textureLoader.load('/textures/graves/diff.png')
const gravesAmbientOcclutionTexture = textureLoader.load('/textures/graves/ao.png')
const gravesNormalTexture = textureLoader.load('/textures/graves/normal.png')
const gravesMetalnessTexture = textureLoader.load('/textures/graves/arm.png')
const gravesRoughnessTexture = textureLoader.load('textures/graves/roughness.png')

grassColorTexture.repeat.set(25, 25)
grassAmbientOcclutionTexture.repeat.set(25, 25)
grassNormalTexture.repeat.set(25, 25)
grassRoughnessTexture.repeat.set(25, 25)

grassColorTexture.wrapS = RepeatWrapping
grassAmbientOcclutionTexture.wrapS = RepeatWrapping
grassNormalTexture.wrapS = RepeatWrapping
grassRoughnessTexture.wrapS = RepeatWrapping

grassColorTexture.wrapT = RepeatWrapping
grassAmbientOcclutionTexture.wrapT = RepeatWrapping
grassNormalTexture.wrapT = RepeatWrapping
grassRoughnessTexture.wrapT = RepeatWrapping

gravesColorTexture.repeat.set(2, 2)
gravesAmbientOcclutionTexture.repeat.set(2, 2)
gravesNormalTexture.repeat.set(2, 2)
gravesRoughnessTexture.repeat.set(2, 2)
gravesMetalnessTexture.repeat.set(2, 2)

gravesColorTexture.wrapT = RepeatWrapping
gravesAmbientOcclutionTexture.wrapT = RepeatWrapping
gravesNormalTexture.wrapT = RepeatWrapping
gravesRoughnessTexture.wrapT = RepeatWrapping
gravesMetalnessTexture.wrapT = RepeatWrapping

gravesColorTexture.wrapS = RepeatWrapping
gravesAmbientOcclutionTexture.wrapS = RepeatWrapping
gravesNormalTexture.wrapS = RepeatWrapping
gravesRoughnessTexture.wrapS = RepeatWrapping
gravesMetalnessTexture.wrapS = RepeatWrapping

const scene = new Scene()

// Floor
const floor = new Mesh(
  new PlaneGeometry(40, 40),
  new MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclutionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
)
floor.geometry.setAttribute(
  'uv2',
  new Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

// House Group
const house = new Group()
scene.add(house)

// Walls
const walls = new Mesh(
  new BoxGeometry(5, 2, 5),
  new MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclutionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
)
walls.geometry.setAttribute(
  'uv2',
  new Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)
walls.position.y = 2 / 2
house.add(walls)

// Roof
const roof = new Mesh(new ConeGeometry(4, 1, 4), new MeshStandardMaterial({ color: '#b35f45' }))
roof.position.y = 2 + 0.5
roof.rotation.y = Math.PI * 0.25
house.add(roof)

// Door
const door = new Mesh(
  new PlaneGeometry(2, 2, 100, 100),
  new MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclutionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    roughnessMap: doorRoughtnessTexture,
    metalnessMap: doorMetalnessTexture,
  })
)
door.geometry.setAttribute('uv2', new Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.set(0, 1 - 0.1, 2.5 + 0.01)
house.add(door)

// Bushes
const bushGeometry = new SphereGeometry(1, 20, 20)
const bushMaterial = new MeshStandardMaterial({ color: '#89c854' })

const bush1 = new Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(1.25, 0.2, 2.8)
house.add(bush1)

const bush2 = new Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.2, 0.2, 0.2)
bush2.position.set(2, 0.1, 2.8)
house.add(bush2)

const bush3 = new Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.35, 0.35, 0.35)
bush3.position.set(-2, 0.1, 2.8)
house.add(bush3)

const bush4 = new Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.25, 0.25, 0.25)
bush4.position.set(-1.5, 0.1, 3.5)
house.add(bush4)

// Graves Group
const graves = new Group()
scene.add(graves)

const graveGeometry = new BoxGeometry(0.7, 1.2, 0.3)
const graveMaterial = new MeshStandardMaterial({
  map: gravesColorTexture,
  normalMap: gravesNormalTexture,
  aoMap: gravesAmbientOcclutionTexture,
  roughnessMap: gravesRoughnessTexture,
  // displacementMap: gravesDisplacementTexture,
  // displacementScale: 0.1,
  // wireframe: true,
  metalnessMap: gravesMetalnessTexture,
})
graveGeometry.setAttribute('uv2', new Float32BufferAttribute(graveGeometry.attributes.uv.array, 3))

// Graves
for (let i = 0; i < 50; ++i) {
  const grave = new Mesh(graveGeometry, graveMaterial)
  grave.castShadow = true

  const angle = Math.random() * Math.PI * 2
  const dis = 4 + Math.random() * 12
  const x = Math.sin(angle) * dis
  const z = Math.cos(angle) * dis

  grave.position.set(x, 0.4, z)
  grave.rotation.z = (Math.random() - 0.5) * 0.3
  graves.add(grave)
}

// Ambient Light
const ambientLight = new AmbientLight('#b9d5ff', 0.15)
scene.add(ambientLight)

// Directional Light
const moonLight = new DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(6, 7, -2)
scene.add(moonLight)

const doorLight = new PointLight('#ff7d46', 1.5, 10)
doorLight.position.set(0, 2 - 0.25, 3.1)
house.add(doorLight)

// Fog
const fog = new Fog('#444551', 1, 15)
scene.fog = fog

// Ghosts
const ghost1 = new PointLight('#ff00ff', 2, 3)
// ghost1.position.set(5, 0, 5)
scene.add(ghost1)

const ghost2 = new PointLight('#00ffff', 2, 3)
scene.add(ghost2)

const ghost3 = new PointLight('#ffff00', 2, 3)
scene.add(ghost3)

// Directional Light Helper
// const directionalLightHelper = new DirectionalLightHelper(moonLight, 5, '#fff')
// scene.add(directionalLightHelper)

// PointLightHelper
// const pointLightHelper = new PointLightHelper(pointLight, 0.5)
// scene.add(pointLightHelper)

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const camera = new PerspectiveCamera(90, size.width / size.height)
camera.position.set(0, 1.5, 7)

const canvas = document.querySelector('canvas.webgl')

const renderer = new WebGLRenderer({ canvas })

// Event for resizing the canvas on window resize
window.addEventListener('resize', () => {
  size.width = window.innerWidth
  size.height = window.innerHeight

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Event to Full Screen the window on Double Click
window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

  if (!fullscreenElement) {
    if (canvas.requestFullscreen()) {
      canvas.requestFullscreen()
      return
    }

    canvas.webkitRequestFullscreen()
    return
  }

  if (document.exitFullscreen) {
    document.exitFullscreen()
    return
  }

  if (document.webkitExitFullScreen) {
    document.webkitExitFullScreen()
  }
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#444551')

// Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

let controls = new OrbitControls(camera, canvas)
// controls.enableZoom = false
controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05
renderer.render(scene, camera)

// Clock
const clock = new Clock()

// render function called on each frame
function render() {
  const elapsedTime = clock.getElapsedTime()
  // console.log(elapsedTime)

  const ghost1Angle = elapsedTime * 0.5
  ghost1.position.x = Math.sin(ghost1Angle) * 4
  ghost1.position.z = Math.cos(ghost1Angle) * 4
  ghost1.position.y = Math.cos(ghost1Angle * 3) * 1.5

  const ghost2Angle = -elapsedTime * 0.32
  ghost2.position.x = Math.sin(ghost2Angle) * 4.2
  ghost2.position.z = Math.cos(ghost2Angle) * 3.8
  ghost2.position.y = Math.cos(ghost2Angle * 4) * 1.32 + Math.cos(ghost2Angle * 3) * 1.25

  const ghost3Angle = -elapsedTime * 0.7
  ghost3.position.x = Math.sin(ghost3Angle) * 3.8
  ghost3.position.z = Math.cos(ghost3Angle) * 4.5
  ghost3.position.y = Math.cos(ghost3Angle * 2.5) * 1.32 * Math.cos(ghost2Angle * 3) * 1.25

  renderer.render(scene, camera)
  controls.update()

  requestAnimationFrame(render)
}

requestAnimationFrame(render)
