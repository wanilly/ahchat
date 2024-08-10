import { useNavigate } from "react-router-dom";

const Home = () => {
  const movePage = useNavigate();

  function handlerpage(){
     movePage('/login');
   }
  return (
    
    <div className="home">
        홈 입니다.
        첫 페이지
      <button size= "large" onClick={handlerpage}>로그인하러가기</button>
      </div>
  );
}

export default Home;