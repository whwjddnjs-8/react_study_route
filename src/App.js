import Button from "./Button"
import styles from "./App.module.css"
import {useState, useEffect} from "react"

function Hello() {
  // 대부분 이렇게 function을 많이 만들기보다는 useEffect안에다 함수를 직접 입력하여 실행한다.
  /* function byFn() {
    console.log("bye!");
  }
  function hiFn() {
    console.log("hi!");
    return byFn;
  }
  useEffect(hiFn, []) */

  useEffect(() => {
    console.log("Hi!");
    return () => console.log("Bye!");
  }, [])
  return <h1>Hello</h1>;
}

function App() {
  /* const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");

  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (e) => { setKeyword(e.target.value) };

  useEffect(() => {
    console.log("I run only once")
  }, [])

  // keyword가 변화할때 실행시켜줘!
  useEffect(() => {
    console.log("I run when 'keyword' change")
  }, [keyword])

  useEffect(() => {
    console.log("I run when 'counter' change")
  }, [counter])

  useEffect(() => {
    console.log("I run when 'counter'  & 'keyword' change")
  }, [keyword, counter])

  return (
    <div>
      <input value={keyword} onChange={onChange} type="text" placeholder="Search here.." />
      <h1 className={styles.title}>{counter}</h1>
      <button onClick={onClick}>Click Me</button>
    </div>
  ); */

  /* const [showing, setShowing] = useState(false);
  const onClick = () => {
    setShowing((prev) => !prev)
  }
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  ) */

  /* const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);

  const onChange = (e) => {
    setToDo(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (toDo === "") {
      return;
    }

    // food = [1,2,3,4]
    // [5, food] -> 한 배열에 5와 food라는 배열이 들어감
    // [5, ...food] -> [6,1,2,3,4,5]
    setToDos((currentArray) => [toDo, ...toDos]);
    setToDo("");
  };

  return (
    <div>
      <h1>My ToDos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input value={toDo} onChange={onChange} type="text" placeholder="Write your to do" />
        <button>Add ToDo</button>
      </form>
      <hr />
      <ul>
        {toDos.map((todo, index) => <li key={index}>{todo}</li>)}
      </ul>
   
    </div>
  ) */

  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [myMoney, setMyMoney] = useState('');
  const [cost, setCost] = useState();

  const onChange = (e) => {
    setMyMoney(e.target.value);
  }

  const onCostChange = (e) => {
    setMyMoney(1);
    setCost(e.target.value);
  }

  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json()
    ).then((json) => {
      setCoins(json);
      setLoading(false);
      console.log(json)
    });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`} </h1>
      
      {loading ? <strong>Loading...</strong> : 
        (
          <select onChange={onCostChange}>
            <option>Select Coin!</option>
          {coins.map((coin, index) => 
            <option key={index} id={coin.id} value={coin.quotes.USD.price}>{coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD</option>
          )}
          </select>
        )}
      
      <hr />
      <h2> Enter Your Money </h2>
      <input type="text" placeholder="Enter Your Money" value={myMoney} onChange={onChange} />
      
      <h3>You Need {myMoney / cost}</h3>
    </div>
  )
}

export default App;
