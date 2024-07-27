import { useCallback, useContext, useEffect, useState } from "react";
import { SearchParamsContext } from "../context/SearchParams";

import Modal from "./primitives/Drawer";
import Toast from "./primitives/Toast";

import SearchIcon from "../assets/search.svg";
import TrashIcon from "../assets/trash.svg";

import { debounce } from "../utils/debounce";

export default function InputContainer({ style }) {
  const [inputValue, setInputValue] = useState("");
  const [params, setSearchParams] = useContext(SearchParamsContext);

  useEffect(() => {
    if (!params.has("search")) {
      setInputValue("");
    }
  }, [params]);

  const debouncedSetSearchParams = useCallback(
    debounce((newValue) => {
      setSearchParams((prev) => {
        prev.set("search", newValue);
        prev.set("page", 1);
        prev.set("limit", 3);
        prev.delete("location");
        prev.delete("type");
        return prev;
      });
    }, 300),
    [setSearchParams]
  );

  function handleChange(e) {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedSetSearchParams(newValue);
  }

  return (
    <div className="flex gap-3 rounded-xl py-3 px-5" style={style}>
      <img src={SearchIcon} alt="" className="" />
      <input
        type="text"
        placeholder="Search retreat by tag, location, title, type or anything.."
        className="w-full flex-1 outline-none bg-transparent text-ellipsis placeholder:text-[10px] lg:placeholder:text-base"
        value={inputValue}
        onChange={handleChange}
      />
      <Modal />

      <Toast>
        <button
          onClick={() => {
            setSearchParams((prev) => {
              prev.delete("search");
              prev.set("page", 1);
              prev.set("limit", 3);
              prev.delete("location");
              prev.delete("type");
              return prev;
            });
          }}
          className="flex items-center gap-2 bg-[#F0635A] rounded-3xl p-2 pr-3 text-white cursor-pointer text-center transition-[300ms_ease_transform] active:scale-95"
        >
          <img src={TrashIcon} alt="" className="" />
        </button>
      </Toast>
    </div>
  );
}
