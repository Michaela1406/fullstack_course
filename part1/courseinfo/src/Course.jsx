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

export default Course;