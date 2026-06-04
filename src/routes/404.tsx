import StatusPage from "~/components/StatusPage";

export default function NotFound() {
  return (
    <StatusPage title="404" message="That paste does not exist or has been removed." titleColor="var(--accent-color)" />
  );
}
