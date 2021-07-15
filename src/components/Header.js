import headerLogo from '../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
            <img src={headerLogo} alt="Логотип" className="header__logo" />
            <div className="header__info">
                {props.loggedIn ? 
                    (
                        <>
                        <p className="header__user-mail">{`${props.userEmail}`}</p>
                        <Link className="header__link" to="/sign-up" onClick={props.onSignOut}>Выйти</Link>
                        </>
                    ) : (
                        <Link className="header__link" to="/sign-up">Регистрация</Link>
                    )
                }
            </div>
            
        </header> 
    )
}

export default Header;