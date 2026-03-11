//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

// Exercise 2.5
import Course from './Course'


// Exercises 1.1-1.2
/*
const Header = (props) => {
  console.log("Header props", props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  console.log("Part props", props)
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </div>
  )
}

const Total = (props) => {
  console.log("Total props", props)
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}
*/

// Exercises 1.3

/*
const Header = (props) => {
  console.log("Header props", props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
    )
  }


const Part = (props) => {
  console.log("Name", props.part.name)
  console.log("Exercises", props.part.exercises)
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  console.log("Content props", props)
  return (
    <div>
      <Part part={props.part1}/>
      <Part part={props.part2}/>
      <Part part={props.part3}/>
    </div>
  )
}


const Total = (props) => {
  console.log("Exercise1 props", props.exercises1)
  console.log("Exercise2 props", props.exercises2)
  console.log("Exercise3 props", props.exercises3)
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}
*/

 // Exercise 1.4

 /*
 const Header = (props) => {
  console.log("Header props", props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
    )
  }

  const Part = (props) => {
    console.log("Name", props.part.name)
    console.log("Exercises", props.part.exercises)
    return (
      <div>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </div>
    )
  }

  const Total = (props) => {
    console.log("Total props parts", props.parts)
    return (
      <div>
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
      </div>
    )
  }

  const Content = (props) => {
    console.log("Content props", props)
    return (
      <div>
        <Part part={props.parts[0]} />
        <Part part={props.parts[1]} />
        <Part part={props.parts[2]} />
      </div>
    )
  }

*/

 // Exercises 1-2.1

 /*

const App = () => {
  console.log('Hello from component')
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  */

  /*return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
  */

 /* return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
  export default App
  */

  // Exercises 1.3
  /*
  const App = () => {
    console.log('Hello from component')
    const course = 'Half Stack application development'
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }
  
    return (
      <div>
        <Header course={course} />
        <Content part1={part1} part2={part2} part3={part3} />
        <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
      </div>
    )
  }
  export default App
  */
  // Exercises 1.4
/*
  const App = () => {
    console.log('Hello from component')
    const course = 'Half Stack application development'
    const parts = [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  
    return (
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    )
  }

export default App
*/

// Exercises 1.5

/*  const Header = (props) => {
    console.log("Header props", props)
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
      )
    }

    const Part = (props) => {
      console.log("Part props", props)
      console.log("Name", props.part.name)
      console.log("Exercises", props.part.exercises)
      return (
        <div>
          <p>
            {props.part.name} {props.part.exercises}
          </p>
        </div>
      )
    }

    const Total = (props) => {
      console.log("Total props parts", props.parts)
      return (
        <div>
          <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
        </div>
      )
    }

    const Content = (props) => {
      console.log("Content props", props)
      console.log("Parts", props.course.parts)
      return (
        <div>
          <Part part={props.course.parts[0]} />
          <Part part={props.course.parts[1]} />
          <Part part={props.course.parts[2]} />
        </div>
      )
    }

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}
export default App
*/

// Exericse 2.1

/*
const Header = ({name}) => {
  console.log("Header", name)
  return (
    <div>
      <h1>{name}</h1>
    </div>
    )
  }

  const Part = ({part}) => {
    console.log("Part", part)
    console.log("Part name", part.name)
    console.log("Part exercise", part.exercises)
    console.log("Part id", part.id)
    return (
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    )
  }

  const Content = ({parts}) => {
    console.log("Parts", parts)
    return (
      <div>
          {parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    )
  }
  */

  // Exercise 2.2

  /*const Total = ({parts}) => {
    console.log("Total parts", parts)
    return (
      <div>
        <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
      </div>
    )
  }*/

  // Exercise 2.3

  /*
const Total = ({parts}) => {
  const exercises = parts.map(part => part.exercises)
  console.log('exercises', exercises)
  const total =  exercises.reduce((s, p) => s + p, 0);
  console.log('total', total)
    return (
      <div>
        <h3>total of {total} exercises</h3>
      </div>
    )
  }


const Course = ({course}) => {
  console.log("Course course", course)
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
*/

/*const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
*/

// Exercise 2.4

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App