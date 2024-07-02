import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numallow, setNumallow] = useState(false);
  const [charallow, setCharallow] = useState(false);
  const [password, setPassword] = useState("");

  //useref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqqrstuvwxyz";

    //condn
    if (numallow) str += "0123456789";
    if (charallow) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); // here we random char index not the char
      pass += str.charAt(char); // we get random char here
    }
    //untill here we never read pass
    //so we use setPassword
    setPassword(pass);
  }, [length, numallow, charallow, setPassword]);
    
  const copyPasswordtoClipboard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0 ,21)
    window.navigator.clipboard.writeText(password)
  },[password])
  /*  
call funcn directly
passwordGenerator();
will throw error coz we r using useCallback 
coz in react what wen will be rendered is controlled by states like setValue or setState

so we use useEffect
*/
  useEffect(() => {
    passwordGenerator();
  }, [length, numallow, charallow, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-600 bg-gray-700">
        <h1 className=" text-white text-center my-2">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 "
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordtoClipboard}
          className="outline-none bg-blue-600 text-white px-3 py-1.5 shrink-0">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2 ">
          <div className="flex items-center gap-x-1 ">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className=" cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numallow}
              id="numberInput"
              onChange={() => {
                setNumallow((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallow}
              id="numberInput"
              onChange={() => {
                setCharallow((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
