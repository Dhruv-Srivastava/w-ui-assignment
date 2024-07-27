export default function Badge({ children, ...props }) {
  return (
    <div
      className="rounded-full py-2 px-3 text-center min-w-20  text-white lg:py-2 lg:px-5"
      {...props}
    >
      {children}
    </div>
  );
}
