import logo from './logo.svg';
import './App.css';
import ProfileForm from './ProfileForm';
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  // const [name, setName] = React.useState('');
  // const [age, setAge] = React.useState('');
  // const [error, setError] = React.useState('');
  // const checkAge = () => {
  //   if (Number(age) < 0) {
  //     setError("Please enter a valid age.");
  //   } else if (Number(age) > 120) {
  //     setError("Please enter a realistic age.");
  //   } else if (Number(age) <= 18) {
  //     setError('User under 18');
  //   } else {
  //     setError('');
  //   }
  // };
  return (
    <ProfileForm/>
    // <div>
    //   <section>
    //     <input
    //       type="text"
    //       placeholder="Name"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //     <p>My name is {name}</p>
    //   </section>
    //   <section>
    //     <input 
    //       type="number"
    //       placeholder="Age"
    //       value={age}
    //       onChange={(e) => setAge(e.target.value)}
    //       onBlur={checkAge} 
    //     />
    //     {error && <p style={{color: "red"}}>{error}</p>}
    //     <p>My age is {age}</p>
    //   </section>
    // </div>
  );
}

export default App;
