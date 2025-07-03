// HCJ Elements
const htmlCode = document.getElementById("html-code");
const cssCode = document.getElementById("css-code");
const jsCode = document.getElementById("js-code");
const hcjOutput = document.getElementById("output"); // ✅ fixed id

function updateOutput() {
  const html = htmlCode?.value || "";
  const css = `<style>${cssCode?.value || ""}</style>`;
  const js = `<script>${jsCode?.value || ""}<\/script>`;
  if (hcjOutput) hcjOutput.srcdoc = html + css + js;
}

htmlCode?.addEventListener("input", updateOutput);
cssCode?.addEventListener("input", updateOutput);
jsCode?.addEventListener("input", updateOutput);
updateOutput();

//Clear Function for HTML, CSS, and JS
function clearCode() {
  const htmlCode = document.getElementById("html-code");
  const cssCode = document.getElementById("css-code");
  const jsCode = document.getElementById("js-code");
  const output = document.getElementById("output");

  if (
    htmlCode.value.trim() === "" &&
    cssCode.value.trim() === "" &&
    jsCode.value.trim() === ""
  ) {
    return; 
  }

  const confirmClear = confirm("Are you sure you want to clear all code?");
  if (confirmClear) {
    htmlCode.value = "";
    cssCode.value = "";
    jsCode.value = "";
    output.srcdoc = ""; 
  }
}

// Clear Code For Language
function clearCodeForL() {
  const area = document.getElementById("code-area");
  if (area?.value.trim() !== "") {
    const confirmClear = confirm("Are you sure you want to clear the code?");
    if (confirmClear) {
      area.value = "";
      if (document.getElementById("code-output")) {
        document.getElementById("code-output").textContent = "";
      }
    }
  }
}

// Run C Code via Backend
async function runCCode() {
  const code = document.getElementById("code-area")?.value;
  const outputBox = document.getElementById("code-output");

  const payload = {
    script: code,
    language: "c",
    versionIndex: "0"
  };

  try {
    const res = await fetch("http://localhost:5000/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    outputBox.textContent = result.output;
  } catch (err) {
    outputBox.textContent = "Error: " + err.message;
  }
}
async function runCode(language) {
  const code = document.getElementById('code-area')?.value;
  const outputBox = document.getElementById('code-output');

  const payload = {
    script: code,
    language: language,
    versionIndex: "0", // You can customize versions if needed
  };

  try {
    const res = await fetch("http://localhost:5000/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    outputBox.textContent = result.output;
  } catch (err) {
    outputBox.textContent = "Error: " + err.message;
  }
}

updateOutput();
