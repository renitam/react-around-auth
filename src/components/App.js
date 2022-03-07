import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
import ProtectedRoute from './ProtectedRoute'
import EditProfilePopup from './EditProfilePopup'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import TrashPopup from './TrashPopup'

function App() {
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false)
  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false)
  const [isConfirmTrashOpen, setIsConfirmTrashOpen] = React.useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cardList, setCardList] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(false)

  // Load in profile info
  React.useEffect(() => {
    api.getProfileInfo()
      .then((info) => {
        setCurrentUser(info)
      })
      .catch(err => console.error(`Unable to load profile info: ${err}`))
  }, [])

  // Load in initial cardsnpm 
  React.useEffect(() => {
    api.getCards()
    .then( (initialCards) => {
      setCardList([...initialCards])
    })
    .catch(err => console.error(`Unable to load cards: ${err}`))
  }, [])

  // Open edit avatar modal
  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true)
  }

  // Open edit profile modal
  function handleEditProfileClick() {
    setIsEditProfileOpen(true)
  }

  // Send new profile info from modal to server (name, about) then close modal
  function handleUpdateUser(userInfo) {
    api.saveProfile(userInfo)
      .then(data => {
        setCurrentUser(data)
      })
      .then(() => setIsEditProfileOpen(false))
      .catch(err => console.error(`Unable to save profile: ${err}`))
  }

  // Send new avatar to server then close modal
  function handleUpdateAvatar({ avatar }) {
    api.saveAvatar(avatar)
      .then(data => {
        setCurrentUser(data)
      })
      .then(() => setIsEditAvatarOpen(false))
      .catch(err => console.error(`Unable to save avatar: ${err}`))
  }

  // Open preview modal for selected card
  function handleCardClick(card) {
    setSelectedCard(card)
    setIsPreviewOpen(true)
  }

  // Open new card modal
  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true)
  }

  // Send new card data to server, add to card list, then close modal
  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then(newCard => {
        setCardList([newCard, ...cardList])
        setIsAddPlaceOpen(false)
      })
      .catch(err => console.error(`Unable to add card: ${err}. Check link and try again.`))
  }

  // Send a card like to server, then replace with modified card in card list
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCardList((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => console.error(`Unable to update like status: ${err}`))
  }

  // Delete a card from server, then remove from card list and close trash modal
  function handleCardDelete() {
    api.trashCard(selectedCard._id)
      .then(() => setCardList( cardList.filter(cards => cards._id !== selectedCard._id) ))
      .then(() => setSelectedCard({}))
      .then(() => setIsConfirmTrashOpen(false))
      .catch(err => console.error(`Unable to delete card: ${err}`))
  }

  // Open trash modal for selected card
  function handleTrash(card) {
    setSelectedCard(card)
    setIsConfirmTrashOpen(true)
  }

  // Define close modal function for all modals
  function closeAllPopups() {
    setIsEditAvatarOpen(false)
    setIsEditProfileOpen(false)
    setIsAddPlaceOpen(false)
    setIsConfirmTrashOpen(false)
    setIsPreviewOpen(false)
    setSelectedCard({})
  }

  // HTML for landing page
  return (
    <div className='page'>
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute 
            path='/'
            component={Main} 
            loggedIn={loggedIn}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick} 
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cardList}
            onCardLike={handleCardLike}
            onCardDelete={handleTrash}
          />
      </Switch>
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfileOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlaceOpen} onClose={closeAllPopups} onUpdateCards={handleAddPlaceSubmit}/>
        <TrashPopup isOpen={isConfirmTrashOpen} onClose={closeAllPopups} onUpdateTrash={handleCardDelete} />
      </CurrentUserContext.Provider>

      <ImagePopup isOpen={isPreviewOpen} onClose={closeAllPopups} card={selectedCard} />
    </div>
  )
}

export default App
