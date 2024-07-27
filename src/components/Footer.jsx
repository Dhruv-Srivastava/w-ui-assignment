export default function Footer(){
    return (
        <footer className="bg-black mt-5 text-[#AAA] py-3 px-20 flex justify-center items-center w-full text-[12px] lg:mt-20">
            &copy; {new Date().getFullYear()} Wellness Retreat
        </footer>
    )
}