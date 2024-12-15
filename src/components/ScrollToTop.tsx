import { MdKeyboardArrowUp } from "react-icons/md";

const ScrollToTop = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return <MdKeyboardArrowUp onClick={handleScrollToTop} size={24} className="fixed bottom-12 right-12 bg-primaryNew text-white cursor-pointer rounded-full"/>;
};

export default ScrollToTop;
