<p align="right">
   <a href="https://www.buymeacoffee.com/jorcelinojunior" target="_blank">
      <img src="https://img.buymeacoffee.com/button-api/?text=buy me a coffee&emoji=☕&slug=jorcelinojunior&button_colour=ffda33&font_colour=000000&font_family=Bree&outline_colour=000000&coffee_colour=FFDD00" width="160" alt="Buy Me a Coffee"/>
   </a>
</p>

<p align="center">
  <img src="https://github.com/jorcelinojunior/mdize/blob/main/images/mdize-logo-hero.png" alt="MDize Logo" width="128">
</p>

<h1 align="center"><a href="https://marketplace.visualstudio.com/items?itemName=jorcelinojunior.mdize" target="_blank">MDize 📋</a></h1>

<p align="center"><strong>Effortlessly copy code into perfect Markdown for LLMs & sharing 🚀</strong></p>

<p align="center">
  Tired of manually formatting code snippets for ChatGPT, Claude, or GitHub comments? That's exactly why MDize was created! It streamlines this by letting you grab files or folders directly from VS Code, instantly converting them into clean, Markdown-ready blocks—with or without line numbers. <br/>
  Focus on your prompts and reviews, not on escaping backticks or numbering lines by hand.
</p>

<p align="center">
  <a href="https://buymeacoffee.com/jorcelinojunior" target="_blank"><img alt="Buy Me a Coffee" src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support%20Me-FFDA33"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=jorcelinojunior.mdize" target="_blank"><img src="https://img.shields.io/visual-studio-marketplace/v/jorcelinojunior.mdize.svg?style=flat-square&label=Marketplace&logo=visualstudiocode&color=blue" alt="Visual Studio Marketplace Version"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=jorcelinojunior.mdize" target="_blank"><img src="https://img.shields.io/visual-studio-marketplace/i/jorcelinojunior.mdize.svg?style=flat-square&label=Installs&logo=visualstudiocode&color=green" alt="Visual Studio Marketplace Installs"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=jorcelinojunior.mdize" target="_blank"><img src="https://img.shields.io/visual-studio-marketplace/r/jorcelinojunior.mdize.svg?style=flat-square&label=Rating&logo=visualstudiocode&color=brightgreen" alt="Visual Studio Marketplace Rating"></a>
  <a href="https://github.com/jorcelinojunior/mdize" target="_blank"><img src="https://img.shields.io/github/stars/jorcelinojunior/mdize.svg?style=flat-square&label=Stars&logo=github" alt="GitHub Stars"></a>
  <a href="https://github.com/jorcelinojunior/mdize/blob/main/LICENSE" target="_blank"><img alt="License" src="https://img.shields.io/badge/License-MIT-blueviolet?style=flat-square"></a>
</p>

<p align="center">
  <img src="https://github.com/jorcelinojunior/mdize/blob/main/images/mdize-in-action.gif" alt="MDize extension in action, copying multiple files" width="640"/>
</p>

---

## 🎯 Features

- **Copy with or without line numbers** – perfect for AI prompts or clean snippets
- **Multi‑file & folder support** – select anything, the extension walks sub‑folders for you
- **Markdown‑ready formatting** – code fences are auto‑tagged with the correct language
- **Language‑agnostic** – works with TypeScript, Python, Java, Markdown, YAML … see full list below
- **Smart binary & size filter** – skips binaries or files > 3 MB to keep the clipboard slick
- **Blazing fast & lightweight** – zero runtime dependencies, minimal footprint
- **Instant feedback** – toast messages confirm exactly what was copied

---

## 🖥️ Visual Examples

MDize integrates seamlessly into your VS Code workflow, whether you're in the Explorer or working with open editor tabs:

**1. Accessing MDize from the File Explorer:**

<p align="center">
  <img src="https://github.com/jorcelinojunior/mdize/blob/main/images/mdize-explorer-context.png" alt="MDize context menu in VS Code File Explorer" width="720">
  <br/>
  <em><sub>Figure 1 – Right-click any file or folder in the Explorer to quickly access MDize's "Copy Content" and "Copy Content with Lines" commands.</sub></em>
</p>

**2. Accessing MDize from an Editor Tab:**

<p align="center">
  <img src="https://github.com/jorcelinojunior/mdize/blob/main/images/mdize-title-context.png" alt="MDize context menu on an open editor tab title" width="720">
  <br/>
  <em><sub>Figure 2 – You can also right-click directly on an open editor's tab title to use MDize (e.g., "Copy Content") on the active file.</sub></em>
</p>

### 📄 Sample Output (what you get on the clipboard)

<details open>
<summary><strong>Result from "MDize: Copy Content"</strong> (Raw code, no line numbers)</summary>

````markdown
### `src/hello.js`

```javascript
console.log('MDize rocks!');
...
console.log('Bye, world!');
```
````
</details>

---

<details>
<summary><strong>Result from "MDize: Copy Content with Lines"</strong> (Includes line numbers)</summary>

````markdown
### `src/hello.js`

```javascript
01: console.log('MDize rocks!');
02: ...
12: console.log('Bye, world!');
```
````
</details>

---

<details>
<summary><strong>Line Number Padding Example</strong> (from "MDize: Copy Content with Lines")</summary>

````markdown
### `src/bigFile.js`

```javascript
001: import mightyLib from 'mighty-lib';
002: ...
123: export default mightyLib;
```
````
</details>

---

## ⚙️ How to Install

1. Open **Extensions ↗** in VS Code (`Ctrl+Shift+X`).
2. Search for **“MDize”** and click **Install**.
3. Or install directly from the [Marketplace](https://marketplace.visualstudio.com/items?itemName=jorcelinojunior.mdize).

---

## 🚦 Quick Start

| Command                            | Default Keybinding         | Where it appears                       |
|------------------------------------|----------------------------|----------------------------------------|
| **MDize: Copy Content**            | `Ctrl + Alt + C`           | Context Menus (Explorer & Editor Tab)  |
| **MDize: Copy Content with Lines** | `Ctrl + Alt + Shift + C`   | Context Menus (Explorer & Editor Tab)  |

1.  **Select** one or more files/folders in the Explorer **or** focus an open editor tab.
2.  **Trigger MDize** by hitting the shortcut or using the context‑menu command.
3.  **Paste** the Markdown‑formatted result wherever you need it—done! 🎉

---

## 💡 Usage Scenarios

* **AI conversations** – feed complete files (with numbered lines) to LLMs for accurate references.
* **Code reviews** – share self‑contained snippets in GitHub comments without manual fencing.
* **Team chat** – drop nicely formatted code in Slack, Teams, or Jira tickets.
* **Live demos** – copy large examples quickly without worrying about binary artifacts sneaking in.

---

## 📌 Supported Languages

MDize recognises the following out‑of‑the‑box:

* TypeScript / TSX
* JavaScript / JSX / MJS
* Python
* Java
* C / C++ / Header files
* C#
* Go
* Rust
* Ruby
* PHP
* Swift
* Kotlin
* HTML / XHTML
* CSS / SCSS / Less
* XML
* JSON
* YAML
* Markdown
* Shell scripts (`.sh`, `.bash`, `.zsh`, `.fish`)
* SQL
* GraphQL
* Dockerfile
* Plain text

*(Any unknown but text‑based extension is still copied with a generic fence.)*

---

## ❓ Frequently Asked Questions

<details>
<summary><strong>Can I copy several files at once, including whole folders?</strong></summary>
<span>Yes. Select any mix of files and folders—the extension recurses sub‑folders and concatenates all eligible files into a single Markdown block.</span>
</details>

<details>
<summary><strong>What happens with large or binary files?</strong></summary>
<span>Files bigger than **3 MB** or detected as binary are silently skipped, and a warning toast tells you which ones were ignored.</span>
</details>

<details>
<summary><strong>How do I change the keybindings?</strong></summary>
<span>Open **Keyboard Shortcuts (`Ctrl+K Ctrl+S`) → search “MDize”** and map the commands to any combination you prefer.</span>
</details>

---

## 🤝 Contributing

Bug reports and PRs are very welcome!
Head over to the [issue tracker](https://github.com/jorcelinojunior/mdize/issues) to get started.

---

## 🧑‍💻 Development

```bash
git clone https://github.com/jorcelinojunior/mdize.git
cd mdize
npm install
npm run watch     # incremental TypeScript build
```

1. Press `F5` in VS Code to launch an **Extension Development Host**.
2. Hit the commands or keybindings inside the host window to test changes.
3. Run **unit + integration tests** with `npm test`.

---

## 📃 License

Released under the **MIT License** – see [`LICENSE`](https://github.com/jorcelinojunior/mdize/blob/main/LICENSE) for details.

---

<p align="center"><sub>Made with 💙 in Brazil – enjoy friction‑free code sharing!</sub></p>

---

<h2 id="support-this-project" align="center">☕ Support This Project</h2>

<p align="center">
  <strong>
      If this extension has been helpful, consider supporting my work and keeping the magic alive!<br/>
      Your contributions help maintain and improve tools like this one. 🌟
   </strong>
</p>

<p align="center">
   <a href="https://www.buymeacoffee.com/jorcelinojunior" target="_blank">
      <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=jorcelinojunior&button_colour=ffda33&font_colour=000000&font_family=Bree&outline_colour=000000&coffee_colour=FFDD00" alt="Buy Me a Coffee"/>
   </a>
</p>

<p align="center">
  <strong><em>Thank you for your kindness and support! 💜</em></strong>
</p>