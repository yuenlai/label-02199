<template>
  <div class="tour-page">
    <!-- 页面标题 -->
    <section class="page-banner">
      <div class="container">
        <h1 class="ethnic-header">{{ t('tour.title') }}</h1>
        <p>{{ t('tour.subtitle') }}</p>
      </div>
    </section>

    <div class="container tour-content">
      <!-- 场景选择 -->
      <div class="scene-selector">
        <div
          v-for="scene in tourScenes"
          :key="scene.id"
          class="scene-option ethnic-card fade-in-up"
          :class="{ active: currentSceneId === scene.id }"
          @click="selectScene(scene.id)"
        >
          <img :src="scene.cover" :alt="l(scene.name)" @error="handleImgError" />
          <div class="scene-option-info">
            <h3>{{ l(scene.name) }}</h3>
            <p class="text-ellipsis-2">{{ l(scene.description) }}</p>
          </div>
        </div>
      </div>

      <!-- 3D 场景区域 -->
      <div class="scene-viewer-wrap">
        <div
          ref="sceneContainer"
          class="scene-viewer"
          :class="{ 'scene-blur-reveal': sceneLoaded }"
        >
          <canvas ref="threeCanvas"></canvas>
          <!-- 热点标记 - 通过3D投影定位 -->
          <div
            v-for="(hotspot, idx) in projectedHotspots"
            :key="idx"
            class="hotspot-marker hotspot-pulse"
            :style="hotspot.style"
            v-show="hotspot.visible"
            @click="showHotspot(currentScene.hotspots[idx])"
          >
            <el-icon :size="16" color="#fff"><InfoFilled /></el-icon>
          </div>
        </div>

        <!-- 操作控件 -->
        <div class="scene-controls">
          <el-tooltip :content="t('tour.controls.drag')" placement="top">
            <el-button circle size="small"><el-icon><Pointer /></el-icon></el-button>
          </el-tooltip>
          <el-tooltip :content="t('tour.controls.scroll')" placement="top">
            <el-button circle size="small"><el-icon><ZoomIn /></el-icon></el-button>
          </el-tooltip>
          <el-tooltip :content="t('tour.controls.reset')" placement="top">
            <el-button circle size="small" @click="resetCamera"><el-icon><RefreshRight /></el-icon></el-button>
          </el-tooltip>
          <el-tooltip :content="isFullscreen ? t('tour.controls.exitFullscreen') : t('tour.controls.fullscreen')" placement="top">
            <el-button circle size="small" @click="toggleFullscreen"><el-icon><FullScreen /></el-icon></el-button>
          </el-tooltip>
        </div>

        <!-- 操作提示 -->
        <div class="scene-tips hidden-mobile">
          <span><el-icon><Pointer /></el-icon> {{ t('tour.controls.drag') }}</span>
          <span><el-icon><ZoomIn /></el-icon> {{ t('tour.controls.scroll') }}</span>
          <span><el-icon><InfoFilled /></el-icon> {{ t('tour.controls.click') }}</span>
        </div>
      </div>

      <!-- 热点详情弹窗 -->
      <el-dialog
        v-model="hotspotDialogVisible"
        :title="l(currentHotspot?.title)"
        width="480px"
        :lock-scroll="false"
        class="hotspot-dialog"
      >
        <div class="hotspot-content">
          <img
            v-if="currentHotspot?.image"
            :src="currentHotspot.image"
            :alt="l(currentHotspot?.title)"
            class="hotspot-image"
            @error="handleImgError"
          />
          <div class="ethnic-divider">
            <div class="ethnic-divider__icon">◆</div>
          </div>
          <p>{{ l(currentHotspot?.content) }}</p>
        </div>
      </el-dialog>

      <!-- WebGL 不支持提示 -->
      <div v-if="!webglSupported" class="scene-error">
        <el-alert type="error" :title="sceneError" show-icon :closable="false" />
      </div>

      <!-- 3D 加载错误提示 -->
      <div v-else-if="sceneError" class="scene-error">
        <el-alert type="warning" :title="sceneError" show-icon :closable="false" />
      </div>

      <!-- 低网络提示 -->
      <div v-if="isSlowNetwork && sceneLoaded" class="simplified-notice">
        <el-alert type="info" :title="t('tour.simplified')" show-icon :closable="true" />
      </div>

      <!-- 场景加载成功 Toast -->
      <LoadingOverlay
        :visible="showToast"
        :text="t('tour.loaded')"
        mode="toast"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { InfoFilled, Pointer, ZoomIn, RefreshRight, FullScreen } from '@element-plus/icons-vue'
import * as THREE from 'three'
import LoadingOverlay from '@/components/common/LoadingOverlay.vue'
import { tourScenes } from '@/utils/mockData'
import { useLocaleData } from '@/composables/useLocaleData'
import { onImgError, DEFAULT_SCENE } from '@/utils/defaultImage'

const { t } = useI18n()
const { l } = useLocaleData()

const threeCanvas = ref(null)
const sceneContainer = ref(null)
const currentSceneId = ref('zhuangVillage')
const sceneLoaded = ref(false)
const showToast = ref(false)
const isFullscreen = ref(false)
const hotspotDialogVisible = ref(false)
const currentHotspot = ref(null)

const currentScene = computed(() => tourScenes.find(s => s.id === currentSceneId.value) || tourScenes[0])

// 热点投影数据 - 每帧更新
const projectedHotspots = ref([])

// Three.js 变量
let renderer, camera, scene, animationId
let isDragging = false
let previousMousePosition = { x: 0, y: 0 }
let cameraAngle = { theta: 0, phi: Math.PI / 3 }
let cameraDistance = 8

const selectScene = (id) => {
  sceneLoaded.value = false
  currentSceneId.value = id
  nextTick(() => initScene())
}

// 检测是否低网络环境
const isSlowNetwork = ref(false)
const webglSupported = ref(true)
const sceneError = ref('')

const checkNetwork = () => {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  if (conn) {
    isSlowNetwork.value = conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g' || conn.downlink < 1
  }
}

// ========== 纹理生成工具 ==========
const createNoiseTexture = (width, height, baseColor, variation) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  const imageData = ctx.createImageData(width, height)
  const r0 = (baseColor >> 16) & 0xff
  const g0 = (baseColor >> 8) & 0xff
  const b0 = baseColor & 0xff
  for (let i = 0; i < imageData.data.length; i += 4) {
    const px = (i / 4) % width
    const py = Math.floor((i / 4) / width)
    const n = (Math.sin(px * 0.1) * Math.cos(py * 0.1) + Math.sin(px * 0.23 + 1.7) * Math.cos(py * 0.17 + 0.3)) * 0.5
    const v = n * variation
    imageData.data[i] = Math.max(0, Math.min(255, r0 + v))
    imageData.data[i + 1] = Math.max(0, Math.min(255, g0 + v))
    imageData.data[i + 2] = Math.max(0, Math.min(255, b0 + v))
    imageData.data[i + 3] = 255
  }
  ctx.putImageData(imageData, 0, 0)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  return tex
}

const createWoodTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  // 木纹底色
  ctx.fillStyle = '#8B6914'
  ctx.fillRect(0, 0, 128, 128)
  // 木纹条纹
  for (let y = 0; y < 128; y++) {
    const brightness = Math.sin(y * 0.3 + Math.sin(y * 0.07) * 3) * 15
    ctx.fillStyle = `rgba(${brightness > 0 ? 255 : 0}, ${brightness > 0 ? 200 : 0}, ${brightness > 0 ? 100 : 0}, ${Math.abs(brightness) / 60})`
    ctx.fillRect(0, y, 128, 1)
  }
  // 随机木节
  for (let i = 0; i < 3; i++) {
    const kx = 20 + Math.random() * 88
    const ky = 20 + Math.random() * 88
    ctx.beginPath()
    ctx.ellipse(kx, ky, 4 + Math.random() * 4, 2 + Math.random() * 3, Math.random() * Math.PI, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(80, 50, 10, 0.4)'
    ctx.fill()
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  return tex
}

const createRoofTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#3E2C1A'
  ctx.fillRect(0, 0, 128, 128)
  // 瓦片行
  for (let row = 0; row < 16; row++) {
    const y = row * 8
    const offset = (row % 2) * 8
    ctx.strokeStyle = 'rgba(0,0,0,0.15)'
    ctx.lineWidth = 0.5
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(128, y)
    ctx.stroke()
    for (let col = 0; col < 9; col++) {
      const x = col * 16 + offset
      ctx.beginPath()
      ctx.arc(x, y + 4, 7, 0, Math.PI, false)
      ctx.strokeStyle = 'rgba(80, 60, 30, 0.2)'
      ctx.stroke()
    }
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  return tex
}

const createStoneTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#8A8A7A'
  ctx.fillRect(0, 0, 128, 128)
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 128
    const y = Math.random() * 128
    const s = 1 + Math.random() * 3
    const b = 100 + Math.random() * 80
    ctx.fillStyle = `rgba(${b}, ${b - 10}, ${b - 20}, 0.3)`
    ctx.fillRect(x, y, s, s)
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  return tex
}

const createGrassTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#4A7A30'
  ctx.fillRect(0, 0, 256, 256)
  // 草地色块
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * 256
    const y = Math.random() * 256
    const g = 80 + Math.random() * 60
    ctx.fillStyle = `rgba(${30 + Math.random() * 40}, ${g}, ${20 + Math.random() * 20}, 0.5)`
    ctx.fillRect(x, y, 1 + Math.random() * 3, 1 + Math.random() * 3)
  }
  // 草叶
  ctx.strokeStyle = 'rgba(60, 120, 40, 0.3)'
  ctx.lineWidth = 0.5
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 256
    const y = Math.random() * 256
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + (Math.random() - 0.5) * 4, y - 3 - Math.random() * 5)
    ctx.stroke()
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(8, 8)
  return tex
}

// ========== 场景初始化 ==========
const initScene = () => {
  if (!threeCanvas.value) return
  try {
    const testCanvas = document.createElement('canvas')
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')
    if (!gl) {
      webglSupported.value = false
      sceneError.value = t('tour.webglError')
      return
    }
    checkNetwork()
    if (renderer) {
      cancelAnimationFrame(animationId)
      renderer.dispose()
    }

    const container = sceneContainer.value
    const width = container.clientWidth
    const height = container.clientHeight || 500
    const useSimplified = isSlowNetwork.value

    scene = new THREE.Scene()
    const isVillage = currentSceneId.value === 'zhuangVillage'

    // 相机
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 300)
    updateCameraPosition()

    // 渲染器
    renderer = new THREE.WebGLRenderer({ canvas: threeCanvas.value, antialias: !useSimplified, alpha: false })
    renderer.setSize(width, height)
    renderer.setPixelRatio(useSimplified ? 1 : Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = !useSimplified
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    renderer.outputColorSpace = THREE.SRGBColorSpace

    // === 光照系统 ===
    // 半球光 - 天空/地面
    const hemiLight = new THREE.HemisphereLight(0x8dc1e0, 0x3d6b2e, 0.5)
    scene.add(hemiLight)

    // 环境光
    const ambient = new THREE.AmbientLight(0xfff8f0, 0.25)
    scene.add(ambient)

    // 主阳光 - 暖色偏移，模拟下午光线
    const sunLight = new THREE.DirectionalLight(0xffe8c0, 1.5)
    sunLight.position.set(10, 18, 8)
    sunLight.castShadow = !useSimplified
    if (!useSimplified) {
      sunLight.shadow.mapSize.width = 2048
      sunLight.shadow.mapSize.height = 2048
      sunLight.shadow.camera.near = 0.5
      sunLight.shadow.camera.far = 60
      sunLight.shadow.camera.left = -20
      sunLight.shadow.camera.right = 20
      sunLight.shadow.camera.top = 20
      sunLight.shadow.camera.bottom = -20
      sunLight.shadow.bias = -0.0003
      sunLight.shadow.normalBias = 0.02
    }
    scene.add(sunLight)

    // 补光 - 冷色调天空反射
    const fillLight = new THREE.DirectionalLight(0x8ec5fc, 0.35)
    fillLight.position.set(-8, 10, -6)
    scene.add(fillLight)

    // 背光 - 轮廓光
    const rimLight = new THREE.DirectionalLight(0xffd4a0, 0.2)
    rimLight.position.set(-5, 5, 10)
    scene.add(rimLight)

    // 天空
    buildSky(isVillage)

    // 地面
    buildGround(isVillage, useSimplified)

    // 雾气 - 指数雾更自然
    scene.fog = new THREE.FogExp2(isVillage ? 0xc5dcc5 : 0xb5d5dd, 0.025)

    // 构建场景
    if (isVillage) {
      buildZhuangVillage(useSimplified)
    } else {
      buildYaoTerraces(useSimplified)
    }

    // 开始渲染
    animate()

    setTimeout(() => {
      sceneLoaded.value = true
      showToast.value = true
      setTimeout(() => { showToast.value = false }, 2000)
    }, useSimplified ? 500 : 1000)

  } catch (err) {
    console.error('[3D Scene Error]', err)
    sceneError.value = t('tour.loadError') + err.message
  }
}

// ========== 天空 ==========
const buildSky = (isVillage) => {
  const skyGeo = new THREE.SphereGeometry(120, 32, 20)
  const skyMat = new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: new THREE.Color(isVillage ? 0x3a7bd5 : 0x4a8bc2) },
      midColor: { value: new THREE.Color(isVillage ? 0x87ceeb : 0x8ec5d5) },
      bottomColor: { value: new THREE.Color(isVillage ? 0xd4e8d0 : 0xc8dde5) },
      sunColor: { value: new THREE.Color(0xfff5e0) },
      sunDir: { value: new THREE.Vector3(0.5, 0.6, 0.3).normalize() }
    },
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 midColor;
      uniform vec3 bottomColor;
      uniform vec3 sunColor;
      uniform vec3 sunDir;
      varying vec3 vWorldPos;
      void main() {
        vec3 dir = normalize(vWorldPos);
        float h = dir.y;
        // 天空渐变：底部->中间->顶部
        vec3 sky = mix(bottomColor, midColor, smoothstep(-0.05, 0.2, h));
        sky = mix(sky, topColor, smoothstep(0.2, 0.8, h));
        // 太阳光晕
        float sunDot = max(dot(dir, sunDir), 0.0);
        sky += sunColor * pow(sunDot, 32.0) * 0.6;
        sky += sunColor * pow(sunDot, 4.0) * 0.15;
        // 地平线泛白
        float horizon = 1.0 - abs(h);
        sky = mix(sky, vec3(0.9, 0.92, 0.9), pow(horizon, 8.0) * 0.4);
        gl_FragColor = vec4(sky, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false
  })
  scene.add(new THREE.Mesh(skyGeo, skyMat))

  // 云层 - 用半透明平面模拟
  const cloudMat = new THREE.MeshBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false
  })
  for (let i = 0; i < 8; i++) {
    const cw = 8 + Math.random() * 15
    const ch = 3 + Math.random() * 5
    const cloud = new THREE.Mesh(new THREE.PlaneGeometry(cw, ch), cloudMat)
    cloud.position.set(
      (Math.random() - 0.5) * 80,
      25 + Math.random() * 15,
      -20 + (Math.random() - 0.5) * 60
    )
    cloud.rotation.x = -Math.PI / 2
    cloud.rotation.z = Math.random() * Math.PI
    scene.add(cloud)
  }
}

// ========== 地面 ==========
const buildGround = (isVillage, simplified) => {
  const segments = simplified ? 2 : 64
  const groundGeo = new THREE.PlaneGeometry(80, 80, segments, segments)

  // 地形起伏
  if (!simplified) {
    const pos = groundGeo.getAttribute('position')
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const h = Math.sin(x * 0.15) * Math.cos(y * 0.15) * 0.3
        + Math.sin(x * 0.4 + 2.0) * Math.cos(y * 0.3 + 1.0) * 0.12
        + Math.sin(x * 0.08) * Math.cos(y * 0.06) * 0.5
      pos.setZ(i, h)
    }
    groundGeo.computeVertexNormals()
  }

  const grassTex = simplified ? null : createGrassTexture()
  const groundMat = new THREE.MeshStandardMaterial({
    color: isVillage ? 0x4a7a30 : 0x5a8a2a,
    roughness: 0.92,
    metalness: 0.0,
    map: grassTex
  })
  const ground = new THREE.Mesh(groundGeo, groundMat)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = !simplified
  scene.add(ground)

  // 泥土路径
  if (!simplified) {
    const dirtTex = createNoiseTexture(64, 64, 0x8a7a5a, 25)
    const dirtMat = new THREE.MeshStandardMaterial({ map: dirtTex, roughness: 0.98, metalness: 0.0 })
    for (let i = 0; i < 20; i++) {
      const seg = new THREE.Mesh(new THREE.PlaneGeometry(0.5 + Math.random() * 0.3, 0.8), dirtMat)
      seg.rotation.x = -Math.PI / 2
      seg.position.set((Math.random() - 0.5) * 0.6, 0.02, -0.5 - i * 0.45)
      seg.rotation.z = (Math.random() - 0.5) * 0.15
      scene.add(seg)
    }
  }
}

// ========== 壮族村寨 ==========
const buildZhuangVillage = (simplified) => {
  const woodTex = simplified ? null : createWoodTexture()
  const roofTex = simplified ? null : createRoofTexture()
  const stoneTex = simplified ? null : createStoneTexture()

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x8b6914, roughness: 0.82, metalness: 0.0, map: woodTex
  })
  const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x5c4a1e, roughness: 0.8 })
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x4a3525, roughness: 0.88, metalness: 0.0, map: roofTex
  })
  const pillarMat = new THREE.MeshStandardMaterial({ color: 0x9e7c4a, roughness: 0.75 })
  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x8a8a7a, roughness: 0.95, map: stoneTex
  })

  const positions = simplified
    ? [[-2, -3], [1.5, -4], [0, -1.5]]
    : [[-2, -3], [1.5, -4], [-3.5, -1.5], [2.5, -1], [0, -1.5], [-1, -5.5], [3, -5]]

  positions.forEach(([x, z]) => {
    const g = new THREE.Group()

    // 石基
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.18, 1.1), stoneMat)
    base.position.y = 0.09
    base.receiveShadow = true
    g.add(base)

    // 吊脚柱子
    const pp = simplified
      ? [[-0.5, -0.4], [0.5, -0.4], [-0.5, 0.4], [0.5, 0.4]]
      : [[-0.5, -0.4], [0, -0.4], [0.5, -0.4], [-0.5, 0.4], [0, 0.4], [0.5, 0.4]]
    pp.forEach(([px, pz]) => {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.055, 0.75, 8), pillarMat)
      p.position.set(px, 0.555, pz)
      p.castShadow = !simplified
      g.add(p)
    })

    // 横梁
    if (!simplified) {
      ;[[-0.4, 0.4], [0.4, 0.4]].forEach(([_, pz]) => {
        const beam = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.04), darkWoodMat)
        beam.position.set(0, 0.93, pz === 0.4 ? 0.4 : -0.4)
        g.add(beam)
      })
      // 纵梁
      const longBeam = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.84), darkWoodMat)
      longBeam.position.set(0, 0.93, 0)
      g.add(longBeam)
    }

    // 房屋主体
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 0.9), woodMat)
    body.position.set(0, 1.23, 0)
    body.castShadow = !simplified
    body.receiveShadow = !simplified
    g.add(body)

    // 窗户 & 门
    if (!simplified) {
      const winMat = new THREE.MeshStandardMaterial({ color: 0x1a1208, roughness: 0.4 })
      // 正面窗
      ;[-0.25, 0.25].forEach(wx => {
        const win = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.16, 0.02), winMat)
        win.position.set(wx, 1.28, 0.46)
        g.add(win)
        // 窗框
        const frame = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.19, 0.01), darkWoodMat)
        frame.position.set(wx, 1.28, 0.465)
        g.add(frame)
      })
      // 门
      const door = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.3, 0.02), new THREE.MeshStandardMaterial({ color: 0x3a2a10, roughness: 0.7 }))
      door.position.set(0, 1.08, 0.46)
      g.add(door)
    }

    // 屋顶 - 人字形
    const roofShape = new THREE.Shape()
    roofShape.moveTo(-0.8, 0)
    roofShape.lineTo(-0.05, 0.5)
    roofShape.lineTo(0.05, 0.5)
    roofShape.lineTo(0.8, 0)
    roofShape.lineTo(0.75, -0.03)
    roofShape.lineTo(0, 0.44)
    roofShape.lineTo(-0.75, -0.03)
    roofShape.closePath()
    const roofGeo = new THREE.ExtrudeGeometry(roofShape, { depth: 1.1, bevelEnabled: false })
    const roof = new THREE.Mesh(roofGeo, roofMat)
    roof.position.set(0, 1.53, -0.55)
    roof.castShadow = !simplified
    g.add(roof)

    // 屋脊
    if (!simplified) {
      const ridge = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.06, 1.15),
        new THREE.MeshStandardMaterial({ color: 0x3a2815, roughness: 0.7 })
      )
      ridge.position.set(0, 2.03, 0)
      g.add(ridge)
    }

    // 栏杆
    if (!simplified) {
      for (let rx = -0.5; rx <= 0.5; rx += 0.2) {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.15, 0.02), darkWoodMat)
        rail.position.set(rx, 1.0, 0.46)
        g.add(rail)
      }
      const topRail = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.02, 0.02), darkWoodMat)
      topRail.position.set(0, 1.07, 0.46)
      g.add(topRail)
    }

    g.position.set(x, 0, z)
    g.rotation.y = (Math.random() - 0.5) * 0.25
    scene.add(g)
  })

  // 戏台
  buildStage(simplified)

  // 石板路
  if (!simplified) {
    const pathMat = new THREE.MeshStandardMaterial({ color: 0x9e9e8e, roughness: 0.95 })
    for (let i = 0; i < 18; i++) {
      const s = new THREE.Mesh(
        new THREE.BoxGeometry(0.28 + Math.random() * 0.18, 0.025, 0.22 + Math.random() * 0.12),
        pathMat
      )
      s.position.set((Math.random() - 0.5) * 0.5, 0.013, -0.8 - i * 0.32)
      s.rotation.y = Math.random() * 0.3
      s.receiveShadow = true
      scene.add(s)
    }
  }

  // 树木
  buildRealisticTrees(simplified, [
    [3.5, -3], [-4, -4], [4, 0.5], [-4.5, -0.5], [-1, -6.5],
    [5, -2], [-5.5, -3], [3, -6.5], [-3, -7.5], [6, -5]
  ].slice(0, simplified ? 3 : 10), 'broadleaf')

  // 远景
  if (!simplified) buildDistantForest(25)

  // 水井
  if (!simplified) {
    const wellMat = new THREE.MeshStandardMaterial({ color: 0x7a7a6a, roughness: 0.9 })
    const well = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.4, 16), wellMat)
    well.position.set(-1.5, 0.2, -1)
    well.castShadow = true
    scene.add(well)
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x2a6f9e, roughness: 0.05, metalness: 0.5, transparent: true, opacity: 0.75
    })
    const water = new THREE.Mesh(new THREE.CircleGeometry(0.25, 16), waterMat)
    water.rotation.x = -Math.PI / 2
    water.position.set(-1.5, 0.38, -1)
    scene.add(water)
  }

  // 竹林
  if (!simplified) buildBamboo(3, [4.5, -1])

  // 小溪
  if (!simplified) buildStream(true)
}

const buildStage = (simplified) => {
  const g = new THREE.Group()
  const stageMat = new THREE.MeshStandardMaterial({ color: 0xa08060, roughness: 0.8 })
  const platform = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.45, 1.6), stageMat)
  platform.position.y = 0.225
  platform.castShadow = !simplified
  platform.receiveShadow = !simplified
  g.add(platform)

  // 台阶
  const stepMat = new THREE.MeshStandardMaterial({ color: 0x8a7a5a, roughness: 0.9 })
  for (let i = 0; i < 3; i++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.12, 0.2), stepMat)
    step.position.set(0, 0.06 + i * 0.12, 0.9 + i * 0.15)
    g.add(step)
  }

  if (!simplified) {
    // 红柱
    const redPillarMat = new THREE.MeshStandardMaterial({ color: 0x8b1a1a, roughness: 0.55 })
    ;[[-0.9, -0.65], [0.9, -0.65], [-0.9, 0.65], [0.9, 0.65]].forEach(([px, pz]) => {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.4, 10), redPillarMat)
      p.position.set(px, 1.15, pz)
      p.castShadow = true
      g.add(p)
    })
    // 戏台顶
    const stageRoofShape = new THREE.Shape()
    stageRoofShape.moveTo(-1.3, 0)
    stageRoofShape.quadraticCurveTo(-0.6, 0.55, 0, 0.6)
    stageRoofShape.quadraticCurveTo(0.6, 0.55, 1.3, 0)
    const stageRoofGeo = new THREE.ExtrudeGeometry(stageRoofShape, { depth: 1.8, bevelEnabled: false })
    const stageRoof = new THREE.Mesh(stageRoofGeo, new THREE.MeshStandardMaterial({ color: 0x3e2c1a, roughness: 0.85 }))
    stageRoof.position.set(0, 1.85, -0.9)
    stageRoof.castShadow = true
    g.add(stageRoof)
  }
  g.position.set(0.5, 0, -5.2)
  scene.add(g)
}

// ========== 瑶族梯田 ==========
const buildYaoTerraces = (simplified) => {
  const terraceTex = simplified ? null : createGrassTexture()
  const terraceMats = [
    new THREE.MeshStandardMaterial({ color: 0x5d8a2f, roughness: 0.88, map: terraceTex }),
    new THREE.MeshStandardMaterial({ color: 0x6b9e3a, roughness: 0.88, map: terraceTex }),
    new THREE.MeshStandardMaterial({ color: 0x4e7a25, roughness: 0.88, map: terraceTex })
  ]
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x4a90b8, roughness: 0.02, metalness: 0.5, transparent: true, opacity: 0.6
  })
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x7a6a4a, roughness: 0.95 })

  const layerCount = simplified ? 6 : 12
  for (let i = 0; i < layerCount; i++) {
    const y = i * 0.26
    const size = 8 - i * 0.45
    const depth = size * 0.5

    // 梯田面
    const terrace = new THREE.Mesh(new THREE.BoxGeometry(size, 0.1, depth), terraceMats[i % 3])
    terrace.position.set(0, y + 0.05, -2 - i * 0.4)
    terrace.receiveShadow = !simplified
    terrace.castShadow = !simplified
    scene.add(terrace)

    // 挡墙
    const wall = new THREE.Mesh(new THREE.BoxGeometry(size + 0.05, 0.26, 0.07), wallMat)
    wall.position.set(0, y - 0.03, -2 - i * 0.4 + depth / 2)
    wall.receiveShadow = !simplified
    scene.add(wall)

    // 水面
    if (!simplified && i < 10 && i % 2 === 0) {
      const w = new THREE.Mesh(new THREE.PlaneGeometry(size - 0.5, depth - 0.25), waterMat)
      w.rotation.x = -Math.PI / 2
      w.position.set((Math.random() - 0.5) * 0.15, y + 0.11, -2 - i * 0.4)
      scene.add(w)
    }
  }

  // 瑶族房屋
  const woodTex = simplified ? null : createWoodTexture()
  const roofTex = simplified ? null : createRoofTexture()
  const houseMat = new THREE.MeshStandardMaterial({ color: 0x8b6914, roughness: 0.82, map: woodTex })
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x3e2c1a, roughness: 0.88, map: roofTex })

  const housePos = simplified
    ? [[-2.5, -1], [2.5, -1.5]]
    : [[-2.5, -1], [2.5, -1.5], [-1.5, -5.5], [1.8, -6], [3.5, -3.5], [-3, -4]]

  housePos.forEach(([x, z]) => {
    const g = new THREE.Group()
    // 石基
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 0.12, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x8a8a7a, roughness: 0.95 })
    )
    base.position.y = 0.06
    g.add(base)

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.6, 0.7), houseMat)
    body.position.y = 0.42
    body.castShadow = !simplified
    body.receiveShadow = !simplified
    g.add(body)

    // 窗户
    if (!simplified) {
      const winMat = new THREE.MeshStandardMaterial({ color: 0x1a1208, roughness: 0.4 })
      ;[-0.18, 0.18].forEach(wx => {
        const win = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.02), winMat)
        win.position.set(wx, 0.48, 0.36)
        g.add(win)
      })
    }

    // 屋顶
    const roofShape = new THREE.Shape()
    roofShape.moveTo(-0.6, 0)
    roofShape.lineTo(0, 0.4)
    roofShape.lineTo(0.6, 0)
    roofShape.lineTo(0.55, -0.03)
    roofShape.lineTo(0, 0.35)
    roofShape.lineTo(-0.55, -0.03)
    roofShape.closePath()
    const roofGeo = new THREE.ExtrudeGeometry(roofShape, { depth: 0.85, bevelEnabled: false })
    const roof = new THREE.Mesh(roofGeo, roofMat)
    roof.position.set(0, 0.72, -0.425)
    roof.castShadow = !simplified
    g.add(roof)

    g.position.set(x, 0, z)
    g.rotation.y = (Math.random() - 0.5) * 0.4
    scene.add(g)
  })

  // 树木
  buildRealisticTrees(simplified, [
    [3.5, -3], [-3.5, -3.5], [0, -7.5], [-3, -7.5], [5, -1],
    [-5, -2], [4.5, -6.5], [-4.5, -5.5], [2, -8.5], [-2, -8.5]
  ].slice(0, simplified ? 3 : 10), 'conifer')

  if (!simplified) buildDistantForest(30)

  // 小溪
  if (!simplified) buildStream(false)
}

// ========== 真实树木 ==========
const buildRealisticTrees = (simplified, positions, type) => {
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e12, roughness: 0.92 })
  const seg = simplified ? 5 : 8

  positions.forEach(([x, z]) => {
    const g = new THREE.Group()
    const h = 0.9 + Math.random() * 0.6
    const r = 0.045 + Math.random() * 0.025

    // 树干
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.6, r, h, seg), trunkMat)
    trunk.position.y = h / 2
    trunk.castShadow = !simplified
    g.add(trunk)

    if (type === 'broadleaf') {
      // 多层不规则树冠
      const colors = [0x2a6b25, 0x357a30, 0x3d8a38, 0x2e7028]
      const layers = simplified ? 2 : 4
      for (let l = 0; l < layers; l++) {
        const leafMat = new THREE.MeshStandardMaterial({
          color: colors[l % colors.length], roughness: 0.88
        })
        const lr = 0.3 + Math.random() * 0.2 - l * 0.03
        // 用 IcosahedronGeometry 代替球体，更不规则
        const foliage = new THREE.Mesh(
          new THREE.IcosahedronGeometry(lr, simplified ? 1 : 2),
          leafMat
        )
        foliage.position.set(
          (Math.random() - 0.5) * 0.25,
          h + 0.1 + l * 0.18,
          (Math.random() - 0.5) * 0.25
        )
        foliage.scale.y = 0.75 + Math.random() * 0.3
        foliage.rotation.set(Math.random(), Math.random(), Math.random())
        foliage.castShadow = !simplified
        g.add(foliage)
      }
      // 分支
      if (!simplified) {
        for (let b = 0; b < 2; b++) {
          const branch = new THREE.Mesh(
            new THREE.CylinderGeometry(0.01, 0.02, 0.4, 4),
            trunkMat
          )
          branch.position.set(0, h * 0.6 + b * 0.2, 0)
          branch.rotation.z = (b === 0 ? 1 : -1) * (0.5 + Math.random() * 0.4)
          g.add(branch)
        }
      }
    } else {
      // 针叶树 - 多层锥形
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x1e5a22, roughness: 0.85 })
      const cones = simplified ? 2 : 3
      for (let c = 0; c < cones; c++) {
        const cr = 0.35 - c * 0.08
        const ch = 0.55 - c * 0.08
        const cone = new THREE.Mesh(new THREE.ConeGeometry(cr, ch, seg), leafMat)
        cone.position.y = h + 0.05 + c * 0.32
        cone.castShadow = !simplified
        g.add(cone)
      }
    }

    g.position.set(x, 0, z)
    const s = 0.8 + Math.random() * 0.5
    g.scale.set(s, s, s)
    scene.add(g)
  })
}

// ========== 远景树林 ==========
const buildDistantForest = (count) => {
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x2a5a2a, roughness: 0.95 })
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3a2510, roughness: 0.9 })

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const dist = 14 + Math.random() * 10
    const x = Math.sin(angle) * dist
    const z = Math.cos(angle) * dist - 4
    const h = 1.2 + Math.random() * 1.0

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.07, h, 4), trunkMat)
    trunk.position.set(x, h / 2, z)
    scene.add(trunk)

    const foliage = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5 + Math.random() * 0.4, 1), leafMat)
    foliage.position.set(x, h + 0.15, z)
    foliage.scale.y = 0.7
    scene.add(foliage)
  }
}

// ========== 竹林 ==========
const buildBamboo = (count, [bx, bz]) => {
  const bambooMat = new THREE.MeshStandardMaterial({ color: 0x5a8a3a, roughness: 0.7 })
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x3a7a2a, roughness: 0.85 })
  for (let i = 0; i < count; i++) {
    const x = bx + (Math.random() - 0.5) * 1.5
    const z = bz + (Math.random() - 0.5) * 1.5
    const h = 1.5 + Math.random() * 1.0
    // 竹竿
    const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, h, 6), bambooMat)
    stalk.position.set(x, h / 2, z)
    stalk.rotation.z = (Math.random() - 0.5) * 0.08
    stalk.castShadow = true
    scene.add(stalk)
    // 竹节
    for (let j = 1; j < Math.floor(h / 0.3); j++) {
      const node = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.005, 4, 8), bambooMat)
      node.position.set(x, j * 0.3, z)
      node.rotation.x = Math.PI / 2
      scene.add(node)
    }
    // 竹叶
    for (let l = 0; l < 4; l++) {
      const leaf = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.04), leafMat)
      leaf.position.set(x + (Math.random() - 0.5) * 0.3, h * 0.7 + l * 0.15, z + (Math.random() - 0.5) * 0.3)
      leaf.rotation.set(Math.random() * 0.5, Math.random() * Math.PI, Math.random() * 0.3)
      scene.add(leaf)
    }
  }
}

// ========== 小溪 ==========
const buildStream = (isVillage) => {
  const streamMat = new THREE.MeshStandardMaterial({
    color: 0x3a7faa, roughness: 0.02, metalness: 0.5, transparent: true, opacity: 0.55
  })
  const bankMat = new THREE.MeshStandardMaterial({ color: 0x6a5a3a, roughness: 0.95 })
  const startX = isVillage ? -5 : -4
  const startZ = isVillage ? -7 : -9
  for (let i = 0; i < 15; i++) {
    const x = startX + i * 0.65 + Math.sin(i * 0.7) * 0.4
    const z = startZ + Math.cos(i * 0.5) * 0.3
    // 水面
    const seg = new THREE.Mesh(new THREE.PlaneGeometry(0.35 + Math.random() * 0.15, 0.55), streamMat)
    seg.rotation.x = -Math.PI / 2
    seg.position.set(x, 0.03, z)
    seg.rotation.z = Math.sin(i * 0.5) * 0.2
    scene.add(seg)
    // 河岸石头
    if (i % 3 === 0) {
      const stone = new THREE.Mesh(
        new THREE.SphereGeometry(0.06 + Math.random() * 0.05, 5, 4),
        bankMat
      )
      stone.position.set(x + (Math.random() > 0.5 ? 0.25 : -0.25), 0.04, z)
      stone.scale.y = 0.5
      scene.add(stone)
    }
  }
}

// ========== 相机控制 ==========
const updateCameraPosition = () => {
  if (!camera) return
  const x = cameraDistance * Math.sin(cameraAngle.phi) * Math.sin(cameraAngle.theta)
  const y = cameraDistance * Math.cos(cameraAngle.phi)
  const z = cameraDistance * Math.sin(cameraAngle.phi) * Math.cos(cameraAngle.theta)
  camera.position.set(x, Math.max(y, 0.5), z)
  camera.lookAt(0, 0.8, -2.5)
}

const resetCamera = () => {
  cameraAngle = { theta: 0, phi: Math.PI / 3 }
  cameraDistance = 8
  updateCameraPosition()
}

// ========== 热点3D投影 ==========
const updateHotspotProjections = () => {
  if (!camera || !sceneContainer.value) return
  const container = sceneContainer.value
  const w = container.clientWidth
  const h = container.clientHeight
  const hotspots = currentScene.value.hotspots || []

  projectedHotspots.value = hotspots.map(hs => {
    const pos3d = new THREE.Vector3(hs.position.x, hs.position.y, hs.position.z)
    const projected = pos3d.clone().project(camera)

    // NDC -> 屏幕坐标
    const sx = (projected.x * 0.5 + 0.5) * w
    const sy = (-projected.y * 0.5 + 0.5) * h

    // 判断是否在相机前方且在视口内
    const visible = projected.z < 1 && sx > -20 && sx < w + 20 && sy > -20 && sy < h + 20

    return {
      style: {
        left: `${sx}px`,
        top: `${sy}px`
      },
      visible
    }
  })
}

// ========== 渲染循环 ==========
const animate = () => {
  animationId = requestAnimationFrame(animate)
  renderer.render(scene, camera)
  updateHotspotProjections()
}

// ========== 鼠标 / 触摸交互 ==========
const onMouseDown = (e) => {
  isDragging = true
  previousMousePosition = { x: e.clientX || e.touches?.[0]?.clientX, y: e.clientY || e.touches?.[0]?.clientY }
}

const onMouseMove = (e) => {
  if (!isDragging) return
  const x = e.clientX || e.touches?.[0]?.clientX
  const y = e.clientY || e.touches?.[0]?.clientY
  const dx = x - previousMousePosition.x
  const dy = y - previousMousePosition.y
  cameraAngle.theta += dx * 0.005
  cameraAngle.phi = Math.max(0.2, Math.min(Math.PI / 2 - 0.05, cameraAngle.phi - dy * 0.005))
  updateCameraPosition()
  previousMousePosition = { x, y }
}

const onMouseUp = () => { isDragging = false }

const onWheel = (e) => {
  e.preventDefault()
  e.stopPropagation()
  cameraDistance = Math.max(3, Math.min(20, cameraDistance + e.deltaY * 0.008))
  updateCameraPosition()
}

const onResize = () => {
  if (!renderer || !sceneContainer.value) return
  const w = sceneContainer.value.clientWidth
  const h = sceneContainer.value.clientHeight || 500
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

const toggleFullscreen = () => {
  const el = sceneContainer.value
  if (!document.fullscreenElement) {
    el?.requestFullscreen?.()
    isFullscreen.value = true
  } else {
    document.exitFullscreen?.()
    isFullscreen.value = false
  }
}

const showHotspot = (hotspot) => {
  currentHotspot.value = hotspot
  hotspotDialogVisible.value = true
}

const handleImgError = (e) => onImgError(e, DEFAULT_SCENE)

onMounted(() => {
  nextTick(() => initScene())
  const container = sceneContainer.value
  if (container) {
    container.addEventListener('mousedown', onMouseDown)
    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseup', onMouseUp)
    container.addEventListener('mouseleave', onMouseUp)
    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('touchstart', onMouseDown, { passive: true })
    container.addEventListener('touchmove', onMouseMove, { passive: true })
    container.addEventListener('touchend', onMouseUp)
  }
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  renderer?.dispose?.()
  const container = sceneContainer.value
  if (container) {
    container.removeEventListener('mousedown', onMouseDown)
    container.removeEventListener('mousemove', onMouseMove)
    container.removeEventListener('mouseup', onMouseUp)
    container.removeEventListener('mouseleave', onMouseUp)
    container.removeEventListener('wheel', onWheel)
    container.removeEventListener('touchstart', onMouseDown)
    container.removeEventListener('touchmove', onMouseMove)
    container.removeEventListener('touchend', onMouseUp)
  }
  window.removeEventListener('resize', onResize)
})
</script>

<style lang="scss" scoped>
.page-banner {
  background: linear-gradient(165deg, #F7FFF7 0%, #E8F5F0 100%);
  padding: 48px 0 32px;
  text-align: center;

  h1 { font-size: 28px; color: #1A535C; font-weight: 700; margin-bottom: 8px; }
  p { color: #636E72; font-size: 15px; }
}

.tour-content {
  padding: 32px 0 48px;
}

.scene-selector {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 576px) { flex-direction: column; }
}

.scene-option {
  flex: 1;
  display: flex;
  gap: 16px;
  padding: 16px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s;

  &.active { border-color: #1A535C; }

  img {
    width: 120px;
    height: 80px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
  }

  h3 { font-size: 16px; color: #2D3436; margin-bottom: 6px; }
  p { font-size: 13px; color: #636E72; line-height: 1.5; }

  @media (max-width: 576px) {
    img { width: 80px; height: 60px; }
  }
}

.scene-viewer-wrap {
  position: relative;
}

.scene-viewer {
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  background: #1a1a2e;
  position: relative;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  touch-action: none;

  canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
    cursor: grab;
    touch-action: none;

    &:active { cursor: grabbing; }
  }

  @media (max-width: 768px) { height: 350px; }
}

.hotspot-marker {
  position: absolute;
  width: 30px;
  height: 30px;
  background: rgba(220, 60, 60, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: translate(-50%, -50%);
  z-index: 10;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;

  &:hover {
    transform: translate(-50%, -50%) scale(1.25);
    box-shadow: 0 3px 12px rgba(220, 60, 60, 0.5);
  }
}

.scene-controls {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  z-index: 10;

  .el-button {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(4px);

    &:active { transform: scale(0.98); }
  }
}

.scene-tips {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #636E72;
  }
}

.scene-error,
.simplified-notice {
  margin-top: 16px;
}

.hotspot-dialog {
  .hotspot-content {
    .hotspot-image {
      width: 100%;
      height: 220px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 16px;
    }

    p {
      font-size: 15px;
      color: #2D3436;
      line-height: 1.8;
    }
  }
}
</style>
