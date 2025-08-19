import React from "react"
import ProfileForm from "./ProfileForm"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const handleSubmit = (data) => {
    console.log("Data received in App.js:", data)
  }

  return (
    <ProfileForm
     initialData={null}
      onSubmit={handleSubmit}
      showToastDuration={3000}
      cardMaxWidth="600px"
    />
  )
}
// initialData={null}
export default App
