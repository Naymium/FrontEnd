export default function DataInstance({ title, content }) {
  return (
    <div className="border p-4 m-2 rounded">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}
