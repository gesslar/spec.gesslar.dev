export function onRouteDidUpdate() {
  // Auto-enable word wrap on all code blocks by clicking the toggle buttons.
  // Uses a short delay to let Docusaurus finish rendering the code blocks
  // and computing scrollability before we click.
  setTimeout(() => {
    document
      .querySelectorAll(".wordWrapButtonIcon")
      .forEach(icon => {
        const btn = icon.closest("button")
        if(btn && !btn.className.includes("wordWrapButtonEnabled")) {
          btn.click()
        }
      })
  }, 100)
}
