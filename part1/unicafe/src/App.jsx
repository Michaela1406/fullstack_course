/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-tde-docs">
        Click on tde Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/

// Exercise 1.6 unicafe step 1

/*
import { useState } from 'react'

const Header = props => <h2>{props.text}</h2>

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.name}
  </button>
)

const Statistics = (props) => (
  <div>
    <p>{props.text} {props.value}</p>
  </div>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newValue) => {
    console.log('good now', newValue)
    setGood(newValue)
  }

  const setToNeutral = (newValue) => {
    console.log('neutral now', newValue)
    setNeutral(newValue)

  }

  const setToBad = (newValue) => {
    console.log("bad now", newValue)
    setBad(newValue)
  }
    
  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={() => setToGood(good+1)} name="good" />
      <Button onClick={() => setToNeutral(neutral+1)} name="neutral" />
      <Button onClick={() => setToBad(bad+1)} name="bad" />
      <Header text="statistics"/>
      <Statistics text="good" value={good}/>
      <Statistics text="neutral" value={neutral}/>
      <Statistics text="bad" value={bad}/>
    </div>
  )
}
*/

// Exercise 1.7 unicafe step 2
/*
import { useState } from 'react'


const Header = props => <h2>{props.text}</h2>

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.name}
  </button>
)

// Exercise 1.8 unicafe step 3
const Statistics = (props) => (
  <div>
    <p>{props.text} {props.value}</p>
  </div>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)


  const setToGood = (newValue) => {
    console.log('good now', newValue)
    setGood(newValue)
    setTotal(newValue + neutral + bad)
    setAverage((newValue + 0 + -bad) / (newValue + neutral + bad))
    setPositive((newValue / (newValue + neutral + bad)) * 100)
  }

  const setToNeutral = (newValue) => {
    console.log('neutral now', newValue)
    setNeutral(newValue)
    setTotal(good + newValue + bad)
    setAverage((good + 0 + -bad) / (good + newValue + bad))
    setPositive((good / (good + newValue + bad)) * 100)

  }

  const setToBad = (newValue) => {
    console.log("bad now", newValue)
    setBad(newValue)
    setTotal(good + neutral + newValue)
    setAverage((good + 0 + -newValue) / (good + neutral + newValue))
    setPositive((good / (good + neutral + newValue)) * 100)
  }



    
  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={() => setToGood(good+1)} name="good" />
      <Button onClick={() => setToNeutral(neutral+1)} name="neutral" />
      <Button onClick={() => setToBad(bad+1)} name="bad" />
      <Header text="statistics"/>
      <Statistics text="good" value={good}/>
      <Statistics text="neutral" value={neutral}/>
      <Statistics text="bad" value={bad}/>
      <Statistics text="all" value={total}/>
      <Statistics text="average" value={average}/>
      <Statistics text="positive" value={positive + " %"}/>
    </div>
  )
} 
*/

// Exercise 1.9 unicafe step 4

/*
import { useState } from 'react'


const Header = props => <h2>{props.text}</h2>

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.name}
  </button>
)


// Exercise 1.10 unicafe step 5
const StatisticLine = props => (
  <div>
    <p>{props.text} {props.value}</p>
  </div>
  )


const Statistics = (props) => {
  if(props.allClicks.lengtd === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
    return (
      <div>
        <StatisticLine text="good" value={props.values[0]} />
        <StatisticLine text="neutral" value={props.values[1]} />
        <StatisticLine text="bad" value={props.values[2]} />
        <StatisticLine text="all" value={props.values[3]} />
        <StatisticLine text="average" value={props.values[4]} />
        <StatisticLine text="positive" value={props.values[5]} />
      </div>
    )
}

const History = (props) => {
  if(props.allClicks.lengtd === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const [allClicks, setAllClicks] = useState([])


  const setToGood = (newValue) => {
    console.log('good now', newValue)
    setGood(newValue)
    setTotal(newValue + neutral + bad)
    setAverage((newValue + 0 + -bad) / (newValue + neutral + bad))
    setPositive((newValue / (newValue + neutral + bad)) * 100)
    setAllClicks(allClicks.concat('good'))
  }

  const setToNeutral = (newValue) => {
    console.log('neutral now', newValue)
    setNeutral(newValue)
    setTotal(good + newValue + bad)
    setAverage((good + 0 + -bad) / (good + newValue + bad))
    setPositive((good / (good + newValue + bad)) * 100)
    setAllClicks(allClicks.concat('neutral'))

  }

  const setToBad = (newValue) => {
    console.log("bad now", newValue)
    setBad(newValue)
    setTotal(good + neutral + newValue)
    setAverage((good + 0 + -newValue) / (good + neutral + newValue))
    setPositive((good / (good + neutral + newValue)) * 100)
    setAllClicks(allClicks.concat('bad'))
  }

  const values = [
    good,
    neutral,
    bad,
    total,
    average,
    positive + "%"
  ]
    
  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={() => setToGood(good+1)} name="good" />
      <Button onClick={() => setToNeutral(neutral+1)} name="neutral" />
      <Button onClick={() => setToBad(bad+1)} name="bad" />
      <Header text="statistics"/>
      <History allClicks={allClicks} />
      {allClicks.lengtd > 0 && (
        <>
          <Statistics values={values} allClicks={allClicks} />
        </>
      )}
    </div>
  )
} 
*/

// Exercise 1.11 unicafe step 6

import { useState } from 'react'


const Header = props => <h2>{props.text}</h2>

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.name}
  </button>
)



const Statistics = (props) => {
  if(props.allClicks.length === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
    return (
      <table>
        <tbody>
          <tr>
            <td>{props.text[0]} {props.values[0]}</td>
          </tr>
          <tr>
            <td>{props.text[1]} {props.values[1]}</td>
          </tr>
          <tr>
            <td>{props.text[2]} {props.values[2]}</td>
          </tr>
          <tr>
            <td>{props.text[3]} {props.values[3]}</td>
          </tr>
          <tr>
            <td>{props.text[4]} {props.values[4]}</td>
          </tr>
          <tr>
            <td>{props.text[5]} {props.values[5]}</td>
          </tr>
        </tbody>
      </table>
    )
}

const History = (props) => {
  if(props.allClicks.length === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const [allClicks, setAllClicks] = useState([])


  const setToGood = (newValue) => {
    console.log('good now', newValue)
    setGood(newValue)
    setTotal(newValue + neutral + bad)
    setAverage((newValue + 0 + -bad) / (newValue + neutral + bad))
    setPositive((newValue / (newValue + neutral + bad)) * 100)
    setAllClicks(allClicks.concat('good'))
  }

  const setToNeutral = (newValue) => {
    console.log('neutral now', newValue)
    setNeutral(newValue)
    setTotal(good + newValue + bad)
    setAverage((good + 0 + -bad) / (good + newValue + bad))
    setPositive((good / (good + newValue + bad)) * 100)
    setAllClicks(allClicks.concat('neutral'))

  }

  const setToBad = (newValue) => {
    console.log("bad now", newValue)
    setBad(newValue)
    setTotal(good + neutral + newValue)
    setAverage((good + 0 + -newValue) / (good + neutral + newValue))
    setPositive((good / (good + neutral + newValue)) * 100)
    setAllClicks(allClicks.concat('bad'))
  }

  const values = [
    good,
    neutral,
    bad,
    total,
    average.toFixed(2),
    positive.toFixed(2) + "%"
  ]

  const text = [
    "good",
    "neutral",
    "bad",
    "all",
    "average",
    "positive"
  ]
    
  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={() => setToGood(good+1)} name="good" />
      <Button onClick={() => setToNeutral(neutral+1)} name="neutral" />
      <Button onClick={() => setToBad(bad+1)} name="bad" />
      <Header text="statistics"/>
      <History allClicks={allClicks} />
      {allClicks.length > 0 && (
        <>
          <Statistics text={text} values={values} allClicks={allClicks} />
        </>
      )}
    </div>
  )
} 

export default App
