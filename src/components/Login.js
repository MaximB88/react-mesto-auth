import React from 'react';

function Login(props) {

    return(
        <div className="auth">
            <h1 className="auth__title">Вход</h1>
            <form className="auth__form">
                <input className="auth__input" type="email" placeholder="Email" />
                <input className="auth__input" type="password" placeholder="Пароль" />
                <button className="auth__button">Войти</button>
            </form>
        </div>
    )
}

export default Login