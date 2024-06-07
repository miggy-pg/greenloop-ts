import { useEffect, useState, useRef } from "react";

interface RefProp {
  current: HTMLDivElement | null;
}

function useOutsideAlerter(ref: RefProp, setX: (open: boolean) => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent): void {
      if (!ref?.current?.contains(event.target as Node)) {
        setX(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setX]);
}

interface Dropdown {
  classNames: string;
  icon: JSX.Element;
  isDisabled: boolean;
  children: React.ReactNode;
}

const Dropdown = (props: Dropdown) => {
  const { icon: Icon, children, classNames, isDisabled } = props;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [openWrapper, setOpenWrapper] = useState(false);
  useOutsideAlerter(wrapperRef, setOpenWrapper);

  return (
    <div ref={wrapperRef} className="relative flex">
      <div className="flex" onMouseDown={() => setOpenWrapper(!openWrapper)}>
        <button disabled={isDisabled ? true : false}>{Icon}</button>
      </div>
      <div
        className={`${classNames} absolute z-10 "origin-top-right transition-all duration-300 ease-in-out ${
          openWrapper ? "scale-100" : "scale-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
