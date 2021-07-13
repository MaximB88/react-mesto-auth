import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

    return(
        <div className="auth">
            <h1 className="auth__title">Вход</h1>
            <form className="auth__form">
                <input className="auth__input" type="email" />
                <input className="auth__input" type="password" />
                <button className="auth__button">Войти</button>
                <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    )
}

export default Register;