const Header = ({label}) => {
    return (
      <h1>{label}</h1>
    )
  }
  
  const Content = ({parts}) => {
    const p = parts
    return (
      <div>
        {p.map(component => <Part content={component} key = {component.id} />)}
      </div>
    )
  }
  
  const Part = ({content}) => {
    return (
      <p>{content.name} {content.exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((totalAcumulated, currentValue) => totalAcumulated + currentValue.exercises 
    , 0)
    return (
      <p>Total Number of exercises {total}</p>
    )
  }
  
  const Course = (props) => {
    const course = props.course
    return (
        <div>
          {course.map(value => (
            <div key={value.id}>
              <Header label={value.name}/>
              <Content parts={value.parts} />
              <Total parts={value.parts}/>
            </div>
            )
          )}
        </div>
      )
  }
  
  export default Course