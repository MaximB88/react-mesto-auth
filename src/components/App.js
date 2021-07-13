import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';


function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [loggedIn, setLoggedIn] = React.useState(false);
    const history = useHistory();

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getCards()])
            .then(([userData, data]) => {
                setCurrentUser(userData);
                setCards(data)
            })
            .catch(err => console.log(`Ошибка: ${err}`))
    }, []);
    
    function handleAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(data) {
        setSelectedCard(data)
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    }

    function handleUpdateUser(data) {
        api.setUserInfo(data)
            .then(userData => {
                setCurrentUser(userData);
                closeAllPopups();
            })
    }

    function hanadleUpdateAvatar(data) {
        api.setUserAvatar(data)
            .then(userData => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
    }

    function handleCardLike(data) {
        const isLiked = data.likes.some(i => i._id === currentUser._id);
        api.changeLikeCount(data._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === data._id ? newCard : c));
        });
    }

    function handleCardDelete(data) {
        api.deleteCard(data._id)
            .then(() => {
                const newArrCards = cards.filter(i => i !== data);
                setCards(newArrCards);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
    }

    function handlePlaceAddSubmit(data) {
        api.setNewCard(data)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
    }
    
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <ProtectedRoute 
                path="/" 
                component={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleAvatarClick} 
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
            />
            <Route>
                {loggedIn ? <Redirect to='/' /> : <Redirect to='sign-in' />}
            </Route>
            <Route path="/sign-in">
                <Login />
            </Route>
            <Route path="sign-up">
                <Register />
            </Route>
            <Footer />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handlePlaceAddSubmit} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={hanadleUpdateAvatar}/>
            <ImagePopup data={selectedCard !== null && selectedCard} onClose={closeAllPopups} />  
            
        </CurrentUserContext.Provider>
  );
}

export default App;
