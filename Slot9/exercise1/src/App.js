import React from "react";
import UserProfile from "./components/UserProfile";
import UserProfile2 from "./components/UserProfile2";
import MyForm from "././components/MyForm";
import "bootstrap/dist/css/bootstrap.min.css";
import AdvancedForm from "./components/Form";
import { Container } from "react-bootstrap";

const App = () => {
  const handleFormSubmit = (formData) => {
    console.log("Dữ liệu đã gửi:", formData);
  };

  const handleFormSubmit2 = (formData) => {
    console.log("Dữ liệu form đã gửi:", formData);
    alert("Form đã được gửi thành công! Kiểm tra console để xem dữ liệu.");
  };

  return (
    <>
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "20px" }}>
      <Container>
        
        <AdvancedForm 
          title=" Đăng Ký Thành Viên" 
          onSubmit={handleFormSubmit2}
          submitButtonText="Đăng Ký Ngay"
        />
      </Container>
    </div>


    <div className="App">
      <h1>Ứng Dụng React</h1>
      <MyForm title="Đăng Ký Người Dùng" onSubmit={handleFormSubmit} />
    </div>

    <div className="App">

    <h2/>
      <h1>Ứng Dụng React</h1>
      <UserProfile2 name="Nguyễn Văn A" age={25} onSubmit={handleFormSubmit} />
      <UserProfile2
        name="Nguyễn Văn B"
        age="twenty five"
        onSubmit={handleFormSubmit}
      />
      <UserProfile2 name="" age={30} onSubmit={handleFormSubmit} />
    </div>


<h1></h1>
<br/>
    <div className="App">
      <h1>Ứng Dụng React</h1>

      {/* Trường hợp hợp lệ */}
      <UserProfile name="Nguyễn Văn A" age={25} />

      {/* Trường hợp name không hợp lệ */}
      <UserProfile name="" age={25} />

      {/* Trường hợp tuổi không hợp lệ */}
      <UserProfile name="Nguyễn Văn B" age="twenty five" />

      {/* Trường hợp không nhập tuổi */}
      <UserProfile name="Nguyễn Văn C" age={null} />
    </div>
    </>
  );
};

export default App;

