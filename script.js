const htmlCode = document.getElementById("html-code");
const cssCode = document.getElementById("css-code");
const jsCode = document.getElementById("js-code");
const output = document.getElementById("output");

function updateOutput() {
  const html = htmlCode.value;
  const css = `<style>${cssCode.value}</style>`;
  const js = `<script>${jsCode.value}<\/script>`;

  output.srcdoc = html + css + js;
}

htmlCode.addEventListener("input", updateOutput);
cssCode.addEventListener("input", updateOutput);
jsCode.addEventListener("input", updateOutput);

function clearCode() {
    if(confirm("Are you sure you want to clear the code?")) {
    htmlCode.value = "";
    cssCode.value = "";
    jsCode.value = "";
    updateOutput();
}
}
updateOutput();
