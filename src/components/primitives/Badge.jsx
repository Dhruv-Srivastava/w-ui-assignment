export default function Badge({ children, ...props }) {
  return (
    <div
      className="rounded-full py-3 px-4 text-center min-w-20 text-sm text-white"
      {...props}
    >
      {children}
    </div>
  );
}
