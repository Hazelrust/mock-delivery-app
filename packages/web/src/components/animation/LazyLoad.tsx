import Loading from "../../icon/loading-icon.svg";

const LazyLoad = () => {
  return (
    <div role="status">
      <p>Lazyload</p>
      <img
        src={Loading}
        className="w-8 h-8 text-gray-300 animate-spin fill-cyan-500"
      />
      <span className="sr-only">Currently loading...</span>
    </div>
  );
};
export default LazyLoad;
