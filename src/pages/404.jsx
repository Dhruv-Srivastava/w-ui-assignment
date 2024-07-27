import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]  text-black">
      <div className="text-[150px] font-bold">404</div>
      <div className="text-[44px]">Page not found!</div>
      <Link to="/" className="text-green-500 font-medium">
        Click here to go to home
      </Link>
    </div>
  );
}
