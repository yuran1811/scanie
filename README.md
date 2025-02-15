<h1 align="center">scanie</h1>
<p align="center" style="font-size:16px"><strong>An alternative of test judging</strong></p>
<p align="center">  
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/palette/macchiato.png" width="400" />
</p>

<p align="center">
  <img alt="Stars" src="https://badgen.net/github/stars/yuran1811/scanie">
  <img alt="Forks" src="https://badgen.net/github/forks/yuran1811/scanie">
  <img alt="Issues" src="https://badgen.net/github/issues/yuran1811/scanie">
  <img alt="Commits" src="https://badgen.net/github/commits/yuran1811/scanie">
  <img alt="Code Size" src="https://img.shields.io/github/languages/code-size/yuran1811/scanie">
</p>

<div align="center"><a href="http://scanie.vercel.app/" target="_blank">Live Demo</a></div>

## Features

- \>= 5s needed for judging
- Store the results and can be exported as `.xlsx` file
- Manage as many as results
- Filter groups follow fields, sort scores in each group
- **Todo**
  - Workflow :
    - Upload image -> recognize (Error of Not recognize -> Rejudge)
    - Add to group label for quicker action

## Tech Stack

<img src="https://skill-icons-livid.vercel.app/icons?i=react,redux,tailwind,ts,vite&gap=60" height="36" />

- Other libs:
  - TesseractJS
  - uuid
  - react-toastify
  - react-hook-form
  - floating-ui
  - ...

## Screenshots

<div style="display:flex;gap:12px;justify-content:center">
    <img src="./public/screenshots/judge-upload.png" style="width:45%;max-width:380px">
    <img src="./public/screenshots/judge-preview.png" style="width:45%;max-width:380px">
</div>

<div style="display:flex;gap:12px;justify-content:center">
    <img src="./public/screenshots/judge-parse.png" style="width:45%;max-width:380px">
    <img src="./public/screenshots/result.png" style="width:45%;max-width:380px">
</div>

<div style="display:flex;gap:12px;justify-content:center">
    <img src="./public/screenshots/result-class-filter.png" style="width:45%;max-width:380px">
    <img src="./public/screenshots/results-detail.png" style="width:45%;max-width:380px">
</div>

## Quick Start

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed or downloaded on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)

**Cloning the Repository**

```bash
git clone https://github.com/yuran1811/scanie.git
cd scanie
```

**Installation**

- Enable `pnpm` to build and run the project

```bash
corepack enable pnpm
```

Install the project dependencies:

```bash
pnpm install
```

**Running the Project**

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

## References

- [Preprocess Images for OCR](https://dev.to/mathewthe2/using-javascript-to-preprocess-images-for-ocr-1jc)
