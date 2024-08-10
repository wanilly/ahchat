import { useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { createGlobalStyle,styled } from 'styled-components';
import { useState } from 'react';
import Template from "./template";
import { useGoogleLogin, GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { useEffect } from "react";




const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;


// 
const Login = () => {




  const usenavi = useNavigate();

  const Rest_api_key='6648f3d4d2a44f076e194cb5be1d669f' //REST API KEY
  const redirect_uri = 'http://localhost:3000/kakao_callback' //Redirect URIㅇ
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

  const redic = '';




  const kahandleLogin = () => {
    
    const width = 500;
    const height = 800;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;

    const popup = window.open(kakaoURL, "kakao", windowFeatures);
    //window.location.href = kakaoURL

    // code 파싱
    const params = new URL(document.location.toString()).searchParams
    const kakao_code  = params.get("code")

    // 
    if (kakao_code) {
      getToken(kakao_code)
      //getKakaoToken()
    }
    const getKakaoToken = () => {
      const GRANT_TYPE = "authorization_code"
      const REST_API_KEY = `${process.env.REACT_APP_REST_API_KEY}`;
      const CLIENT_ID = `${REST_API_KEY}`
      const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;
      fetch(`https://kauth.kakao.com/oauth`, {
        method: 'POST', 
        headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
        body: `grant_type=${GRANT_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${kakao_code}`,
      }).then(re => re.json())
      .then(data => {
        if (data.access_token) {
          //localStorage.setItem('token', token);

        }
        else {
          usenavi('/')
        }
      })
    }



    // 토큰 가져오는 문서 참고 -> https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-code
    const getToken = async code => {
      console.log("토큰받아쓰!") //토큰
      const GRANT_TYPE = "authorization_code"
      const REST_API_KEY = `${process.env.REACT_APP_REST_API_KEY}`;
      const CLIENT_ID = `${REST_API_KEY}`
      const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;

      // 리액트 애플리케이션에서 HTTP요청 및 응답을 처리해 주는 기능 제공해 주는 라이브러리이다. -> axios
      const re =  await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}
        &client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${kakao_code}`,
      { headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
      })
        const token = re.data.access_token //
        const getUserData = async token => {

          const kakao_user = await axios.get(`https://kapi.kakao.com/v2/user/me`,
            { headers: {
              Authorization: `Bearer ${token}`}
            }
          )
          return await kakao_user.data
        }
        //
        getUserData(token)
      }
    }


    
  
  const google = () => {
    const clientId = 'clientID'

    return(
      <>
        <GoogleOAuthProvider clientId={'348896448225-b2o8u9l967pnqlbl78esim4b162pg5b3.apps.googleusercontent.com'}>
          <GoogleLogin onSuccess={(res) => {
            console.log(res);
          }} onError={(err) => {
            console.log(err);
          }} />
        </GoogleOAuthProvider>
      </>
    )
  }

  const googlehandleLogin = () => {
    const CLIENT_ID = '348896448225-b2o8u9l967pnqlbl78esim4b162pg5b3.apps.googleusercontent.com'

    const width = 500;
    const height = 800;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
 
    const popup = window.open(`https://accounts.google.com/o/oauth2/v2/auth?client_id=
      ${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}
      &response_type=code
      &scope=email+profile`, "google", windowFeatures);

    //GoogleOAuthProvider( clientId = '348896448225-b2o8u9l967pnqlbl78esim4b162pg5b3.apps.googleusercontent.com')

    

    
  }


  function pageMove(){
     usenavi('/home');
   }
  return (
    <div className="login">
    <GlobalStyle/>
      로그인페이지
      <button onClick={pageMove}>홈으로이동</button>
      <button onClick={kahandleLogin}>카카오 로그인</button>
      <button onClick={googlehandleLogin}>구글로그인</button>
      <Template/>
      </div>
  );
}




export default Login;
