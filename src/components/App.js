import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
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

  // Load in profile info and initial cards.
  React.useEffect(() => {
    api.getProfileInfo()
      .then((info) => {
        setCurrentUser(info)
      })
      .catch(err => console.error(`Unable to load profile info: ${err}`))
  }, [])

  React.useEffect(() => {
    api.getCards()
    .then( (initialCards) => {
      setCardList([...initialCards])
    })
    .catch(err => console.error(`Unable to load cards: ${err}`))
  }, [])

  // Define edit profile/avatar modals and api calls
  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true)
  }

  function handleUpdateUser(userInfo) {
    api.saveProfile(userInfo)
      .then(data => {
        setCurrentUser(data)
      })
      .then(() => setIsEditProfileOpen(false))
      .catch(err => console.error(`Unable to save profile: ${err}`))
  }

  function handleUpdateAvatar({ avatar }) {
    api.saveAvatar(avatar)
      .then(data => {
        setCurrentUser(data)
      })
      .then(() => setIsEditAvatarOpen(false))
      .catch(err => console.error(`Unable to save avatar: ${err}`))
  }

  // Define card preview functions
  function handleCardClick(card) {
    setSelectedCard(card)
    setIsPreviewOpen(true)
  }

  // Define add place modal functions
  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true)
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then(newCard => {
        setCardList([newCard, ...cardList])
        setIsAddPlaceOpen(false)
      })
      .catch(err => console.error(`Unable to add card: ${err}. Check link and try again.`))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCardList((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => console.error(`Unable to update like status: ${err}`))
  }

  function handleCardDelete() {
    api.trashCard(selectedCard._id)
      .then(() => setCardList( cardList.filter(cards => cards._id !== selectedCard._id) ))
      .then(() => setSelectedCard({}))
      .then(() => setIsConfirmTrashOpen(false))
      .catch(err => console.error(`Unable to delete card: ${err}`))
  }

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

  return (
    <div className='page'>
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <Main 
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick} 
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cardList}
          onCardLike={handleCardLike}
          onCardDelete={handleTrash}
        />
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
