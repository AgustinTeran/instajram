import store from "../../redux/store"
import chatsActions from "../../redux/chats/actions"

export default function messageHandler(socket){
  socket.on("message",(message,emisor,emisorName) => {

    if ('Notification' in window) {
      // Preguntar por el permiso para mostrar notificaciones
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          // Crear una nueva notificación
          var notification = new Notification(emisorName, {
            body: message.mensaje,
            // icon: 'ruta/a/imagen/icono.png' // Opcional: puedes proporcionar una ruta a una imagen para mostrar como icono
          });
    
          // Manejar eventos de la notificación
          notification.onclick = function() {
            // Acción a realizar cuando se hace clic en la notificación
            // window.open('https://www.ejemplo.com'); // Puedes redirigir al usuario a un enlace específico al hacer clic en la notificación
          };
        }
      });
    }

    var currentChat = store.getState().chats.current.item

    if(currentChat && currentChat.id === emisor){
      store.dispatch(chatsActions.recived(message))
    }

    store.dispatch(chatsActions.newMessage(message,emisorName))
  })

  socket.on("messageSent",(message) => {

    store.dispatch(chatsActions.send(message))
  })
}