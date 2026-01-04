const Searchinput = () => {
  return (
    <div className="text-sky-200 flex justify-center my-3 mt-10  items-center">
      <div className="maininput">
        <input
          className="bg-gray-600 p-2 px-3 rounded-sm outline-0 "
          type="text"
          name="search"
        />
      </div>
      <div className="second"></div>
    </div>
  );
};

export default Searchinput;
