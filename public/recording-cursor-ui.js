window.createCursorRecordingUI = function createCursorRecordingUI(config) {
  const {
    userPrompt,
    thinkingText,
    agentIntroMessage,
    chromeUrl,
    frameUrl,
    frameId = "demo-frame",
    browserUrl = "http://127.0.0.1:9223",
    browserTab = "Chrome",
    projectFile = "demo-form",
  } = config

  const thread = document.getElementById("cursor-thread")
  const composerText = document.getElementById("composer-text")
  const urlBar = document.getElementById("url-bar")
  const chromeWindow = document.getElementById("chrome-window")
  const frame = document.getElementById(frameId)
  const phaseEl = document.getElementById("recording-phase")
  const captionEl = document.getElementById("chrome-caption")
  const connectStatus = document.getElementById("chrome-connect-status")
  const browserTabEl = document.getElementById("browser-tab-label")

  if (browserTabEl) browserTabEl.textContent = browserTab

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  function typeText(el, text, ms) {
    return new Promise((resolve) => {
      let i = 0
      const tick = () => {
        el.textContent = text.slice(0, i++)
        i <= text.length ? setTimeout(tick, ms) : resolve()
      }
      tick()
    })
  }

  function setPhase(text) {
    if (phaseEl) phaseEl.textContent = text
  }

  function scrollThread() {
    thread.scrollTop = thread.scrollHeight
  }

  function appendMessage(className, html) {
    const el = document.createElement("div")
    el.className = className
    el.innerHTML = html
    thread.appendChild(el)
    requestAnimationFrame(() => {
      el.classList.add("visible")
      scrollThread()
    })
    return el
  }

  window.showThinking = async (text = thinkingText) => {
    appendMessage(
      "msg-thinking",
      `<div class="thinking-head"><span class="thinking-spinner"></span>Planning next moves</div><div class="thinking-body">${text}</div>`
    )
    await wait(1000)
  }

  window.showToolCall = async (name, detail, running = false) => {
    appendMessage(
      "msg-tool",
      `<div class="tool-row">
        <span class="tool-status${running ? " running" : ""}">${running ? "" : "✓"}</span>
        <div class="tool-meta">
          <div class="tool-server">chrome-devtools · MCP</div>
          <div class="tool-name">${name}</div>
        </div>
      </div>
      <div class="tool-detail">${detail}</div>`
    )
    await wait(550)
    scrollThread()
  }

  window.showAgentMessage = async (text) => {
    appendMessage("msg-agent", `<p>${text}</p>`)
    await wait(650)
  }

  window.showChromeConnect = async () => {
    appendMessage(
      "msg-connect",
      `<span class="connect-icon">●</span>
       <div class="connect-body">
         <strong>Connected to Chrome DevTools MCP</strong><br>
         Remote debugging at <code>${browserUrl}</code><br>
         Agent controls your open Chrome tabs via 29 MCP tools.
       </div>`
    )
    if (connectStatus) {
      connectStatus.innerHTML =
        '<span class="status-item connected">● chrome-devtools MCP</span>'
    }
    await wait(900)
  }

  window.showComplete = async (title, items) => {
    const list = items.map((item) => `<li>${item}</li>`).join("")
    appendMessage(
      "msg-complete",
      `<div class="complete-head"><span>✓</span> ${title}</div><ul class="complete-list">${list}</ul>`
    )
    setPhase("Done")
    await wait(1400)
    scrollThread()
  }

  window.setRecordingPhase = setPhase

  window.showCaption = async (text, ms = 2200) => {
    if (!captionEl) return
    captionEl.textContent = text
    captionEl.classList.add("visible")
    await wait(ms)
    captionEl.classList.remove("visible")
  }

  window.hideCaption = () => {
    if (captionEl) captionEl.classList.remove("visible")
  }

  window.setChromeUrl = (url) => {
    if (urlBar) urlBar.textContent = url
  }

  window.openChrome = async () => {
    chromeWindow.classList.add("open")
    await wait(700)
  }

  window.loadFrame = async (url = frameUrl) => {
    frame.src = url
    await new Promise((resolve) => frame.addEventListener("load", resolve, { once: true }))
    await wait(800)
  }

  window.showDevToolsDrawer = async () => {
    const drawer = document.getElementById("devtools-drawer")
    if (!drawer) return
    drawer.classList.add("open")
    drawer.setAttribute("aria-hidden", "false")
    await wait(900)
  }

  window.hideDevToolsDrawer = async () => {
    const drawer = document.getElementById("devtools-drawer")
    if (!drawer) return
    drawer.classList.remove("open")
    drawer.setAttribute("aria-hidden", "true")
    await wait(400)
  }

  window.showSensorsPanel = async () => {
    await window.showDevToolsDrawer()
    const lat = document.getElementById("sensors-lat")
    const lng = document.getElementById("sensors-lng")
    if (lat) lat.classList.add("flash")
    if (lng) lng.classList.add("flash")
    await wait(500)
  }

  window.hideSensorsPanel = async () => {
    await window.hideDevToolsDrawer()
  }

  window.flashDrawerMetric = async (selector) => {
    const el = document.querySelector(selector)
    if (el) el.classList.add("flash")
    await wait(1200)
  }

  window.showDeviceToolbar = async (deviceLabel, size) => {
    const bar = document.getElementById("devtools-device-bar")
    const nameEl = document.getElementById("device-bar-name")
    const sizeEl = document.getElementById("device-bar-size")
    if (!bar) return
    if (nameEl) nameEl.textContent = deviceLabel
    if (sizeEl) sizeEl.textContent = size
    bar.classList.add("open")
    await wait(900)
  }

  window.hideDeviceToolbar = async () => {
    const bar = document.getElementById("devtools-device-bar")
    if (!bar) return
    bar.classList.remove("open")
    await wait(350)
  }

  const defaultIntro =
    projectFile === "store-locator"
      ? "I'll connect to Chrome via chrome-devtools-mcp, open the store locator, verify Berlin and Washington, then emulate Paris geolocation."
      : projectFile === "portfolio"
        ? "I'll connect to your real Chrome via chrome-devtools-mcp on port 9223 and emulate mobile, tablet, and desktop on suchitra-swain.web.app."
        : "I'll connect to Chrome via chrome-devtools-mcp, open the demo registration form, fill every field, and submit."

  async function runIntro() {
    setPhase("Prompt")
    await typeText(composerText, userPrompt, 9)
    composerText.classList.add("done")
    await wait(400)

    appendMessage(
      "msg-user",
      `<div class="msg-user-label">You</div><div class="msg-user-text">${userPrompt}</div>`
    )
    await wait(800)

    setPhase("Connect MCP")
    await window.showThinking()
    await window.showAgentMessage(agentIntroMessage || defaultIntro)
    await window.showToolCall(
      "MCP: chrome-devtools",
      `--browser-url=${browserUrl}`,
      true
    )
    await wait(400)
    await window.showChromeConnect()
    await window.showToolCall("list_pages()", "Found Chrome instance · 29 tools available")
    await window.showToolCall("navigate_page()", chromeUrl)

    setPhase("Browser")
    window.setChromeUrl(chromeUrl)
    await window.openChrome()
    await window.loadFrame()
    window.__recordingReady = true
  }

  runIntro()
}
