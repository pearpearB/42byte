import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { LoginState } from 'States/LoginState';
import { AiFillSetting } from 'react-icons/ai';
import Header from '../../components/Header/Header';
import instance from 'utils/functions/axios';
import { UserData } from 'utils/functions/type';
import { AppContainer } from 'styles/styled';
import { LogoImg, SettingsBtn } from './styled';

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const token = window.location.href.split('?token=')[1];
  const [userData, setUserData] = useState<UserData>({
    createdDate: '',
    modifiedDate: '',
    hashId: '',
    profileImageUrl: '',
    roleType: '',
  });
  const { createdDate, modifiedDate, hashId, profileImageUrl, roleType } =
    userData;
  const navigate = useNavigate();

  useEffect(() => {
    if (token) localStorage.setItem('4242-token', token);
    if (localStorage.getItem('4242-token')) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const currentURL = window.location.search;
    if (currentURL.includes('token')) {
      navigate('');
    }
  }, [window.location.href]);

  useEffect(() => {
    instance
      .get('/user')
      .then((res) => {
        setUserData(res.data);
        localStorage.setItem('4242-profile', res.data.profileImageUrl);
      })
      .catch((err) => console.log(err));
  }, []);

  const moveToAdmin = () => {
    instance
      .get('/admin')
      .then(
        () =>
          (window.location.href = `${process.env.REACT_APP_SERVERIP}/admin`),
      )
      .catch(() => alert('꺼지3'));
  };

  return (
    <AppContainer>
      <Header />
      <LogoImg>
        <img src="images/42byteLogo.png" />
      </LogoImg>
      {roleType === 'ADMIN' && (
        <SettingsBtn onClick={moveToAdmin}>
          <div>
            <AiFillSetting />
          </div>
          <div>Settings</div>
        </SettingsBtn>
      )}
    </AppContainer>
  );
}

export default Main;
