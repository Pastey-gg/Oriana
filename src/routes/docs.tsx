export default function DocsPage() {
  window.location.replace(`${import.meta.env.VITE_API_HOST}/docs`);
  return null;
}
