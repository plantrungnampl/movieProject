"use client";
export default function ErrorBounary({ err }: { err: Error }) {
  return (
    <div>
      <h1>{err.message}</h1>
      <p>{err.stack}</p>
    </div>
  );
}
