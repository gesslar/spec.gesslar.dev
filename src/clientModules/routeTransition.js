import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment"

if(ExecutionEnvironment.canUseDOM) {
  window.__routeTransitionLastPathname = window.location.pathname
}

export function onRouteDidUpdate({location}) {
  if(location.pathname === window.__routeTransitionLastPathname) {
    return
  }

  window.__routeTransitionLastPathname = location.pathname
  const main = document.querySelector("main")
  if(main) {
    main.classList.remove("route-transition")
    // Force reflow to restart the animation
    void main.offsetHeight
    main.classList.add("route-transition")
  }
}
