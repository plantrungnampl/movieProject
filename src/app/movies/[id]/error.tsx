"use client";
export default function ErrorBounary({ err }: { err: Error }) {
  return (
    <div className="mt-[61px] flex justify-center items-end min-h-screen">
      <h1>{err.message}</h1>
      <p>{err.stack}</p>
    </div>
  );
}
