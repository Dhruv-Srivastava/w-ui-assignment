import InputContainer from "./InputContainer";

export default function Navbar() {
  return (
    <nav className="bg-[#EDE9FF] rounded-br-3xl rounded-bl-3xl w-full min-h-40 px-6 py-10">
      <h1 className="text-[1.875rem] font-semibold leading-tight mb-5">
        Find <br />
        <span className="text-[#761CBC]">YOUR Retreat</span>
      </h1>
      <InputContainer style={{ background: "white" }} />
    </nav>
  );
}
